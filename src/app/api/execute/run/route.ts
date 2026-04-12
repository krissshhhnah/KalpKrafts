/**
 * POST /api/execute/run
 * Runs code via Piston Sandbox API without recording a submission.
 * Used for the "Run" button — test-only, no DB writes.
 */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const PISTON_API = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_MAP: Record<string, { language: string; version: string; ext: string }> = {
  python: { language: 'python', version: '3.10.0', ext: 'py' },
  javascript: { language: 'javascript', version: '18.15.0', ext: 'js' },
  typescript: { language: 'typescript', version: '5.0.3', ext: 'ts' },
  java: { language: 'java', version: '15.0.2', ext: 'java' },
  cpp: { language: 'c++', version: '10.2.0', ext: 'cpp' },
  c: { language: 'c', version: '10.2.0', ext: 'c' },
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { language = 'python', sourceCode, stdin = '' } = await req.json();

    if (!sourceCode) {
      return NextResponse.json({ error: 'sourceCode is required' }, { status: 400 });
    }

    const langConfig = LANGUAGE_MAP[language] || LANGUAGE_MAP['python'];

    const payload = {
      language: langConfig.language,
      version: langConfig.version,
      files: [{ name: `main.${langConfig.ext}`, content: sourceCode }],
      stdin,
      run_timeout: 5000,  // 5s max execution time
      compile_timeout: 10000,
    };

    const pistonRes = await fetch(PISTON_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!pistonRes.ok) {
      return NextResponse.json({ error: 'Sandbox execution failed', success: false }, { status: 502 });
    }

    const data = await pistonRes.json();

    return NextResponse.json({
      success: true,
      output: data.run?.stdout || '',
      stderr: data.run?.stderr || '',
      exitCode: data.run?.code ?? 0,
      language: langConfig.language,
    });

  } catch (err) {
    console.error('[EXECUTE RUN ERROR]', err);
    return NextResponse.json({ error: 'Execution failed. Sandbox unavailable.' }, { status: 500 });
  }
}
