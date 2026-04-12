import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function DeveloperPricingPage() {
  return (
    <div className="py-20 px-6 lg:px-12 w-full flex flex-col items-center min-h-[80vh] relative overflow-hidden bg-canvas">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] glow-ray-intense pointer-events-none rounded-full opacity-30"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Invest in Your Engineering Career</h1>
        <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">Master interview skills, get unlimited AI coaching, and unlock production-grade cloud environments to stand out to top tech companies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full max-w-4xl">
        {/* Free Tier */}
        <div className="glass-card p-8 rounded-xl border border-surface-border">
          <h2 className="text-2xl font-bold text-white mb-2">Community</h2>
          <div className="text-4xl font-extrabold text-white mb-6">$0<span className="text-lg text-gray-500 font-medium tracking-normal">/forever</span></div>
          <p className="text-sm text-gray-400 mb-8 h-10">Perfect for students starting their competitive programming journey.</p>
          
          <ul className="space-y-4 mb-8 text-sm text-gray-300">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Basic DSA Arena</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> 10 AI Coach requests / month</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Standard Interview Prep</li>
          </ul>

          <Link href="/register" className="block text-center w-full py-3 bg-surface hover:bg-surface-hover border border-surface-border text-white rounded-md text-sm font-bold tracking-wide transition-colors">
            Get Started Free
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="glass-card p-8 rounded-xl border-2 border-primary relative overflow-hidden transform md:-translate-y-4 shadow-[0_0_40px_rgba(99,102,241,0.15)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>
          <span className="absolute top-0 right-8 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-b-md">Most Popular</span>
          
          <h2 className="text-2xl font-bold text-white mb-2">Pro Developer</h2>
          <div className="text-4xl font-extrabold text-primary mb-6">$15<span className="text-lg text-gray-500 font-medium tracking-normal">/month</span></div>
          <p className="text-sm text-gray-400 mb-8 h-10">For serious engineers preparing for FAANG interviews and real-world system design.</p>
          
          <ul className="space-y-4 mb-8 text-sm text-white font-medium">
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Everything in Community</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited AI Mentorship</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Full DevOps & Git Sandboxes</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Personal Career Readiness Analysis</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Premium System Design Courses</li>
          </ul>

          <button className="block text-center w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-md text-sm font-bold tracking-wide transition-colors shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            Upgrade to Pro
          </button>
        </div>
      </div>
      
      <div className="mt-16 relative z-10">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold">
           <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
