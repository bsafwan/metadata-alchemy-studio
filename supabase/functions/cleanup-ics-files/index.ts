import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const cleanupExpiredICSFiles = async (): Promise<void> => {
  console.log('Starting ICS file cleanup process...');
  
  try {
    // Get expired files that haven't been processed
    const { data: expiredFiles, error: selectError } = await supabase
      .from('scheduled_deletions')
      .select('*')
      .eq('processed', false)
      .lt('deletion_date', new Date().toISOString());

    if (selectError) {
      console.error('Error fetching expired files:', selectError);
      return;
    }

    if (!expiredFiles || expiredFiles.length === 0) {
      console.log('No expired ICS files to clean up');
      return;
    }

    console.log(`Found ${expiredFiles.length} expired ICS files to delete`);

    // Process each expired file
    for (const file of expiredFiles) {
      try {
        // Delete the file from storage
        const { error: deleteError } = await supabase.storage
          .from(file.bucket_name)
          .remove([file.file_path]);

        if (deleteError) {
          console.error(`Failed to delete file ${file.file_path}:`, deleteError);
          continue;
        }

        // Mark as processed
        const { error: updateError } = await supabase
          .from('scheduled_deletions')
          .update({ processed: true })
          .eq('id', file.id);

        if (updateError) {
          console.error(`Failed to mark file ${file.file_path} as processed:`, updateError);
        } else {
          console.log(`Successfully deleted and marked as processed: ${file.file_path}`);
        }
      } catch (error) {
        console.error(`Error processing file ${file.file_path}:`, error);
      }
    }

    console.log('ICS file cleanup process completed');
  } catch (error) {
    console.error('Error in cleanup process:', error);
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('ICS file cleanup cron job triggered');
    
    await cleanupExpiredICSFiles();

    return new Response(
      JSON.stringify({ success: true, message: 'ICS file cleanup completed' }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('Error in cleanup-ics-files function:', error);
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