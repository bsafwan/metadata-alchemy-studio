-- Allow public access to meeting data for the meeting portal
CREATE POLICY "Allow public access to scheduled meetings" 
ON public.crm_meetings 
FOR SELECT 
USING (status = 'scheduled');

-- Also ensure anyone can read meeting details for the portal
CREATE POLICY "Public can view meeting details for portal" 
ON public.crm_meetings 
FOR SELECT 
USING (true);