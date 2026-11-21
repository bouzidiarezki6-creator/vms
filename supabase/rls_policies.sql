-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR QUICK PLATFORM
-- ====================================================================

-- Enable RLS on all sensitive tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE showrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE showroom_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE preorder_redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is Super Admin
CREATE OR REPLACE FUNCTION is_super_admin(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = p_user_id AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Get user's assigned showroom ID
CREATE OR REPLACE FUNCTION get_user_showroom_id(p_user_id UUID)
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT showroom_id FROM showroom_users
    WHERE user_id = p_user_id LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ====================================================================
-- 1. PROFILES POLICIES
-- ====================================================================
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR is_super_admin(auth.uid()));

CREATE POLICY "Users can update own basic profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id OR is_super_admin(auth.uid()));

CREATE POLICY "Super admin can manage all profiles"
  ON profiles FOR ALL
  USING (is_super_admin(auth.uid()));

-- ====================================================================
-- 2. SHOWROOMS POLICIES
-- ====================================================================
CREATE POLICY "Active showrooms are visible to all authenticated users"
  ON showrooms FOR SELECT
  USING (is_active = TRUE OR is_super_admin(auth.uid()) OR owner_id = auth.uid());

CREATE POLICY "Showroom owners can update their own showroom"
  ON showrooms FOR UPDATE
  USING (owner_id = auth.uid() OR is_super_admin(auth.uid()));

CREATE POLICY "Super admin can insert and delete showrooms"
  ON showrooms FOR ALL
  USING (is_super_admin(auth.uid()));

-- ====================================================================
-- 3. MOTORCYCLE MODELS POLICIES
-- ====================================================================
CREATE POLICY "Motorcycle catalog is publicly readable"
  ON motorcycle_models FOR SELECT
  USING (is_active = TRUE OR is_super_admin(auth.uid()));

CREATE POLICY "Only Super admin can modify motorcycle catalog"
  ON motorcycle_models FOR ALL
  USING (is_super_admin(auth.uid()));

-- ====================================================================
-- 4. MOTORCYCLES POLICIES (Inventory Isolation + Compte Global)
-- ====================================================================
CREATE POLICY "Showroom users see their own inventory"
  ON motorcycles FOR SELECT
  USING (
    showroom_id = get_user_showroom_id(auth.uid())
    OR is_super_admin(auth.uid())
    -- Compte Global: available units eligible for transfer can be discovered
    OR (status = 'available' AND (CURRENT_DATE - arrival_date) >= 90)
  );

CREATE POLICY "Showroom users can manage their own showroom stock"
  ON motorcycles FOR INSERT
  WITH CHECK (showroom_id = get_user_showroom_id(auth.uid()) OR is_super_admin(auth.uid()));

CREATE POLICY "Showroom users can update their own showroom stock"
  ON motorcycles FOR UPDATE
  USING (showroom_id = get_user_showroom_id(auth.uid()) OR is_super_admin(auth.uid()));

-- ====================================================================
-- 5. CUSTOMER REQUESTS POLICIES
-- ====================================================================
CREATE POLICY "Customers view their own requests"
  ON customer_requests FOR SELECT
  USING (
    user_id = auth.uid()
    OR is_super_admin(auth.uid())
    OR wilaya_code IN (SELECT wilaya_code FROM showrooms WHERE id = get_user_showroom_id(auth.uid()))
  );

CREATE POLICY "Customers can submit requests"
  ON customer_requests FOR INSERT
  WITH CHECK (user_id = auth.uid() OR auth.uid() IS NULL);

-- ====================================================================
-- 6. NOTIFICATIONS POLICIES
-- ====================================================================
CREATE POLICY "Users read own notifications"
  ON notifications FOR SELECT
  USING (recipient_profile_id = auth.uid() OR is_super_admin(auth.uid()));

CREATE POLICY "Users update own notifications (mark read)"
  ON notifications FOR UPDATE
  USING (recipient_profile_id = auth.uid());

-- ====================================================================
-- 7. TRANSFERS (COMPTE GLOBAL) POLICIES
-- ====================================================================
CREATE POLICY "Showrooms can view their related transfers"
  ON transfers FOR SELECT
  USING (
    source_showroom_id = get_user_showroom_id(auth.uid())
    OR destination_showroom_id = get_user_showroom_id(auth.uid())
    OR is_super_admin(auth.uid())
  );

CREATE POLICY "Showrooms can create transfer requests"
  ON transfers FOR INSERT
  WITH CHECK (
    destination_showroom_id = get_user_showroom_id(auth.uid())
    OR is_super_admin(auth.uid())
  );

CREATE POLICY "Showrooms can update assigned transfers"
  ON transfers FOR UPDATE
  USING (
    source_showroom_id = get_user_showroom_id(auth.uid())
    OR destination_showroom_id = get_user_showroom_id(auth.uid())
    OR is_super_admin(auth.uid())
  );

-- ====================================================================
-- 8. AUDIT LOGS POLICIES
-- ====================================================================
CREATE POLICY "Only Super Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (is_super_admin(auth.uid()));
