"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/dashboard/Card';
import { Search, Filter, CheckCircle2, Lock, Play, Loader2, Code2, Server } from 'lucide-react';

export default function ProblemsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDifficulty, setDifficulty] = useState('All');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch('/api/problems');
        if (res.ok) {
          const json = await res.json();
          setData(json.challenges || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const filtered = data.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterDifficulty === 'All' || c.difficulty === filterDifficulty)
  );

  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-surface-border">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white">Problems Hub</h1>
          <p className="text-[14px] text-gray-400 font-medium max-w-2xl">
            Grind through the global bank of algorithms and engineering architecture challenges. 
            Levels are strictly enforced—master the prerequisites to unlock advanced algorithms.
          </p>
        </div>
        
        <div className="flex bg-surface border border-surface-border p-1.5 rounded-lg text-sm">
           <button onClick={() => setDifficulty('All')} className={`px-4 py-1.5 rounded-md transition-colors ${filterDifficulty === 'All' ? 'bg-surface-hover text-white font-medium shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}>All</button>
           <button onClick={() => setDifficulty('Easy')} className={`px-4 py-1.5 rounded-md transition-colors ${filterDifficulty === 'Easy' ? 'bg-green-500/10 text-green-400 font-medium border border-green-500/20' : 'text-gray-400 hover:text-gray-200'}`}>Easy</button>
           <button onClick={() => setDifficulty('Medium')} className={`px-4 py-1.5 rounded-md transition-colors ${filterDifficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 font-medium border border-yellow-500/20' : 'text-gray-400 hover:text-gray-200'}`}>Medium</button>
           <button onClick={() => setDifficulty('Hard')} className={`px-4 py-1.5 rounded-md transition-colors ${filterDifficulty === 'Hard' ? 'bg-red-500/10 text-red-400 font-medium border border-red-500/20' : 'text-gray-400 hover:text-gray-200'}`}>Hard</button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search algorithms..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-surface-border text-white text-sm pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
            />
         </div>
      </div>

      {/* Table Grid */}
      <Card className="overflow-hidden">
         <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs uppercase bg-surface-hover/50 text-gray-500 border-b border-surface-border">
               <tr>
                  <th className="px-6 py-4 font-bold tracking-widest w-12">Status</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Title</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Topic</th>
                  <th className="px-6 py-4 font-bold tracking-widest">Difficulty</th>
                  <th className="px-6 py-4 font-bold tracking-widest text-right">Action</th>
               </tr>
            </thead>
            <tbody>
               {loading ? (
                 <tr>
                   <td colSpan={5} className="px-6 py-24 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">Booting Global Hub...</p>
                   </td>
                 </tr>
               ) : filtered.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="px-6 py-24 text-center">
                      <p className="text-gray-500 font-medium">No algorithms match your criteria.</p>
                   </td>
                 </tr>
               ) : filtered.map((c, idx) => (
                 <tr key={c.id} className={`border-b border-surface-border/50 hover:bg-surface-hover/30 transition-colors ${c.status === 'locked' ? 'opacity-60 grayscale filter' : ''}`}>
                    <td className="px-6 py-4 flex justify-center">
                       {c.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] rounded-full" />
                       ) : c.status === 'unlocked' ? (
                          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse"></div>
                       ) : (
                          <Lock className="w-4 h-4 text-gray-600" />
                       )}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-200">
                       {idx + 1}. {c.title}
                       <div className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-widest">
                          {c.trackId === 'track-a-sde' ? 'Software Eng' : 'DevOps'} Focus
                       </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{c.topicConcept}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 text-xs font-semibold rounded ${
                          c.difficulty === 'Easy' ? 'text-green-400 bg-green-500/10' :
                          c.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-500/10' :
                          'text-red-400 bg-red-500/10'
                       }`}>
                          {c.difficulty}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       {c.status === 'locked' ? (
                          <button disabled className="px-4 py-2 bg-surface-border text-gray-500 rounded text-xs font-bold w-24 text-center cursor-not-allowed">
                             Locked
                          </button>
                       ) : (
                          <Link href={`/arena/${c.id}`} className={`px-4 py-2 ${c.status === 'completed' ? 'bg-surface hover:bg-surface-hover text-gray-300' : 'bg-primary hover:bg-primary-dark text-white'} rounded text-xs font-bold w-24 text-center transition-colors inline-block`}>
                             {c.status === 'completed' ? 'Review' : 'Solve'}
                          </Link>
                       )}
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </Card>
    </div>
  );
}
