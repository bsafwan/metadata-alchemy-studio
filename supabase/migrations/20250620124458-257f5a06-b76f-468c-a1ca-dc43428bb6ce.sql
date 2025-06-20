
-- Create table for project phases
CREATE TABLE public.project_phases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  phase_name TEXT NOT NULL,
  admin_proposed_price DECIMAL(10,2),
  user_proposed_price DECIMAL(10,2),
  final_agreed_price DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'negotiating', 'agreed', 'rejected')),
  phase_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for project plans (overview details)
CREATE TABLE public.project_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  plan_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for pricing negotiations
CREATE TABLE public.pricing_negotiations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_id UUID NOT NULL REFERENCES public.project_phases(id) ON DELETE CASCADE,
  proposed_by TEXT NOT NULL CHECK (proposed_by IN ('admin', 'user')),
  proposed_price DECIMAL(10,2) NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_negotiations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_phases
CREATE POLICY "Users can view phases for their projects" ON public.project_phases
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all phases" ON public.project_phases
  FOR ALL USING (true);

-- RLS Policies for project_plans  
CREATE POLICY "Users can view plans for their projects" ON public.project_plans
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all plans" ON public.project_plans
  FOR ALL USING (true);

-- RLS Policies for pricing_negotiations
CREATE POLICY "Users can view negotiations for their project phases" ON public.pricing_negotiations
  FOR SELECT USING (
    phase_id IN (
      SELECT pp.id FROM public.project_phases pp
      JOIN public.projects p ON pp.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create negotiations for their project phases" ON public.pricing_negotiations
  FOR INSERT WITH CHECK (
    phase_id IN (
      SELECT pp.id FROM public.project_phases pp
      JOIN public.projects p ON pp.project_id = p.id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all negotiations" ON public.pricing_negotiations
  FOR ALL USING (true);
