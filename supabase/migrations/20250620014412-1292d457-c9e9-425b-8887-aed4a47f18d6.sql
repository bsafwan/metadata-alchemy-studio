
-- Disable Row Level Security for conversations table
ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;

-- Disable Row Level Security for conversation_messages table
ALTER TABLE public.conversation_messages DISABLE ROW LEVEL SECURITY;

-- Drop all existing RLS policies since we're disabling RLS
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.conversations;

DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.conversation_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.conversation_messages;
