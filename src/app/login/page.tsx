import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas text-gray-200 p-4 relative overflow-hidden">
      {/* Intense glow ray for focus on auth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-ray pointer-events-none opacity-40"></div>

      <div className="w-full max-w-md glass-panel p-8 shadow-2xl relative z-10 rounded-xl">
        <div className="text-center mb-10">
          <div className="w-10 h-10 rounded border border-primary/40 mx-auto flex items-center justify-center font-bold text-lg text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-6 bg-surface">
            K
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white m-0">Welcome back</h2>
          <p className="text-gray-400 text-[13px] mt-2">Sign in to your training ecosystem.</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-gray-300 mb-1.5 ml-1">Email</label>
            <input
              type="email"
              placeholder="developer@example.com"
              className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-gray-600"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1 pr-1">
              <label className="block text-[13px] font-medium text-gray-300">Password</label>
              <Link href="#" className="text-[11px] text-blue-400 hover:text-blue-300">Forgot password?</Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-gray-600"
            />
          </div>
          
          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors mt-2 text-sm shadow-sm">
            Sign In
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <span className="border-b border-surface-border w-1/4"></span>
          <span className="text-[11px] text-center text-gray-500 uppercase font-semibold">Or continue with</span>
          <span className="border-b border-surface-border w-1/4"></span>
        </div>

        <div className="mt-6">
          <button type="button" className="w-full flex items-center justify-center gap-3 bg-surface border border-surface-border hover:bg-surface-hover hover:border-gray-500 text-gray-300 font-medium py-2.5 rounded-md transition-colors text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google OAuth
          </button>
        </div>

        <p className="mt-8 text-center text-[13px] text-gray-400">
          Not a developer yet? <Link href="/register" className="text-blue-400 hover:text-blue-300 ml-1 font-medium">Apply here</Link>
        </p>
      </div>
    </div>
  );
}
