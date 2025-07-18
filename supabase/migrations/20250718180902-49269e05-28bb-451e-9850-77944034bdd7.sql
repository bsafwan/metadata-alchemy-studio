-- Create meetings table for CRM scheduling system
CREATE TABLE public.crm_meetings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    crm_inquiry_id UUID REFERENCES public.crm_inquiries(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT,
    meeting_platform TEXT NOT NULL CHECK (meeting_platform IN ('google_meet', 'zoom', 'whatsapp')),
    meeting_date DATE NOT NULL,
    meeting_time TIME NOT NULL,
    meeting_timezone TEXT NOT NULL DEFAULT 'America/New_York',
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
    google_meet_link TEXT,
    zoom_link TEXT,
    admin_notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.crm_meetings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Service role can manage meetings" 
ON public.crm_meetings 
FOR ALL 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_crm_meetings_updated_at
    BEFORE UPDATE ON public.crm_meetings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for efficient querying
CREATE INDEX idx_crm_meetings_date_time ON public.crm_meetings(meeting_date, meeting_time);
CREATE INDEX idx_crm_meetings_status ON public.crm_meetings(status);
CREATE INDEX idx_crm_meetings_reminder ON public.crm_meetings(reminder_sent, meeting_date, meeting_time);