"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/dashboard/Card';
import { ArrowLeft, Lock, CheckCircle2, Play, Trophy, Code2, Award, Star, Loader2 } from 'lucide-react';
import { ProgressBar } from '@/components/dashboard/ProgressBar';

export default function TrackDetailsPage() {
  const params = useParams();
  const trackId = params?.trackId as string;
  const isDevOps = trackId === 'track-b-devops';
  const trackTitle = isDevOps ? "DevOps, CI/CD & VC" : "Software Engineering & DSA";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress/${trackId}`);
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
    if (trackId) fetchProgress();
  }, [trackId]);

  if (loading) {
     return (
       <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
     );
  }

  const curriculum = data?.modules || [];
  const progressPercent = data ? Math.round((data.completedCount / data.totalCount) * 100) : 0;
  const rank = "Silver III"; // could be derived from credits

  return (
    <div className="space-y-8 pb-12 pr-4 relative">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard" className="p-2 bg-surface hover:bg-surface-hover rounded-md border border-surface-border text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">Track Curriculum</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-border">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white">{trackTitle}</h1>
          <p className="text-[14px] text-gray-400 font-medium max-w-2xl">Complete all sequential challenges to unlock the Capstone Project and earn your verified certification for your resume.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-surface border border-surface-border p-4 rounded-xl flex items-center gap-3 min-w-[140px]">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-0.5">Credits</p>
              <p className="text-xl font-bold text-white font-mono">{data?.totalCreditsEarned || 0}</p>
            </div>
          </div>
          <div className="bg-gradient-premium border border-primary/30 p-4 rounded-xl flex items-center gap-3 min-w-[140px]">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-0.5">Rank</p>
              <p className="text-xl font-bold text-white font-mono">{rank}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <div className="xl:col-span-2 space-y-4 relative">
          {/* Vertical connection line */}
          <div className="absolute left-[27px] top-6 bottom-8 w-0.5 bg-surface-border z-0"></div>

          {curriculum.map((module: any) => (
            <Card key={module.id} className={`p-4 pl-16 relative overflow-visible ${module.status === 'locked' ? 'opacity-60 grayscale filter' : ''}`}>
              {/* Node Indicator */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[54px] flex items-center justify-center z-10`}>
                 <div className={`w-8 h-8 rounded-full border-4 border-canvas flex items-center justify-center
                    ${module.status === 'completed' ? 'bg-green-500 text-white' : 
                      module.status === 'unlocked' ? 'bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 
                      'bg-surface-border text-gray-500'}`}
                 >
                    {module.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                     module.status === 'unlocked' ? <Play className="w-3.5 h-3.5 ml-0.5" /> : 
                     <Lock className="w-3.5 h-3.5" />}
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ml-2">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-400 font-medium">Difficulty: <span className="capitalize">{module.difficulty}</span> &bull; Topic: {module.topicConcept}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-bold tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">+{module.credits} CR</span>
                  {module.status === 'completed' ? (
                     <button className="px-4 py-2 bg-surface text-gray-300 rounded text-xs font-bold w-full sm:w-28 text-center" disabled>Review</button>
                  ) : module.status === 'unlocked' ? (
                     <Link href={`/arena/${module.id}`} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded shadow-md text-xs font-bold w-full sm:w-28 text-center transition-colors block">
                       Start Task
                     </Link>
                  ) : (
                     <button className="px-4 py-2 bg-surface-border text-gray-500 rounded flex items-center justify-center gap-1.5 text-xs font-bold w-full sm:w-28 cursor-not-allowed">
                       <Lock className="w-3 h-3" /> Locked
                     </button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* 🏁 THE CAPSTONE PROJECT NODE */}
          <div className="relative mt-12 pl-16">
             <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[54px] flex items-center justify-center z-10`}>
                 <div className="w-10 h-10 rounded-xl bg-purple-600 border-4 border-canvas flex items-center justify-center text-white shadow-[0_0_20px_rgba(147,51,234,0.6)]">
                    <Award className="w-5 h-5" />
                 </div>
              </div>

             <div className="glass-card rounded-2xl border-2 border-purple-500/50 p-6 bg-gradient-premium relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full"></div>
               <span className="text-[10px] bg-purple-500/20 text-purple-300 uppercase tracking-widest font-extrabold px-3 py-1 rounded inline-block mb-3">Resume Capstone</span>
               <h2 className="text-2xl font-bold text-white mb-2">{isDevOps ? "Automate Zero-Downtime Microservice Deployment" : "Build a Concurrent Distributed Web Scraper"}</h2>
               <p className="text-sm text-gray-300 mb-6 font-medium max-w-xl">
                 Applying everything from this track, build a full end-to-end production setup. Completing this module yields a verified portfolio credential.
               </p>
               
               <button className="px-6 py-3 bg-surface hover:bg-surface-hover border border-purple-500/50 text-white rounded-md text-sm font-bold tracking-wide transition-colors flex items-center gap-2">
                 <Lock className="w-4 h-4 text-purple-400" /> Unlock by completing all previous modules
               </button>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">Track Progress</h3>
            <ProgressBar label="Overall Completion" progress={progressPercent} colorClass={isDevOps ? "bg-purple-500" : "bg-primary"} />
            
            <div className="mt-8 pt-6 border-t border-surface-border">
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">Rankings</h4>
               <ul className="space-y-3">
                 {['@alex_dev', '@sarah_codes', '@jamie_ops'].map((user, i) => (
                   <li key={i} className="flex items-center justify-between text-sm">
                     <span className="text-gray-300 font-medium">{i+1}. {user}</span>
                     <span className="text-yellow-500 font-mono text-xs">{1200 - (i * 150)} CR</span>
                   </li>
                 ))}
               </ul>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
