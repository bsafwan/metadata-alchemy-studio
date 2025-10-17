import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { password, secretName } = await req.json();
    
    console.log('Password verification attempt for secret:', secretName);
    
    if (!secretName) {
      throw new Error('Secret name is required');
    }
    
    // Get the secret from environment
    const secretValue = Deno.env.get(secretName);
    
    if (!secretValue) {
      console.error('Secret not found:', secretName);
      throw new Error('Secret not configured');
    }
    
    // Verify password matches the secret
    const authenticated = password === secretValue;
    
    console.log('Authentication result:', authenticated);
    
    return new Response(
      JSON.stringify({ authenticated }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Password verification error:', error);
    return new Response(
      JSON.stringify({ error: error.message, authenticated: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
