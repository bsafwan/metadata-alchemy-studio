
-- Create conversations table
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversation_messages table
CREATE TABLE public.conversation_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user', 'admin')),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message_content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for conversation attachments
INSERT INTO storage.buckets (id, name, public) 
VALUES ('conversation-files', 'conversation-files', true);

-- Add RLS policies for conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations" 
  ON public.conversations 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL AND user_id IN (SELECT id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can create their own conversations" 
  ON public.conversations 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL AND user_id IN (SELECT id FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can update their own conversations" 
  ON public.conversations 
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL AND user_id IN (SELECT id FROM public.users WHERE id = auth.uid()));

-- Add RLS policies for conversation messages
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages from their conversations" 
  ON public.conversation_messages 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND 
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE user_id IN (SELECT id FROM public.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can create messages in their conversations" 
  ON public.conversation_messages 
  FOR INSERT 
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE user_id IN (SELECT id FROM public.users WHERE id = auth.uid())
    )
  );

-- Create storage policies for conversation files
CREATE POLICY "Users can upload conversation files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'conversation-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view conversation files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'conversation-files');

-- Add indexes for better performance
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_conversations_project_id ON public.conversations(project_id);
CREATE INDEX idx_conversation_messages_conversation_id ON public.conversation_messages(conversation_id);
CREATE INDEX idx_conversation_messages_created_at ON public.conversation_messages(created_at);
