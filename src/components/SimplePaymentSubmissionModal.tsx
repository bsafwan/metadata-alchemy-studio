
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface SimplePaymentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  referenceNumber: string;
  amount: number;
  onSubmissionComplete: () => void;
}

export default function SimplePaymentSubmissionModal({ 
  isOpen, 
  onClose, 
  paymentId, 
  referenceNumber, 
  amount,
  onSubmissionComplete 
}: SimplePaymentSubmissionModalProps) {
  const [transactionId, setTransactionId] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      toast.error('Please enter a transaction ID');
      return;
    }

    if (!paymentDate) {
      toast.error('Please select a payment date');
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting payment with data:', {
        paymentId,
        transactionId: transactionId.trim(),
        paymentDate,
        status: 'submitted'
      });

      // Update payment with submission details
      const { error } = await supabase
        .from('project_payments')
        .update({
          status: 'submitted',
          transaction_id: transactionId.trim(),
          payment_date: paymentDate,
          payment_channel: 'bank_transfer',
          submitted_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Payment updated successfully');

      // Get project and user details for admin notification
      const { data: paymentData, error: fetchError } = await supabase
        .from('project_payments')
        .select(`
          reference_number,
          amount,
          project_id,
          projects!inner(
            project_name,
            users!inner(first_name, last_name, email)
          )
        `)
        .eq('id', paymentId)
        .single();

      if (fetchError) {
        console.error('Error fetching payment data for notification:', fetchError);
      } else {
        // Send admin notification email
        const adminEmails = ['contact@elismet.com'];
        
        try {
          const { PaymentEmailService } = await import('@/utils/paymentEmailService');
          await PaymentEmailService.sendPaymentSubmissionNotification(adminEmails, {
            reference_number: paymentData.reference_number,
            project_name: paymentData.projects.project_name,
            amount: paymentData.amount,
            transaction_id: transactionId.trim(),
            payment_channel: 'bank_transfer',
            client_name: `${paymentData.projects.users.first_name} ${paymentData.projects.users.last_name}`,
            payment_date: paymentDate
          });
          console.log('Admin notification sent successfully');
        } catch (emailError) {
          console.error('Failed to send admin notification:', emailError);
          // Don't fail the whole process if email fails
        }
      }

      toast.success('Payment submission recorded successfully!');
      onSubmissionComplete();
      onClose();
      
      // Reset form
      setTransactionId('');
      setPaymentDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Failed to submit payment details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit Payment Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input 
                type="text" 
                id="referenceNumber" 
                value={referenceNumber} 
                readOnly 
                disabled
                className="bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input 
                type="text" 
                id="amount" 
                value={`$${amount.toFixed(2)}`} 
                readOnly 
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="transactionId">Transaction ID *</Label>
            <Input
              type="text"
              id="transactionId"
              placeholder="Enter your bank transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This is the transaction ID from your bank transfer
            </p>
          </div>

          <div>
            <Label htmlFor="paymentDate">Payment Date *</Label>
            <Input
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Payment Method</h4>
            <p className="text-sm text-blue-700">
              <strong>Bank Transfer Only</strong><br />
              All payments must be made via ACH or FDWIRE from your registered business account.
            </p>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
