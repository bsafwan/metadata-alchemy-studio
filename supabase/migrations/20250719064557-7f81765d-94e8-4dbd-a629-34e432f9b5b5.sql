-- Create table for scheduled file deletions
CREATE TABLE public.scheduled_deletions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_path TEXT NOT NULL,
  bucket_name TEXT NOT NULL,
  deletion_date TIMESTAMP WITH TIME ZONE NOT NULL,
  meeting_id UUID REFERENCES public.crm_meetings(id) ON DELETE CASCADE,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scheduled_deletions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for scheduled deletions (admin only)
CREATE POLICY "Only admins can view scheduled deletions" 
ON public.scheduled_deletions 
FOR SELECT 
USING (false); -- No public access, only via service role

CREATE POLICY "Only admins can insert scheduled deletions" 
ON public.scheduled_deletions 
FOR INSERT 
WITH CHECK (false); -- No public access, only via service role

-- Create trigger for timestamps
CREATE TRIGGER update_scheduled_deletions_updated_at
BEFORE UPDATE ON public.scheduled_deletions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for efficient deletion processing
CREATE INDEX idx_scheduled_deletions_date ON public.scheduled_deletions(deletion_date) WHERE NOT processed;