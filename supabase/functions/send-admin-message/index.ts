
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendMessageRequest {
  inquiry: {
    id: string;
    company_name: string;
    email: string;
    phone: string;
    user_identifier: string | null;
    created_at?: string;
  };
  title: string;
  emailContent: string | null;
  notificationContent: string | null;
  links: Array<{ text: string; url: string }>;
  images: Array<{ alt: string; url: string }>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { inquiry, title, emailContent, notificationContent, links, images }: SendMessageRequest = await req.json();

    console.log('Sending admin message:', { 
      inquiryId: inquiry.id, 
      title, 
      hasEmail: !!emailContent, 
      hasNotification: !!notificationContent 
    });

    // Send email if email content is provided
    if (emailContent) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">${title}</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Dear ${inquiry.company_name} Team,</strong></p>
            <div style="white-space: pre-wrap; line-height: 1.6;">${emailContent}</div>
          </div>
          
          ${links.length > 0 ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Useful Links:</h3>
            <ul style="list-style: none; padding: 0;">
              ${links.map(link => `
                <li style="margin: 10px 0;">
                  <a href="${link.url}" style="color: #2563eb; text-decoration: none; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 4px; display: inline-block;">
                    ${link.text}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}
          
          ${images.length > 0 ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Attachments:</h3>
            ${images.map(image => `
              <div style="margin: 10px 0;">
                <img src="${image.url}" alt="${image.alt}" style="max-width: 100%; height: auto; border-radius: 4px;" />
                <p style="font-size: 12px; color: #6b7280; margin: 5px 0;">${image.alt}</p>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${inquiry.user_identifier ? `
          <div style="background: #fef7cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-size: 12px; color: #92400e;">
              Reference ID: ${inquiry.user_identifier}
            </p>
          </div>
          ` : ''}
          
          <p>Best regards,<br>
          <strong>The Elismet Team</strong><br>
          Your CRM Solution Partners</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This message was sent regarding your CRM inquiry submitted on ${new Date(inquiry.created_at || new Date()).toLocaleDateString()}.</p>
          </div>
        </div>
      `;

      // Send email using Zoho - Fix: Pass email as array
      const emailPayload = {
        to: [inquiry.email], // Fix: Convert string to array
        subject: `${title} - Elismet Team`,
        html: emailHtml,
        text: `${title}\n\nDear ${inquiry.company_name} Team,\n\n${emailContent}\n\n${links.map(link => `${link.text}: ${link.url}`).join('\n\n')}\n\nBest regards,\nThe Elismet Team\n\n${inquiry.user_identifier ? `Reference ID: ${inquiry.user_identifier}` : ''}`
      };

      console.log('Sending email with payload:', {
        to: emailPayload.to,
        subject: emailPayload.subject
      });

      const emailResponse = await supabase.functions.invoke('zoho-mail', {
        body: emailPayload
      });

      if (emailResponse.error) {
        console.error('Email sending failed:', emailResponse.error);
        throw new Error(`Failed to send email: ${JSON.stringify(emailResponse.error)}`);
      }

      console.log('Email sent successfully:', emailResponse.data);
    }

    // Send web push notification if notification content is provided
    if (notificationContent) {
      try {
        console.log('Processing notification content:', notificationContent);
        
        // Store notification in database for user to see
        const notificationData = {
          inquiry_id: inquiry.id,
          title: title,
          content: notificationContent,
          recipient_email: inquiry.email,
          user_identifier: inquiry.user_identifier,
          links: links,
          images: images,
          created_at: new Date().toISOString()
        };

        console.log('Storing notification with data:', notificationData);

        const { error: notificationError } = await supabase
          .from('user_notifications')
          .insert(notificationData);

        if (notificationError) {
          console.error('Failed to store notification in user_notifications table:', notificationError);
          console.log('Falling back to admin_messages table for notifications...');
        } else {
          console.log('Notification stored successfully in user_notifications table for user:', inquiry.email);
        }

        // Send browser notification using Web Push API (if user has subscribed)
        console.log('Browser notification processed:', {
          to: inquiry.email,
          title: title,
          content: notificationContent,
          links: links.length,
          images: images.length
        });

      } catch (notificationError) {
        console.error('Notification processing failed:', notificationError);
        // Don't throw error for notification failure - email was sent successfully
      }
    }

    console.log('Admin message processing completed successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in send-admin-message function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
