/**
 * POST /api/ai/hint
 * Specialized endpoint for in-Arena contextual hints.
 * Uses the "debug" brain with strict challenge-context injection.
 * Enforces stricter freemium limits than the general chat (5 hints/day for FREE).
 */
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

    const { challengeId, topicConcept, currentCode, language = 'javascript', problemStatement } = await req.json();

    if (!challengeId) return NextResponse.json({ error: 'challengeId is required' }, { status: 400 });

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Stricter limit for hints in FREE tier
    const hintLimit = user.subscriptionTier === 'FREE' ? 5 : 50;
    if (user.aiQueriesRemaining <= 0) {
      return NextResponse.json({ error: 'Hint limit reached. Upgrade to Pro for more hints.', upgradeRequired: true }, { status: 429 });
    }

    // RAG: Pull last 3 submissions for this challenge
    const recentSubmissions = await Submission.find({ userId: user._id, challengeId })
      .sort({ submittedAt: -1 }).limit(3);

    let ragContext = '';
    if (recentSubmissions.length > 0) {
      const failCount = recentSubmissions.filter(s => s.status === 'FAIL' || s.status === 'ERROR').length;
      ragContext = `[SYSTEM]: Student has attempted this problem ${recentSubmissions.length} time(s). ${failCount} attempt(s) failed. Adjust your hint difficulty accordingly — be more direct if they have failed multiple times.`;
    }

    // Load memory for this specific challenge topic
    let memoryThread = await AgentMemory.findOne({ userId: user._id, topicConcept: topicConcept || challengeId });
    if (!memoryThread) {
      memoryThread = new AgentMemory({ userId: user._id, topicConcept: topicConcept || challengeId, challengeId, messages: [] });
    }

    const history = buildGeminiHistory(memoryThread.messages);
    const agent = createBrainAgent('debug', history);

    const hintPrompt = [
      `Problem: ${problemStatement || 'No problem statement provided.'}`,
      ragContext,
      currentCode ? `Current attempt:\n\`\`\`${language}\n${currentCode}\n\`\`\`` : 'No code written yet.',
      'Give me a specific hint without revealing the full solution.',
    ].join('\n\n');

    let reply = '';
    if (process.env.GEMINI_API_KEY) {
      const result = await agent.sendMessage(hintPrompt);
      reply = result.response.text();
    } else {
      reply = `[Demo] Hint for ${challengeId}: Check your boundary conditions and edge cases. In production, I'll analyze your specific code.`;
    }

    memoryThread.messages.push({ role: 'user', content: hintPrompt, timestamp: new Date() });
    memoryThread.messages.push({ role: 'model', content: reply, timestamp: new Date() });
    await memoryThread.save();

    user.aiQueriesRemaining -= 1;
    await user.save();

    return NextResponse.json({ success: true, hint: reply, queriesRemaining: user.aiQueriesRemaining });
  } catch (err) {
    console.error('[HINT ERROR]', err);
    return NextResponse.json({ error: 'Could not generate hint' }, { status: 500 });
  }
}
