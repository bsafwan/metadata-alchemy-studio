
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [formData, setFormData] = useState({
    payment_date: '',
    amount_paid: amount.toString(),
    transaction_id: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.payment_date || !formData.amount_paid || !formData.transaction_id) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('project_payments')
        .update({
          payment_date: formData.payment_date,
          transaction_id: formData.transaction_id,
          status: 'submitted',
          submitted_at: new Date().toISOString(),
          user_bank_details: `Amount: $${formData.amount_paid}, Transaction ID: ${formData.transaction_id}, Date: ${formData.payment_date}`
        })
        .eq('id', paymentId);

      if (error) throw error;

      toast.success('Payment submission completed! Awaiting admin approval.');
      onSubmissionComplete();
      onClose();
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Failed to submit payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Payment Confirmation</DialogTitle>
        </DialogHeader>
        
        <Card className="mb-4">
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Reference Number</p>
              <p className="font-mono font-bold text-lg text-orange-600">{referenceNumber}</p>
              <p className="text-sm text-muted-foreground mt-2">Expected Amount: ${amount.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="payment_date">Date of Payment</Label>
            <Input
              id="payment_date"
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData(prev => ({ ...prev, payment_date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="amount_paid">Amount Paid</Label>
            <Input
              id="amount_paid"
              type="number"
              step="0.01"
              value={formData.amount_paid}
              onChange={(e) => setFormData(prev => ({ ...prev, amount_paid: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="transaction_id">Transaction ID</Label>
            <Input
              id="transaction_id"
              type="text"
              placeholder="Enter your transaction ID"
              value={formData.transaction_id}
              onChange={(e) => setFormData(prev => ({ ...prev, transaction_id: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
