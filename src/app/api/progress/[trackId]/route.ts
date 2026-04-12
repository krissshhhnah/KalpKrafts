/**
 * GET /api/progress/[trackId]
 * Returns a user's progress for a specific track including
 * which modules are completed, unlocked, or locked.
 */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import Progress from '@/models/Progress';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CHALLENGES } from '@/lib/challenges';

export async function GET(req: NextRequest, { params }: { params: { trackId: string } }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { trackId } = params;
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    let progress = await Progress.findOne({ userId: user._id, trackId });

    // Automatically initialize progress for this track if first visit
    if (!progress) {
      const firstChallenge = CHALLENGES.find(c => c.trackId === trackId && c.moduleIndex === 1);
      progress = await Progress.create({
        userId: user._id,
        trackId,
        unlockedModules: firstChallenge ? [firstChallenge.id] : [],
        completedModules: [],
        totalCreditsEarned: 0,
      });
    }

    const trackChallenges = CHALLENGES.filter(c => c.trackId === trackId).sort((a, b) => a.moduleIndex - b.moduleIndex);

    const modules = trackChallenges.map(c => ({
      id: c.id,
      title: c.title,
      difficulty: c.difficulty,
      topicConcept: c.topicConcept,
      credits: c.credits,
      tags: c.tags,
      moduleIndex: c.moduleIndex,
      status: progress!.completedModules.includes(c.id)
        ? 'completed'
        : progress!.unlockedModules.includes(c.id)
          ? 'unlocked'
          : 'locked',
    }));

    return NextResponse.json({
      success: true,
      trackId,
      totalCreditsEarned: progress.totalCreditsEarned,
      completedCount: progress.completedModules.length,
      totalCount: trackChallenges.length,
      modules,
    });

  } catch (err) {
    console.error('[PROGRESS ERROR]', err);
    return NextResponse.json({ error: 'Failed to load track progress' }, { status: 500 });
  }
}
