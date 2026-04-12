interface ProgressBarProps {
  label: string;
  progress: number;
  colorClass?: string;
}

export function ProgressBar({ label, progress, colorClass = "bg-primary" }: ProgressBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end">
        <span className="text-sm font-semibold text-gray-200">{label}</span>
        <span className="text-xs font-mono text-gray-400">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-surface border border-surface-border rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
