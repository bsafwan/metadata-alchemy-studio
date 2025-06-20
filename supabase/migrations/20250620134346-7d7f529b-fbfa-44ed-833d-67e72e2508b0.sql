
-- Add real-time capabilities and modify pricing structure for total price negotiations
ALTER TABLE public.project_phases 
ADD COLUMN original_percentage DECIMAL(5,2) DEFAULT 0,
ADD COLUMN is_percentage_locked BOOLEAN DEFAULT false;

-- Add negotiation tracking table for total price negotiations
CREATE TABLE public.total_price_negotiations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  original_total_price DECIMAL(10,2) NOT NULL,
  proposed_total_price DECIMAL(10,2) NOT NULL,
  proposed_by TEXT NOT NULL CHECK (proposed_by IN ('admin', 'user')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  round_number INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.total_price_negotiations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for total_price_negotiations
CREATE POLICY "Users can view negotiations for their projects" ON public.total_price_negotiations
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create negotiations for their projects" ON public.total_price_negotiations
  FOR INSERT WITH CHECK (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all negotiations" ON public.total_price_negotiations
  FOR ALL USING (true);

-- Enable real-time for all pricing tables
ALTER TABLE public.project_phases REPLICA IDENTITY FULL;
ALTER TABLE public.project_plans REPLICA IDENTITY FULL;
ALTER TABLE public.total_price_negotiations REPLICA IDENTITY FULL;
ALTER TABLE public.pricing_negotiations REPLICA IDENTITY FULL;

-- Add tables to real-time publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_phases;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.total_price_negotiations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pricing_negotiations;

-- Function to calculate and update phase prices based on total negotiation
CREATE OR REPLACE FUNCTION public.update_phase_prices_from_total(
  p_project_id UUID,
  p_new_total DECIMAL(10,2)
)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  phase_record RECORD;
  original_total DECIMAL(10,2);
BEGIN
  -- Get original total price
  SELECT SUM(admin_proposed_price) INTO original_total
  FROM public.project_phases
  WHERE project_id = p_project_id AND admin_proposed_price IS NOT NULL;
  
  -- Update each phase price proportionally
  FOR phase_record IN 
    SELECT id, admin_proposed_price, original_percentage
    FROM public.project_phases 
    WHERE project_id = p_project_id AND admin_proposed_price IS NOT NULL
  LOOP
    -- Calculate and store original percentage if not locked
    IF NOT phase_record.is_percentage_locked THEN
      UPDATE public.project_phases 
      SET original_percentage = (phase_record.admin_proposed_price / original_total * 100),
          is_percentage_locked = true
      WHERE id = phase_record.id;
    END IF;
    
    -- Update final agreed price based on percentage
    UPDATE public.project_phases
    SET final_agreed_price = (phase_record.original_percentage / 100 * p_new_total),
        status = 'agreed'
    WHERE id = phase_record.id;
  END LOOP;
END;
$$;
