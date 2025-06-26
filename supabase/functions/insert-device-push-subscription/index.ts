
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DevicePushSubscriptionRequest {
  device_id: string;
  device_fingerprint: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  user_agent?: string;
  page_context?: any;
  device_info?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const subscriptionData: DevicePushSubscriptionRequest = await req.json();

    console.log('Inserting device push subscription for device:', subscriptionData.device_id);

    // Insert or update the device push subscription
    const { data, error } = await supabase
      .from('device_push_subscriptions')
      .upsert({
        device_id: subscriptionData.device_id,
        device_fingerprint: subscriptionData.device_fingerprint,
        endpoint: subscriptionData.endpoint,
        p256dh_key: subscriptionData.p256dh_key,
        auth_key: subscriptionData.auth_key,
        user_agent: subscriptionData.user_agent,
        page_context: subscriptionData.page_context || {},
        device_info: subscriptionData.device_info || {},
        is_active: true,
        last_used_at: new Date().toISOString()
      }, {
        onConflict: 'device_id'
      })
      .select();

    if (error) {
      console.error('Error inserting device push subscription:', error);
      throw error;
    }

    console.log('Device push subscription inserted successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Device push subscription saved successfully',
        data: data?.[0] 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in insert-device-push-subscription function:', error);
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
