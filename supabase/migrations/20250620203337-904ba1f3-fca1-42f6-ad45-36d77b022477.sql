
-- Add project progression tracking
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS progression_percentage INTEGER DEFAULT 0 CHECK (progression_percentage >= 0 AND progression_percentage <= 100),
ADD COLUMN IF NOT EXISTS total_project_amount NUMERIC DEFAULT 0;

-- Update phase_payments to support automatic initialization
ALTER TABLE public.phase_payments
ADD COLUMN IF NOT EXISTS is_automatic BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS payment_date DATE,
ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP WITH TIME ZONE;

-- Create function to automatically create 50% payment when progression reaches 50%
CREATE OR REPLACE FUNCTION check_progression_payment()
RETURNS TRIGGER AS $$
BEGIN
    -- If progression reaches 50% and no automatic payment exists yet
    IF NEW.progression_percentage >= 50 AND (OLD.progression_percentage IS NULL OR OLD.progression_percentage < 50) THEN
        -- Check if automatic payment already exists
        IF NOT EXISTS (
            SELECT 1 FROM phase_payments 
            WHERE project_id = NEW.id AND is_automatic = true
        ) THEN
            -- Create automatic 50% payment
            INSERT INTO phase_payments (
                project_id, 
                amount, 
                status, 
                due_date, 
                is_automatic,
                phase_id
            ) VALUES (
                NEW.id,
                (NEW.total_project_amount * 0.5),
                'due',
                NOW() + INTERVAL '30 days',
                true,
                (SELECT id FROM project_phases WHERE project_id = NEW.id LIMIT 1)
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic payment creation
DROP TRIGGER IF EXISTS progression_payment_trigger ON projects;
CREATE TRIGGER progression_payment_trigger
    AFTER UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION check_progression_payment();
