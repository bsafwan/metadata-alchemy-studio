
-- Create push_subscriptions table for storing user device push subscriptions
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_email, endpoint)
);

-- Enable RLS for push_subscriptions
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (needed for edge functions)
CREATE POLICY "Service role can manage push subscriptions" 
  ON public.push_subscriptions 
  FOR ALL 
  USING (true);

-- Add indexes for better performance
CREATE INDEX idx_push_subscriptions_user_email ON public.push_subscriptions(user_email);
CREATE INDEX idx_push_subscriptions_active ON public.push_subscriptions(is_active);
CREATE INDEX idx_push_subscriptions_endpoint ON public.push_subscriptions(endpoint);

-- Update user_notifications table to track push delivery status (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_notifications') THEN
        ALTER TABLE public.user_notifications ADD COLUMN IF NOT EXISTS push_sent BOOLEAN DEFAULT false;
        ALTER TABLE public.user_notifications ADD COLUMN IF NOT EXISTS push_sent_at TIMESTAMP WITH TIME ZONE;
        ALTER TABLE public.user_notifications ADD COLUMN IF NOT EXISTS delivery_status TEXT DEFAULT 'pending';
        
        CREATE INDEX IF NOT EXISTS idx_user_notifications_push_status ON public.user_notifications(push_sent, delivery_status);
    END IF;
END $$;
