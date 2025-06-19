
import { useState } from 'react';
import { EmailService, type EmailData } from '@/utils/emailService';
import { toast } from '@/hooks/use-toast';

export const useZohoMail = () => {
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (emailData: EmailData): Promise<boolean> => {
    setIsSending(true);
    try {
      const success = await EmailService.sendEmail(emailData);
      
      if (success) {
        toast({
          title: "Email Sent",
          description: "Your email has been sent successfully via Zoho Mail.",
        });
      } else {
        toast({
          title: "Email Failed",
          description: "Failed to send email. Please try again.",
          variant: "destructive",
        });
      }
      
      return success;
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Email Error",
        description: "An error occurred while sending the email.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const sendChatSummary = async (
    ownerEmail: string,
    customerEmail: string,
    chatData: {
      customerName: string;
      sessionId: string;
      messages: any[];
      summary: string;
    }
  ) => {
    return await sendEmail({
      to: [ownerEmail],
      cc: [customerEmail],
      subject: `Live Chat Summary - ${chatData.customerName}`,
      template: 'chat-summary',
      templateData: {
        ...chatData,
        customerEmail
      }
    });
  };

  const sendSupportEscalation = async (
    supportEmail: string,
    customerData: {
      customerName: string;
      customerEmail: string;
      issue: string;
      priority: 'high' | 'medium';
    }
  ) => {
    return await sendEmail({
      to: [supportEmail],
      subject: `🚨 Support Escalation - ${customerData.priority.toUpperCase()}`,
      template: 'escalation',
      templateData: customerData
    });
  };

  const sendProjectUpdate = async (
    clientEmail: string,
    projectData: {
      clientName: string;
      projectName: string;
      milestone: string;
      status: string;
      nextSteps: string;
    }
  ) => {
    return await sendEmail({
      to: [clientEmail],
      subject: `Project Update: ${projectData.projectName}`,
      template: 'project-update',
      templateData: projectData
    });
  };

  const sendPaymentReminder = async (
    clientEmail: string,
    paymentData: {
      clientName: string;
      projectName: string;
      amount: number;
      dueDate: string;
      invoiceUrl?: string;
    }
  ) => {
    return await sendEmail({
      to: [clientEmail],
      subject: `Payment Reminder - ${paymentData.projectName}`,
      template: 'payment-reminder',
      templateData: paymentData
    });
  };

  const sendAdminReport = async (
    adminEmails: string[],
    reportData: {
      reportType: string;
      period: string;
      metrics: Record<string, any>;
      summary: string;
    }
  ) => {
    return await sendEmail({
      to: adminEmails,
      subject: `${reportData.reportType} Report - ${reportData.period}`,
      template: 'admin-report',
      templateData: reportData
    });
  };

  return {
    sendEmail,
    sendChatSummary,
    sendSupportEscalation,
    sendProjectUpdate,
    sendPaymentReminder,
    sendAdminReport,
    isSending
  };
};
