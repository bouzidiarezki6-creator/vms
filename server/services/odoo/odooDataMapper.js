// server/services/odoo/odooDataMapper.js
// QUICK by VMS — Phase 3: Bi-Directional Odoo Data Mapper

export class OdooDataMapper {
  /**
   * 1. PRODUCTS & MODELS (QUICK <-> Odoo product.template)
   */
  static quickModelToOdooProduct(model) {
    return {
      default_code: model.id,
      name: model.name,
      list_price: model.price_dzd || 0,
      type: 'product', // Storable product in Odoo
      active: model.is_active !== false,
      description_sale: model.description || `${model.brand} ${model.name} (${model.displacement || ''})`
    };
  }

  static odooProductToQuickModel(odooProduct, existingQuickModel = null) {
    return {
      id: odooProduct.default_code || existingQuickModel?.id || `mod-odoo-${odooProduct.id}`,
      name: odooProduct.name || existingQuickModel?.name || 'Modèle Moto VMS',
      brand: existingQuickModel?.brand || 'VMS',
      category: existingQuickModel?.category || 'Scooter',
      displacement: existingQuickModel?.displacement || '125 cc',
      engine_cc: existingQuickModel?.engine_cc || 125,
      power_hp: existingQuickModel?.power_hp || 10,
      cooling: existingQuickModel?.cooling || 'Air',
      fuel_system: existingQuickModel?.fuel_system || 'EFI',
      price_dzd: Math.round(odooProduct.list_price || existingQuickModel?.price_dzd || 250000),
      image_url: existingQuickModel?.image_url || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
      description: odooProduct.description_sale || existingQuickModel?.description || '',
      colors: existingQuickModel?.colors || ['Noir', 'Blanc', 'Gris'],
      is_active: odooProduct.active !== false,
      created_at: existingQuickModel?.created_at || new Date().toISOString()
    };
  }

  /**
   * 2. MOTORCYCLE SERIAL NUMBERS / VIN (QUICK <-> Odoo stock.lot)
   */
  static quickMotorcycleToOdooLot(moto, odooProductId) {
    return {
      name: moto.vin, // Unique Chassis / Serial number in Odoo
      product_id: odooProductId,
      ref: moto.id,
      note: `Statut QUICK: ${moto.status} | Showroom: ${moto.showroom_id} | Couleur: ${moto.color}`
    };
  }

  static odooLotToQuickMotorcycle(odooLot, modelId, showroomId, existingMoto = null) {
    return {
      id: existingMoto?.id || `moto-odoo-${odooLot.id}`,
      model_id: modelId,
      showroom_id: showroomId,
      vin: odooLot.name,
      color: existingMoto?.color || 'Noir',
      acquisition_date: existingMoto?.acquisition_date || new Date().toISOString().split('T')[0],
      arrival_date: existingMoto?.arrival_date || new Date().toISOString().split('T')[0],
      status: existingMoto?.status || 'available',
      created_at: existingMoto?.created_at || new Date().toISOString()
    };
  }

  /**
   * 3. SHOWROOMS & WAREHOUSES (QUICK <-> Odoo stock.location)
   */
  static quickShowroomToOdooLocation(showroom) {
    return {
      name: `Showroom ${showroom.city} (${showroom.code})`,
      complete_name: `WH/Stock/${showroom.city}`,
      usage: 'internal',
      active: showroom.is_active !== false,
      comment: `Showroom VMS officiel — Code: ${showroom.code} — Wilaya: ${showroom.wilaya_code} — Tél: ${showroom.phone}`
    };
  }

  /**
   * 4. CUSTOMER LEADS & REQUESTS (QUICK -> Odoo crm.lead)
   */
  static quickRequestToOdooLead(req, modelName = 'VMS') {
    let stage = 'Nouveau';
    if (req.status === 'available_notified') stage = 'Proposition';
    if (req.status === 'fulfilled') stage = 'Gagné';
    if (req.status === 'cancelled') stage = 'Perdu';

    return {
      name: `Demande Moto ${req.reference} - ${modelName}`,
      contact_name: `${req.first_name} ${req.last_name}`,
      partner_name: `${req.first_name} ${req.last_name}`,
      phone: req.phone,
      email_from: req.email || '',
      city: req.city,
      description: `Réf QUICK: ${req.reference}\nWilaya: ${req.wilaya_code} (${req.city})\nModèle demandé: ${modelName}\nNotes: ${req.notes || ''}`,
      expected_revenue: req.expected_revenue || 280000,
      stage_id_name: stage
    };
  }

  /**
   * 5. SALES & ORDERS (QUICK -> Odoo sale.order)
   */
  static quickSaleToOdooOrder(sale, odooPartnerId, odooProductId) {
    return {
      name: sale.reference,
      partner_id: odooPartnerId,
      date_order: sale.sale_date || new Date().toISOString(),
      amount_total: sale.sale_price,
      note: `Vente effectuée depuis Showroom QUICK (${sale.showroom_id}) - Mode: ${sale.payment_method}`,
      state: 'sale',
      order_line: [
        [0, 0, {
          product_id: odooProductId,
          product_uom_qty: 1,
          price_unit: sale.sale_price,
          name: `Moto VMS (${sale.motorcycle_id})`
        }]
      ]
    };
  }

  /**
   * 6. STOCK TRANSFERS (QUICK -> Odoo stock.picking)
   */
  static quickTransferToOdooPicking(transfer, odooSourceLocationId, odooDestLocationId, odooProductId) {
    // Map transfer status to Odoo picking state
    let state = 'draft';
    if (transfer.status === 'approved') state = 'confirmed';
    if (transfer.status === 'in_transit') state = 'assigned';
    if (transfer.status === 'received') state = 'done';

    return {
      origin: `QUICK Compte Global ${transfer.reference}`,
      picking_type_id: 5, // Standard Internal Transfer picking type in Odoo
      location_id: odooSourceLocationId,
      location_dest_id: odooDestLocationId,
      note: `Transfert Inter-Showroom VMS : ${transfer.reason || 'Rééquilibrage Compte Global'}`,
      state,
      move_ids_without_package: [
        [0, 0, {
          name: `Transfert ${transfer.reference}`,
          product_id: odooProductId,
          product_uom_qty: 1,
          product_uom: 1,
          location_id: odooSourceLocationId,
          location_dest_id: odooDestLocationId
        }]
      ]
    };
  }
}
