
-- Drop all existing policies for crm_inquiries table
DROP POLICY IF EXISTS "Allow anonymous CRM inquiry submissions" ON public.crm_inquiries;
DROP POLICY IF EXISTS "Service role can read CRM inquiries" ON public.crm_inquiries;

-- Disable Row Level Security completely
ALTER TABLE public.crm_inquiries DISABLE ROW LEVEL SECURITY;
