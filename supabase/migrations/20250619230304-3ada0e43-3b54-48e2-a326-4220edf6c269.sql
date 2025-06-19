
-- Create a table for CRM inquiries
CREATE TABLE public.crm_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  crm_needs TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making it publicly insertable since it's a contact form
ALTER TABLE public.crm_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert CRM inquiries (contact form)
CREATE POLICY "Anyone can submit CRM inquiries" 
  ON public.crm_inquiries 
  FOR INSERT 
  WITH CHECK (true);

-- Only allow service role to read inquiries (for admin purposes)
CREATE POLICY "Service role can read all inquiries" 
  ON public.crm_inquiries 
  FOR SELECT 
  USING (auth.role() = 'service_role');
