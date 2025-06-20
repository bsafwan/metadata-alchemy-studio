
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminPaymentVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: any;
  onPaymentUpdate: () => void;
}

export default function AdminPaymentVerificationModal({
  isOpen,
  onClose,
  payment,
  onPaymentUpdate
}: AdminPaymentVerificationModalProps) {
  const [loading, setLoading] = useState(false);

  const approvePayment = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('project_payments')
        .update({ 
          status: 'paid',
          paid_at: new Date().toISOString()
        })
        .eq('id', payment.id);

      if (error) throw error;
      toast.success('Payment approved successfully');
      onPaymentUpdate();
      onClose();
    } catch (error) {
      console.error('Error approving payment:', error);
      toast.error('Failed to approve payment');
    } finally {
      setLoading(false);
    }
  };

  const requestResubmission = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('project_payments')
        .update({ 
          status: 'due',
          submitted_at: null,
          payment_date: null,
          transaction_id: null
        })
        .eq('id', payment.id);

      if (error) throw error;
      toast.success('Payment marked for resubmission');
      onPaymentUpdate();
      onClose();
    } catch (error) {
      console.error('Error requesting resubmission:', error);
      toast.error('Failed to request resubmission');
    } finally {
      setLoading(false);
    }
  };

  if (!payment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Payment Verification</DialogTitle>
        </DialogHeader>
        
        <Card className="mb-4">
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>${payment.amount?.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                {payment.status}
              </Badge>
            </div>

            {payment.payment_date && (
              <div className="flex justify-between">
                <span className="font-medium">Payment Date:</span>
                <span>{payment.payment_date}</span>
              </div>
            )}

            {payment.transaction_id && (
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span className="font-mono text-sm">{payment.transaction_id}</span>
              </div>
            )}

            {payment.reference_number && (
              <div className="flex justify-between">
                <span className="font-medium">Reference:</span>
                <span className="font-mono text-sm">{payment.reference_number}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {payment.user_bank_details && (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <h4 className="font-medium mb-2">Payment Details:</h4>
              <p className="text-sm text-muted-foreground">{payment.user_bank_details}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          
          {payment.status === 'submitted' && (
            <>
              <Button
                onClick={requestResubmission}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Request Resubmission
              </Button>
              
              <Button
                onClick={approvePayment}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
