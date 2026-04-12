import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, PieChart, Users } from 'lucide-react';

export default function EnterprisePricingPage() {
  return (
    <div className="py-20 px-6 lg:px-12 w-full flex flex-col items-center min-h-[80vh] relative overflow-hidden bg-canvas">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] glow-ray pointer-events-none rounded-full opacity-30"></div>
      
      <div className="text-center mb-16 relative z-10 w-full max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Scale Your Tech Hiring & Training</h1>
        <p className="text-lg text-gray-400 font-medium leading-relaxed">
          The definitive Enterprise Developer Skills Platform. Upskill your internal workforce or evaluate thousands of candidates automatically with AI-driven, real-world engineering instances.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full max-w-6xl mb-16">
        <div className="glass-card p-6 border border-surface-border flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
             <Users className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Internal Up-skilling</h3>
          <p className="text-sm text-gray-400">Deploy custom algorithmic challenges and architecture labs to identify skill gaps in your engineering org.</p>
        </div>
        
        <div className="glass-card p-6 border border-surface-border flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
             <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Automated Assessments</h3>
          <p className="text-sm text-gray-400">Conduct take-home testing backed by AI-monitored proctoring and comprehensive plagiarism detection.</p>
        </div>

        <div className="glass-card p-6 border border-surface-border flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
             <PieChart className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Readiness Metrics</h3>
          <p className="text-sm text-gray-400">Receive precise analytics on candidate performance across system design, code quality, and debugging speed.</p>
        </div>
      </div>

      {/* The Mega Enterprise Card */}
      <div className="glass-card p-8 md:p-12 border-2 border-purple-500/50 rounded-2xl w-full max-w-4xl relative z-10 bg-gradient-premium">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1">
             <h2 className="text-3xl font-extrabold text-white mb-4">B2B Institutional License</h2>
             <p className="text-gray-300 font-medium mb-6">Designed for universities and enterprise HR teams looking to supercharge technical sourcing.</p>
             <ul className="space-y-3 mb-8 text-sm text-white font-semibold">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Custom Platform Branding (White-labeling)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Arbitrary Bulk Account Provisioning</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Live Pair-Programming Interview Module</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400" /> ATS Integrations (Workday, Greenhouse, etc.)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-400" /> Dedicated Technical Account Manager</li>
             </ul>
          </div>
          <div className="bg-canvas border border-surface-border p-8 rounded-xl min-w-[300px] text-center shadow-2xl">
             <h3 className="text-xl font-bold text-white mb-2">Custom Pricing</h3>
             <p className="text-sm text-gray-500 mb-8">Tailored strictly to your organizational volume and infrastructure needs.</p>
             <button className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-md text-sm font-bold tracking-wide transition-colors mb-4">
                Request a Demo
             </button>
             <button className="w-full py-4 bg-canvas border border-surface-border text-white hover:bg-surface-hover rounded-md text-sm font-bold tracking-wide transition-colors">
                Contact Sales
             </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 relative z-10">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold">
           <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
