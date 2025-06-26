
-- Create device_push_subscriptions table for anonymous device-based subscriptions
CREATE TABLE public.device_push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE,
  device_fingerprint TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  user_agent TEXT,
  page_context JSONB DEFAULT '{}',
  device_info JSONB DEFAULT '{}',
  user_email TEXT NULL, -- Can be associated later
  user_id UUID NULL, -- Can be associated later
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS for device_push_subscriptions
ALTER TABLE public.device_push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (needed for edge functions)
CREATE POLICY "Service role can manage device push subscriptions" 
  ON public.device_push_subscriptions 
  FOR ALL 
  USING (true);

-- Add indexes for better performance
CREATE INDEX idx_device_push_subscriptions_device_id ON public.device_push_subscriptions(device_id);
CREATE INDEX idx_device_push_subscriptions_active ON public.device_push_subscriptions(is_active);
CREATE INDEX idx_device_push_subscriptions_endpoint ON public.device_push_subscriptions(endpoint);
CREATE INDEX idx_device_push_subscriptions_fingerprint ON public.device_push_subscriptions(device_fingerprint);
CREATE INDEX idx_device_push_subscriptions_user_email ON public.device_push_subscriptions(user_email) WHERE user_email IS NOT NULL;
