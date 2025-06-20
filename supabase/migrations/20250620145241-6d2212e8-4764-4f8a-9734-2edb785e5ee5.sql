
-- Create demos table for super admin global demos
CREATE TABLE public.demos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  demo_type TEXT NOT NULL CHECK (demo_type IN ('link', 'image', 'file', 'video')),
  demo_url TEXT,
  file_path TEXT,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create previews table for phase-specific previews
CREATE TABLE public.previews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase_id UUID NOT NULL REFERENCES public.project_phases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  preview_files JSONB DEFAULT '[]'::jsonb, -- Array of files/links/repos
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'revision_requested')),
  user_feedback TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create phase payments table
CREATE TABLE public.phase_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase_id UUID NOT NULL REFERENCES public.project_phases(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'due', 'paid', 'overdue')),
  due_date TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phase_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for demos (public read, admin write)
CREATE POLICY "Anyone can view active demos" ON public.demos
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage demos" ON public.demos
  FOR ALL USING (true);

-- RLS Policies for previews
CREATE POLICY "Users can view previews for their projects" ON public.previews
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update previews for their projects" ON public.previews
  FOR UPDATE USING (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all previews" ON public.previews
  FOR ALL USING (true);

-- RLS Policies for phase payments
CREATE POLICY "Users can view payments for their projects" ON public.phase_payments
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all payments" ON public.phase_payments
  FOR ALL USING (true);

-- Enable real-time
ALTER TABLE public.demos REPLICA IDENTITY FULL;
ALTER TABLE public.previews REPLICA IDENTITY FULL;
ALTER TABLE public.phase_payments REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.demos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.previews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.phase_payments;

-- Function to initialize payment when preview is approved
CREATE OR REPLACE FUNCTION public.initialize_phase_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- When preview is approved, create/update payment entry
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    INSERT INTO public.phase_payments (project_id, phase_id, amount, status, due_date)
    SELECT 
      NEW.project_id,
      NEW.phase_id,
      COALESCE(pp.final_agreed_price, pp.admin_proposed_price, 0),
      'due',
      now() + interval '30 days'
    FROM public.project_phases pp
    WHERE pp.id = NEW.phase_id
    ON CONFLICT (phase_id) DO UPDATE SET
      amount = EXCLUDED.amount,
      status = 'due',
      due_date = EXCLUDED.due_date,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for payment initialization
CREATE TRIGGER trigger_initialize_phase_payment
  AFTER UPDATE ON public.previews
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_phase_payment();

-- Add unique constraint to prevent duplicate payments per phase
ALTER TABLE public.phase_payments ADD CONSTRAINT unique_phase_payment UNIQUE (phase_id);
