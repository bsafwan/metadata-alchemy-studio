
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const getZohoConfig = (): SMTPConfig => ({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: Deno.env.get('ZOHO_EMAIL') || '',
    pass: Deno.env.get('ZOHO_PASSWORD') || '',
  },
});

const sendEmail = async (emailData: EmailRequest): Promise<any> => {
  const config = getZohoConfig();
  
  if (!config.auth.user || !config.auth.pass) {
    throw new Error('Zoho credentials not configured');
  }

  // Create SMTP connection using nodemailer-like API
  const nodemailer = await import('npm:nodemailer@6.9.7');
  
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: config.auth.user,
    to: emailData.to.join(', '),
    cc: emailData.cc?.join(', '),
    bcc: emailData.bcc?.join(', '),
    subject: emailData.subject,
    html: emailData.html,
    text: emailData.text,
    attachments: emailData.attachments?.map(att => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType
    }))
  };

  return await transporter.sendMail(mailOptions);
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

    const result = await sendEmail(emailRequest);
    
    console.log('Email sent successfully:', result.messageId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: result.messageId,
        message: 'Email sent successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
