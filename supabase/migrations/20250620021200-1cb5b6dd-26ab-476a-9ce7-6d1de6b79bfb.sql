
-- Make the conversation-files bucket completely public by updating its public status
UPDATE storage.buckets 
SET public = true 
WHERE id = 'conversation-files';

-- Drop all existing RLS policies on storage.objects for conversation-files
DROP POLICY IF EXISTS "Users can upload conversation files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view conversation files" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- Create simple public policies for the conversation-files bucket
CREATE POLICY "Public upload for conversation files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'conversation-files');

CREATE POLICY "Public access for conversation files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'conversation-files');

CREATE POLICY "Public update for conversation files" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'conversation-files');

CREATE POLICY "Public delete for conversation files" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'conversation-files');
