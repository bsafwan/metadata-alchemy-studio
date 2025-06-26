
-- Create user_notifications table for storing notifications sent to users
CREATE TABLE public.user_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  inquiry_id UUID REFERENCES public.crm_inquiries(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  user_identifier TEXT,
  links JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for user_notifications
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
CREATE POLICY "Service role can manage user notifications" 
  ON public.user_notifications 
  FOR ALL 
  USING (true);

-- Create policy for users to read their own notifications (by email)
CREATE POLICY "Users can read their own notifications" 
  ON public.user_notifications 
  FOR SELECT 
  USING (recipient_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Add indexes for better performance
CREATE INDEX idx_user_notifications_recipient_email ON public.user_notifications(recipient_email);
CREATE INDEX idx_user_notifications_created_at ON public.user_notifications(created_at DESC);
CREATE INDEX idx_user_notifications_is_read ON public.user_notifications(is_read);
