import fs from 'fs';
import path from 'path';
import { COURSES } from '@/lib/courses';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import dbConnect from '@/lib/db';
import ReactMarkdown from 'react-markdown';
import { notFound, redirect } from 'next/navigation';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = COURSES.find(c => c.id === params.courseId);
  if (!course) return notFound();

  await dbConnect();
  const session = await getServerSession(authOptions);
  let userCredits = 0;
  
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email });
    if (user) userCredits = user.credits || 0;
  }

  const isUnlocked = course.unlockedByDefault || userCredits >= course.costCredits;
  
  if (!isUnlocked) {
    // If someone forcibly links here but they don't have credits, bounce them to /courses
    redirect('/courses');
  }

  // Load physical markdown path
  const filePath = path.join(process.cwd(), 'src', 'content', 'courses', course.markdownFile);
  let content = "Course content is currently being written by global instructors. Check back soon!";
  
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
  }

  return (
    <div className="max-w-4xl mx-auto w-full pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
         <ArrowLeft className="w-4 h-4" /> Back to Curriculum
       </Link>

       <div className="bg-surface/50 rounded-xl border border-surface-border overflow-hidden">
         <div className="bg-surface-hover/80 border-b border-surface-border px-8 py-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 glow-ray pointer-events-none opacity-20"></div>
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-surface border border-surface-border text-gray-400">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white relative z-10">{course.title}</h1>
         </div>
         
         <div className="p-8 prose prose-invert prose-indigo max-w-none text-gray-300">
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-surface-border/50" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-gray-200 mt-8 mb-3" {...props} />,
                p: ({node, ...props}) => <p className="leading-relaxed mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-400 marker:text-blue-500" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                code: ({node, ...props}) => <code className="bg-[#090a0c] text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono border border-surface-border/50" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-[#090a0c] p-4 rounded-lg overflow-x-auto border border-surface-border/50 font-mono text-sm mb-6" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 flex italic bg-blue-500/5 text-gray-400 rounded-r my-6" {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
         </div>
       </div>
    </div>
  );
}
