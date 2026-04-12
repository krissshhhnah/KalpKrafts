/**
 * GET /api/metrics/dashboard
 * Aggregates a user's full real-time dashboard state from their DB records.
 * Returns stats, skill progress map, and career readiness (capped for FREE tier).
 */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Submission from '@/models/Submission';
import Progress from '@/models/Progress';
import AgentMemory from '@/models/AgentMemory';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CHALLENGES } from '@/lib/challenges';

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // All submissions
    const submissions = await Submission.find({ userId: user._id });
    const passedSubmissions = submissions.filter(s => s.status === 'PASS');

    // Progress across all tracks
    const progressRecords = await Progress.find({ userId: user._id });
    const totalCredits = progressRecords.reduce((sum, p) => sum + p.totalCreditsEarned, 0);
    const completedIds = new Set(progressRecords.flatMap(p => p.completedModules));

    // Skill progress — based on topicConcepts completed
    const conceptProgress: Record<string, { total: number; done: number }> = {};
    for (const ch of CHALLENGES) {
      if (!conceptProgress[ch.topicConcept]) conceptProgress[ch.topicConcept] = { total: 0, done: 0 };
      conceptProgress[ch.topicConcept].total += 1;
      if (completedIds.has(ch.id)) conceptProgress[ch.topicConcept].done += 1;
    }

    const skillProgress = Object.entries(conceptProgress).map(([concept, data]) => ({
      concept,
      percent: Math.round((data.done / data.total) * 100),
    }));

    // Career readiness score — capped at 68% for FREE tier unless Pro
    const rawReadiness = Math.min(Math.round((passedSubmissions.length / Math.max(CHALLENGES.length, 1)) * 100), 100);
    const careerReadiness = user.subscriptionTier === 'FREE' ? Math.min(rawReadiness, 68) : rawReadiness;

    // AI query stats
    const totalMemoryThreads = await AgentMemory.countDocuments({ userId: user._id });

    return NextResponse.json({
      success: true,
      stats: {
        problemsSolved: passedSubmissions.length,
        totalSubmissions: submissions.length,
        totalCredits,
        aiSessionCount: totalMemoryThreads,
        practiceTimeMinutes: submissions.length * 8, // estimate: 8 min per attempt
      },
      skillProgress,
      careerReadiness,
      isRestricted: user.subscriptionTier === 'FREE',
      aiQueriesRemaining: user.aiQueriesRemaining,
      subscriptionTier: user.subscriptionTier,
    });

  } catch (err) {
    console.error('[DASHBOARD METRICS ERROR]', err);
    return NextResponse.json({ error: 'Failed to load metrics' }, { status: 500 });
  }
}
