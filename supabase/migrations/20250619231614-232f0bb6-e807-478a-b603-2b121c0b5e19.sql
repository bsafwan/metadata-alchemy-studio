
-- Drop all existing policies for crm_inquiries table
DROP POLICY IF EXISTS "Anyone can submit CRM inquiries" ON public.crm_inquiries;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.crm_inquiries;
DROP POLICY IF EXISTS "Service role can read all inquiries" ON public.crm_inquiries;

-- Create a simple, explicit policy that allows anonymous insertions
CREATE POLICY "Allow anonymous CRM inquiry submissions" 
  ON public.crm_inquiries 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create a policy for service role to read inquiries (for admin access)
CREATE POLICY "Service role can read CRM inquiries" 
  ON public.crm_inquiries 
  FOR SELECT 
  TO service_role
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.crm_inquiries ENABLE ROW LEVEL SECURITY;
