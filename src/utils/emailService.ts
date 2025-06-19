import { supabase } from '@/integrations/supabase/client';

export interface EmailData {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html?: string;
  text?: string;
  template?: 'chat-summary' | 'quote-request' | 'escalation' | 'project-update' | 'payment-reminder' | 'admin-report';
  templateData?: Record<string, any>;
}

export class EmailService {
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // If template is specified, generate content
      if (emailData.template && emailData.templateData) {
        const templateContent = this.generateTemplate(emailData.template, emailData.templateData);
        emailData.html = templateContent.html;
        emailData.text = templateContent.text;
      }

      const { data, error } = await supabase.functions.invoke('zoho-mail', {
        body: emailData
      });

      if (error) {
        console.error('Email service error:', error);
        return false;
      }

      console.log('Email sent successfully:', data);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  static generateTemplate(template: string, data: Record<string, any>): { html: string; text: string } {
    switch (template) {
      case 'chat-summary':
        return this.generateChatSummaryTemplate(data);
      case 'quote-request':
        return this.generateQuoteRequestTemplate(data);
      case 'escalation':
        return this.generateEscalationTemplate(data);
      case 'project-update':
        return this.generateProjectUpdateTemplate(data);
      case 'payment-reminder':
        return this.generatePaymentReminderTemplate(data);
      case 'admin-report':
        return this.generateAdminReportTemplate(data);
      default:
        return { html: '', text: '' };
    }
  }

  private static generateQuoteRequestTemplate(data: any) {
    const { customerName, customerEmail, requestDetails, messages } = data;
    
    // If no messages provided, this is for the user (simple acknowledgment)
    if (!messages || messages.length === 0) {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Your Request!</h2>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Hello ${customerName},</p>
            <p>${requestDetails}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background: #eff6ff; border-radius: 8px;">
            <p>We appreciate your interest in our services and will be in touch soon.</p>
            <p>Best regards,<br>The Elismet Team</p>
          </div>
        </div>
      `;
      
      const text = `
Thank You for Your Request!

Hello ${customerName},

${requestDetails}

We appreciate your interest in our services and will be in touch soon.

Best regards,
The Elismet Team
      `;
      
      return { html, text };
    }

    // Full details for company
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🎯 Quote Request from ${customerName}</h2>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Request Details</h3>
          <p>${requestDetails}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Recent Conversation Context</h3>
          ${messages.map((msg: any) => `
            <div style="margin: 10px 0; padding: 10px; background: ${msg.sender === 'user' ? '#e0f2fe' : '#f0f9ff'}; border-radius: 4px;">
              <strong>${msg.sender === 'user' ? customerName : 'Assistant'}:</strong>
              <p>${msg.text}</p>
            </div>
          `).join('')}
        </div>
        
        <div style="margin: 20px 0; padding: 20px; background: #fef7cd; border-radius: 8px;">
          <p><strong>Action Required:</strong> Please prepare and send a quote to ${customerEmail}</p>
        </div>
      </div>
    `;
    
    const text = `
Quote Request from ${customerName}

Customer: ${customerName} (${customerEmail})
Date: ${new Date().toLocaleString()}

Request Details: ${requestDetails}

Recent Messages:
${messages.map((msg: any) => `${msg.sender === 'user' ? customerName : 'Assistant'}: ${msg.text}`).join('\n')}

Please prepare and send a quote to ${customerEmail}
    `;
    
    return { html, text };
  }

  private static generateChatSummaryTemplate(data: any) {
    const { customerName, customerEmail, sessionId, messages, summary } = data;
    
    // If no messages provided, this is for the user (simple acknowledgment)
    if (!messages || messages.length === 0) {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Contacting Us!</h2>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Hello ${customerName},</p>
            <p>${summary}</p>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background: #eff6ff; border-radius: 8px;">
            <p>We appreciate you taking the time to chat with us about your project needs.</p>
            <p>Best regards,<br>The Elismet Team</p>
          </div>
        </div>
      `;
      
      const text = `
Thank You for Contacting Us!

Hello ${customerName},

${summary}

We appreciate you taking the time to chat with us about your project needs.

Best regards,
The Elismet Team
      `;
      
      return { html, text };
    }

    // Full transcript for company
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Live Chat Conversation Summary</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Session ID:</strong> ${sessionId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Conversation Summary</h3>
          <p>${summary}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Message History</h3>
          ${messages.map((msg: any) => `
            <div style="margin: 10px 0; padding: 10px; background: ${msg.sender === 'user' ? '#e0f2fe' : '#f0f9ff'}; border-radius: 4px;">
              <strong>${msg.sender === 'user' ? customerName : 'Assistant'}:</strong>
              <p>${msg.text}</p>
              <small style="color: #666;">${new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          `).join('')}
        </div>
        
        <div style="margin: 20px 0; padding: 20px; background: #fef7cd; border-radius: 8px;">
          <p><strong>Follow-up:</strong> This customer may need additional assistance. Please review and respond if necessary.</p>
        </div>
      </div>
    `;
    
    const text = `
Live Chat Conversation Summary

Customer: ${customerName} (${customerEmail})
Session: ${sessionId}
Date: ${new Date().toLocaleString()}

Summary: ${summary}

Messages:
${messages.map((msg: any) => `${msg.sender === 'user' ? customerName : 'Assistant'}: ${msg.text}`).join('\n')}

Please review and follow up if needed.
    `;
    
    return { html, text };
  }

  private static generateEscalationTemplate(data: any) {
    const { customerName, customerEmail, issue, priority } = data;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">🚨 Support Escalation Required</h2>
        <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Priority:</strong> <span style="color: ${priority === 'high' ? '#dc2626' : '#f59e0b'}">${priority.toUpperCase()}</span></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Issue Description</h3>
          <p>${issue}</p>
        </div>
        
        <div style="margin: 20px 0; padding: 20px; background: #fef2f2; border-radius: 8px;">
          <p><strong>Action Required:</strong> Please contact this customer immediately to resolve their issue.</p>
        </div>
      </div>
    `;
    
    const text = `
🚨 SUPPORT ESCALATION REQUIRED

Customer: ${customerName} (${customerEmail})
Priority: ${priority.toUpperCase()}

Issue: ${issue}

Please contact this customer immediately.
    `;
    
    return { html, text };
  }

  private static generateProjectUpdateTemplate(data: any) {
    const { clientName, projectName, milestone, status, nextSteps } = data;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Project Update - ${projectName}</h2>
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Hello ${clientName},</p>
          <p>We have an update on your project: <strong>${projectName}</strong></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Milestone: ${milestone}</h3>
          <p><strong>Status:</strong> <span style="color: #059669;">${status}</span></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Next Steps</h3>
          <p>${nextSteps}</p>
        </div>
        
        <div style="margin: 20px 0; padding: 20px; background: #eff6ff; border-radius: 8px;">
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The Elismet Team</p>
        </div>
      </div>
    `;
    
    const text = `
Project Update - ${projectName}

Hello ${clientName},

Milestone: ${milestone}
Status: ${status}

Next Steps: ${nextSteps}

If you have any questions, please contact us.

Best regards,
The Elismet Team
    `;
    
    return { html, text };
  }

  private static generatePaymentReminderTemplate(data: any) {
    const { clientName, projectName, amount, dueDate, invoiceUrl } = data;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">Payment Reminder - ${projectName}</h2>
        <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>Hello ${clientName},</p>
          <p>This is a friendly reminder about your upcoming payment for: <strong>${projectName}</strong></p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Payment Details</h3>
          <p><strong>Amount Due:</strong> $${amount}</p>
          <p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString()}</p>
        </div>
        
        ${invoiceUrl ? `
        <div style="margin: 20px 0; text-align: center;">
          <a href="${invoiceUrl}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Invoice</a>
        </div>
        ` : ''}
        
        <div style="margin: 20px 0; padding: 20px; background: #f0f9ff; border-radius: 8px;">
          <p>Thank you for your business!</p>
          <p>Best regards,<br>The Elismet Team</p>
        </div>
      </div>
    `;
    
    const text = `
Payment Reminder - ${projectName}

Hello ${clientName},

This is a reminder about your upcoming payment.

Amount Due: $${amount}
Due Date: ${new Date(dueDate).toLocaleDateString()}

${invoiceUrl ? `View Invoice: ${invoiceUrl}` : ''}

Thank you for your business!

Best regards,
The Elismet Team
    `;
    
    return { html, text };
  }

  private static generateAdminReportTemplate(data: any) {
    const { reportType, period, metrics, summary } = data;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">${reportType} Report - ${period}</h2>
        
        <div style="margin: 20px 0;">
          <h3>Executive Summary</h3>
          <p>${summary}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Key Metrics</h3>
          ${Object.entries(metrics).map(([key, value]) => `
            <div style="background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 6px;">
              <strong>${key}:</strong> ${value}
            </div>
          `).join('')}
        </div>
        
        <div style="margin: 20px 0; padding: 20px; background: #f0f9ff; border-radius: 8px;">
          <p>This is an automated report generated by the Elismet system.</p>
        </div>
      </div>
    `;
    
    const text = `
${reportType} Report - ${period}

Executive Summary:
${summary}

Key Metrics:
${Object.entries(metrics).map(([key, value]) => `${key}: ${value}`).join('\n')}

This is an automated report generated by the Elismet system.
    `;
    
    return { html, text };
  }
}
