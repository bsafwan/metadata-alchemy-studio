
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PhasePayment {
  id: string;
  project_id: string;
  phase_id: string;
  amount: number;
  status: string;
  due_date: string | null;
  paid_at: string | null;
  payment_method: string | null;
  transaction_id: string | null;
  created_at: string;
  project_phases: {
    phase_name: string;
    phase_order: number;
  };
}

interface PhasePaymentManagerProps {
  projectId: string;
  isAdminView?: boolean;
}

export default function PhasePaymentManager({ projectId, isAdminView = false }: PhasePaymentManagerProps) {
  const [payments, setPayments] = useState<PhasePayment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
    
    // Real-time subscription
    const channel = supabase
      .channel('phase-payments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'phase_payments',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          fetchPayments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('phase_payments')
        .select(`
          *,
          project_phases(phase_name, phase_order)
        `)
        .eq('project_id', projectId)
        .order('project_phases(phase_order)', { ascending: true });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const markAsPaid = async (paymentId: string) => {
    const paymentMethod = prompt('Payment method (e.g., Credit Card, Bank Transfer):');
    const transactionId = prompt('Transaction ID:');
    
    if (!paymentMethod) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('phase_payments')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          payment_method: paymentMethod,
          transaction_id: transactionId || null
        })
        .eq('id', paymentId);
      
      if (error) throw error;
      toast.success('Payment marked as paid');
    } catch (error) {
      console.error('Error updating payment:', error);
      toast.error('Failed to update payment');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'due': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'due': return <AlertCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const progressPercent = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Phase Payments</h2>
        <Badge variant="outline">
          ${paidAmount.toFixed(0)} / ${totalAmount.toFixed(0)}
        </Badge>
      </div>

      {totalAmount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Payment Progress
            </CardTitle>
            <CardDescription>
              {Math.round(progressPercent)}% of phase payments completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Paid: ${paidAmount.toFixed(0)}</span>
              <span>Remaining: ${(totalAmount - paidAmount).toFixed(0)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {payments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    Phase {payment.project_phases.phase_order}: {payment.project_phases.phase_name}
                  </CardTitle>
                  <CardDescription>
                    Amount: ${payment.amount.toFixed(2)}
                    {payment.due_date && (
                      <span className="ml-2">
                        • Due: {new Date(payment.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(payment.status)} className="gap-1">
                    {getStatusIcon(payment.status)}
                    {payment.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(payment.created_at).toLocaleDateString()}
                  {payment.paid_at && (
                    <span className="ml-2 text-green-600">
                      • Paid: {new Date(payment.paid_at).toLocaleDateString()}
                    </span>
                  )}
                  {payment.payment_method && (
                    <span className="ml-2">
                      • Method: {payment.payment_method}
                    </span>
                  )}
                  {payment.transaction_id && (
                    <span className="ml-2">
                      • TX: {payment.transaction_id}
                    </span>
                  )}
                </div>

                {isAdminView && payment.status !== 'paid' && (
                  <Button
                    size="sm"
                    onClick={() => markAsPaid(payment.id)}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="w-4 h-4 mr-1" />
                    Mark Paid
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {payments.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No phase payments yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Payments are created when previews are approved
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
