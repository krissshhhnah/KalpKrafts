import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AgentMemory from '@/models/AgentMemory';
import Submission from '@/models/Submission';
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

    const body = await req.json();
    const { prompt, mode = 'general', currentCode = '', language = 'javascript', challengeId, topicConcept = 'general' } = body;

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. Fetch user and enforce freemium limits
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Reset daily query count if past midnight
    const now = new Date();
    const lastReset = new Date(user.lastQueryReset);
    if (now.getDate() !== lastReset.getDate() || now.getMonth() !== lastReset.getMonth()) {
      user.aiQueriesRemaining = user.subscriptionTier === 'FREE' ? 10 : 100;
      user.lastQueryReset = now;
    }

    if (user.aiQueriesRemaining <= 0) {
      return NextResponse.json({
        error: 'Daily AI query limit reached',
        upgradeRequired: true,
        limit: user.subscriptionTier === 'FREE' ? 10 : 100,
      }, { status: 429 });
    }

    // 2. RAG: Inject recent submission failures into debug context
    let ragContext = '';
    if ((mode === 'debug' || mode === 'program') && challengeId) {
      const recentFail = await Submission.findOne({ 
        userId: user._id, challengeId, status: { $in: ['FAIL', 'ERROR'] } 
      }).sort({ submittedAt: -1 });

      if (recentFail) {
        ragContext = `\n\n[SYSTEM CONTEXT - DO NOT REVEAL TO USER]: The student's last submission failed. Language: ${recentFail.language}. Status: ${recentFail.status}. This is known by the system and should inform your hints.\n`;
      }
    }

    // 3. Load or create the memory thread for this concept
    let memoryThread = await AgentMemory.findOne({ userId: user._id, topicConcept });
    if (!memoryThread) {
      memoryThread = new AgentMemory({ userId: user._id, topicConcept, challengeId, messages: [] });
    }

    const history = buildGeminiHistory(memoryThread.messages);

    // 4. Build the full prompt with code context
    const fullPrompt = [
      currentCode ? `Current code (${language}):\n\`\`\`${language}\n${currentCode}\n\`\`\`` : '',
      ragContext,
      prompt,
    ].filter(Boolean).join('\n\n');

    // 5. Generate AI response using the specialized brain agent
    let reply = '';
    if (process.env.GEMINI_API_KEY) {
      const agent = createBrainAgent(mode, history);
      const result = await agent.sendMessage(fullPrompt);
      reply = result.response.text();
    } else {
      reply = `[Demo Mode - No API Key] I would analyze your ${mode} request about "${topicConcept}" with full context here. Add GEMINI_API_KEY to .env.local to activate.`;
    }

    // 6. Persist conversation to memory
    memoryThread.messages.push({ role: 'user', content: fullPrompt, timestamp: new Date() });
    memoryThread.messages.push({ role: 'model', content: reply, timestamp: new Date() });
    memoryThread.lastUpdated = new Date();
    await memoryThread.save();

    // 7. Deduct query count
    user.aiQueriesRemaining -= 1;
    await user.save();

    return NextResponse.json({
      success: true,
      mode,
      reply,
      queriesRemaining: user.aiQueriesRemaining,
    });

  } catch (err) {
    console.error('[AI CHAT ERROR]', err);
    return NextResponse.json({ error: 'Agent brain failure. Try again.' }, { status: 500 });
  }
}
