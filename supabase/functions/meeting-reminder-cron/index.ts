import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Running meeting reminder cron job...');

    // Calculate time 20 minutes from now
    const reminderTime = new Date();
    reminderTime.setMinutes(reminderTime.getMinutes() + 20);
    
    const reminderDate = reminderTime.toISOString().split('T')[0];
    const reminderTimeStr = reminderTime.toTimeString().split(' ')[0].substring(0, 5);

    console.log(`Looking for meetings at ${reminderDate} ${reminderTimeStr}`);

    // Find meetings that need reminders (20 minutes before meeting time)
    const { data: meetings, error } = await supabase
      .from('crm_meetings')
      .select('*')
      .eq('meeting_date', reminderDate)
      .eq('meeting_time', reminderTimeStr)
      .eq('status', 'scheduled')
      .eq('reminder_sent', false);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log(`Found ${meetings?.length || 0} meetings needing reminders`);

    if (!meetings || meetings.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No meetings need reminders at this time',
          checked_time: `${reminderDate} ${reminderTimeStr}`
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Send reminders for each meeting
    const reminderPromises = meetings.map(async (meeting) => {
      try {
        console.log(`Sending reminder for meeting ${meeting.id}`);
        
        const { error: notificationError } = await supabase.functions.invoke('send-meeting-notifications', {
          body: {
            meeting,
            type: 'reminder'
          }
        });

        if (notificationError) {
          console.error(`Failed to send reminder for meeting ${meeting.id}:`, notificationError);
          return { meeting_id: meeting.id, success: false, error: notificationError.message };
        }

        console.log(`Reminder sent successfully for meeting ${meeting.id}`);
        return { meeting_id: meeting.id, success: true };
      } catch (error) {
        console.error(`Error processing reminder for meeting ${meeting.id}:`, error);
        return { meeting_id: meeting.id, success: false, error: error.message };
      }
    });

    const results = await Promise.all(reminderPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`Reminder processing complete: ${successful} successful, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${meetings.length} meeting reminders`,
        results: {
          total: meetings.length,
          successful,
          failed
        },
        details: results
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in meeting reminder cron:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};

serve(handler);