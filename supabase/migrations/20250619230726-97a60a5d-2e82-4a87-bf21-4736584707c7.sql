
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can submit CRM inquiries" ON public.crm_inquiries;

-- Create a new policy that properly allows anonymous insertions
CREATE POLICY "Enable insert access for all users" 
  ON public.crm_inquiries 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);
