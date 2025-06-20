
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import SimplePaymentSubmissionModal from './SimplePaymentSubmissionModal';
import { generateProfessionalInvoice } from '@/utils/professionalInvoiceGenerator';

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

interface ProjectPaymentManagerProps {
  projectId: string;
  isAdminView?: boolean;
}

export default function ProjectPaymentManager({ projectId, isAdminView = false }: ProjectPaymentManagerProps) {
  const [payments, setPayments] = useState<ProjectPayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submissionModal, setSubmissionModal] = useState<{open: boolean, payment: ProjectPayment | null}>({open: false, payment: null});
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    fetchPayments();
    fetchProjectData();
    
    // Real-time subscription for payments
    const paymentsChannel = supabase
      .channel('project-payments-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_payments',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          console.log('Payment update detected, refreshing...');
          fetchPayments();
        }
      )
      .subscribe();

    // Real-time subscription for project updates (to detect progression changes)
    const projectChannel = supabase
      .channel('project-progression-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`
        },
        (payload) => {
          console.log('Project update detected:', payload);
          // Refresh payments when project progression changes
          setTimeout(() => {
            fetchPayments();
            fetchProjectData();
          }, 1000); // Small delay to ensure trigger has executed
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentsChannel);
      supabase.removeChannel(projectChannel);
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

  const fetchProjectData = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name, business_category)
        `)
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setProjectData(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const downloadInvoice = (payment: ProjectPayment) => {
    if (!projectData) return;

    const invoiceData = {
      reference_number: payment.reference_number || 'N/A',
      amount: payment.amount,
      project_name: projectData.project_name,
      client_name: `${projectData.users.first_name} ${projectData.users.last_name}`,
      client_email: projectData.users.email,
      client_business: projectData.users.business_name,
      client_industry: projectData.users.business_category,
      due_date: payment.due_date ? new Date(payment.due_date).toLocaleDateString() : 'Upon receipt',
      created_date: new Date(payment.created_at).toLocaleDateString()
    };

    const pdfDataUri = generateProfessionalInvoice(invoiceData);
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = `Invoice-${payment.reference_number}.pdf`;
    link.click();
  };

  const approvePayment = async (paymentId: string) => {
    setLoading(true);
    try {
      // Update payment status
      const { error } = await supabase
        .from('project_payments')
        .update({ 
          status: 'paid',
          paid_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;

      // Get payment and project details for confirmation email
      const { data: paymentData, error: fetchError } = await supabase
        .from('project_payments')
        .select(`
          reference_number,
          amount,
          transaction_id,
          projects!inner(
            project_name,
            users!inner(first_name, last_name, email)
          )
        `)
        .eq('id', paymentId)
        .single();

      if (fetchError) {
        console.error('Error fetching payment data for confirmation:', fetchError);
      } else {
        // Send payment confirmation email to client
        const { PaymentEmailService } = await import('@/utils/paymentEmailService');
        await PaymentEmailService.sendPaymentConfirmation({
          client_email: paymentData.projects.users.email,
          client_name: `${paymentData.projects.users.first_name} ${paymentData.projects.users.last_name}`,
          project_name: paymentData.projects.project_name,
          amount: paymentData.amount,
          reference_number: paymentData.reference_number
        });
      }

      toast.success('Payment approved and confirmation sent to client');
      fetchPayments();
    } catch (error) {
      console.error('Error approving payment:', error);
      toast.error('Failed to approve payment');
    } finally {
      setLoading(false);
    }
  };

  const requestResubmission = async (paymentId: string) => {
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
        .eq('id', paymentId);

      if (error) throw error;
      toast.success('Payment marked for resubmission');
      fetchPayments();
    } catch (error) {
      console.error('Error requesting resubmission:', error);
      toast.error('Failed to request resubmission');
    } finally {
      setLoading(false);
    }
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
                    {payment.is_automatic && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Auto-generated
                      </Badge>
                    )}
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
                    <>
                      <Button
                        size="sm"
                        onClick={() => approvePayment(payment.id)}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => requestResubmission(payment.id)}
                        disabled={loading}
                      >
                        Request Resubmission
                      </Button>
                    </>
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
        <SimplePaymentSubmissionModal
          isOpen={submissionModal.open}
          onClose={() => setSubmissionModal({open: false, payment: null})}
          paymentId={submissionModal.payment.id}
          referenceNumber={submissionModal.payment.reference_number || 'N/A'}
          amount={submissionModal.payment.amount}
          onSubmissionComplete={fetchPayments}
        />
      )}
    </div>
  );
}
