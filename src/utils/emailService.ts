
import { supabase } from '@/integrations/supabase/client';

export interface EmailData {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  template?: string;
  templateData?: Record<string, any>;
  html?: string;
  text?: string;
}

// Email templates for different types of notifications
const EMAIL_TEMPLATES = {
  'chat-summary': (data: any) => ({
    subject: `Chat Summary - ${data.customerName}`,
    html: `
      <h2>Chat Summary</h2>
      <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
      <p><strong>Session ID:</strong> ${data.sessionId}</p>
      <p><strong>Summary:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${data.summary}
      </div>
      <h3>Messages:</h3>
      ${data.messages.map((msg: any) => `
        <div style="margin-bottom: 10px; padding: 10px; border-left: 3px solid ${msg.role === 'user' ? '#007bff' : '#28a745'};">
          <strong>${msg.role === 'user' ? 'Customer' : 'Assistant'}:</strong> ${msg.content}
        </div>
      `).join('')}
    `
  }),

  'quote-request': (data: any) => ({
    subject: `Quote Request - ${data.customerName}`,
    html: `
      <h2>Quote Request</h2>
      <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
      <p><strong>Request Details:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${data.requestDetails}
      </div>
      <h3>Conversation History:</h3>
      ${data.messages.map((msg: any) => `
        <div style="margin-bottom: 10px; padding: 10px; border-left: 3px solid ${msg.role === 'user' ? '#007bff' : '#28a745'};">
          <strong>${msg.role === 'user' ? 'Customer' : 'Assistant'}:</strong> ${msg.content}
        </div>
      `).join('')}
    `
  }),

  'project-update': (data: any) => ({
    subject: `Project Update: ${data.projectName}`,
    html: `
      <h2>Project Update Notification</h2>
      <p>Dear ${data.clientName},</p>
      <p>We have an update regarding your project: <strong>${data.projectName}</strong></p>
      <div style="background: #e8f4fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Milestone:</strong> ${data.milestone}</p>
        <p><strong>Status:</strong> ${data.status}</p>
        <p><strong>Next Steps:</strong> ${data.nextSteps}</p>
      </div>
      <p>Best regards,<br>The Elismet Team</p>
    `
  }),

  'payment-instructions': (data: any) => ({
    subject: `Payment Invoice - ${data.reference_number}`,
    html: `
      <h2>Payment Invoice</h2>
      <p>Dear ${data.client_name},</p>
      <p>Here are your payment instructions for the ${data.phase_name} phase:</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Invoice Details</h3>
        <p><strong>Reference Number:</strong> ${data.reference_number}</p>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Due Date:</strong> ${data.due_date}</p>
        ${data.payoneer_link ? `<p><strong>Payment Link:</strong> <a href="${data.payoneer_link}">Pay Now</a></p>` : ''}
      </div>
      <p>Please complete your payment by the due date to avoid any delays in your project.</p>
      <p>Best regards,<br>The Elismet Team</p>
    `
  }),

  'payment-submission': (data: any) => ({
    subject: `Payment Submitted - ${data.reference_number}`,
    html: `
      <h2>Payment Submission Notification</h2>
      <p>A payment has been submitted for review:</p>
      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Payment Details</h3>
        <p><strong>Reference Number:</strong> ${data.reference_number}</p>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Phase:</strong> ${data.phase_name}</p>
        <p><strong>Client:</strong> ${data.client_name}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Transaction ID:</strong> ${data.transaction_id}</p>
        <p><strong>Payment Channel:</strong> ${data.payment_channel}</p>
        ${data.bank_details ? `<p><strong>Bank Details:</strong> ${data.bank_details}</p>` : ''}
      </div>
      <p>Please review and approve this payment.</p>
    `
  }),

  'payment-confirmation': (data: any) => ({
    subject: `Payment Confirmed - ${data.reference_number}`,
    html: `
      <h2>Payment Confirmation</h2>
      <p>Dear ${data.client_name},</p>
      <p>Your payment has been successfully confirmed!</p>
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Payment Details</h3>
        <p><strong>Reference Number:</strong> ${data.reference_number}</p>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Phase:</strong> ${data.phase_name}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Transaction ID:</strong> ${data.transaction_id}</p>
      </div>
      ${data.admin_notes ? `<p><strong>Notes:</strong> ${data.admin_notes}</p>` : ''}
      <p>Thank you for your payment. Your project will continue as scheduled.</p>
      <p>Best regards,<br>The Elismet Team</p>
    `
  }),

  'project-completion': (data: any) => ({
    subject: `🎉 Project Complete: ${data.project_name}`,
    html: `
      <h2>🎉 Congratulations! Your Project is Complete!</h2>
      <p>Dear ${data.client_name},</p>
      <p>We're excited to announce that your project <strong>${data.project_name}</strong> has been completed!</p>
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
        <h3>Project Summary</h3>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Completion Date:</strong> ${data.completion_date}</p>
        <p><strong>Status:</strong> ✅ Complete</p>
      </div>
      <p><strong>Next Steps:</strong> ${data.next_steps}</p>
      <p>Our team will be in touch shortly with your project deliverables. Thank you for choosing Elismet!</p>
      <p>Best regards,<br>The Elismet Team</p>
    `
  }),

  'delivery-notification': (data: any) => ({
    subject: `🚀 Project Ready for Delivery: ${data.project_name}`,
    html: `
      <h2>🚀 Project Ready for Delivery</h2>
      <p>A project is ready for delivery preparation:</p>
      <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Project Details</h3>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Client:</strong> ${data.client_name} (${data.client_email})</p>
        <p><strong>Completion Date:</strong> ${data.completion_date}</p>
        <p><strong>Total Amount:</strong> $${data.total_amount}</p>
      </div>
      <p><strong>Action Required:</strong> ${data.action_required}</p>
      <p>Please prepare all deliverables and update the delivery status accordingly.</p>
    `
  }),

  'delivery-update': (data: any) => ({
    subject: `Delivery Update: ${data.item_title}`,
    html: `
      <h2>Delivery Update</h2>
      <p>Dear ${data.client_name},</p>
      <p>We have an update on one of your project deliverables:</p>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Deliverable Details</h3>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Item:</strong> ${data.item_title}</p>
        <p><strong>Description:</strong> ${data.item_description}</p>
        <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">${data.status.toUpperCase()}</span></p>
        <p><strong>Update:</strong> This deliverable ${data.status_message}</p>
      </div>
      ${data.admin_notes ? `<p><strong>Notes:</strong> ${data.admin_notes}</p>` : ''}
      <p><strong>Update Date:</strong> ${data.update_date}</p>
      <p>Best regards,<br>The Elismet Team</p>
    `
  }),

  'admin-delivery-update': (data: any) => ({
    subject: `✅ Delivery Item Completed: ${data.item_title}`,
    html: `
      <h2>✅ Delivery Item Completed</h2>
      <p>A delivery item has been marked as completed:</p>
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Completion Details</h3>
        <p><strong>Project:</strong> ${data.project_name}</p>
        <p><strong>Client:</strong> ${data.client_name}</p>
        <p><strong>Item:</strong> ${data.item_title}</p>
        <p><strong>Completion Date:</strong> ${data.completion_date}</p>
      </div>
      <p><strong>Admin Notes:</strong> ${data.admin_notes}</p>
      <p>The client has been notified of this delivery completion.</p>
    `
  })
};

export class EmailService {
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      let emailPayload = { ...emailData };

      // If using a template, apply it
      if (emailData.template && emailData.templateData) {
        const template = EMAIL_TEMPLATES[emailData.template as keyof typeof EMAIL_TEMPLATES];
        if (template) {
          const rendered = template(emailData.templateData);
          emailPayload = {
            ...emailPayload,
            subject: emailData.subject || rendered.subject,
            html: emailData.html || rendered.html
          };
        }
      }

      console.log('Sending email via Zoho:', {
        to: emailPayload.to,
        subject: emailPayload.subject,
        template: emailData.template || 'none'
      });

      const { data, error } = await supabase.functions.invoke('zoho-mail', {
        body: emailPayload
      });

      if (error) {
        console.error('Error sending email:', error);
        return false;
      }

      console.log('Email sent successfully:', data);
      return true;
    } catch (error) {
      console.error('EmailService error:', error);
      return false;
    }
  }
}
