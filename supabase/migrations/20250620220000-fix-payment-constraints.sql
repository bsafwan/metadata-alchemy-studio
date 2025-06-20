
-- Fix the old check constraint that's causing violations
-- The table was renamed from phase_payments to project_payments but the constraint wasn't updated

-- Drop the old constraint if it exists
ALTER TABLE public.project_payments DROP CONSTRAINT IF EXISTS phase_payments_status_check;

-- Add the correct constraint for the renamed table
ALTER TABLE public.project_payments DROP CONSTRAINT IF EXISTS project_payments_status_check;
ALTER TABLE public.project_payments ADD CONSTRAINT project_payments_status_check 
CHECK (status IN ('due', 'submitted', 'paid', 'pending', 'overdue', 'cancelled'));

-- Ensure the reference number generation function works properly
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

-- Ensure the trigger works properly
DROP TRIGGER IF EXISTS set_payment_reference_trigger ON project_payments;
CREATE TRIGGER set_payment_reference_trigger
    BEFORE INSERT ON project_payments
    FOR EACH ROW
    EXECUTE FUNCTION set_payment_reference();
