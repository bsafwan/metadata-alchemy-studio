
import { useState } from 'react';
import { EmailService, type EmailData } from '@/utils/emailService';

export const useZohoMail = () => {
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (emailData: EmailData): Promise<boolean> => {
    setIsSending(true);
    try {
      const success = await EmailService.sendEmail(emailData);
      return success;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    } finally {
      setIsSending(false);
    }
  };

  const sendChatSummary = async (
    emails: string[],
    chatData: {
      customerName: string;
      customerEmail: string;
      sessionId: string;
      messages: any[];
      summary: string;
    }
  ) => {
    return await sendEmail({
      to: emails,
      subject: `Chat Summary - ${chatData.customerName}`,
      template: 'chat-summary',
      templateData: chatData
    });
  };

  const sendQuoteRequest = async (
    emails: string[],
    requestData: {
      customerName: string;
      customerEmail: string;
      requestDetails: string;
      messages: any[];
    }
  ) => {
    return await sendEmail({
      to: emails,
      subject: `Quote Request - ${requestData.customerName}`,
      template: 'quote-request',
      templateData: requestData
    });
  };

  const sendPreviewNotification = async (
    emails: string[],
    previewData: {
      customerName: string;
      projectName: string;
      previewTitle: string;
      phaseName: string;
      action: string;
      feedback?: string;
    }
  ) => {
    return await sendEmail({
      to: emails,
      subject: `Preview ${previewData.action}: ${previewData.previewTitle}`,
      template: 'project-update',
      templateData: {
        clientName: previewData.customerName,
        projectName: previewData.projectName,
        milestone: `${previewData.phaseName} - Preview ${previewData.action}`,
        status: `Preview has been ${previewData.action}`,
        nextSteps: previewData.feedback 
          ? `Customer feedback: "${previewData.feedback}"`
          : `Preview "${previewData.previewTitle}" is ready for review.`
      }
    });
  };

  return {
    sendEmail,
    sendChatSummary,
    sendQuoteRequest,
    sendPreviewNotification,
    isSending
  };
};
