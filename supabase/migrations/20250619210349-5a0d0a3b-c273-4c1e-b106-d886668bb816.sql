
-- Create table for chat users
CREATE TABLE public.chat_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  session_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public chat)
CREATE POLICY "Anyone can create chat user" 
  ON public.chat_users 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow users to read their own data by session_id
CREATE POLICY "Users can view their own chat data" 
  ON public.chat_users 
  FOR SELECT 
  USING (true);
