import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function UpgradePage() {
  return (
    <div className="py-12 px-6 lg:px-12 w-full flex flex-col items-center justify-center min-h-[80vh] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-ray-intense pointer-events-none rounded-full opacity-40"></div>
      
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">Choose Your Premium Track</h1>
        <p className="text-lg text-gray-400 font-medium max-w-xl">Unlock the full power of KalpKrafts with professional gap analyses, massive devops simulations, and enterprise code reviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full max-w-4xl">
        <div className="glass-card p-8 rounded-xl border-l-4 border-l-blue-500 hover:border-blue-400 transition-colors">
          <span className="text-[11px] bg-blue-500/20 text-blue-400 uppercase tracking-widest font-bold px-3 py-1 rounded inline-block mb-4">For Students</span>
          <h2 className="text-2xl font-bold text-white mb-2">Pro Developer</h2>
          <p className="text-sm text-gray-400 mb-6">Master interview skills, get unlimited AI coaching, and unlock cloud environments.</p>
          <button className="w-full py-3 bg-surface hover:bg-surface-hover border border-blue-500/50 text-blue-400 rounded-md text-sm font-bold tracking-wide shadow-sm transition-colors mb-4">
            Upgrade Personal Plan
          </button>
        </div>

        <div className="glass-card p-8 rounded-xl border-l-4 border-l-purple-500 hover:border-purple-400 transition-colors bg-gradient-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full"></div>
          <span className="text-[11px] bg-purple-500/20 text-purple-300 uppercase tracking-widest font-bold px-3 py-1 rounded inline-block mb-4">For Institutions</span>
          <h2 className="text-2xl font-bold text-white mb-2">B2B Core</h2>
          <p className="text-sm text-gray-400 mb-6">Bulk licenses, detailed student metrics, bespoke algorithmic task creation.</p>
          <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 border border-purple-500/50 text-white rounded-md text-sm font-bold tracking-wide shadow-lg transition-colors mb-4 relative z-10">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
      
      <div className="mt-12 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold">
           <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
