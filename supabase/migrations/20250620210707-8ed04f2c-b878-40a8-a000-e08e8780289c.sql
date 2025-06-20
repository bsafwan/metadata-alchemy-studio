
-- Drop the constraint first, then the index
ALTER TABLE public.phase_payments DROP CONSTRAINT IF EXISTS unique_phase_payment;
DROP INDEX IF EXISTS unique_phase_payment;

-- Remove phase-based columns and add progression-based structure
ALTER TABLE public.phase_payments 
DROP CONSTRAINT IF EXISTS phase_payments_phase_id_fkey,
DROP COLUMN IF EXISTS phase_id;

-- Rename table to be more appropriate
ALTER TABLE public.phase_payments RENAME TO project_payments;

-- Add unique constraint for project-based automatic payments only
CREATE UNIQUE INDEX unique_automatic_payment ON project_payments(project_id) WHERE is_automatic = true;

-- Update the trigger function to be simpler
CREATE OR REPLACE FUNCTION check_progression_payment()
RETURNS TRIGGER AS $$
BEGIN
    -- If progression reaches 50% and no automatic payment exists yet
    IF NEW.progression_percentage >= 50 AND (OLD.progression_percentage IS NULL OR OLD.progression_percentage < 50) THEN
        -- Check if automatic payment already exists
        IF NOT EXISTS (
            SELECT 1 FROM project_payments 
            WHERE project_id = NEW.id AND is_automatic = true
        ) THEN
            -- Create automatic 50% payment
            INSERT INTO project_payments (
                project_id, 
                amount, 
                status, 
                due_date, 
                is_automatic
            ) VALUES (
                NEW.id,
                (NEW.total_project_amount * 0.5),
                'due',
                NOW() + INTERVAL '30 days',
                true
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
