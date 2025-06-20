
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AdminNotificationPayload {
  type: 'message_sent' | 'conversation_created' | 'project_update'
  conversationId?: string
  projectId?: string
  messageContent?: string
  adminAction?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { type, conversationId, projectId, messageContent, adminAction }: AdminNotificationPayload = await req.json()

    // Get super admin email
    const SUPER_ADMIN_EMAIL = Deno.env.get('SUPER_ADMIN_EMAIL')
    if (!SUPER_ADMIN_EMAIL) {
      throw new Error('Super admin email not configured')
    }

    let emailBody = {
      to: [SUPER_ADMIN_EMAIL],
      subject: '',
      html: '',
      text: ''
    }

    if (type === 'message_sent' && conversationId) {
      // Get conversation details
      const { data: conversation, error: convError } = await supabaseClient
        .from('conversations')
        .select(`
          *,
          users!inner(*),
          projects(*)
        `)
        .eq('id', conversationId)
        .single()

      if (convError || !conversation) {
        throw new Error('Conversation not found')
      }

      emailBody.subject = `Admin Action Confirmation - ${conversation.subject}`
      emailBody.html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Admin Action Notification</h2>
          
          <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Action Performed</h3>
            <p><strong>Admin:</strong> Super Admin</p>
            <p><strong>Action:</strong> Message sent to client</p>
            <p><strong>Client:</strong> ${conversation.users.first_name} ${conversation.users.last_name}</p>
            <p><strong>Conversation:</strong> ${conversation.subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Message Sent</h3>
            <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap;">${messageContent || 'No content'}</p>
            </div>
          </div>

          <div style="margin: 20px 0; padding: 20px; background: #f0f9ff; border-radius: 8px;">
            <p><strong>Status:</strong> Message delivered successfully to ${conversation.users.email}</p>
            <p>This is an automated confirmation of your admin action.</p>
          </div>
        </div>
      `
      
      emailBody.text = `
Admin Action Notification

Action: Message sent to client
Client: ${conversation.users.first_name} ${conversation.users.last_name}
Conversation: ${conversation.subject}

Message: ${messageContent || 'No content'}

Status: Message delivered successfully to ${conversation.users.email}
      `
    }

    // Send email using Zoho Mail function
    const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/zoho-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
      },
      body: JSON.stringify(emailBody)
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      throw new Error(`Failed to send admin notification: ${errorText}`)
    }

    console.log('Admin notification sent successfully')

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Admin notification error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
