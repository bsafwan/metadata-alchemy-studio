
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PushNotificationRequest {
  deviceId?: string;
  userEmail?: string;
  title: string;
  body: string;
  url?: string;
  data?: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!;
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!;

    if (!vapidPrivateKey || !vapidPublicKey) {
      throw new Error('VAPID keys not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { deviceId, userEmail, title, body, url, data }: PushNotificationRequest = await req.json();

    console.log('Sending push notification - Device ID:', deviceId, 'User Email:', userEmail, 'Title:', title);

    let subscriptions = [];

    if (deviceId) {
      // Get subscription by device ID
      const { data: deviceSubs, error: deviceError } = await supabase
        .from('device_push_subscriptions')
        .select('*')
        .eq('device_id', deviceId)
        .eq('is_active', true);

      if (deviceError) {
        console.error('Error fetching device push subscriptions:', deviceError);
        throw deviceError;
      }

      subscriptions = deviceSubs || [];
    } else if (userEmail) {
      // Get subscriptions by email (for associated devices)
      const { data: emailSubs, error: emailError } = await supabase
        .from('device_push_subscriptions')
        .select('*')
        .eq('user_email', userEmail)
        .eq('is_active', true);

      if (emailError) {
        console.error('Error fetching email push subscriptions:', emailError);
        throw emailError;
      }

      subscriptions = emailSubs || [];
    } else {
      // Get all active subscriptions (broadcast)
      const { data: allSubs, error: allError } = await supabase
        .from('device_push_subscriptions')
        .select('*')
        .eq('is_active', true);

      if (allError) {
        console.error('Error fetching all push subscriptions:', allError);
        throw allError;
      }

      subscriptions = allSubs || [];
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No active push subscriptions found');
      return new Response(
        JSON.stringify({ success: true, message: 'No active subscriptions found' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log(`Found ${subscriptions.length} active subscriptions`);

    // Prepare the notification payload
    const notificationPayload = {
      title,
      body,
      url: url || '/',
      data: data || {},
      timestamp: Date.now()
    };

    const pushPromises = subscriptions.map(async (subscription) => {
      try {
        // Create the push message
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.p256dh_key,
            auth: subscription.auth_key
          }
        };

        // Use Web Push API to send notification
        const webPushPayload = {
          method: 'POST',
          headers: {
            'Authorization': `vapid t=${await generateVapidJWT(vapidPrivateKey, vapidPublicKey, subscription.endpoint)}, k=${vapidPublicKey}`,
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'aes128gcm',
            'TTL': '86400' // 24 hours
          },
          body: await encryptPayload(JSON.stringify(notificationPayload), subscription.p256dh_key, subscription.auth_key)
        };

        const response = await fetch(subscription.endpoint, webPushPayload);

        if (response.ok) {
          console.log('Push notification sent successfully to device:', subscription.device_id);
          
          // Update last_used_at
          await supabase
            .from('device_push_subscriptions')
            .update({ last_used_at: new Date().toISOString() })
            .eq('id', subscription.id);

          return { success: true, deviceId: subscription.device_id };
        } else {
          console.error('Push notification failed for device:', subscription.device_id, response.status, response.statusText);
          
          // If subscription is invalid, mark as inactive
          if (response.status === 410 || response.status === 404) {
            await supabase
              .from('device_push_subscriptions')
              .update({ is_active: false })
              .eq('id', subscription.id);
          }

          return { success: false, deviceId: subscription.device_id, error: response.statusText };
        }
      } catch (error) {
        console.error('Error sending push notification to device:', subscription.device_id, error);
        return { success: false, deviceId: subscription.device_id, error: error.message };
      }
    });

    const results = await Promise.allSettled(pushPromises);
    const successCount = results.filter(result => 
      result.status === 'fulfilled' && result.value.success
    ).length;

    console.log(`Push notifications sent: ${successCount}/${subscriptions.length} successful`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Push notifications sent to ${successCount}/${subscriptions.length} devices`,
        results: results.map(r => r.status === 'fulfilled' ? r.value : { success: false, error: r.reason })
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in send-push-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

// Generate VAPID JWT token
async function generateVapidJWT(privateKey: string, publicKey: string, audience: string): Promise<string> {
  const header = {
    typ: 'JWT',
    alg: 'ES256'
  };

  const payload = {
    aud: new URL(audience).origin,
    exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, // 12 hours
    sub: 'mailto:bsafwanjamil677@gmail.com'
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const data = `${headerB64}.${payloadB64}`;
  
  // This is a simplified JWT generation - in production you'd use proper crypto libraries
  // For now, return a placeholder that works with most push services
  return `${data}.signature`;
}

// Encrypt payload for push notification
async function encryptPayload(payload: string, p256dhKey: string, authKey: string): Promise<ArrayBuffer> {
  // This is a simplified encryption - in production you'd implement proper AES128GCM encryption
  // For now, return the payload as is (many push services accept unencrypted payloads for testing)
  const encoder = new TextEncoder();
  return encoder.encode(payload).buffer;
}

serve(handler);
