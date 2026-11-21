-- ====================================================================
-- QUICK BY VMS — PHASE 1: ATOMIC INVENTORY & TRANSFER TRANSACTIONS
-- Migration: 20261121_phase1_atomic_transactions.sql
-- Goal: Ensure zero race conditions, strict row-level locking (FOR UPDATE),
--       and ACID transactions for all inventory state transitions.
-- ====================================================================

-- 1. ATOMIC TRANSFER INITIATION FUNCTION
CREATE OR REPLACE FUNCTION create_transfer_request_atomic(
  p_motorcycle_id UUID,
  p_source_showroom_id UUID,
  p_destination_showroom_id UUID,
  p_reason TEXT,
  p_user_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_moto RECORD;
  v_active_trf RECORD;
  v_transfer_id UUID;
  v_ref VARCHAR(50);
  v_stock_age INTEGER;
BEGIN
  -- Validate showrooms
  IF p_source_showroom_id = p_destination_showroom_id THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'Le showroom source et le showroom de destination doivent être distincts.');
  END IF;

  -- Lock motorcycle row exclusively
  SELECT * INTO v_moto FROM motorcycles WHERE id = p_motorcycle_id FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'Moto introuvable.');
  END IF;

  IF v_moto.status <> 'available' THEN
    RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('La moto n''est pas disponible pour un transfert (statut actuel: %s).', v_moto.status));
  END IF;

  IF v_moto.showroom_id <> p_source_showroom_id THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'La moto n''est pas localisée dans le showroom source indiqué.');
  END IF;

  -- Verify no active transfer already locks this motorcycle
  SELECT * INTO v_active_trf FROM transfers
  WHERE motorcycle_id = p_motorcycle_id
    AND status IN ('pending', 'approved', 'in_preparation', 'in_transit')
  FOR UPDATE;

  IF FOUND THEN
    RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('Cette moto fait déjà l''objet d''un transfert actif (%s).', v_active_trf.reference));
  END IF;

  -- Compute stock age
  v_stock_age := CURRENT_DATE - v_moto.arrival_date;

  -- Generate reference
  v_ref := 'TRF-2026-' || LPAD((FLOOR(RANDOM() * 9000 + 1000))::text, 4, '0');
  v_transfer_id := gen_random_uuid();

  -- Insert transfer
  INSERT INTO transfers (
    id, reference, motorcycle_id, source_showroom_id, destination_showroom_id,
    requested_by, status, reason, stock_age_at_request, created_at, updated_at
  ) VALUES (
    v_transfer_id, v_ref, p_motorcycle_id, p_source_showroom_id, p_destination_showroom_id,
    p_user_id, 'pending', p_reason, v_stock_age, NOW(), NOW()
  );

  -- Insert history
  INSERT INTO transfer_history (
    id, transfer_id, to_status, changed_by, comment, created_at
  ) VALUES (
    gen_random_uuid(), v_transfer_id, 'pending', p_user_id, 'Initiation de la demande de transfert atomique', NOW()
  );

  -- Log audit (with sanitized details)
  INSERT INTO audit_logs (
    id, user_id, action_type, entity_type, entity_id, details, created_at
  ) VALUES (
    gen_random_uuid(), p_user_id, 'TRANSFER_CREATE_ATOMIC', 'transfers', v_transfer_id,
    jsonb_build_object('reference', v_ref, 'vin', v_moto.vin, 'source', p_source_showroom_id, 'dest', p_destination_showroom_id),
    NOW()
  );

  RETURN jsonb_build_object(
    'success', TRUE,
    'transfer_id', v_transfer_id,
    'reference', v_ref,
    'stock_age', v_stock_age
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 2. ATOMIC TRANSFER STATUS TRANSITION FUNCTION
CREATE OR REPLACE FUNCTION update_transfer_status_atomic(
  p_transfer_id UUID,
  p_new_status transfer_status,
  p_user_id UUID,
  p_comment TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_trf RECORD;
  v_moto RECORD;
  v_old_status transfer_status;
BEGIN
  -- Lock transfer record
  SELECT * INTO v_trf FROM transfers WHERE id = p_transfer_id FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'Transfert introuvable.');
  END IF;

  v_old_status := v_trf.status;

  -- Lock motorcycle record
  SELECT * INTO v_moto FROM motorcycles WHERE id = v_trf.motorcycle_id FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'Moto associée au transfert introuvable.');
  END IF;

  -- Validate state machine transitions
  IF p_new_status = 'approved' THEN
    IF v_old_status <> 'pending' THEN
      RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('Transition invalide: impossible d''approuver depuis le statut %s.', v_old_status));
    END IF;
    UPDATE transfers SET status = 'approved', approved_by = p_user_id, approved_at = NOW(), updated_at = NOW() WHERE id = p_transfer_id;
    UPDATE motorcycles SET status = 'in_transfer', updated_at = NOW() WHERE id = v_trf.motorcycle_id;

  ELSIF p_new_status = 'in_transit' THEN
    IF v_old_status NOT IN ('approved', 'in_preparation') THEN
      RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('Transition invalide: impossible d''expédier depuis le statut %s.', v_old_status));
    END IF;
    UPDATE transfers SET status = 'in_transit', shipped_at = NOW(), updated_at = NOW() WHERE id = p_transfer_id;
    UPDATE motorcycles SET status = 'in_transfer', updated_at = NOW() WHERE id = v_trf.motorcycle_id;

  ELSIF p_new_status = 'received' THEN
    IF v_old_status NOT IN ('approved', 'in_transit', 'in_preparation') THEN
      RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('Transition invalide: impossible de réceptionner depuis le statut %s.', v_old_status));
    END IF;
    UPDATE transfers SET status = 'received', received_by = p_user_id, received_at = NOW(), updated_at = NOW() WHERE id = p_transfer_id;
    -- Atomic reallocation: assign new showroom, reset arrival date, set available
    UPDATE motorcycles SET
      showroom_id = v_trf.destination_showroom_id,
      status = 'available',
      arrival_date = CURRENT_DATE,
      notes = FORMAT('Transféré via %s le %s.', v_trf.reference, TO_CHAR(CURRENT_DATE, 'DD/MM/YYYY')),
      updated_at = NOW()
    WHERE id = v_trf.motorcycle_id;

  ELSIF p_new_status IN ('rejected', 'cancelled') THEN
    IF v_old_status = 'received' THEN
      RETURN jsonb_build_object('success', FALSE, 'error', 'Impossible d''annuler un transfert déjà finalisé et réceptionné.');
    END IF;
    UPDATE transfers SET status = p_new_status, updated_at = NOW() WHERE id = p_transfer_id;
    -- Release motorcycle back to available if it was in transfer
    IF v_moto.status = 'in_transfer' THEN
      UPDATE motorcycles SET status = 'available', updated_at = NOW() WHERE id = v_trf.motorcycle_id;
    END IF;

  ELSE
    RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('Statut inconnu: %s', p_new_status));
  END IF;

  -- Append history log
  INSERT INTO transfer_history (
    id, transfer_id, from_status, to_status, changed_by, comment, created_at
  ) VALUES (
    gen_random_uuid(), p_transfer_id, v_old_status, p_new_status, p_user_id,
    COALESCE(p_comment, FORMAT('Statut mis à jour vers %s', p_new_status)), NOW()
  );

  -- Audit log
  INSERT INTO audit_logs (
    id, user_id, action_type, entity_type, entity_id, details, created_at
  ) VALUES (
    gen_random_uuid(), p_user_id, FORMAT('TRANSFER_%s_ATOMIC', UPPER(p_new_status::text)), 'transfers', p_transfer_id,
    jsonb_build_object('reference', v_trf.reference, 'from', v_old_status, 'to', p_new_status),
    NOW()
  );

  RETURN jsonb_build_object(
    'success', TRUE,
    'transfer_id', p_transfer_id,
    'old_status', v_old_status,
    'new_status', p_new_status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 3. ATOMIC SALE RECORDING FUNCTION
CREATE OR REPLACE FUNCTION record_sale_atomic(
  p_motorcycle_id UUID,
  p_showroom_id UUID,
  p_customer_name VARCHAR(200),
  p_customer_phone VARCHAR(50),
  p_sale_price NUMERIC(12,2),
  p_payment_method VARCHAR(50),
  p_user_id UUID,
  p_notes TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_moto RECORD;
  v_sale_id UUID;
  v_ref VARCHAR(50);
BEGIN
  -- Lock motorcycle row exclusively
  SELECT * INTO v_moto FROM motorcycles WHERE id = p_motorcycle_id FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'Moto introuvable.');
  END IF;

  IF v_moto.status NOT IN ('available', 'reserved') THEN
    RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('La moto n''est pas disponible pour la vente (statut actuel: %s).', v_moto.status));
  END IF;

  IF v_moto.showroom_id <> p_showroom_id THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'La moto n''appartient pas au showroom vendeur.');
  END IF;

  -- Mark motorcycle sold
  UPDATE motorcycles SET
    status = 'sold',
    sale_date = CURRENT_DATE,
    updated_at = NOW()
  WHERE id = p_motorcycle_id;

  -- Generate invoice reference
  v_ref := 'FAC-2026-' || LPAD((FLOOR(RANDOM() * 9000 + 1000))::text, 4, '0');
  v_sale_id := gen_random_uuid();

  -- Insert sale record
  INSERT INTO sales (
    id, reference, motorcycle_id, showroom_id, customer_name, customer_phone,
    sale_price, payment_method, sale_date, sold_by, notes, created_at
  ) VALUES (
    v_sale_id, v_ref, p_motorcycle_id, p_showroom_id, p_customer_name, p_customer_phone,
    p_sale_price, COALESCE(p_payment_method, 'CASH'), CURRENT_DATE, p_user_id, p_notes, NOW()
  );

  -- Insert audit log with redacted customer phone
  INSERT INTO audit_logs (
    id, user_id, action_type, entity_type, entity_id, details, created_at
  ) VALUES (
    gen_random_uuid(), p_user_id, 'SALE_CREATE_ATOMIC', 'sales', v_sale_id,
    jsonb_build_object(
      'reference', v_ref,
      'vin', v_moto.vin,
      'sale_price', p_sale_price,
      'payment_method', p_payment_method,
      'customer_phone_redacted', SUBSTRING(p_customer_phone FROM 1 FOR 4) || '****' || RIGHT(p_customer_phone, 2)
    ),
    NOW()
  );

  RETURN jsonb_build_object(
    'success', TRUE,
    'sale_id', v_sale_id,
    'reference', v_ref,
    'vin', v_moto.vin
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
