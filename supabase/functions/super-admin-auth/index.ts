
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, password } = await req.json()
    
    // Get super admin credentials from environment
    const SUPER_ADMIN_EMAIL = Deno.env.get('SUPER_ADMIN_EMAIL')
    const SUPER_ADMIN_PASSWORD = Deno.env.get('SUPER_ADMIN_PASSWORD')
    
    if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
      throw new Error('Super admin credentials not configured')
    }
    
    // Verify credentials
    const authenticated = email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD
    
    return new Response(
      JSON.stringify({ authenticated }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, authenticated: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
