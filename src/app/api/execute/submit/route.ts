/**
 * POST /api/execute/submit
 * Official submission endpoint - runs code against hidden test cases,
 * records the Submission in MongoDB, and unlocks the next module on PASS.
 */
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Submission from '@/models/Submission';
import Progress from '@/models/Progress';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CHALLENGES } from '@/lib/challenges';

const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_MAP: Record<string, { language: string; version: string; ext: string }> = {
  python: { language: 'python', version: '3.10.0', ext: 'py' },
  javascript: { language: 'javascript', version: '18.15.0', ext: 'js' },
  typescript: { language: 'typescript', version: '5.0.3', ext: 'ts' },
  java: { language: 'java', version: '15.0.2', ext: 'java' },
  cpp: { language: 'c++', version: '10.2.0', ext: 'cpp' },
  c: { language: 'c', version: '10.2.0', ext: 'c' },
};

async function runAgainstTestCase(sourceCode: string, language: string, stdin: string): Promise<string> {
  const langConfig = LANGUAGE_MAP[language] || LANGUAGE_MAP['python'];
  const res = await fetch(PISTON_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: langConfig.language,
      version: langConfig.version,
      files: [{ name: `main.${langConfig.ext}`, content: sourceCode }],
      stdin,
      run_timeout: 5000,
    }),
  });
  const data = await res.json();
  return (data.run?.stdout || '').trim();
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { challengeId, sourceCode, language = 'python' } = await req.json();
    if (!challengeId || !sourceCode) {
      return NextResponse.json({ error: 'challengeId and sourceCode are required' }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Find the challenge definition and its hidden test cases
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (!challenge) return NextResponse.json({ error: 'Challenge not found' }, { status: 404 });

    const start = Date.now();
    let passed = 0;
    const results: { input: string; expected: string; actual: string; pass: boolean; isHidden: boolean }[] = [];

    // Combine public and hidden test cases for secure rigorous grading
    const allExpectedTests = [...challenge.testCases, ...(challenge.hiddenTestCases || [])];

    // Run against each test case natively
    for (let i = 0; i < allExpectedTests.length; i++) {
      const tc = allExpectedTests[i];
      const actual = await runAgainstTestCase(sourceCode, language, tc.input);
      const pass = actual === tc.expected.trim();
      if (pass) passed++;
      results.push({ 
         input: i >= challenge.testCases.length ? 'HIDDEN' : tc.input, 
         expected: i >= challenge.testCases.length ? 'HIDDEN' : tc.expected, 
         actual: i >= challenge.testCases.length && !pass ? 'HIDDEN_OUTPUT' : actual, 
         pass,
         isHidden: i >= challenge.testCases.length
      });
    }

    const totalMs = Date.now() - start;
    const allPassed = passed === allExpectedTests.length;
    const status = allPassed ? 'PASS' : 'FAIL';

    // Record submission
    await Submission.create({
      userId: user._id,
      challengeId,
      code: sourceCode,
      language,
      status,
      executionTimeMs: totalMs,
    });

    // If all test cases pass → unlock next module in track AND grant Credits
    if (allPassed) {
      const trackId = challenge.trackId;
      const nextModuleId = challenge.nextModuleId;

      let progress = await Progress.findOne({ userId: user._id, trackId });
      if (!progress) {
        progress = new Progress({ userId: user._id, trackId, unlockedModules: [challenge.id], completedModules: [] });
      }

      // Ensure they don't farm credits by solving the exact same problem over and over
      if (!progress.completedModules.includes(challengeId)) {
        progress.completedModules.push(challengeId);
        
        // Grant the Credits Bounty
        user.credits = (user.credits || 0) + challenge.credits;
        await user.save();
      }
      
      if (nextModuleId && !progress.unlockedModules.includes(nextModuleId)) {
        progress.unlockedModules.push(nextModuleId);
        progress.totalCreditsEarned += challenge.credits;
      }
      await progress.save();
    }

    // Security: Do not expose hidden test cases back to the client if they failed
    const clientFeedback = status === 'FAIL' ? 'Hidden Test Cases Failed.' : '';

    return NextResponse.json({
      success: true,
      status,
      passed,
      total: allExpectedTests.length,
      executionTimeMs: totalMs,
      feedback: clientFeedback,
      results: results.filter(r => !r.isHidden || status === 'FAIL'),
    });

  } catch (err) {
    console.error('[SUBMIT ERROR]', err);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
