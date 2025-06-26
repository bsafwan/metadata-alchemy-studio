
import { supabase } from '@/integrations/supabase/client';
import { EmailService } from './emailService';

export interface CRMInquiry {
  id?: string;
  company_name: string;
  email: string;
  phone: string;
  crm_needs: string;
  user_identifier?: string;
  created_at?: string;
}

export const saveCRMInquiry = async (inquiry: Omit<CRMInquiry, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    // Save to database
    const { data, error } = await supabase
      .from('crm_inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return false;
    }

    // Send email notification with user identifier
    await EmailService.sendEmail({
      to: ['bsafwanjamil677@gmail.com'],
      subject: `New CRM Inquiry from ${inquiry.company_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New CRM Plan Inquiry</h2>
          
          ${inquiry.user_identifier ? `
          <div style="background: #fef7cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0; color: #92400e;">User Identifier</h3>
            <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #92400e;">${inquiry.user_identifier}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #92400e;">Use this identifier for direct communication with the client</p>
          </div>
          ` : ''}
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Company Information</h3>
            <p><strong>Company Name:</strong> ${inquiry.company_name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>CRM Needs & Requirements</h3>
            <div style="background: #ffffff; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px;">
              ${inquiry.crm_needs}
            </div>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background: #fef7cd; border-radius: 8px;">
            <p><strong>Action Required:</strong> Please review this CRM inquiry and prepare a customized proposal.</p>
            ${inquiry.user_identifier ? `<p><strong>Client ID:</strong> ${inquiry.user_identifier} - Use this for direct messaging</p>` : ''}
          </div>
        </div>
      `,
      text: `
New CRM Plan Inquiry

${inquiry.user_identifier ? `User Identifier: ${inquiry.user_identifier}\n` : ''}
Company: ${inquiry.company_name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Date: ${new Date().toLocaleString()}

CRM Needs: ${inquiry.crm_needs}

Please review and prepare a customized proposal.
${inquiry.user_identifier ? `Use Client ID ${inquiry.user_identifier} for direct communication.` : ''}
      `
    });

    return true;
  } catch (error) {
    console.error('Failed to save CRM inquiry:', error);
    return false;
  }
};
