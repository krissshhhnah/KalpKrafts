"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bug, Bot, Briefcase, Map, GitBranch, BookOpen, LogOut, ChevronRight, Code2 } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Training Tracks', href: '/tracks', icon: Map },
  { name: 'Problems Hub', href: '/problems', icon: Code2 },
  { name: 'Debugging Lab', href: '/debug', icon: Bug },
  { name: 'Git & DevOps', href: '/devops', icon: GitBranch },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Careers', href: '/careers', icon: Briefcase },
  { name: 'Profile', href: '/profile', icon: ChevronRight, isSub: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-canvas border-r border-surface-border/50 h-screen sticky top-0 flex flex-col pt-6 pb-6 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.5)] z-40">
      
      {/* Branding */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-7 h-7 rounded border border-primary/30 bg-primary/10 flex items-center justify-center shadow-[0_0_15px_rgba(92,111,255,0.3)]">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#5c6fff"/>
              <path d="M2 17L12 22L22 17" stroke="#5c6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#5c6fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
        <span className="font-bold text-lg tracking-tight text-white drop-shadow-sm">KalpKrafts</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative group
                ${isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-surface/30'
                }
              `}
            >
              {/* Active Ambient Glow Background */}
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-lg shadow-[inset_2px_0px_0px_0px_rgba(92,111,255,0.8)] border border-primary/20 backdrop-blur-[2px]"></div>
              )}
              
              {/* Active Edge Light */}
              {isActive && (
                 <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-1/2 rounded-r-md bg-primary shadow-[0_0_10px_rgba(92,111,255,0.9)]"></div>
              )}

              <item.icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-primary' : 'text-gray-500'} ${item.isSub ? 'ml-0.5 w-3.5 h-3.5' : ''}`} />
              <span className={`text-[13px] font-medium tracking-wide relative z-10 ${isActive ? 'drop-shadow-md' : ''}`}>{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-6 pb-2 px-3">
          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-2">Challenges</p>
          <div className="space-y-1">
            <Link href="/tracks/track-a-dsa" className="flex flex-col px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/20 to-transparent"></div>
               <div className="flex items-center gap-2 relative z-10">
                 <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center"><Code2 className="w-3 h-3 text-primary" /></div>
                 <span className="text-[13px] font-bold text-white">Two Sum</span>
               </div>
               <p className="text-[10px] text-gray-400 mt-1 relative z-10">Algorithms • Easy</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* Profiler / Bottom */}
      <div className="px-3 border-t border-surface-border/50 pt-4 mt-auto">
        <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-white hover:bg-surface/30 rounded-lg transition-colors group">
          <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors" />
          <span className="text-[13px] font-medium tracking-wide">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
