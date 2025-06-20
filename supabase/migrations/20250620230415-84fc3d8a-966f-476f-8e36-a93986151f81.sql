
-- Create delivery items table to store all deliverable components
CREATE TABLE public.delivery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN (
        'github_repo', 'supabase_admin', 'vps_access', 'domain_setup',
        'management_docs', 'api_keys_setup', 'management_video', 'integration_video'
    )),
    title TEXT NOT NULL,
    description TEXT,
    content JSONB DEFAULT '{}',
    files JSONB DEFAULT '[]',
    links JSONB DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'delivered')),
    requires_full_payment BOOLEAN NOT NULL DEFAULT true,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create API keys management table
CREATE TABLE public.project_api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    key_name TEXT NOT NULL,
    key_description TEXT,
    key_value TEXT, -- encrypted or actual key
    key_type TEXT NOT NULL CHECK (key_type IN ('production', 'testing', 'sample')),
    service_name TEXT NOT NULL, -- e.g., 'stripe', 'openai', 'sendgrid'
    is_required BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'provided', 'configured')),
    provided_by TEXT CHECK (provided_by IN ('client', 'admin')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery tracking table
CREATE TABLE public.project_deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    delivery_status TEXT NOT NULL DEFAULT 'preparing' CHECK (delivery_status IN (
        'preparing', 'ready_for_review', 'delivered', 'approved', 'completed'
    )),
    initiated_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    client_approval_notes TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_delivery_items_project_id ON public.delivery_items(project_id);
CREATE INDEX idx_delivery_items_status ON public.delivery_items(status);
CREATE INDEX idx_api_keys_project_id ON public.project_api_keys(project_id);
CREATE INDEX idx_deliveries_project_id ON public.project_deliveries(project_id);

-- Function to initialize delivery when project reaches 100%
CREATE OR REPLACE FUNCTION public.check_delivery_initialization()
RETURNS TRIGGER AS $$
BEGIN
    -- If progression reaches 100% and all payments are completed
    IF NEW.progression_percentage >= 100 AND (OLD.progression_percentage IS NULL OR OLD.progression_percentage < 100) THEN
        -- Check if all payments are paid
        IF NOT EXISTS (
            SELECT 1 FROM project_payments 
            WHERE project_id = NEW.id AND status != 'paid'
        ) THEN
            -- Initialize delivery if not already exists
            INSERT INTO project_deliveries (project_id, delivery_status, initiated_at)
            SELECT NEW.id, 'ready_for_review', NOW()
            WHERE NOT EXISTS (
                SELECT 1 FROM project_deliveries WHERE project_id = NEW.id
            );
            
            -- Create remaining payment (final 50%) if total amount is set
            IF NEW.total_project_amount > 0 AND NOT EXISTS (
                SELECT 1 FROM project_payments 
                WHERE project_id = NEW.id AND is_automatic = false
            ) THEN
                INSERT INTO project_payments (
                    project_id, 
                    amount, 
                    status, 
                    due_date, 
                    is_automatic
                ) VALUES (
                    NEW.id,
                    (NEW.total_project_amount * 0.5), -- remaining 50%
                    'due',
                    NOW() + INTERVAL '30 days',
                    false
                );
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for delivery initialization
DROP TRIGGER IF EXISTS delivery_initialization_trigger ON projects;
CREATE TRIGGER delivery_initialization_trigger
    AFTER UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION check_delivery_initialization();

-- Function to initialize default delivery items for a project
CREATE OR REPLACE FUNCTION public.initialize_default_delivery_items(p_project_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Insert default delivery items
    INSERT INTO delivery_items (project_id, item_type, title, description, requires_full_payment) VALUES
    (p_project_id, 'github_repo', 'GitHub Repository Access', 'Complete source code repository with full access rights', true),
    (p_project_id, 'supabase_admin', 'Supabase Administration', 'Database administration access and documentation', true),
    (p_project_id, 'vps_access', 'VPS Server Access', 'Server credentials and access documentation', true),
    (p_project_id, 'domain_setup', 'Domain Configuration', 'Complete domain setup and DNS configuration', true),
    (p_project_id, 'management_docs', 'Management Documentation', 'Comprehensive project management and maintenance docs', false),
    (p_project_id, 'api_keys_setup', 'API Keys Configuration', 'All third-party API keys setup and configuration', true),
    (p_project_id, 'management_video', 'Management Tutorial Video', 'Loom video explaining project management', true),
    (p_project_id, 'integration_video', 'Integration Tutorial Video', 'Loom video covering basic integrations', true);
END;
$$ LANGUAGE plpgsql;

-- Enable RLS on all new tables
ALTER TABLE public.delivery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_deliveries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic policies, can be refined later)
CREATE POLICY "Users can view their project delivery items" ON public.delivery_items
    FOR SELECT USING (
        project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view their project api keys" ON public.project_api_keys
    FOR SELECT USING (
        project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view their project deliveries" ON public.project_deliveries
    FOR SELECT USING (
        project_id IN (SELECT id FROM projects WHERE user_id = auth.uid())
    );
