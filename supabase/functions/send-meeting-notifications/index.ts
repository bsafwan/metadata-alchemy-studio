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

const generateICSContent = (meeting: Meeting): string => {
  const startDate = new Date(`${meeting.meeting_date}T${meeting.meeting_time}:00`);
  const endDate = new Date(startDate.getTime() + meeting.duration_minutes * 60 * 1000);
  
  // Format dates for .ics format (YYYYMMDDTHHMMSSZ)
  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateICS = formatICSDate(startDate);
  const endDateICS = formatICSDate(endDate);
  
  const platformDetails = getPlatformDetails(meeting.meeting_platform);
  const meetingPortalLink = generateMeetingPortalLink(meeting.id);
  
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Elismet//Meeting Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:meeting-${meeting.id}@elismet.com`,
    `DTSTART:${startDateICS}`,
    `DTEND:${endDateICS}`,
    `SUMMARY:${meeting.company_name} - ${platformDetails.name} Meeting`,
    `DESCRIPTION:Meeting with ${meeting.contact_name} from ${meeting.company_name}\\n\\nPlatform: ${platformDetails.name}\\n\\nJoin via Meeting Portal: ${meetingPortalLink}\\n\\nDuration: ${meeting.duration_minutes} minutes`,
    `LOCATION:${meetingPortalLink}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
};

const uploadICSFile = async (meeting: Meeting, icsContent: string): Promise<string> => {
  const fileName = `meeting-${meeting.id}.ics`;
  const filePath = `ics-files/${fileName}`;
  
  try {
    const { data, error } = await supabase.storage
      .from('conversation-files')
      .upload(filePath, new Blob([icsContent], { type: 'text/calendar' }), {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Failed to upload ICS file:', error);
      throw error;
    }

    // Generate public URL
    const { data: publicUrlData } = supabase.storage
      .from('conversation-files')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading ICS file:', error);
    throw error;
  }
};

const scheduleICSFileDeletion = async (meeting: Meeting): Promise<void> => {
  const meetingDate = new Date(`${meeting.meeting_date}T${meeting.meeting_time}:00`);
  const deletionDate = new Date(meetingDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours after meeting
  
  try {
    // Store deletion info in a table for later cleanup
    await supabase
      .from('scheduled_deletions')
      .insert({
        file_path: `ics-files/meeting-${meeting.id}.ics`,
        bucket_name: 'conversation-files',
        deletion_date: deletionDate.toISOString(),
        meeting_id: meeting.id
      });
  } catch (error) {
    console.error('Failed to schedule ICS file deletion:', error);
  }
};

const generateCalendarLinks = (meeting: Meeting, icsUrl: string): string => {
  const startDate = new Date(`${meeting.meeting_date}T${meeting.meeting_time}:00`);
  const endDate = new Date(startDate.getTime() + meeting.duration_minutes * 60 * 1000);
  
  const formatGoogleDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateGoogle = formatGoogleDate(startDate);
  const endDateGoogle = formatGoogleDate(endDate);
  
  const platformDetails = getPlatformDetails(meeting.meeting_platform);
  const meetingPortalLink = generateMeetingPortalLink(meeting.id);
  
  const title = encodeURIComponent(`${meeting.company_name} - ${platformDetails.name} Meeting`);
  const description = encodeURIComponent(`Meeting with ${meeting.contact_name} from ${meeting.company_name}\n\nPlatform: ${platformDetails.name}\n\nJoin via Meeting Portal: ${meetingPortalLink}\n\nDuration: ${meeting.duration_minutes} minutes`);
  const location = encodeURIComponent(meetingPortalLink);
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${startDateGoogle}/${endDateGoogle}&details=${description}&location=${location}&ctz=${meeting.meeting_timezone}`;
  
  return `
    <div style="margin: 20px 0; text-align: center;">
      <h3 style="margin: 0 0 15px 0; color: #374151;">📅 Add to Your Calendar</h3>
      <table cellpadding="10" cellspacing="0" border="0" style="margin: 0 auto;">
        <tr>
          <td>
            <a href="${googleCalendarUrl}"
               style="background-color: #4285f4; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif; display: inline-block; margin: 5px;">
              📅 Add to Google Calendar
            </a>
          </td>
          <td>
            <a href="${icsUrl}"
               style="background-color: #0072c6; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-family: Arial, sans-serif; display: inline-block; margin: 5px;">
              📥 Download Calendar File (.ics)
            </a>
          </td>
        </tr>
      </table>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
        Click the buttons above to add this meeting to your preferred calendar application
      </p>
    </div>
  `;
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

  // Generate .ics file and upload it
  const icsContent = generateICSContent(meeting);
  const icsUrl = await uploadICSFile(meeting, icsContent);
  
  // Schedule deletion of .ics file 24 hours after meeting
  await scheduleICSFileDeletion(meeting);
  
  // Generate calendar invitation links
  const calendarLinks = generateCalendarLinks(meeting, icsUrl);

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

      ${calendarLinks}

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

  // Second email - Calendar invitation with detailed instructions
  const calendarInviteEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #059669; text-align: center; border-bottom: 3px solid #059669; padding-bottom: 10px;">
        📅 Calendar Invitation - Add to Your Calendar
      </h2>
      
      <p>Dear ${meeting.contact_name},</p>
      
      <p>To ensure you don't miss our upcoming meeting, please add it to your calendar using one of the options below:</p>

      ${calendarLinks}

      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
        <h3 style="margin: 0 0 15px 0; color: #065f46;">📱 How to Use These Links</h3>
        
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 0 0 5px 0; color: #065f46;">📅 Google Calendar Button:</h4>
          <p style="margin: 0; color: #065f46; font-size: 14px;">Click this if you use Gmail or Google Calendar. It will open directly in your Google Calendar.</p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 0 0 5px 0; color: #065f46;">📥 Download .ics File:</h4>
          <p style="margin: 0; color: #065f46; font-size: 14px;">Click this to download a calendar file that works with Outlook, Apple Calendar, and most other calendar apps. The file will automatically download and you can double-click it to add to your calendar.</p>
        </div>
        
        <div>
          <h4 style="margin: 0 0 5px 0; color: #065f46;">🔄 What Happens Next:</h4>
          <ul style="margin: 5px 0 0 0; padding-left: 20px; color: #065f46; font-size: 14px;">
            <li>The meeting will appear in your calendar with all details</li>
            <li>You'll get automatic reminders from your calendar app</li>
            <li>The meeting portal link is included in the calendar event</li>
            <li>All meeting details are preserved in the calendar entry</li>
          </ul>
        </div>
      </div>

      <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
        <h3 style="margin: 0 0 15px 0; color: #1e40af;">📋 Meeting Summary</h3>
        <table style="width: 100%; border-collapse: collapse; color: #1e40af;">
          <tr><td style="padding: 8px 0; font-weight: bold;">Date & Time:</td><td>${meetingDateTime}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Platform:</td><td>${platformDetails.icon} ${platformDetails.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Duration:</td><td>${meeting.duration_minutes} minutes</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Meeting Portal:</td><td><a href="${meetingPortalLink}" style="color: #1e40af;">Access Portal</a></td></tr>
        </table>
      </div>

      <div style="background: #fef7cd; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; color: #92400e; font-weight: bold;">💡 Pro Tip</p>
        <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">
          Adding this to your calendar ensures you'll get reminders and have all meeting details handy!
        </p>
      </div>
      
      <p>Looking forward to our productive meeting!</p>
      
      <p>Best regards,<br>
      <strong>The Elismet Team</strong><br>
      Your CRM Solution Partners</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #6b7280; font-size: 12px;">
        <p>This calendar invitation will be automatically removed 24 hours after your meeting.</p>
      </div>
    </div>
  `;

  // Send emails (first confirmation, then calendar invitation)
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
    ),
    // Second email with calendar invitation
    sendEmailNotification(
      [meeting.email], 
      `📅 Add to Calendar - ${meeting.company_name} Meeting (${meetingDateTime.split(' at ')[0]})`,
      calendarInviteEmailHtml
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