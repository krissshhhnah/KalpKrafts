"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 1. Create the account via our backend endpoint
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Registration failed');
      setLoading(false);
      return;
    }

    // 2. Automatically log them in now that the account exists!
    const loginRes = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (loginRes?.error) {
      setError('Account created, but auto-login failed. Please sign in manually.');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleOAuth = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-canvas text-gray-200 flex items-center justify-center p-6">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10 border-t-2 border-t-purple-500 shadow-xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-xl mx-auto mb-4 shadow-lg shadow-purple-600/20">
            K
          </div>
          <h1 className="text-2xl font-bold text-white">Create an Account</h1>
          <p className="text-gray-400 text-sm mt-2">Start your premium coding journey</p>
        </div>

        {error && (
          <div className="p-3 mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 mb-6">
          <button 
            onClick={() => handleOAuth('google')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-surface-border hover:bg-surface-hover rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.58c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            Sign up with Google
          </button>
          <button 
            onClick={() => handleOAuth('github')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-surface-border hover:bg-surface-hover rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Sign up with GitHub
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-border"></div></div>
          <div className="relative flex justify-center text-xs"><span className="bg-surface px-2 text-gray-500">Or register with email</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-border/30 border border-surface-border rounded px-4 py-2 text-sm text-gray-200 outline-none focus:border-purple-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-border/30 border border-surface-border rounded px-4 py-2 text-sm text-gray-200 outline-none focus:border-purple-500 transition-colors"
              placeholder="developer@kalpkrafts.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-border/30 border border-surface-border rounded px-4 py-2 text-sm text-gray-200 outline-none focus:border-purple-500 transition-colors"
              placeholder="•••••••• (Min 8 characters)"
              required
              minLength={8}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded transition-colors shadow-lg shadow-purple-600/20 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link href="/auth/signin" className="text-purple-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
