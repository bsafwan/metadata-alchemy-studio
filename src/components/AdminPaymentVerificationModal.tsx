
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

interface AdminPaymentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  paymentData: {
    reference_number: string;
    amount: number;
    phase_name: string;
    project_name: string;
    client_email: string;
    client_name: string;
    transaction_id?: string;
    payment_channel?: string;
  };
  onVerificationComplete: () => void;
}

export default function AdminPaymentVerificationModal({ 
  isOpen, 
  onClose, 
  paymentId, 
  paymentData, 
  onVerificationComplete 
}: AdminPaymentVerificationModalProps) {
  const [transactionId, setTransactionId] = useState(paymentData.transaction_id || '');
  const [paymentChannel, setPaymentChannel] = useState(paymentData.payment_channel || 'bank_transfer');
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendEmail } = useZohoMail();

  const handleMarkAsPaid = async () => {
    if (!transactionId.trim()) {
      toast.error('Please enter transaction ID');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('phase_payments')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          transaction_id: transactionId.trim(),
          payment_channel: paymentChannel,
          admin_notes: adminNotes.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;

      // Send confirmation to client
      await sendEmail({
        to: [paymentData.client_email],
        subject: `Payment Confirmed - ${paymentData.reference_number}`,
        html: `
          <h2>Payment Confirmation</h2>
          <p>Dear ${paymentData.client_name},</p>
          <p>We're pleased to confirm that your payment has been received and verified:</p>
          <ul>
            <li><strong>Reference:</strong> ${paymentData.reference_number}</li>
            <li><strong>Project:</strong> ${paymentData.project_name}</li>
            <li><strong>Phase:</strong> ${paymentData.phase_name}</li>
            <li><strong>Amount:</strong> $${paymentData.amount.toFixed(2)}</li>
            <li><strong>Transaction ID:</strong> ${transactionId}</li>
          </ul>
          ${adminNotes ? `<p><strong>Notes:</strong> ${adminNotes}</p>` : ''}
          <p>Thank you for your payment. Work on your project will continue as scheduled.</p>
          <br>
          <p>Best regards,<br>Elismet Ltd Team</p>
        `
      });

      toast.success('Payment marked as paid and client notified');
      onVerificationComplete();
      onClose();
    } catch (error) {
      console.error('Error marking payment as paid:', error);
      toast.error('Failed to mark payment as paid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Payment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm"><strong>Reference:</strong> {paymentData.reference_number}</p>
            <p className="text-sm"><strong>Amount:</strong> ${paymentData.amount.toFixed(2)}</p>
            <p className="text-sm"><strong>Phase:</strong> {paymentData.phase_name}</p>
          </div>

          <div>
            <Label htmlFor="transactionId">Transaction ID *</Label>
            <Input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
            />
          </div>

          <div>
            <Label htmlFor="paymentChannel">Payment Channel</Label>
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
            <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
            <Textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add any notes about this payment"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleMarkAsPaid} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700">
              {loading ? 'Processing...' : 'Mark as Paid'}
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
