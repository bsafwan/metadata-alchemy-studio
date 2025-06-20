
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Download, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PaymentSubmissionModal from './PaymentSubmissionModal';
import AdminPaymentVerificationModal from './AdminPaymentVerificationModal';

interface ProjectPayment {
  id: string;
  project_id: string;
  amount: number;
  status: string;
  due_date: string | null;
  submitted_at: string | null;
  payment_date: string | null;
  transaction_id: string | null;
  reference_number: string | null;
  is_automatic: boolean | null;
  created_at: string;
}

interface PhasePaymentManagerProps {
  projectId: string;
  isAdminView?: boolean;
}

export default function PhasePaymentManager({ projectId, isAdminView = false }: PhasePaymentManagerProps) {
  const [payments, setPayments] = useState<ProjectPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submissionModal, setSubmissionModal] = useState<{open: boolean, payment: ProjectPayment | null}>({open: false, payment: null});
  const [verificationModal, setVerificationModal] = useState<{open: boolean, payment: ProjectPayment | null}>({open: false, payment: null});

  useEffect(() => {
    fetchPayments();
    
    // Real-time subscription
    const channel = supabase
      .channel('project-payments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_payments',
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
        .from('project_payments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const downloadInvoice = (payment: ProjectPayment) => {
    // This would generate and download an invoice
    toast.info('Invoice download functionality will be implemented');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'submitted': return 'secondary';
      case 'due': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'due': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0);
  const progressPercent = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Payments</h2>
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
              {Math.round(progressPercent)}% of payments completed
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
                    50% Milestone Payment
                  </CardTitle>
                  <CardDescription>
                    Amount: ${payment.amount.toFixed(2)}
                    {payment.reference_number && (
                      <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                        Ref: {payment.reference_number}
                      </span>
                    )}
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
              <div className="space-y-3">
                {payment.submitted_at && (
                  <div className="text-sm text-muted-foreground">
                    Submitted: {new Date(payment.submitted_at).toLocaleDateString()}
                    {payment.payment_date && (
                      <span className="ml-2">• Payment Date: {payment.payment_date}</span>
                    )}
                    {payment.transaction_id && (
                      <span className="ml-2">• TX: {payment.transaction_id}</span>
                    )}
                  </div>
                )}

                <div className="flex gap-2 border-t pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadInvoice(payment)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download Invoice
                  </Button>

                  {!isAdminView && payment.status === 'due' && (
                    <Button
                      size="sm"
                      onClick={() => setSubmissionModal({open: true, payment})}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Submit Payment
                    </Button>
                  )}

                  {isAdminView && payment.status === 'submitted' && (
                    <Button
                      size="sm"
                      onClick={() => setVerificationModal({open: true, payment})}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review Payment
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {payments.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No payments yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Payments are created automatically when project reaches 50% progression
            </p>
          </CardContent>
        </Card>
      )}

      {submissionModal.open && submissionModal.payment && (
        <PaymentSubmissionModal
          isOpen={submissionModal.open}
          onClose={() => setSubmissionModal({open: false, payment: null})}
          payment={submissionModal.payment}
          onSubmissionComplete={fetchPayments}
        />
      )}

      {verificationModal.open && verificationModal.payment && (
        <AdminPaymentVerificationModal
          isOpen={verificationModal.open}
          onClose={() => setVerificationModal({open: false, payment: null})}
          payment={verificationModal.payment}
          onPaymentUpdate={fetchPayments}
        />
      )}
    </div>
  );
}
