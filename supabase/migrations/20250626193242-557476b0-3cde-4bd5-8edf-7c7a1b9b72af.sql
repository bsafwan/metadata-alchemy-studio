
-- Create admin_messages table for storing messages sent to CRM inquiry users
CREATE TABLE public.admin_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  crm_inquiry_id UUID REFERENCES public.crm_inquiries(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  email_content TEXT,
  notification_content TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '[]'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sent_by TEXT NOT NULL DEFAULT 'admin',
  message_type TEXT NOT NULL DEFAULT 'inquiry_response',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for admin_messages
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access (service role can manage all messages)
CREATE POLICY "Service role can manage admin messages" 
  ON public.admin_messages 
  FOR ALL 
  USING (true);

-- Add indexes for better performance
CREATE INDEX idx_admin_messages_crm_inquiry_id ON public.admin_messages(crm_inquiry_id);
CREATE INDEX idx_admin_messages_sent_at ON public.admin_messages(sent_at DESC);
