import { NextResponse } from 'next/server';
import { CHALLENGES } from '@/lib/challenges';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Progress from '@/models/Progress';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get('trackId');

    // Get user's progress across all tracks
    const progressRecords = user ? await Progress.find({ userId: user._id }) : [];
    const completedSet = new Set(progressRecords.flatMap(p => p.completedModules));
    const unlockedSet = new Set(progressRecords.flatMap(p => p.unlockedModules));

    let challenges = CHALLENGES;
    if (trackId) challenges = challenges.filter(c => c.trackId === trackId);

    // Strip hidden test cases from the API response — security!
    const sanitized = challenges.map(c => ({
      id: c.id,
      trackId: c.trackId,
      moduleIndex: c.moduleIndex,
      title: c.title,
      difficulty: c.difficulty,
      topicConcept: c.topicConcept,
      problemStatement: c.problemStatement,
      boilerplate: c.boilerplate,
      credits: c.credits,
      tags: c.tags,
      sampleTestCases: c.testCases.slice(0, 2), // Only expose first 2 test cases
      status: completedSet.has(c.id)
        ? 'completed'
        : unlockedSet.has(c.id) || c.moduleIndex === 1
          ? 'unlocked'
          : 'locked',
    }));

    return NextResponse.json({ success: true, challenges: sanitized });
  } catch (err) {
    console.error('[PROBLEMS ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 });
  }
}
