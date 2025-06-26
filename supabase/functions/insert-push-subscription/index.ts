
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushSubscriptionData {
  user_email: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  user_agent: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const subscriptionData: PushSubscriptionData = await req.json();
    
    console.log('Inserting push subscription for user:', subscriptionData.user_email);

    // Insert or update push subscription
    const { data, error } = await supabase
      .from('push_subscriptions')
      .upsert(subscriptionData, { 
        onConflict: 'user_email,endpoint',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error('Error inserting push subscription:', error);
      throw error;
    }

    console.log('Push subscription saved successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in insert-push-subscription function:', error);
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
