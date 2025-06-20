import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Clock, FileText, Send, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PaymentInvoiceModal from './PaymentInvoiceModal';
import PaymentSubmissionModal from './PaymentSubmissionModal';
import AdminPaymentVerificationModal from './AdminPaymentVerificationModal';
import { useZohoMail } from '@/hooks/useZohoMail';

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
  const [invoiceModal, setInvoiceModal] = useState<{open: boolean, payment: PhasePayment | null}>({open: false, payment: null});
  const [submissionModal, setSubmissionModal] = useState<{open: boolean, payment: PhasePayment | null}>({open: false, payment: null});
  const [verificationModal, setVerificationModal] = useState<{open: boolean, payment: PhasePayment | null}>({open: false, payment: null});
  const [payoneerLink, setPayoneerLink] = useState('');
  const [editingPayoneer, setEditingPayoneer] = useState<string | null>(null);
  const { sendEmail } = useZohoMail();

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

  const sendPaymentInstructions = async (payment: PhasePayment) => {
    setLoading(true);
    try {
      // Get project and user details
      const { data: projectData } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email)
        `)
        .eq('id', projectId)
        .single();

      if (!projectData) throw new Error('Project not found');

      const invoiceData = {
        reference_number: payment.reference_number || 'N/A',
        amount: payment.amount,
        phase_name: payment.project_phases.phase_name,
        project_name: projectData.project_name,
        client_name: `${projectData.users.first_name} ${projectData.users.last_name}`,
        client_email: projectData.users.email,
        due_date: payment.due_date ? new Date(payment.due_date).toLocaleDateString() : 'Upon receipt',
        created_date: new Date(payment.created_at).toLocaleDateString()
      };

      await sendEmail({
        to: [projectData.users.email],
        subject: `Payment Invoice - ${payment.reference_number}`,
        html: `
          <h2>Payment Invoice - ${payment.reference_number}</h2>
          <p>Dear ${invoiceData.client_name},</p>
          <p>Please find below your payment invoice for the completed phase:</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ff8c00;">Invoice Details</h3>
            <p><strong>Reference Number:</strong> ${payment.reference_number}</p>
            <p><strong>Project:</strong> ${projectData.project_name}</p>
            <p><strong>Phase:</strong> ${payment.project_phases.phase_name}</p>
            <p><strong>Amount:</strong> $${payment.amount.toFixed(2)}</p>
            <p><strong>Due Date:</strong> ${invoiceData.due_date}</p>
          </div>

          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2;">Payment Instructions</h3>
            <p><strong>Bank Name:</strong> Citibank</p>
            <p><strong>Bank Address:</strong> 111 Wall Street New York, NY 10043 USA</p>
            <p><strong>Routing (ABA):</strong> 031100209</p>
            <p><strong>SWIFT Code:</strong> CITIUS33</p>
            <p><strong>Account Number:</strong> 70586980001243422</p>
            <p><strong>Beneficiary Name:</strong> MD RABIULLAH</p>
            <p style="background: yellow; padding: 10px; border-radius: 4px; margin-top: 10px;">
              <strong>IMPORTANT: Reference Number - ${payment.reference_number}</strong><br>
              Please include this reference number with your payment
            </p>
          </div>

          ${payment.payoneer_link ? `
          <div style="background: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #7b1fa2;">Alternative Payment Option</h3>
            <p>You can also pay using Payoneer:</p>
            <p><a href="${payment.payoneer_link}" target="_blank" style="background: #ff8c00; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Pay with Payoneer</a></p>
          </div>
          ` : ''}

          <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Important Notes:</h4>
            <ul>
              <li>Only payments from business accounts are supported</li>
              <li>Personal bank account payments will be declined</li>
              <li>Please ensure beneficiary name matches exactly</li>
            </ul>
          </div>

          <p>After making the payment, please log into your dashboard to submit the transaction details for verification.</p>
          
          <p>Best regards,<br>Elismet Ltd Team</p>
        `
      });

      // Update payment instructions sent timestamp
      await supabase
        .from('phase_payments')
        .update({ payment_instructions_sent_at: new Date().toISOString() })
        .eq('id', payment.id);

      toast.success('Payment instructions sent successfully');
      fetchPayments();
    } catch (error) {
      console.error('Error sending payment instructions:', error);
      toast.error('Failed to send payment instructions');
    } finally {
      setLoading(false);
    }
  };

  const updatePayoneerLink = async (paymentId: string, link: string) => {
    try {
      const { error } = await supabase
        .from('phase_payments')
        .update({ payoneer_link: link.trim() || null })
        .eq('id', paymentId);

      if (error) throw error;
      toast.success('Payoneer link updated');
      fetchPayments();
      setEditingPayoneer(null);
    } catch (error) {
      console.error('Error updating Payoneer link:', error);
      toast.error('Failed to update Payoneer link');
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
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(payment.created_at).toLocaleDateString()}
                  {payment.paid_at && (
                    <span className="ml-2 text-green-600">
                      • Paid: {new Date(payment.paid_at).toLocaleDateString()}
                    </span>
                  )}
                  {payment.transaction_id && (
                    <span className="ml-2">
                      • TX: {payment.transaction_id}
                    </span>
                  )}
                  {payment.payment_channel && (
                    <span className="ml-2">
                      • Method: {payment.payment_channel}
                    </span>
                  )}
                </div>

                {isAdminView && (
                  <div className="space-y-3 border-t pt-3">
                    <div className="flex items-center gap-2">
                      {editingPayoneer === payment.id ? (
                        <>
                          <Input
                            value={payoneerLink}
                            onChange={(e) => setPayoneerLink(e.target.value)}
                            placeholder="Enter Payoneer payment link"
                            className="flex-1"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => updatePayoneerLink(payment.id, payoneerLink)}
                          >
                            Save
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditingPayoneer(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          {payment.payoneer_link ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Payoneer:</span>
                              <a 
                                href={payment.payoneer_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {payment.payoneer_link.substring(0, 50)}...
                                <ExternalLink className="w-3 h-3 inline ml-1" />
                              </a>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setPayoneerLink(payment.payoneer_link || '');
                                  setEditingPayoneer(payment.id);
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setPayoneerLink('');
                                setEditingPayoneer(payment.id);
                              }}
                            >
                              Add Payoneer Link
                            </Button>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => sendPaymentInstructions(payment)}
                        disabled={loading}
                        variant="outline"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send Instructions
                      </Button>
                      
                      {payment.status !== 'paid' && (
                        <Button
                          size="sm"
                          onClick={() => setVerificationModal({open: true, payment})}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CreditCard className="w-4 h-4 mr-1" />
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {!isAdminView && (
                  <div className="flex gap-2 border-t pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setInvoiceModal({open: true, payment})}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      View Invoice
                    </Button>
                    
                    {payment.payoneer_link && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(payment.payoneer_link, '_blank')}
                        className="bg-purple-50 border-purple-200 text-purple-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Pay with Payoneer
                      </Button>
                    )}

                    {payment.status === 'due' && (
                      <Button
                        size="sm"
                        onClick={() => setSubmissionModal({open: true, payment})}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark as Completed
                      </Button>
                    )}
                  </div>
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

      {invoiceModal.open && invoiceModal.payment && (
        <PaymentInvoiceModal
          isOpen={invoiceModal.open}
          onClose={() => setInvoiceModal({open: false, payment: null})}
          paymentData={{
            reference_number: invoiceModal.payment.reference_number || 'N/A',
            amount: invoiceModal.payment.amount,
            phase_name: invoiceModal.payment.project_phases.phase_name,
            project_name: 'Project', // Would need to fetch this
            client_name: 'Client', // Would need to fetch this
            client_email: 'client@example.com', // Would need to fetch this
            due_date: invoiceModal.payment.due_date ? new Date(invoiceModal.payment.due_date).toLocaleDateString() : 'Upon receipt',
            created_date: new Date(invoiceModal.payment.created_at).toLocaleDateString()
          }}
        />
      )}

      {submissionModal.open && submissionModal.payment && (
        <PaymentSubmissionModal
          isOpen={submissionModal.open}
          onClose={() => setSubmissionModal({open: false, payment: null})}
          paymentId={submissionModal.payment.id}
          paymentData={{
            reference_number: submissionModal.payment.reference_number || 'N/A',
            amount: submissionModal.payment.amount,
            phase_name: submissionModal.payment.project_phases.phase_name,
            project_name: 'Project' // Would need to fetch this
          }}
          onSubmissionComplete={fetchPayments}
        />
      )}

      {verificationModal.open && verificationModal.payment && (
        <AdminPaymentVerificationModal
          isOpen={verificationModal.open}
          onClose={() => setVerificationModal({open: false, payment: null})}
          paymentId={verificationModal.payment.id}
          paymentData={{
            reference_number: verificationModal.payment.reference_number || 'N/A',
            amount: verificationModal.payment.amount,
            phase_name: verificationModal.payment.project_phases.phase_name,
            project_name: 'Project', // Would need to fetch this
            client_email: 'client@example.com', // Would need to fetch this
            client_name: 'Client', // Would need to fetch this
            transaction_id: verificationModal.payment.transaction_id,
            payment_channel: verificationModal.payment.payment_channel
          }}
          onVerificationComplete={fetchPayments}
        />
      )}
    </div>
  );
}
