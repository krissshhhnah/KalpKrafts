import { NextResponse } from 'next/server';
import { createBrainAgent, buildGeminiHistory } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        content: "[Offline Mode] The Gemini API key is missing. This is a local mocked response demonstrating the platform architecture.",
      });
    }

    // Isolate the latest message vs history
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;
    const historyData = messages.slice(0, -1);
    
    // Build agent with Socratic 'program' context or 'general' tech coaching context
    const agent = createBrainAgent('general', buildGeminiHistory(historyData));

    const result = await agent.sendMessage(latestMessage);

    return NextResponse.json({
      content: result.response.text(),
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response due to internal AI architecture error.' }, { status: 500 });
  }
}
