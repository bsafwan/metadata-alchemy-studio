
import { supabase } from '@/integrations/supabase/client';
import { EmailService } from './emailService';

export interface CRMInquiry {
  id?: string;
  company_name: string;
  email: string;
  phone: string;
  crm_needs: string;
  user_identifier?: string;
  source_page?: string;
  created_at?: string;
}

export const saveCRMInquiry = async (inquiry: Omit<CRMInquiry, 'id' | 'created_at'>): Promise<boolean> => {
  try {
    console.log('Saving CRM inquiry with device ID:', inquiry.user_identifier);
    
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

    console.log('CRM inquiry saved successfully:', data);

    // Send email notification to admin with device identifier
    await EmailService.sendEmail({
      to: ['bsafwanjamil677@gmail.com'],
      subject: `🚀 New CRM Inquiry from ${inquiry.company_name} [Device: ${inquiry.user_identifier?.substr(-8)}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🚀 New CRM Plan Inquiry</h2>
          
          ${inquiry.user_identifier ? `
          <div style="background: #fef7cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0; color: #92400e; display: flex; align-items: center; gap: 8px;">
              📱 Device Identifier
            </h3>
            <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #92400e;">${inquiry.user_identifier}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #92400e;">Use this Device ID for direct communication and tracking</p>
          </div>
          ` : ''}
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Company Information</h3>
            <p><strong>Company Name:</strong> ${inquiry.company_name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            ${inquiry.source_page ? `<p><strong>Source Page:</strong> ${inquiry.source_page}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3>💼 CRM Needs & Requirements</h3>
            <div style="background: #ffffff; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px;">
              ${inquiry.crm_needs.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background: #e0f2fe; border-radius: 8px; border-left: 4px solid #0288d1;">
            <p><strong>🎯 Action Required:</strong> Please review this CRM inquiry and prepare a customized proposal.</p>
            ${inquiry.user_identifier ? `<p><strong>📱 Device ID:</strong> ${inquiry.user_identifier} - Use this for direct messaging and push notifications</p>` : ''}
            <p><strong>⏰ Response Time:</strong> Client expects response within 24 hours</p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
            <h4 style="margin: 0 0 10px 0; color: #15803d;">💡 Next Steps:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #15803d;">
              <li>Analyze CRM requirements</li>
              <li>Prepare customized solution proposal</li>
              <li>Schedule consultation call</li>
              <li>Send push notification updates to device</li>
            </ul>
          </div>
        </div>
      `,
      text: `
🚀 New CRM Plan Inquiry

${inquiry.user_identifier ? `📱 Device Identifier: ${inquiry.user_identifier}\n` : ''}
📋 Company: ${inquiry.company_name}
📧 Email: ${inquiry.email}
📞 Phone: ${inquiry.phone}
📅 Date: ${new Date().toLocaleString()}
${inquiry.source_page ? `🌐 Source Page: ${inquiry.source_page}\n` : ''}

💼 CRM Needs: ${inquiry.crm_needs}

🎯 Please review and prepare a customized proposal.
${inquiry.user_identifier ? `📱 Use Device ID ${inquiry.user_identifier} for direct communication and push notifications.` : ''}
⏰ Response expected within 24 hours.
      `
    });

    // Send confirmation email to user
    await EmailService.sendEmail({
      to: [inquiry.email],
      subject: '🎉 Thank you for your CRM inquiry - Elismet Team',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; text-align: center;">🎉 Thank You for Your CRM Inquiry!</h2>
          
          <p>Dear ${inquiry.company_name} Team,</p>
          
          <p>Thank you for reaching out to us regarding your CRM requirements. We have successfully received your inquiry and our team is excited to help you transform your business operations.</p>
          
          ${inquiry.user_identifier ? `
          <div style="background: #fef7cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              <strong>📱 Your Device ID:</strong> ${inquiry.user_identifier}<br>
              <small>You'll receive real-time updates directly to your device!</small>
            </p>
          </div>
          ` : ''}
          
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
            <h3 style="margin: 0 0 10px 0; color: #01579b;">🚀 What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #01579b;">
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll prepare a customized CRM solution proposal</li>
              <li>You'll receive a detailed quote and timeline</li>
              <li>We'll schedule a consultation call to discuss your needs</li>
              ${inquiry.user_identifier ? '<li>You\'ll get real-time updates via push notifications</li>' : ''}
            </ul>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📋 Your Inquiry Summary</h3>
            <p><strong>Company:</strong> ${inquiry.company_name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            ${inquiry.user_identifier ? `<p><strong>Device ID:</strong> ${inquiry.user_identifier}</p>` : ''}
          </div>
          
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <p style="margin: 0; color: #15803d;"><strong>⏰ Expected Response Time:</strong> Within 24 hours (usually much faster!)</p>
          </div>
          
          <p>If you have any urgent questions or need to provide additional information, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          <strong>The Elismet Team</strong><br>
          🚀 Your CRM Solution Partners</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
            ${inquiry.user_identifier ? `<p>📱 Device ID: ${inquiry.user_identifier} - You'll receive updates automatically!</p>` : ''}
          </div>
        </div>
      `,
      text: `
🎉 Thank You for Your CRM Inquiry!

Dear ${inquiry.company_name} Team,

Thank you for reaching out to us regarding your CRM requirements. We have successfully received your inquiry and our team is excited to help you transform your business operations.

${inquiry.user_identifier ? `📱 Your Device ID: ${inquiry.user_identifier} - You'll receive real-time updates!` : ''}

🚀 What happens next?
- Our team will review your requirements within 24 hours
- We'll prepare a customized CRM solution proposal  
- You'll receive a detailed quote and timeline
- We'll schedule a consultation call to discuss your needs
${inquiry.user_identifier ? '- You\'ll get real-time updates via push notifications' : ''}

📋 Your Inquiry Summary:
Company: ${inquiry.company_name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Submitted: ${new Date().toLocaleString()}
${inquiry.user_identifier ? `Device ID: ${inquiry.user_identifier}` : ''}

⏰ Expected Response Time: Within 24 hours (usually much faster!)

If you have any urgent questions or need to provide additional information, please don't hesitate to contact us.

Best regards,
The Elismet Team
🚀 Your CRM Solution Partners
      `
    });

    return true;
  } catch (error) {
    console.error('Failed to save CRM inquiry:', error);
    return false;
  }
};
