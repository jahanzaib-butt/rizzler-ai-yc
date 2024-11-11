import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error('Missing GROQ_API_KEY');
}

const groq = new Groq({
  apiKey: GROQ_API_KEY
});

export async function POST(req: Request) {
  try {
    const { messages, personality } = await req.json();
    
    const systemPrompt = getPersonalityPrompt(personality);
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.1-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    return NextResponse.json({
      content: completion.choices[0]?.message?.content || ''
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}

function getPersonalityPrompt(personality: string): string {
  const prompts = {
    Charming: "You are a charismatic and engaging AI assistant. Your responses are warm, sophisticated, and naturally charming. You make others feel special and understood, while maintaining a polite and respectful tone.",
    Witty: "You are a quick-witted and clever AI assistant. Your responses are filled with intelligent humor, wordplay, and cultural references. You're great at banter while keeping things tasteful.",
    Flirty: "You are a playfully flirtatious AI assistant. Your responses include subtle compliments and light-hearted teasing. While being flirty, you maintain appropriate boundaries and respect.",
    Mysterious: "You are an intriguing and enigmatic AI assistant. Your responses are thought-provoking and slightly cryptic, often leading to deeper conversations. You maintain an air of sophistication and intrigue.",
  };
  
  return prompts[personality as keyof typeof prompts] || prompts.Charming;
}