
-- Drop existing problematic RLS policies
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.conversations;

DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.conversation_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.conversation_messages;

-- Create correct RLS policies for conversations
CREATE POLICY "Users can view their own conversations" 
  ON public.conversations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations" 
  ON public.conversations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
  ON public.conversations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create correct RLS policies for conversation messages
CREATE POLICY "Users can view messages from their conversations" 
  ON public.conversation_messages 
  FOR SELECT 
  USING (
    auth.uid() IS NOT NULL AND 
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations" 
  ON public.conversation_messages 
  FOR INSERT 
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE user_id = auth.uid()
    )
  );

-- Also ensure the storage policies are correct
DROP POLICY IF EXISTS "Users can upload conversation files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view conversation files" ON storage.objects;

CREATE POLICY "Users can upload conversation files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'conversation-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view conversation files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'conversation-files');
