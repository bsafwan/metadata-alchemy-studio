import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface WhatsAppRequest {
  recipient: string;
  content: string;
  media_url?: string;
}

const sendWhatsAppMessage = async (recipient: string, content: string, media_url?: string) => {
  const apiKey = Deno.env.get('WHATSAPP_API_KEY');
  const instanceId = Deno.env.get('WHATSAPP_INSTANCE_ID');

  if (!apiKey || !instanceId) {
    console.log('WhatsApp API credentials not found - skipping WhatsApp notification');
    return { success: true, message: 'WhatsApp credentials not configured, skipped' };
  }

  // Format phone number (remove any non-digits except +)
  const formattedRecipient = recipient.replace(/[^\d+]/g, '');
  
  const payload = {
    recipient: formattedRecipient,
    content,
    media_url: media_url || "",
    instance_id: instanceId
  };

  console.log('Sending WhatsApp message to:', formattedRecipient);

  try {
    const response = await fetch('https://api.wacloud.app/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('WhatsApp API error:', result);
      return { success: false, error: result.message || 'WhatsApp API error' };
    }

    console.log('WhatsApp message sent successfully:', result);
    return result;
  } catch (error) {
    console.error('WhatsApp sending failed:', error);
    return { success: false, error: error.message };
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipient, content, media_url }: WhatsAppRequest = await req.json();

    if (!recipient || !content) {
      throw new Error('Recipient and content are required');
    }

    const result = await sendWhatsAppMessage(recipient, content, media_url);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error('Error in send-whatsapp-message function:', error);
    // Return success even if WhatsApp fails, so the main scheduling doesn't break
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'WhatsApp notification skipped due to error',
        error: error.message 
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);