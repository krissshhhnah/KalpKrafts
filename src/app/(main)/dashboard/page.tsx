"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/dashboard/Card';
import { ArrowRight, Lock, Code2, Bug, GitBranch, Terminal, Mic, Shield, ChevronDown, CheckCircle2 } from 'lucide-react';

// Specialized SVG Gauge for the Career Readiness dial
const GaugeDial = ({ percentage }: { percentage: number }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const semioffset = circumference / 2;
  const strokeDashoffset = semioffset - (percentage / 100) * semioffset;
  
  return (
    <div className="relative w-40 h-24 mx-auto flex justify-center overflow-hidden">
      <svg height="150" width="150" className="absolute top-0 transform -rotate-180">
        <circle
           stroke="rgba(255,255,255,0.05)"
           fill="transparent"
           strokeWidth={stroke}
           strokeDasharray={`${semioffset} ${circumference}`}
           r={normalizedRadius}
           cx="75"
           cy="75"
        />
        <circle
           stroke="#5c6fff"
           fill="transparent"
           strokeWidth={stroke}
           strokeDasharray={`${semioffset} ${circumference}`}
           style={{ strokeDashoffset }}
           strokeLinecap="round"
           r={normalizedRadius}
           cx="75"
           cy="75"
           className="drop-shadow-[0_0_12px_rgba(92,111,255,0.8)] transition-all duration-1000"
        />
      </svg>
      {percentage < 100 && (
        <div className="absolute bottom-4 text-white z-10 w-8 h-8 rounded bg-surface border border-surface-border flex items-center justify-center shadow-lg">
          <Lock className="w-4 h-4" />
        </div>
      )}
      <div className="absolute top-4 w-52 h-40 bg-primary/20 blur-[40px] pointer-events-none rounded-t-full z-0"></div>
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1200px] w-full mx-auto px-6 py-8 flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-surface-border w-1/4 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-surface rounded-xl"></div>)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
           <div className="xl:col-span-2 h-[400px] bg-surface rounded-xl"></div>
           <div className="h-[400px] bg-surface rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Fallback defaults if metrics fail
  const stats = data?.stats || { problemsSolved: 0, totalSubmissions: 0, totalCredits: 0, aiSessionCount: 0, practiceTimeMinutes: 0 };
  const skillProgress = data?.skillProgress || [];
  const careerReadiness = data?.careerReadiness || 0;
  const isRestricted = data?.isRestricted || false;

  return (
    <div className="max-w-[1200px] w-full mx-auto px-6 py-8 space-y-6">
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md">Dashboard</h1>
        
        <div className="flex items-center gap-4 bg-surface p-1.5 rounded-full border border-surface-border/50">
           <div className="px-3 flex items-center gap-2 border-r border-surface-border">
              <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)] animate-pulse"></span>
              <span className="text-sm font-semibold text-white">{stats.totalCredits} CR</span>
           </div>
           <div className="flex items-center gap-2 pr-2">
             <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
               K
             </div>
             <span className="text-xs font-semibold text-gray-300 capitalize">{data?.subscriptionTier || 'Free'}</span>
             <ChevronDown className="w-3 h-3 text-gray-500" />
           </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Problems Solved", value: stats.problemsSolved, color: "blue" },
          { title: "Total Submissions", value: stats.totalSubmissions, color: "blue" },
          { title: "AI Sessions", value: stats.aiSessionCount, color: "purple" },
          { title: "Practice Time", value: `${Math.floor(stats.practiceTimeMinutes / 60)}h ${stats.practiceTimeMinutes % 60}m`, color: "purple" }
        ].map((metric, i) => (
          <Card key={i} className={`p-5 relative overflow-hidden group ${metric.color === 'blue' ? 'border-primary/10' : 'border-purple-500/10'}`}>
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none opacity-40 transition-opacity group-hover:opacity-60 blur-[30px] ${metric.color === 'blue' ? 'bg-primary' : 'bg-purple-600'}`}></div>
            <div className="flex justify-between items-start mb-2 relative z-10">
              <span className="text-[11px] font-medium text-gray-400 capitalize">{metric.title}</span>
              <ChevronDown className="w-3 h-3 text-gray-600" />
            </div>
            <div className="relative z-10">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Continue Learning */}
          <div className="glass-card rounded-2xl relative overflow-hidden border border-purple-500/20 w-full group">
             <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-purple-600/30 blur-[80px] rounded-full pointer-events-none transition-all group-hover:bg-purple-600/40"></div>
             
             <div className="p-6">
               <h3 className="text-sm font-semibold text-gray-300 mb-6 relative z-10">Continue Learning</h3>
               
               <div className="flex flex-col sm:flex-row items-center justify-between bg-black/20 p-4 rounded-xl border border-white/5 backdrop-blur-md relative z-10">
                 <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-premium border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(92,111,255,0.4)]">
                        <Terminal className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                    <div>
                      <h4 className="text-md font-bold text-white mb-0.5">Software Engineering & DSA</h4>
                      <p className="text-[11px] text-gray-400">Track Curriculum Active</p>
                    </div>
                 </div>
                 
                 <Link href="/tracks/track-a-sde" className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-purple-500 hover:from-primary-dark hover:to-purple-600 text-white rounded-lg text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(111,48,255,0.4)] transition-all flex items-center justify-center gap-2">
                   Jump In <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
             </div>
          </div>

          {/* Skill Progress Dashboard */}
          <Card className="p-6">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-sm font-semibold text-white">Concept Completion</h3>
               <div className="flex items-center gap-2 bg-surface px-2 py-1 rounded text-xs text-gray-400 border border-surface-border">
                 <span>Global Scope</span>
               </div>
             </div>

             <div className="space-y-6">
               {skillProgress.length > 0 ? skillProgress.map((skill: any, i: number) => {
                 const icons: Record<string, any> = { 'Arrays & Hashing': Code2, 'Two Pointers': Code2, 'DevOps': Terminal };
                 const Icon = icons[skill.concept] || Bug;
                 return (
                 <div key={i} className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-gray-400 border border-surface-border/50 shrink-0">
                     <Icon className="w-4 h-4" />
                   </div>
                   <div className="w-32 text-sm font-medium text-gray-300">{skill.concept}</div>
                   
                   <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden shrink-0">
                     <div 
                       className={`h-full rounded-full shadow-[0_0_8px_currentColor] bg-blue-500`}
                       style={{ width: `${skill.percent}%` }}
                     ></div>
                   </div>
                   <div className="w-10 text-right text-xs font-mono text-gray-400 shrink-0">{skill.percent}%</div>
                 </div>
                 );
               }) : (
                 <div className="text-center text-gray-500 text-sm py-4">No completed concepts yet. Start a track!</div>
               )}
             </div>
          </Card>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* AI Mentor */}
          <Card className="p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[30px] rounded-full pointer-events-none"></div>
             <div className="flex justify-between items-center mb-4 relative z-10">
               <h3 className="text-sm font-semibold text-white">Ask Your AI Mentor</h3>
               <ChevronDown className="w-4 h-4 text-gray-500" />
             </div>
             
             <div className="relative mb-3 z-10">
               <input 
                 type="text" 
                 placeholder="Feature available inside the Arena..." 
                 className="w-full bg-surface border border-surface-border/50 text-white text-xs px-4 py-3 rounded-lg focus:outline-none transition-colors"
                 disabled
               />
               <Mic className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
             </div>
             <p className="text-xs text-gray-500 font-medium">Head to any Coding Challenge to chat with the AI.</p>
          </Card>

          {/* Career Readiness */}
          <Card className="p-6 relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 blur-[40px] rounded-full pointer-events-none"></div>
             <div className="flex justify-between items-center mb-6 relative z-10">
               <h3 className="text-sm font-semibold text-white">Career Readiness</h3>
               <ChevronDown className="w-4 h-4 text-gray-500" />
             </div>
             
             <div className="flex justify-between items-end mb-4 relative z-10">
               <div>
                 <div className="text-4xl font-bold text-white mb-1">{careerReadiness}%</div>
                 <div className="text-[11px] text-gray-400 font-medium">{careerReadiness === 100 ? 'Job ready!' : 'In Progress'}</div>
               </div>
               
               <GaugeDial percentage={careerReadiness} />
             </div>
             
             {isRestricted && (
              <div className="mt-6 pt-6 border-t border-surface-border/50 relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                     <Shield className="w-4 h-4 text-primary animate-pulse" />
                     <h4 className="text-sm font-bold text-white">Readiness Capped</h4>
                  </div>
                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">Your Career Readiness score is capped at 68% on the Free tier. Upgrade to unlock full metrics.</p>
                  <Link href="/pricing/developer" className="block w-full py-3 bg-gradient-to-r from-primary/80 to-purple-600/80 hover:from-primary hover:to-purple-500 text-white rounded-lg text-[13px] font-bold tracking-wide shadow-[0_0_20px_rgba(92,111,255,0.3)] transition-all text-center">
                    Upgrade to Premium &gt;
                  </Link>
              </div>
             )}
          </Card>

        </div>
      </div>
    </div>
  );
}
