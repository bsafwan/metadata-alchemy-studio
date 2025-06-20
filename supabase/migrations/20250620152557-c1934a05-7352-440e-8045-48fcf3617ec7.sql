
-- Add demo_files column to demos table
ALTER TABLE public.demos ADD COLUMN demo_files jsonb DEFAULT '[]'::jsonb;

-- Add uploaded_files column to previews table  
ALTER TABLE public.previews ADD COLUMN uploaded_files jsonb DEFAULT '[]'::jsonb;
