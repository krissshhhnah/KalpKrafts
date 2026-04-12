import { GraduationCap, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { COURSES } from '@/lib/courses';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export default async function CoursesPage() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  let userCredits = 0;
  
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email });
    if (user) {
      userCredits = user.credits || 0;
    }
  }

  return (
    <div className="space-y-8 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative justify-between items-center rounded-lg overflow-hidden glass-panel p-8 border border-surface-border flex">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] glow-ray pointer-events-none rounded-full opacity-30"></div>
        <div className="max-w-2xl relative z-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
            Premium Engineering Courses
          </h1>
          <p className="text-gray-400 font-medium">
            Unlock advanced system design and scalable architecture paths using your internship credits.
          </p>
        </div>
        <div className="relative z-10 hidden md:block">
           <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-lg">
             <span className="text-yellow-500 font-bold">{userCredits}</span>
             <span className="text-yellow-600/80 text-sm font-medium uppercase tracking-wide">Credits Available</span>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {COURSES.map((course) => {
          // If the course is unlocked by default, or the user exceeds the cost (Simulated frontend logic, real logic in API)
          const isUnlocked = course.unlockedByDefault || userCredits >= course.costCredits;

          return (
            <div key={course.id} className="glass-panel p-6 rounded-lg border border-surface-border hover:border-gray-500 transition-all flex flex-col group relative">
               {isUnlocked && <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg"></div>}
               <div className="mb-4 flex justify-between items-start">
                 <div className="w-10 h-10 bg-surface border border-surface-border rounded flex items-center justify-center">
                   <GraduationCap className={`w-5 h-5 ${isUnlocked ? 'text-blue-400' : 'text-gray-500'}`} />
                 </div>
                 <span className={`text-[11px] px-2 py-1 rounded font-semibold uppercase tracking-wider ${isUnlocked ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-surface-hover text-gray-500 border border-surface-border'}`}>
                   {course.level}
                 </span>
               </div>
               <h3 className={`text-lg font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{course.title}</h3>
               <p className="text-sm text-gray-500 mb-6 flex-1">{course.description}</p>
               
               <div className="mt-auto pt-6 flex items-center justify-between border-t border-surface-border/50">
                 <span className={`text-sm font-medium ${isUnlocked ? 'text-gray-400' : 'text-yellow-600/80'}`}>
                   {course.costCredits === 0 ? 'Free' : `${course.costCredits} Credits`}
                 </span>
                 
                 {isUnlocked ? (
                   <Link href={`/courses/${course.id}`} className="flex items-center gap-1 text-blue-400 text-sm font-semibold hover:text-blue-300">
                      View Course <ArrowRight className="w-4 h-4" />
                   </Link>
                 ) : (
                   <button className="flex items-center gap-1 text-gray-500 text-sm font-semibold cursor-not-allowed">
                      <Lock className="w-4 h-4" /> Locked
                   </button>
                 )}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
