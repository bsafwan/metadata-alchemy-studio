
-- First, drop the old trigger and function if they exist
DROP TRIGGER IF EXISTS progression_payment_trigger ON projects;
DROP FUNCTION IF EXISTS check_progression_payment();

-- Create the corrected function that uses project_payments table
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
                is_automatic,
                reference_number
            ) VALUES (
                NEW.id,
                (NEW.total_project_amount * 0.5),
                'due',
                NOW() + INTERVAL '30 days',
                true,
                generate_payment_reference()
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on projects table
CREATE TRIGGER progression_payment_trigger
    AFTER UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION check_progression_payment();

-- Update the payment reference generation function to work with project_payments
CREATE OR REPLACE FUNCTION public.generate_payment_reference()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    ref_number TEXT;
    exists_check INTEGER;
BEGIN
    LOOP
        ref_number := 'ELI-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 999999 + 1)::TEXT, 6, '0');
        
        SELECT COUNT(*) INTO exists_check 
        FROM project_payments 
        WHERE reference_number = ref_number;
        
        EXIT WHEN exists_check = 0;
    END LOOP;
    
    RETURN ref_number;
END;
$$;

-- Create trigger to set reference number on project_payments
CREATE OR REPLACE FUNCTION set_payment_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reference_number IS NULL THEN
        NEW.reference_number := generate_payment_reference();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_payment_reference_trigger ON project_payments;
CREATE TRIGGER set_payment_reference_trigger
    BEFORE INSERT ON project_payments
    FOR EACH ROW
    EXECUTE FUNCTION set_payment_reference();
