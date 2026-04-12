import Link from 'next/link';
import { ArrowRight, Star, Code, GitMerge, LayoutDashboard } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="relative rounded-lg overflow-hidden glass-panel p-8 md:p-12 mb-8 border border-surface-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] glow-ray pointer-events-none rounded-full opacity-30"></div>
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white">
            Work. Learn. Earn Access.
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed font-medium">
            The KalpKrafts Internship model lets you contribute code to real microservices. Build verifiable experience, merge pull requests, and earn credits to unlock premium paths.
          </p>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Apply for Roles
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Developer Intern", icon: Code, desc: "Resolve assigned issues and build core features." },
          { title: "Challenge Creator", icon: Star, desc: "Design new algorithmic scenarios and unit tests." },
          { title: "DevOps Engineer", icon: GitMerge, desc: "Maintain infrastructure and CI/CD pipelines." },
          { title: "UI/UX Designer", icon: LayoutDashboard, desc: "Iterate on user interfaces based on metrics." },
        ].map((role, i) => {
          const Icon = role.icon;
          return (
            <div key={i} className="bg-canvas border border-surface-border p-6 rounded-lg hover:border-gray-500 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div className="w-10 h-10 border border-surface-border bg-surface rounded flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-bold mb-2 text-gray-200">{role.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{role.desc}</p>
              <Link href="#" className="text-blue-400 text-[13px] font-semibold tracking-wide flex items-center gap-1 hover:text-blue-300">
                VIEW ROLE <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="pt-12">
        <h2 className="text-xl font-bold mb-8 text-white">Application Workflow</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-surface-border"></div>
          {[
            { step: "01", title: "Apply", text: "Submit GitHub portfolio." },
            { step: "02", title: "Select", text: "Pick tasks from Kanban." },
            { step: "03", title: "Commit", text: "Standard PR & Code Review." },
            { step: "04", title: "Earn", text: "Get credits & certificates." },
          ].map((item, i) => (
            <div key={i} className="relative z-10">
              <div className="w-12 h-12 rounded border border-surface-border bg-canvas flex items-center justify-center font-mono font-bold text-gray-400 mb-4 shadow-sm">
                {item.step}
              </div>
              <h3 className="font-bold mb-1 text-gray-200">{item.title}</h3>
              <p className="text-sm text-gray-500 pr-4">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
