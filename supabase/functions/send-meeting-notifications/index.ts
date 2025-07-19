import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Meeting {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  whatsapp?: string;
  meeting_platform: 'google_meet' | 'zoom' | 'whatsapp';
  meeting_date: string;
  meeting_time: string;
  meeting_timezone: string;
  duration_minutes: number;
  google_meet_link?: string;
  zoom_link?: string;
}

interface NotificationRequest {
  meeting: Meeting;
  type: 'scheduled' | 'reminder' | 'cancelled';
  admin_notes?: string;
}

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const formatDateTime = (date: string, time: string, timezone: string): string => {
  const meetingDate = new Date(`${date}T${time}:00`);
  const formatted = meetingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone
  });
  return `${formatted} EDT`;
};

const getPlatformDetails = (platform: string): { name: string; icon: string } => {
  switch (platform) {
    case 'google_meet':
      return { name: 'Google Meet', icon: '📹' };
    case 'zoom':
      return { name: 'Zoom', icon: '🎥' };
    case 'whatsapp':
      return { name: 'WhatsApp Call', icon: '📱' };
    default:
      return { name: platform, icon: '💻' };
  }
};

const generateMeetingPortalLink = (meetingId: string): string => {
  // Use elismet.com domain as requested
  return `https://elismet.com/meeting/${meetingId}/connect`;
};

const sendEmailNotification = async (to: string[], subject: string, html: string): Promise<void> => {
  try {
    const { error } = await supabase.functions.invoke('zoho-mail', {
      body: {
        to,
        subject,
        html
      }
    });

    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent successfully to:', to);
    }
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

const handleScheduledNotification = async (meeting: Meeting): Promise<void> => {
  const platformDetails = getPlatformDetails(meeting.meeting_platform);
  const meetingDateTime = formatDateTime(meeting.meeting_date, meeting.meeting_time, meeting.meeting_timezone);
  const meetingPortalLink = generateMeetingPortalLink(meeting.id);

  // No need to update with meeting link as we use portal system

  // Email to admin
  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
        🗓️ New Meeting Scheduled
      </h2>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin: 0 0 15px 0; color: #1e40af;">Meeting Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${meeting.company_name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Contact:</td><td>${meeting.contact_name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${meeting.email}</td></tr>
          ${meeting.whatsapp ? `<tr><td style="padding: 8px 0; font-weight: bold;">WhatsApp:</td><td>${meeting.whatsapp}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; font-weight: bold;">Platform:</td><td>${platformDetails.icon} ${platformDetails.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Date & Time:</td><td>${meetingDateTime}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Duration:</td><td>${meeting.duration_minutes} minutes</td></tr>
        </table>
      </div>

      <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
        <h3 style="margin: 0 0 10px 0; color: #065f46;">Meeting Portal Link</h3>
        <a href="${meetingPortalLink}" style="color: #059669; font-weight: bold; text-decoration: none;">${meetingPortalLink}</a>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #065f46;">
          This is the custom portal link sent to the client. Meeting access will be available 20 minutes before the scheduled time.
        </p>
      </div>

      <div style="background: #fef7cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 10px 0; color: #92400e;">Action Required</h3>
        <ul style="margin: 0; padding-left: 20px; color: #92400e;">
          <li>Prepare meeting agenda and materials</li>
          <li>Send calendar invite with meeting link</li>
          <li>Set up reminder 15 minutes before meeting</li>
          ${meeting.meeting_platform === 'whatsapp' ? '<li>Prepare WhatsApp for the call</li>' : ''}
        </ul>
      </div>

      <p style="color: #6b7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        Automatic reminder will be sent to the client 20 minutes before the meeting.
      </p>
    </div>
  `;

  // Email to client
  const clientEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb; text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">
        ✅ Meeting Confirmed!
      </h2>
      
      <p>Dear ${meeting.contact_name},</p>
      
      <p>Thank you for scheduling a meeting with us! We're excited to discuss your business needs and how we can help you achieve your goals.</p>

      <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
        <h3 style="margin: 0 0 15px 0; color: #01579b;">📅 Meeting Details</h3>
        <table style="width: 100%; border-collapse: collapse; color: #01579b;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Date & Time:</td><td>${meetingDateTime}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Platform:</td><td>${platformDetails.icon} ${platformDetails.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Duration:</td><td>${meeting.duration_minutes} minutes</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${meeting.company_name}</td></tr>
        </table>
      </div>

      <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="margin: 0 0 15px 0; font-size: 16px; color: #01579b;"><strong>🔗 Your Personal Meeting Portal</strong></p>
        <a href="${meetingPortalLink}" 
           style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; font-weight: bold;">
          Access Meeting Portal
        </a>
        <p style="margin: 15px 0 0 0; font-size: 14px; color: #666;">
          This link will be active 20 minutes before your meeting time
        </p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0; color: #374151;">📋 What to Expect</h3>
        <ul style="margin: 0; padding-left: 20px; color: #374151;">
          <li>Discussion of your business requirements</li>
          <li>Review of potential CRM solutions</li>
          <li>Timeline and pricing overview</li>
          <li>Next steps planning</li>
        </ul>
      </div>

      <div style="background: #fef7cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 10px 0; color: #92400e;">⏰ Important Reminders</h3>
        <ul style="margin: 0; padding-left: 20px; color: #92400e;">
          <li>You'll receive a reminder email 20 minutes before the meeting</li>
          <li>Please test your ${platformDetails.name} connection beforehand</li>
          <li>Have your business requirements and questions ready</li>
          ${meeting.whatsapp ? '<li>We may also send updates via WhatsApp</li>' : ''}
        </ul>
      </div>

      <p>If you need to reschedule or have any questions, please contact us immediately.</p>
      
      <p>Looking forward to our meeting!</p>
      
      <p>Best regards,<br>
      <strong>The Elismet Team</strong><br>
      Your CRM Solution Partners</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #6b7280; font-size: 12px;">
        <p>This is an automated confirmation email.</p>
      </div>
    </div>
  `;

  // Send emails
  await Promise.all([
    sendEmailNotification(
      ['bsafwanjamil677@gmail.com'], 
      `🗓️ New Meeting Scheduled - ${meeting.company_name} (${meetingDateTime})`,
      adminEmailHtml
    ),
    sendEmailNotification(
      [meeting.email], 
      `Meeting Confirmed - ${platformDetails.name} on ${meetingDateTime.split(' at ')[0]}`,
      clientEmailHtml
    )
  ]);
};

const handleReminderNotification = async (meeting: Meeting): Promise<void> => {
  const platformDetails = getPlatformDetails(meeting.meeting_platform);
  const meetingDateTime = formatDateTime(meeting.meeting_date, meeting.meeting_time, meeting.meeting_timezone);
  const meetingPortalLink = generateMeetingPortalLink(meeting.id);

  const reminderEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626; text-align: center; border-bottom: 3px solid #dc2626; padding-bottom: 10px;">
        ⏰ Meeting Starting Soon!
      </h2>
      
      <p>Dear ${meeting.contact_name},</p>
      
      <p style="font-size: 18px; color: #dc2626; font-weight: bold; text-align: center; 
         background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0;">
        Your meeting starts in 20 minutes!
      </p>

      <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0288d1;">
        <h3 style="margin: 0 0 15px 0; color: #01579b;">📅 Meeting Details</h3>
        <table style="width: 100%; border-collapse: collapse; color: #01579b;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Time:</td><td>${meetingDateTime}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Platform:</td><td>${platformDetails.icon} ${platformDetails.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Duration:</td><td>${meeting.duration_minutes} minutes</td></tr>
        </table>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${meetingPortalLink}" 
           style="display: inline-block; background: #dc2626; color: white; padding: 15px 30px; 
                  text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
          🚀 ACCESS MEETING PORTAL
        </a>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
          The meeting link is now active in your portal
        </p>
      </div>

      <div style="background: #fef7cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
        <h3 style="margin: 0 0 10px 0; color: #92400e;">🔧 Quick Tech Check</h3>
        <ul style="margin: 0; padding-left: 20px; color: #92400e;">
          <li>Test your microphone and camera</li>
          <li>Ensure stable internet connection</li>
          <li>Close unnecessary applications</li>
          <li>Have your questions and requirements ready</li>
        </ul>
      </div>

      <p>See you soon!</p>
      
      <p>Best regards,<br>
      <strong>The Elismet Team</strong></p>
    </div>
  `;

  await sendEmailNotification(
    [meeting.email], 
    `⏰ REMINDER: Your meeting starts in 20 minutes - ${platformDetails.name}`,
    reminderEmailHtml
  );

  // Mark reminder as sent
  await supabase
    .from('crm_meetings')
    .update({ reminder_sent: true })
    .eq('id', meeting.id);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    
    // Handle both old format (direct meeting data) and new format (meeting object wrapper)
    let meeting: Meeting;
    let type: string;
    
    if (requestBody.meeting && requestBody.type) {
      // New format: { meeting: {...}, type: 'scheduled' }
      meeting = requestBody.meeting;
      type = requestBody.type;
    } else {
      // Old format: direct meeting data
      meeting = requestBody;
      type = 'scheduled'; // default to scheduled
    }

    console.log(`Processing ${type} notification for meeting data:`, meeting);

    // If meeting doesn't have an ID, we need to save it to database first
    if (!meeting.id) {
      const { data: savedMeeting, error: insertError } = await supabase
        .from('crm_meetings')
        .insert({
          company_name: meeting.company_name,
          contact_name: meeting.contact_name,
          email: meeting.email,
          whatsapp: meeting.whatsapp,
          meeting_platform: meeting.meeting_platform,
          meeting_date: meeting.meeting_date,
          meeting_time: meeting.meeting_time,
          meeting_timezone: meeting.meeting_timezone || 'America/New_York',
          duration_minutes: meeting.duration_minutes || 30,
          status: 'scheduled'
        })
        .select()
        .single();

      if (insertError) {
        throw new Error(`Failed to save meeting: ${insertError.message}`);
      }

      meeting = { ...meeting, id: savedMeeting.id };
    }

    switch (type) {
      case 'scheduled':
        await handleScheduledNotification(meeting);
        break;
      case 'reminder':
        await handleReminderNotification(meeting);
        break;
      case 'cancelled':
        // Handle cancellation notification (can be implemented later)
        break;
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: `${type} notification sent successfully` }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in send-meeting-notifications:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);