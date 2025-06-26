
import { supabase } from '@/integrations/supabase/client';
import { EmailService } from './emailService';
import { deviceManager } from './deviceIdentifier';

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
    // Get device info to associate with inquiry
    const deviceInfo = await deviceManager.getOrCreateDeviceInfo();
    
    // Get existing subscription if available
    const subscriptionData = await deviceManager.getSubscriptionData(deviceInfo.deviceId);
    
    // Save inquiry to database
    const { data, error } = await supabase
      .from('crm_inquiries')
      .insert([{
        ...inquiry,
        user_identifier: deviceInfo.deviceId // Use device ID as user identifier
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return false;
    }

    // If user has notification subscription, associate it with the inquiry
    if (subscriptionData) {
      await supabase
        .from('device_push_subscriptions')
        .update({ 
          user_email: inquiry.email,
          page_context: {
            ...subscriptionData.page_context,
            inquiry_id: data.id,
            inquiry_email: inquiry.email,
            inquiry_company: inquiry.company_name
          }
        })
        .eq('device_id', deviceInfo.deviceId);
    }

    // Send email notification to admin
    await EmailService.sendEmail({
      to: ['bsafwanjamil677@gmail.com'],
      subject: `New CRM Inquiry from ${inquiry.company_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New CRM Plan Inquiry</h2>
          
          <div style="background: #fef7cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0; color: #92400e;">Device Information</h3>
            <p style="margin: 5px 0 0 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #92400e;">Device ID: ${deviceInfo.deviceId}</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #92400e;">
              ${subscriptionData ? '✅ User has notifications enabled' : '❌ User has not enabled notifications'}
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Company Information</h3>
            <p><strong>Company Name:</strong> ${inquiry.company_name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            ${inquiry.source_page ? `<p><strong>Source Page:</strong> ${inquiry.source_page}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3>CRM Needs & Requirements</h3>
            <div style="background: #ffffff; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px;">
              ${inquiry.crm_needs}
            </div>
          </div>
          
          <div style="margin: 20px 0; padding: 20px; background: #fef7cd; border-radius: 8px;">
            <p><strong>Action Required:</strong> Please review this CRM inquiry and prepare a customized proposal.</p>
            <p><strong>Device ID:</strong> ${deviceInfo.deviceId} - ${subscriptionData ? 'Can send direct notifications' : 'User needs to enable notifications first'}</p>
          </div>
        </div>
      `,
      text: `
New CRM Plan Inquiry

Device ID: ${deviceInfo.deviceId}
Notifications: ${subscriptionData ? 'Enabled' : 'Not enabled'}

Company: ${inquiry.company_name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Date: ${new Date().toLocaleString()}
${inquiry.source_page ? `Source Page: ${inquiry.source_page}\n` : ''}

CRM Needs: ${inquiry.crm_needs}

Please review and prepare a customized proposal.
      `
    });

    // Send confirmation email to user
    await EmailService.sendEmail({
      to: [inquiry.email],
      subject: 'Thank you for your CRM inquiry - Elismet Team',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; text-align: center;">Thank You for Your CRM Inquiry!</h2>
          
          <p>Dear ${inquiry.company_name} Team,</p>
          
          <p>Thank you for reaching out to us regarding your CRM requirements. We have successfully received your inquiry and our team is excited to help you transform your business operations.</p>
          
          ${!subscriptionData ? `
          <div style="background: #fef7cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 10px 0; color: #92400e;">💡 Stay Updated</h3>
            <p style="margin: 0; color: #92400e;">Enable notifications on our website to receive instant updates about your inquiry and proposal!</p>
          </div>
          ` : ''}
          
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
            <h3 style="margin: 0 0 10px 0; color: #01579b;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #01579b;">
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll prepare a customized CRM solution proposal</li>
              <li>You'll receive a detailed quote and timeline</li>
              <li>We'll schedule a consultation call to discuss your needs</li>
            </ul>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Inquiry Summary</h3>
            <p><strong>Company:</strong> ${inquiry.company_name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Phone:</strong> ${inquiry.phone}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p><strong>Expected Response Time:</strong> Within 1 week (usually much faster!)</p>
          
          <p>If you have any urgent questions or need to provide additional information, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          <strong>The Elismet Team</strong><br>
          Your CRM Solution Partners</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      `,
      text: `
Thank You for Your CRM Inquiry!

Dear ${inquiry.company_name} Team,

Thank you for reaching out to us regarding your CRM requirements. We have successfully received your inquiry and our team is excited to help you transform your business operations.

${!subscriptionData ? 'Tip: Enable notifications on our website to receive instant updates about your inquiry!\n\n' : ''}

What happens next?
- Our team will review your requirements within 24 hours
- We'll prepare a customized CRM solution proposal  
- You'll receive a detailed quote and timeline
- We'll schedule a consultation call to discuss your needs

Your Inquiry Summary:
Company: ${inquiry.company_name}
Email: ${inquiry.email}
Phone: ${inquiry.phone}
Submitted: ${new Date().toLocaleString()}

Expected Response Time: Within 1 week (usually much faster!)

If you have any urgent questions or need to provide additional information, please don't hesitate to contact us.

Best regards,
The Elismet Team
Your CRM Solution Partners
      `
    });

    return true;
  } catch (error) {
    console.error('Failed to save CRM inquiry:', error);
    return false;
  }
};
