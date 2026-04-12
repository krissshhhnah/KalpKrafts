import Link from 'next/link';
import { Card } from '@/components/dashboard/Card';
import { Code2, Cog, ArrowRight, ShieldCheck, Database, Award } from 'lucide-react';

export default function TracksHubPage() {
  const tracks = [
    {
      id: "track-a-dsa",
      title: "Software Engineering & DSA",
      description: "Master Data Structures, advanced algorithmic patterns, and complex System Design through sequential tests.",
      icon: Code2,
      progress: 65,
      modules: 12,
      earnedStars: 450,
      color: "blue",
      locked: false,
    },
    {
      id: "track-b-devops",
      title: "DevOps, CI/CD & VC",
      description: "Conquer Version Control branching, GitHub Actions, Dockerization, and automated Zero-Downtime deployments.",
      icon: Cog,
      progress: 10,
      modules: 8,
      earnedStars: 120,
      color: "purple",
      locked: false,
    },
    {
      id: "track-c-backend",
      title: "Distributed Backend Architecture",
      description: "Build rate-limiters, implement caching layers (Redis), and manage microservice saga patterns.",
      icon: Database,
      progress: 0,
      modules: 15,
      earnedStars: 0,
      color: "green",
      locked: true, // Example of a locked advanced track requiring Pro
    }
  ];

  return (
    <div className="space-y-8 pb-12 pr-4">
      <div className="pb-6 border-b border-surface-border">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white">Preparation Tracks</h1>
        <p className="text-[14px] text-gray-400 font-medium max-w-3xl">Follow structured curriculums mapping exactly to industry needs. Unlock real-world Capstone Projects by conquering sequential coding challenges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => {
          const Icon = track.icon;
          const bgColors: Record<string, string> = {
            blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
            purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
            green: "bg-green-500/10 border-green-500/30 text-green-400"
          };
          
          return (
            <Card key={track.id} className="flex flex-col relative group">
              {track.locked && (
                <div className="absolute inset-0 bg-canvas/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center rounded-xl">
                   <ShieldCheck className="w-8 h-8 text-primary mb-2" />
                   <span className="text-sm font-bold text-white mb-2">Pro Track Locked</span>
                   <Link href="/pricing/developer" className="text-[11px] uppercase tracking-widest bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1.5 rounded font-bold transition-colors">Unlock Pro</Link>
                </div>
              )}
              
              <div className="p-6 flex-grow">
                 <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center border ${bgColors[track.color]}`}>
                   <Icon className="w-6 h-6" />
                 </div>
                 <h2 className="text-lg font-bold text-white mb-2">{track.title}</h2>
                 <p className="text-xs text-gray-400 leading-relaxed mb-6">{track.description}</p>
                 
                 <div className="flex items-center gap-4 text-xs font-medium text-gray-300 mb-6">
                   <div className="flex items-center gap-1.5">
                     <span className="text-white font-mono">{track.modules}</span> Modules
                   </div>
                   <div className="w-1 h-1 rounded-full bg-surface-border"></div>
                   <div className="flex items-center gap-1.5 text-yellow-500">
                     <Award className="w-3.5 h-3.5" /> <span className="font-mono">{track.earnedStars}</span> Stars
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <div className="flex justify-between text-xs font-semibold">
                     <span className="text-gray-400">Progress</span>
                     <span className="text-white font-mono">{track.progress}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden">
                     <div 
                       className={`h-full rounded-full transition-all duration-1000 ${track.color === 'blue' ? 'bg-blue-500' : track.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'}`}
                       style={{ width: `${track.progress}%` }}
                     />
                   </div>
                 </div>
              </div>
              
              <div className="border-t border-surface-border p-4 bg-surface-hover/30">
                <Link href={track.locked ? "#" : `/tracks/${track.id}`} className="flex items-center justify-between group-hover:text-white text-gray-400 transition-colors text-sm font-semibold">
                  <span>View Curriculum</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
