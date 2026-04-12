import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function MetricCard({ title, value, icon: Icon, trend, trendUp = true }: MetricCardProps) {
  return (
    <Card className="p-5 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] uppercase tracking-wider font-semibold text-gray-400 mb-1">{title}</p>
          <div className="text-3xl font-bold tracking-tight text-white">{value}</div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-surface-hover border border-surface-border flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className={`mt-4 text-xs font-medium flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          <span className="font-mono">{trend}</span>
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </Card>
  );
}
