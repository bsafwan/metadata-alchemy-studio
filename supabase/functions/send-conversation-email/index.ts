
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

    console.log(`Processing email for conversation: ${conversationId}`)

    // Get conversation details with proper foreign key reference
    const { data: conversation, error: convError } = await supabaseClient
      .from('conversations')
      .select(`
        *,
        users!conversations_user_id_fkey(*),
        projects!conversations_project_id_fkey(*)
      `)
      .eq('id', conversationId)
      .single()

    if (convError) {
      console.error('Conversation query error:', convError)
      throw new Error(`Failed to fetch conversation: ${convError.message}`)
    }

    if (!conversation) {
      console.error('No conversation found with ID:', conversationId)
      throw new Error('Conversation not found')
    }

    console.log(`Found conversation: ${conversation.subject}`)

    // Get the latest message to determine who sent it
    const { data: latestMessage, error: msgError } = await supabaseClient
      .from('conversation_messages')
      .select('sender_type, sender_name')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (msgError) {
      console.error('Latest message query error:', msgError)
      throw new Error(`Could not determine message sender: ${msgError.message}`)
    }

    console.log(`Latest message sender: ${latestMessage.sender_type}`)

    // Get previous messages (last 5 excluding current)
    const { data: previousMessages } = await supabaseClient
      .from('conversation_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(6)

    const previousMsgs = previousMessages?.slice(1) || []

    // Determine recipient based on who sent the message
    let recipientEmail = ''
    let emailSubject = ''
    
    if (latestMessage.sender_type === 'admin') {
      // Admin sent message -> send to project owner
      recipientEmail = conversation.users.email
      emailSubject = `New Message from Support: ${conversation.subject}`
    } else {
      // User sent message -> send to super admin
      recipientEmail = Deno.env.get('SUPER_ADMIN_EMAIL') || 'bsafwanjamil677@gmail.com'
      emailSubject = `New Message: ${conversation.subject}`
    }

    console.log(`Sending email to: ${recipientEmail} (sender was: ${latestMessage.sender_type})`)

    // Prepare email content based on recipient
    let emailBody
    
    if (latestMessage.sender_type === 'admin') {
      // Email to project owner
      emailBody = {
        to: [recipientEmail],
        subject: emailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Message from Support</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Conversation: ${conversation.subject}</h3>
              <p><strong>Project:</strong> ${conversation.projects?.project_name || 'No Project'}</p>
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

            <div style="margin: 20px 0; padding: 20px; background: #eff6ff; border-radius: 8px;">
              <p>You can reply to this conversation by logging into your project dashboard.</p>
              <p><a href="${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'lovable.app') || 'https://your-app.lovable.app'}" style="color: #2563eb;">Access Your Dashboard</a></p>
            </div>
          </div>
        `,
        text: `
New Message from Support

Conversation: ${conversation.subject}
Project: ${conversation.projects?.project_name || 'No Project'}

Message: ${messageContent}

${attachments.length > 0 ? `Attachments: ${attachments.map(att => att.name).join(', ')}` : ''}

You can reply by logging into your project dashboard.
        `
      }
    } else {
      // Email to super admin
      const previousMsgsList = previousMsgs.length > 0
        ? previousMsgs.reverse().map(msg => 
            `${new Date(msg.created_at).toLocaleString()} - ${msg.sender_name} (${msg.sender_type}):\n${msg.message_content}`
          ).join('\n\n---\n\n')
        : 'No previous messages'

      emailBody = {
        to: [recipientEmail],
        subject: emailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Customer Message</h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Customer Details</h3>
              <p><strong>Name:</strong> ${conversation.users.first_name} ${conversation.users.last_name}</p>
              <p><strong>Email:</strong> ${conversation.users.email}</p>
              <p><strong>Business:</strong> ${conversation.users.business_name}</p>
              <p><strong>Project:</strong> ${conversation.projects?.project_name || 'No Project'}</p>
              <p><strong>Conversation:</strong> ${conversation.subject}</p>
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

            <div style="margin: 20px 0; padding: 20px; background: #eff6ff; border-radius: 8px;">
              <p><strong>Admin Access:</strong> <a href="${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'lovable.app') || 'https://your-app.lovable.app'}/system-control-panel-auth-gateway-x7k9m2p8q4w1" style="color: #2563eb;">Login to Admin Panel</a></p>
            </div>
          </div>
        `,
        text: `
New Customer Message

Customer: ${conversation.users.first_name} ${conversation.users.last_name}
Email: ${conversation.users.email}
Business: ${conversation.users.business_name}
Project: ${conversation.projects?.project_name || 'No Project'}
Conversation: ${conversation.subject}

Message: ${messageContent}

${attachments.length > 0 ? `Attachments: ${attachments.map(att => att.name).join(', ')}` : ''}

Previous Messages:
${previousMsgsList}
        `
      }
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
      console.error('Email sending failed:', errorText)
      throw new Error(`Failed to send email: ${errorText}`)
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
