/**
 * POST /api/ai/explain
 * Explanation Brain — used from the "Explain this code" button in the Arena.
 * Uses the "explain" personality for deep educational breakdowns.
 * NOT tied to freemium limit (available to FREE tier as a discovery tool).
 */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AgentMemory from '@/models/AgentMemory';
import User from '@/models/User';
import { createBrainAgent, buildGeminiHistory } from '@/lib/ai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { code, language = 'javascript', topicConcept = 'general', question } = await req.json();

    if (!code && !question) {
      return NextResponse.json({ error: 'Code or question is required' }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Load explanation history for concept continuity
    let memoryThread = await AgentMemory.findOne({ userId: user._id, topicConcept });
    if (!memoryThread) {
      memoryThread = new AgentMemory({ userId: user._id, topicConcept, messages: [] });
    }

    const history = buildGeminiHistory(memoryThread.messages);
    const agent = createBrainAgent('explain', history);

    const explainPrompt = [
      code ? `Please explain the following ${language} code:\n\`\`\`${language}\n${code}\n\`\`\`` : '',
      question ? `\nSpecific question: ${question}` : '',
    ].filter(Boolean).join('\n');

    let explanation = '';
    if (process.env.GEMINI_API_KEY) {
      const result = await agent.sendMessage(explainPrompt);
      explanation = result.response.text();
    } else {
      explanation = `[Demo] This code implements a classic pattern in ${language}. In production, I'll break down every line with Big O analysis and analogies.`;
    }

    memoryThread.messages.push({ role: 'user', content: explainPrompt, timestamp: new Date() });
    memoryThread.messages.push({ role: 'model', content: explanation, timestamp: new Date() });
    await memoryThread.save();

    return NextResponse.json({ success: true, explanation });
  } catch (err) {
    console.error('[EXPLAIN ERROR]', err);
    return NextResponse.json({ error: 'Could not generate explanation' }, { status: 500 });
  }
}
