
-- Create storage bucket for delivery files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('delivery-files', 'delivery-files', false);

-- Create RLS policies for delivery files
CREATE POLICY "Admin can upload delivery files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'delivery-files' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can view all delivery files"
ON storage.objects FOR SELECT
USING (bucket_id = 'delivery-files' AND auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view delivery files if payment completed"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'delivery-files' AND
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id::text = (storage.foldername(name))[1]
    AND p.user_id = auth.uid()
    AND NOT EXISTS (
      SELECT 1 FROM project_payments pp
      WHERE pp.project_id = p.id
      AND pp.status != 'paid'
    )
  )
);

CREATE POLICY "Users can view delivery files if not payment restricted"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'delivery-files' AND
  EXISTS (
    SELECT 1 FROM projects p
    JOIN delivery_items di ON di.project_id = p.id
    WHERE p.id::text = (storage.foldername(name))[1]
    AND p.user_id = auth.uid()
    AND di.requires_full_payment = false
  )
);
