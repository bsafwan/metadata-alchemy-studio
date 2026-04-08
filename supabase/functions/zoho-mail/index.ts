import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
}

const sendEmail = async (emailData: EmailRequest): Promise<void> => {
  const user = Deno.env.get('ZOHO_EMAIL') || '';
  const pass = Deno.env.get('ZOHO_PASSWORD') || '';

  if (!user || !pass) {
    throw new Error('Zoho credentials not configured');
  }

  const client = new SmtpClient();

  await client.connectTLS({
    hostname: 'smtp.zoho.com',
    port: 465,
    username: user,
    password: pass,
  });

  await client.send({
    from: user,
    to: emailData.to.join(', '),
    cc: emailData.cc?.join(', '),
    bcc: emailData.bcc?.join(', '),
    subject: emailData.subject,
    content: emailData.text || '',
    html: emailData.html || '',
  });

  await client.close();
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailRequest: EmailRequest = await req.json();

    console.log('Sending email via Zoho:', {
      to: emailRequest.to,
      subject: emailRequest.subject
    });

    await sendEmail(emailRequest);

    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
