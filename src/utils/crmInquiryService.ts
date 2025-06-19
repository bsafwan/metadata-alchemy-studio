
import { supabase } from '@/integrations/supabase/client';
import { EmailService } from './emailService';

export interface CRMInquiry {
  id?: string;
  company_name: string;
  email: string;
  phone: string;
  crm_needs: string;
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

    // Send email notification
    await EmailService.sendEmail({
      to: ['bsafwanjamil677@gmail.com'],
      subject: `New CRM Inquiry from ${inquiry.company_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New CRM Plan Inquiry</h2>
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
          </div>
        </div>
      `,
      text: `
New CRM Plan Inquiry

Company: ${inquiry.company_name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Date: ${new Date().toLocaleString()}

CRM Needs: ${inquiry.crm_needs}

Please review and prepare a customized proposal.
      `
    });

    return true;
  } catch (error) {
    console.error('Failed to save CRM inquiry:', error);
    return false;
  }
};
