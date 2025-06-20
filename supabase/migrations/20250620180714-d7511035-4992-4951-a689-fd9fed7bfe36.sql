
-- Add new columns to phase_payments table for enhanced payment tracking
ALTER TABLE public.phase_payments 
ADD COLUMN IF NOT EXISTS reference_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS payment_instructions_sent_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS payoneer_link TEXT,
ADD COLUMN IF NOT EXISTS transaction_id TEXT,
ADD COLUMN IF NOT EXISTS user_bank_details TEXT,
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS payment_channel TEXT DEFAULT 'bank_transfer',
ADD COLUMN IF NOT EXISTS invoice_pdf_path TEXT;

-- Create function to generate unique reference numbers
CREATE OR REPLACE FUNCTION generate_payment_reference()
RETURNS TEXT AS $$
DECLARE
    ref_number TEXT;
    exists_check INTEGER;
BEGIN
    LOOP
        ref_number := 'ELI-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 999999 + 1)::TEXT, 6, '0');
        
        SELECT COUNT(*) INTO exists_check 
        FROM phase_payments 
        WHERE reference_number = ref_number;
        
        EXIT WHEN exists_check = 0;
    END LOOP;
    
    RETURN ref_number;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-generate reference numbers
CREATE OR REPLACE FUNCTION set_payment_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.reference_number IS NULL THEN
        NEW.reference_number := generate_payment_reference();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS payment_reference_trigger ON phase_payments;
CREATE TRIGGER payment_reference_trigger
    BEFORE INSERT ON phase_payments
    FOR EACH ROW
    EXECUTE FUNCTION set_payment_reference();

-- Update existing payments to have reference numbers
UPDATE phase_payments 
SET reference_number = generate_payment_reference() 
WHERE reference_number IS NULL;
