-- Create table for custom audit pages
CREATE TABLE public.custom_audit_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  html_content TEXT NOT NULL,
  url_slug TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.custom_audit_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to non-expired pages
CREATE POLICY "Anyone can view non-expired custom audit pages" 
ON public.custom_audit_pages 
FOR SELECT 
USING (expires_at > now());

-- Only service role can manage pages
CREATE POLICY "Service role can manage custom audit pages" 
ON public.custom_audit_pages 
FOR ALL 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_custom_audit_pages_updated_at
BEFORE UPDATE ON public.custom_audit_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for performance
CREATE INDEX idx_custom_audit_pages_slug ON public.custom_audit_pages(url_slug);
CREATE INDEX idx_custom_audit_pages_expires ON public.custom_audit_pages(expires_at);