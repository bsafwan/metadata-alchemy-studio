import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // Verify API key
    const apiKey = req.headers.get('x-api-key');
    const validApiKey = Deno.env.get('ADDING_CUSTOM_OFFER_PAGE');
    
    if (!apiKey || apiKey !== validApiKey) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse request body
    const { client_name, client_email, html_content, custom_url } = await req.json();

    if (!client_name || !client_email || !html_content) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: client_name, client_email, html_content' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate URL slug
    const cleanName = client_name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const cleanEmail = client_email.replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();
    const urlSlug = custom_url || `${cleanName}-${cleanEmail}`;

    console.log(`Creating custom audit page for ${client_name} (${client_email})`);

    // Insert or update the audit page
    const { data, error } = await supabase
      .from('custom_audit_pages')
      .upsert({
        client_name,
        client_email,
        html_content,
        url_slug: urlSlug,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create audit page' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const fullUrl = `https://elismet.com/custom-audits/${urlSlug}`;
    
    console.log(`Custom audit page created successfully: ${fullUrl}`);

    return new Response(
      JSON.stringify({
        success: true,
        url: fullUrl,
        slug: urlSlug,
        expires_at: data.expires_at
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error creating custom audit page:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});