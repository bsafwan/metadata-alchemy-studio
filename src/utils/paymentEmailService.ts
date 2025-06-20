
import { supabase } from '@/integrations/supabase/client';
import { generateProfessionalInvoice } from './professionalInvoiceGenerator';

interface PaymentEmailData {
  client_email: string;
  client_name: string;
  project_name: string;
  amount: number;
  reference_number: string;
  due_date: string;
  client_business: string;
  client_industry: string;
}

interface PaymentSubmissionData {
  reference_number: string;
  project_name: string;
  amount: number;
  transaction_id: string;
  payment_channel: string;
  client_name: string;
  bank_details?: string;
  payment_date: string;
}

interface PaymentConfirmationData {
  client_email: string;
  client_name: string;
  project_name: string;
  amount: number;
  reference_number: string;
}

export class PaymentEmailService {
  static async sendPaymentInvoice(data: PaymentEmailData): Promise<boolean> {
    try {
      // Generate the professional invoice PDF
      const invoiceData = {
        reference_number: data.reference_number,
        amount: data.amount,
        project_name: data.project_name,
        client_name: data.client_name,
        client_email: data.client_email,
        client_business: data.client_business,
        client_industry: data.client_industry,
        due_date: data.due_date,
        created_date: new Date().toLocaleDateString()
      };

      const pdfDataUri = generateProfessionalInvoice(invoiceData);
      const pdfBase64 = pdfDataUri.split(',')[1]; // Remove data:application/pdf;base64, prefix

      const emailData = {
        to: [data.client_email],
        subject: `Payment Invoice - 50% Milestone for ${data.project_name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">💳 Payment Invoice - 50% Milestone</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">${data.project_name}</p>
            </div>
            
            <div style="padding: 40px 30px; background: #ffffff;">
              <div style="background: #fff3cd; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #ff8c00;">
                <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px;">Hello ${data.client_name}!</h2>
                <p style="color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;">
                  Your 50% milestone payment for <strong>${data.project_name}</strong> has been initialized. 
                  Please find the detailed invoice attached to this email.
                </p>
              </div>
              
              <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 18px;">📋 Payment Summary</h3>
                <div style="background: #f7fafc; padding: 20px; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0;"><strong>Amount Due:</strong> $${data.amount.toFixed(2)}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Reference:</strong> <span style="background: #fff3cd; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${data.reference_number}</span></p>
                  <p style="margin: 0 0 10px 0;"><strong>Due Date:</strong> ${data.due_date}</p>
                  <p style="margin: 0;"><strong>Project:</strong> ${data.project_name}</p>
                </div>
              </div>
              
              <div style="background: #fee2e2; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #dc2626;">
                <h3 style="color: #dc2626; margin: 0 0 15px 0; font-size: 18px;">🚨 Critical Payment Requirements</h3>
                <div style="font-size: 14px; color: #2d3748;">
                  <p style="margin: 0 0 8px 0;"><strong>✓ Payment Method:</strong> ACH or FDWIRE ONLY</p>
                  <p style="margin: 0 0 8px 0;"><strong>✓ Account Type:</strong> Business Account ONLY</p>
                  <p style="margin: 0 0 8px 0;"><strong>✓ Reference Number:</strong> Always include <span style="background: #fff3cd; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${data.reference_number}</span></p>
                  <p style="margin: 0;"><strong>✓ Bank:</strong> Citibank (Routing: 031100209)</p>
                </div>
              </div>
              
              <div style="background: #e3f2fd; padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #1976d2; margin: 0 0 15px 0; font-size: 18px;">📄 Invoice Attached</h3>
                <p style="color: #2d3748; margin: 0; font-size: 16px;">
                  The complete invoice with all bank details and payment instructions is attached as a PDF. 
                  Please review it carefully before making the payment.
                </p>
              </div>
            </div>
            
            <div style="background: #f7fafc; padding: 25px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0; font-size: 14px;">
                After payment, please submit transaction details in your dashboard.<br>
                <strong>ELISMET LTD</strong> • Building Digital Excellence
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `Invoice-${data.reference_number}.pdf`,
            content: pdfBase64,
            contentType: 'application/pdf'
          }
        ]
      };

      const { data: result, error } = await supabase.functions.invoke('zoho-mail', {
        body: emailData
      });

      if (error) {
        console.error('Email service error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to send payment invoice email:', error);
      return false;
    }
  }

  static async sendPaymentSubmissionNotification(adminEmails: string[], data: PaymentSubmissionData): Promise<boolean> {
    try {
      const emailData = {
        to: adminEmails,
        subject: `Payment Submitted - ${data.reference_number}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">💰 Payment Submission Received</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">${data.reference_number}</p>
            </div>
            
            <div style="padding: 40px 30px; background: #ffffff;">
              <div style="background: #eff6ff; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #2563eb;">
                <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px;">Payment Submission Details</h2>
                <p style="color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;">
                  A new payment submission has been received and requires your verification.
                </p>
              </div>
              
              <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 18px;">📊 Submission Information</h3>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; font-size: 14px;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                      <p style="margin: 0 0 8px 0;"><strong>Reference:</strong> ${data.reference_number}</p>
                      <p style="margin: 0 0 8px 0;"><strong>Project:</strong> ${data.project_name}</p>
                      <p style="margin: 0 0 8px 0;"><strong>Amount:</strong> $${data.amount.toFixed(2)}</p>
                      <p style="margin: 0;"><strong>Client:</strong> ${data.client_name}</p>
                    </div>
                    <div>
                      <p style="margin: 0 0 8px 0;"><strong>Transaction ID:</strong> ${data.transaction_id}</p>
                      <p style="margin: 0 0 8px 0;"><strong>Payment Method:</strong> ${data.payment_channel}</p>
                      <p style="margin: 0 0 8px 0;"><strong>Payment Date:</strong> ${data.payment_date}</p>
                      ${data.bank_details ? `<p style="margin: 0;"><strong>Bank Details:</strong> ${data.bank_details}</p>` : ''}
                    </div>
                  </div>
                </div>
              </div>
              
              <div style="background: #fef3c7; padding: 25px; border-radius: 12px; margin: 25px 0; border: 2px solid #f59e0b;">
                <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px;">⚡ Action Required</h3>
                <p style="color: #92400e; margin: 0; font-size: 16px; font-weight: 500;">
                  Please verify this payment in the admin panel and approve or request resubmission.
                </p>
              </div>
            </div>
            
            <div style="background: #f7fafc; padding: 25px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0; font-size: 14px;">
                This is an automated notification from the payment system.<br>
                <strong>ELISMET LTD</strong> • Building Digital Excellence
              </p>
            </div>
          </div>
        `
      };

      const { data: result, error } = await supabase.functions.invoke('zoho-mail', {
        body: emailData
      });

      if (error) {
        console.error('Admin notification email error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to send admin notification email:', error);
      return false;
    }
  }

  static async sendPaymentConfirmation(data: PaymentConfirmationData): Promise<boolean> {
    try {
      const emailData = {
        to: [data.client_email],
        subject: `Payment Confirmed - 50% Milestone Completed for ${data.project_name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
            <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">✅ Payment Confirmed!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">50% Milestone Completed</p>
            </div>
            
            <div style="padding: 40px 30px; background: #ffffff;">
              <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #22c55e;">
                <h2 style="color: #1a202c; margin: 0 0 15px 0; font-size: 20px;">Hello ${data.client_name}!</h2>
                <p style="color: #4a5568; margin: 0; font-size: 16px; line-height: 1.6;">
                  Excellent news! We have successfully received and verified your 50% milestone payment for 
                  <strong>${data.project_name}</strong>.
                </p>
              </div>
              
              <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #2d3748; margin: 0 0 20px 0; font-size: 18px;">✅ Payment Confirmation</h3>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                  <p style="margin: 0 0 10px 0;"><strong>Amount Received:</strong> $${data.amount.toFixed(2)}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Reference:</strong> ${data.reference_number}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Project:</strong> ${data.project_name}</p>
                  <p style="margin: 0;"><strong>Status:</strong> <span style="color: #22c55e; font-weight: bold;">CONFIRMED & PROCESSED</span></p>
                </div>
              </div>
              
              <div style="background: linear-gradient(135deg, #a8edea, #fed6e3); padding: 25px; border-radius: 12px; margin: 25px 0;">
                <h3 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">🚀 What's Next?</h3>
                <p style="color: #2d3748; margin: 0; font-size: 16px; line-height: 1.6;">
                  With your 50% milestone payment confirmed, our development team will continue working on your project. 
                  You'll receive regular updates on the progress, and we'll notify you when the next milestone is reached.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: #22c55e; color: white; padding: 15px 30px; border-radius: 25px; display: inline-block; font-weight: 600; font-size: 16px;">
                  🎉 Thank you for your trust in ELISMET!
                </div>
              </div>
            </div>
            
            <div style="background: #f7fafc; padding: 25px 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; margin: 0; font-size: 14px;">
                If you have any questions, please don't hesitate to contact us.<br>
                <strong>ELISMET LTD</strong> • Building Digital Excellence
              </p>
            </div>
          </div>
        `
      };

      const { data: result, error } = await supabase.functions.invoke('zoho-mail', {
        body: emailData
      });

      if (error) {
        console.error('Payment confirmation email error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to send payment confirmation email:', error);
      return false;
    }
  }
}
