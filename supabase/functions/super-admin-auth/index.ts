
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
    
    console.log('Super admin auth attempt for email:', email)
    
    // Get super admin credentials from environment
    const SUPER_ADMIN_EMAIL = Deno.env.get('SUPER_ADMIN_EMAIL')
    const SUPER_ADMIN_PASSWORD = Deno.env.get('SUPER_ADMIN_PASSWORD')
    
    if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
      console.error('Super admin credentials not configured')
      throw new Error('Super admin credentials not configured')
    }
    
    console.log('Checking credentials...')
    
    // Verify credentials
    const authenticated = email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD
    
    console.log('Authentication result:', authenticated)
    
    return new Response(
      JSON.stringify({ authenticated }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Super admin auth error:', error)
    return new Response(
      JSON.stringify({ error: error.message, authenticated: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
