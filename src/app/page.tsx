"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Users, Building2, Terminal, ShieldCheck, Database } from 'lucide-react';

export default function LandingPage() {
  const [audience, setAudience] = useState<'developer' | 'institution'>('developer');

  return (
    <div className="min-h-screen bg-canvas text-gray-200 selection:bg-primary/30 selection:text-white">
      {/* Dynamic Background Glows */}
      <div className={`absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20 blur-[120px] transition-colors duration-1000 ${audience === 'developer' ? 'bg-primary' : 'bg-purple-600'}`}></div>

      {/* Navigation */}
      <header className="border-b border-surface-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-white transition-colors duration-500 ${audience === 'developer' ? 'bg-primary' : 'bg-purple-600'}`}>
              K
            </div>
            <span className="font-bold text-lg tracking-tight text-white">KalpKrafts</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/auth/signin" className="text-gray-400 hover:text-white transition-colors">Sign In</Link>
            <Link 
              href={audience === 'developer' ? '/auth/register' : '/pricing/enterprise'}
              className={`px-4 py-2 text-white rounded transition-colors shadow-sm font-bold tracking-wide ${audience === 'developer' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {audience === 'developer' ? 'Sign Up for Free' : 'Request Demo'}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 relative z-10 flex flex-col items-center">
        
        {/* Toggle Pill */}
        <div className="flex p-1 bg-surface border border-surface-border rounded-full mb-12 relative shadow-lg">
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ${audience === 'developer' ? 'left-1 bg-surface-hover border border-primary/30' : 'left-[calc(50%+3px)] bg-surface-hover border border-purple-500/30'}`}></div>
          <button 
            onClick={() => setAudience('developer')}
            className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${audience === 'developer' ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
          >
            For Developers
          </button>
          <button 
            onClick={() => setAudience('institution')}
            className={`relative z-10 px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${audience === 'institution' ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            For Institutions
          </button>
        </div>

        {/* Dynamic Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16 h-[220px]">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white transition-all duration-500">
            {audience === 'developer' ? 'Prepare for your dream tech job.' : 'Scale your technical hiring & training.'}
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed transition-all duration-500 max-w-3xl mx-auto">
            {audience === 'developer' 
              ? 'Join a community of elite engineers. Practice coding, conquer real-world algorithmic challenges, and get hired by the best.'
              : 'Assess, upskill, and hire the next generation of engineers with real-world sandboxes and AI-proctored assignments.'}
          </p>
        </div>

        {/* Dynamic CTA */}
        <div className="flex justify-center gap-4 mb-24">
          <Link 
            href={audience === 'developer' ? '/auth/register' : '/pricing/enterprise'}
            className={`px-8 py-4 text-white text-lg rounded-md font-bold transition-all shadow-lg ${audience === 'developer' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'}`}
          >
            {audience === 'developer' ? 'Sign Up & Code' : 'Contact Sales'}
          </Link>
          <Link 
            href={audience === 'developer' ? '/auth/register' : '/pricing/enterprise'}
            className="px-8 py-4 bg-surface text-gray-300 border border-surface-border hover:bg-surface-hover rounded-md text-lg font-bold transition-colors"
          >
            {audience === 'developer' ? 'Create an Account' : 'View Enterprise Features'}
          </Link>
        </div>

        {/* Value Prop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {audience === 'developer' ? (
             <>
               <div className="glass-card p-8 rounded-xl border-t-2 border-t-primary text-center">
                 <div className="w-12 h-12 bg-primary/10 mx-auto rounded-xl flex items-center justify-center mb-6">
                   <Terminal className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Real-World Environments</h3>
                 <p className="text-sm text-gray-400">Not just algorithms. Debug full-stack applications, fix memory leaks, and master enterprise Git workflows.</p>
               </div>
               <div className="glass-card p-8 rounded-xl border-t-2 border-t-primary text-center">
                 <div className="w-12 h-12 bg-primary/10 mx-auto rounded-xl flex items-center justify-center mb-6">
                   <Code2 className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Advanced Arena</h3>
                 <p className="text-sm text-gray-400">Battle-tested IDE interface mapping exactly to industry standards, featuring auto-complete and multi-file support.</p>
               </div>
               <div className="glass-card p-8 rounded-xl border-t-2 border-t-primary text-center">
                 <div className="w-12 h-12 bg-primary/10 mx-auto rounded-xl flex items-center justify-center mb-6">
                   <Building2 className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Get Hired</h3>
                 <p className="text-sm text-gray-400">Your "Career Readiness" meter tracks your progression. Prove your skills and unlock direct placement tracks.</p>
               </div>
             </>
          ) : (
             <>
               <div className="glass-card p-8 rounded-xl border-t-2 border-t-purple-500 text-center">
                 <div className="w-12 h-12 bg-purple-500/10 mx-auto rounded-xl flex items-center justify-center mb-6">
                   <ShieldCheck className="w-6 h-6 text-purple-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Fair Assessments</h3>
                 <p className="text-sm text-gray-400">Identify strong developers using our secure, proctored testing environment with industrial-grade plagiarism detection.</p>
               </div>
               <div className="glass-card p-8 rounded-xl border-t-2 border-t-purple-500 text-center">
                 <div className="w-12 h-12 bg-purple-500/10 mx-auto rounded-xl flex items-center justify-center mb-6">
                   <Users className="w-6 h-6 text-purple-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Internal Mobility</h3>
                 <p className="text-sm text-gray-400">Upskill your existing team. Utilize the AI Coach to dynamically mentor your junior developers into senior roles.</p>
               </div>
               <div className="glass-card p-8 rounded-xl border-t-2 border-t-purple-500 text-center">
                 <div className="w-12 h-12 bg-purple-500/10 mx-auto rounded-xl flex items-center justify-center mb-6">
                   <Database className="w-6 h-6 text-purple-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">Actionable Insights</h3>
                 <p className="text-sm text-gray-400">Gain deep analytics into how candidates write code, debug failures, and communicate architecture decisions.</p>
               </div>
             </>
          )}
        </div>
      </main>
    </div>
  );
}
