import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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
  const [paymentChannel, setPaymentChannel] = useState('bank_transfer');
  const [bankDetails, setBankDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      toast.error('Please enter a transaction ID');
      return;
    }

    setLoading(true);
    try {
      // Update payment with submission details
      const { error } = await supabase
        .from('project_payments')
        .update({
          status: 'submitted',
          transaction_id: transactionId.trim(),
          payment_date: paymentDate,
          payment_channel: paymentChannel,
          user_bank_details: bankDetails.trim() || null,
          submitted_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;

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
        const adminEmails = ['contact@elismet.com']; // You can make this configurable
        
        const { PaymentEmailService } = await import('@/utils/paymentEmailService');
        await PaymentEmailService.sendPaymentSubmissionNotification(adminEmails, {
          reference_number: paymentData.reference_number,
          project_name: paymentData.projects.project_name,
          amount: paymentData.amount,
          transaction_id: transactionId.trim(),
          payment_channel: paymentChannel,
          client_name: `${paymentData.projects.users.first_name} ${paymentData.projects.users.last_name}`,
          bank_details: bankDetails.trim() || undefined,
          payment_date: paymentDate
        });
      }

      toast.success('Payment submission recorded successfully!');
      onSubmissionComplete();
      onClose();
      
      // Reset form
      setTransactionId('');
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setPaymentChannel('bank_transfer');
      setBankDetails('');
    } catch (error) {
      console.error('Error submitting payment:', error);
      toast.error('Failed to submit payment details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
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
              />
            </div>
          </div>

          <div>
            <Label htmlFor="transactionId">Transaction ID</Label>
            <Input
              type="text"
              id="transactionId"
              placeholder="Enter transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="paymentDate">Payment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="bottom">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date()
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="paymentChannel">Payment Channel</Label>
            <select
              id="paymentChannel"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
              value={paymentChannel}
              onChange={(e) => setPaymentChannel(e.target.value)}
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <div>
            <Label htmlFor="bankDetails">Bank Details (Optional)</Label>
            <Input
              type="text"
              id="bankDetails"
              placeholder="Enter bank details"
              value={bankDetails}
              onChange={(e) => setBankDetails(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Payment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
