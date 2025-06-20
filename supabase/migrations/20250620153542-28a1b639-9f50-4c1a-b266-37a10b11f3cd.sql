
-- Create a public storage bucket for project files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-files', 'project-files', true);

-- Create permissive RLS policies for the project-files bucket
CREATE POLICY "Public upload for project files" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'project-files');

CREATE POLICY "Public access for project files" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'project-files');

CREATE POLICY "Public update for project files" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'project-files');

CREATE POLICY "Public delete for project files" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'project-files');
