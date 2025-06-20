
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useZohoMail } from '@/hooks/useZohoMail';

interface PaymentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  paymentData: {
    reference_number: string;
    amount: number;
    phase_name: string;
    project_name: string;
  };
  onSubmissionComplete: () => void;
}

export default function PaymentSubmissionModal({ 
  isOpen, 
  onClose, 
  paymentId, 
  paymentData, 
  onSubmissionComplete 
}: PaymentSubmissionModalProps) {
  const [transactionId, setTransactionId] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [paymentChannel, setPaymentChannel] = useState('bank_transfer');
  const [loading, setLoading] = useState(false);
  const { sendEmail } = useZohoMail();

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error('Please enter transaction ID');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('phase_payments')
        .update({
          status: 'submitted',
          transaction_id: transactionId.trim(),
          user_bank_details: bankDetails.trim(),
          payment_channel: paymentChannel,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;

      // Send notification to admin
      await sendEmail({
        to: ['bsafwanjamil677@gmail.com'],
        subject: `Payment Submitted - ${paymentData.reference_number}`,
        html: `
          <h2>Payment Submission Notification</h2>
          <p>A client has submitted payment details for verification:</p>
          <ul>
            <li><strong>Reference:</strong> ${paymentData.reference_number}</li>
            <li><strong>Project:</strong> ${paymentData.project_name}</li>
            <li><strong>Phase:</strong> ${paymentData.phase_name}</li>
            <li><strong>Amount:</strong> $${paymentData.amount.toFixed(2)}</li>
            <li><strong>Transaction ID:</strong> ${transactionId}</li>
            <li><strong>Payment Channel:</strong> ${paymentChannel}</li>
            ${bankDetails ? `<li><strong>Bank Details:</strong> ${bankDetails}</li>` : ''}
          </ul>
          <p>Please verify this payment in the admin panel.</p>
        `
      });

      toast.success('Payment submission recorded successfully');
      onSubmissionComplete();
      onClose();
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Failed to submit payment details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Payment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="transactionId">Transaction ID *</Label>
            <Input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter your transaction ID"
            />
          </div>

          <div>
            <Label htmlFor="paymentChannel">Payment Method</Label>
            <Select value={paymentChannel} onValueChange={setPaymentChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="ach">ACH Transfer</SelectItem>
                <SelectItem value="wire">Wire Transfer</SelectItem>
                <SelectItem value="payoneer">Payoneer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="bankDetails">Bank Account Details (Optional)</Label>
            <Textarea
              id="bankDetails"
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
              placeholder="Enter your bank account details used for the payment"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
