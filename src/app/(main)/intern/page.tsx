export default function InternDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-6 border-b border-surface-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Intern Dashboard</h1>
          <p className="text-gray-400">Manage your tasks and track your credits.</p>
        </div>
        <div className="bg-surface-hover border border-surface-border px-6 py-3 rounded-xl text-center">
          <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Available Credits</div>
          <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-2">
            <span className="text-lg">⭐</span> 1,250
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-hover border border-surface-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Active Tasks</h2>
              <button className="text-sm text-primary hover:underline font-medium">View Board</button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: "Fix Monaco Editor resize bug on mobile", repo: "kalpkrafts/core", credits: 150, status: "In Progress", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                { title: "Add Python support to Code Execution API", repo: "kalpkrafts/api", credits: 300, status: "In Review", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
              ].map((task, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-surface rounded-lg border border-surface-border gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">{task.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="font-mono bg-surface-border px-2 py-0.5 rounded">{task.repo}</span>
                      <span>Earn ⭐ {task.credits}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${task.color} whitespace-nowrap text-center`}>
                    {task.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface-hover border border-surface-border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Credit Rewards</h2>
            <div className="space-y-3">
              {[
                { title: "Advanced System Design Course", cost: 2000 },
                { title: "1-on-1 Mock Interview", cost: 5000 },
                { title: "Resume Review", cost: 1000 },
              ].map((reward, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface border border-surface-border rounded-lg group">
                  <span className="text-sm font-medium">{reward.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-yellow-400 font-bold">⭐ {reward.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
