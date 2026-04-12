import { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import Link from 'next/link';

interface LockedOverlayProps {
  children: ReactNode;
  title?: string;
  message?: string;
}

export function LockedOverlay({ 
  children, 
  title = "Pro Insights Locked", 
  message = "Upgrade to access full analytics and industry roadmaps." 
}: LockedOverlayProps) {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      <div className="filter blur-sm select-none opacity-40 transition-all duration-300 pointer-events-none">
        {children}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas/40 z-10">
        <div className="bg-surface-hover/80 border border-surface-border p-6 rounded-xl flex flex-col items-center text-center shadow-lg backdrop-blur-md max-w-[80%] transform scale-95 group-hover:scale-100 transition-transform duration-300">
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-3">
            <Lock className="w-4 h-4 text-primary" />
          </div>
          <h4 className="font-bold text-white mb-1">{title}</h4>
          <p className="text-xs text-gray-400 mb-4">{message}</p>
          <Link 
            href="/pricing/developer" 
            className="px-4 py-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary-dark hover:to-purple-600 text-white rounded-md text-[13px] font-semibold tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
          >
            Unlock Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
