
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are a professional customer support representative for Elismet, a leading technology company that provides comprehensive software development solutions.

ABOUT ELISMET:
- We specialize in web applications, mobile apps, custom software, and digital transformation services
- We help businesses leverage technology to achieve their goals
- Our experienced team works closely with clients to understand their unique challenges
- We offer flexible packages and competitive pricing based on specific needs and project requirements
- Contact information: email at contact@elismet.com
- We typically respond within 24 hours to inquiries

YOUR ROLE:
- Provide helpful, professional, and friendly customer support
- Answer questions about our services, pricing, and capabilities
- Guide users toward appropriate solutions for their business needs
- If you don't know specific details, offer to connect them with our sales team
- Always maintain a professional and helpful tone
- Focus on understanding the customer's needs and providing value

IMPORTANT:
- Never mention that you are an AI or automated system
- Present yourself as a knowledgeable support team member
- Keep responses concise but comprehensive
- Always offer next steps or ways to get more detailed help`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId } = await req.json();

    if (!deepseekApiKey) {
      return new Response(
        JSON.stringify({ error: 'DeepSeek API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare messages for DeepSeek API
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in deepseek-chat function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
