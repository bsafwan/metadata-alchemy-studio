
-- Add missing columns to crm_inquiries table
ALTER TABLE public.crm_inquiries 
ADD COLUMN IF NOT EXISTS user_identifier TEXT,
ADD COLUMN IF NOT EXISTS source_page TEXT;

-- Update the existing RLS policies to handle the new columns
-- The existing policies should still work, but let's make sure they're comprehensive

-- Update the insert policy to be more explicit
DROP POLICY IF EXISTS "Anyone can submit CRM inquiries" ON public.crm_inquiries;
CREATE POLICY "Anyone can submit CRM inquiries" 
  ON public.crm_inquiries 
  FOR INSERT 
  WITH CHECK (true);

-- Keep the existing select policy for service role
-- CREATE POLICY "Service role can read all inquiries" 
-- ON public.crm_inquiries 
-- FOR SELECT 
-- USING (auth.role() = 'service_role');
