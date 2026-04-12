export default function DevOpsLabPage() {
  return (
    <div className="space-y-8 pb-10 w-full">
      <div className="relative rounded-lg overflow-hidden glass-panel p-8 md:p-12 mb-8 border border-surface-border">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] glow-ray pointer-events-none rounded-full opacity-30"></div>
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white">
            Git & DevOps Sandboxes
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed font-medium">
            Learn version control, CI/CD, and orchestration by destroying and rebuilding simulated production clusters safely. 
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Launch Sandbox
            </button>
            <button className="px-6 py-2.5 bg-surface text-gray-300 rounded font-medium border border-surface-border hover:bg-surface-hover transition-colors shadow-sm">
              View Architecture
            </button>
          </div>
        </div>
      </div>
      
      <div className="glass-panel p-16 text-center rounded-lg border border-surface-border">
        <h3 className="text-gray-400 font-medium mb-2">Simulators booting...</h3>
        <p className="text-sm text-gray-500">Connecting to Kubernetes sandbox environment. Please wait.</p>
      </div>
    </div>
  );
}
