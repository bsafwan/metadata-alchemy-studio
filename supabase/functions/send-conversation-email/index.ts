
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailPayload {
  conversationId: string
  messageContent: string
  attachments?: Array<{
    name: string
    url: string
    type: string
  }>
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

    const { conversationId, messageContent, attachments = [] }: EmailPayload = await req.json()

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

    // Get previous messages (last 5)
    const { data: previousMessages } = await supabaseClient
      .from('conversation_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(6) // Get 6 to exclude the current message

    const previousMsgs = previousMessages?.slice(1) || [] // Remove the current message

    // Prepare email content
    const attachmentsList = attachments.length > 0 
      ? attachments.map(att => `• ${att.name} (${att.type}): ${att.url}`).join('\n')
      : 'No attachments'

    const previousMsgsList = previousMsgs.length > 0
      ? previousMsgs.reverse().map(msg => 
          `${new Date(msg.created_at).toLocaleString()} - ${msg.sender_name} (${msg.sender_type}):\n${msg.message_content}`
        ).join('\n\n---\n\n')
      : 'No previous messages'

    const emailBody = {
      to: ['bsafwanjamil677@gmail.com'],
      subject: `New Message: ${conversation.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Conversation Message</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Conversation Details</h3>
            <p><strong>Client Name:</strong> ${conversation.users.first_name} ${conversation.users.last_name}</p>
            <p><strong>Project Name:</strong> ${conversation.projects?.project_name || 'No Project'}</p>
            <p><strong>Email:</strong> ${conversation.users.email}</p>
            <p><strong>Conversation ID:</strong> ${conversation.id}</p>
            <p><strong>Subject:</strong> ${conversation.subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>New Message</h3>
            <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap;">${messageContent}</p>
            </div>
          </div>

          ${attachments.length > 0 ? `
          <div style="margin: 20px 0;">
            <h3>Attachments</h3>
            ${attachments.map(att => `
              <div style="margin: 10px 0; padding: 10px; background: #f3f4f6; border-radius: 4px;">
                <strong>${att.name}</strong> (${att.type})<br>
                <a href="${att.url}" target="_blank" style="color: #2563eb;">Download</a>
              </div>
            `).join('')}
          </div>
          ` : ''}

          ${previousMsgs.length > 0 ? `
          <div style="margin: 20px 0;">
            <details>
              <summary style="cursor: pointer; font-weight: bold; margin-bottom: 10px;">Previous Messages (${previousMsgs.length})</summary>
              <div style="background: #f9fafb; padding: 15px; border-radius: 6px; max-height: 300px; overflow-y: auto;">
                <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px; margin: 0;">${previousMsgsList}</pre>
              </div>
            </details>
          </div>
          ` : ''}
        </div>
      `,
      text: `
New Conversation Message

Client Name: ${conversation.users.first_name} ${conversation.users.last_name}
Project Name: ${conversation.projects?.project_name || 'No Project'}
Email: ${conversation.users.email}
Conversation ID: ${conversation.id}
Subject: ${conversation.subject}

New Message:
${messageContent}

Attachments:
${attachmentsList}

Previous Messages:
${previousMsgsList}
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
      throw new Error('Failed to send email')
    }

    console.log('Email notification sent successfully')

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
