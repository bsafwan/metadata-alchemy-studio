
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatRequest {
  messages: ChatMessage[];
  sessionId: string;
}

const systemPrompt = `You are an AI assistant for Elismet, a web development and digital solutions company. You help potential clients understand our services and capabilities.

Our services include:
- Custom web development (React, Node.js, Python)
- E-commerce solutions
- Mobile applications
- Digital transformation consulting
- UI/UX design
- Cloud deployment and DevOps

IMPORTANT: If a user asks you to send a quote, complete a request, or wants to move forward with a project, you should:
1. Acknowledge their request
2. Mention that you'll send the details to our team
3. Include this EXACT phrase in your response: "SEND_QUOTE_REQUEST: [brief description of what they want]"

For example: "I'll send your request to our team right away. SEND_QUOTE_REQUEST: Custom e-commerce website with payment integration"

Be helpful, professional, and focus on understanding their needs. Ask clarifying questions about their project requirements, timeline, and budget if needed.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId }: ChatRequest = await req.json();
    
    const apiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY not found');
    }

    // Prepare messages for DeepSeek API
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))
    ];

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'I apologize, but I am having trouble responding right now.';

    // Check if AI wants to send a quote request
    const quoteRequestMatch = aiMessage.match(/SEND_QUOTE_REQUEST:\s*(.+)/);
    if (quoteRequestMatch) {
      const requestDetails = quoteRequestMatch[1];
      
      // Clean the message (remove the trigger phrase)
      const cleanMessage = aiMessage.replace(/SEND_QUOTE_REQUEST:\s*.+/, '').trim();
      
      // Return both the clean message and quote request trigger
      return new Response(
        JSON.stringify({
          message: cleanMessage,
          quoteRequest: requestDetails
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: aiMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in chat function:', error);
    
    return new Response(
      JSON.stringify({
        message: "I apologize, but I'm experiencing technical difficulties. Please try again or contact us directly at bsafwanjamil677@gmail.com.",
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
