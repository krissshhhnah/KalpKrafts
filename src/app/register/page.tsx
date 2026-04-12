import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas text-gray-200 p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-ray pointer-events-none opacity-40"></div>

      <div className="w-full max-w-md glass-panel p-8 shadow-2xl relative z-10 rounded-xl">
        <div className="text-center mb-10">
          <div className="w-10 h-10 rounded border border-primary/40 mx-auto flex items-center justify-center font-bold text-lg text-primary shadow-sm mb-6 bg-surface">
            K
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white m-0">Join KalpKrafts</h2>
          <p className="text-gray-400 text-[13px] mt-2">Start your journey to becoming a Senior Engineer.</p>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-[13px] font-medium text-gray-300 mb-1.5 ml-1">First Name</label>
               <input
                 type="text"
                 placeholder="Jane"
                 className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-gray-600"
               />
             </div>
             <div>
               <label className="block text-[13px] font-medium text-gray-300 mb-1.5 ml-1">Last Name</label>
               <input
                 type="text"
                 placeholder="Doe"
                 className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-gray-600"
               />
             </div>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-gray-300 mb-1.5 ml-1">University / College Email</label>
            <input
              type="email"
              placeholder="student@university.edu"
              className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-gray-600"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-gray-300 mb-1.5 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface border border-surface-border rounded-md px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm placeholder:text-gray-600"
            />
          </div>
          
          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors mt-4 text-sm shadow-sm">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-[13px] text-gray-400">
          Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300 ml-1 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
