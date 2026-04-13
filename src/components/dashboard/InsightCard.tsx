'use client';

import { AlertCircle, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'pattern' | 'suggestion' | 'warning';
}

export default function InsightCard({ title, description, type }: InsightCardProps) {
  const icons = {
    pattern: <TrendingUp className="w-5 h-5" />,
    suggestion: <Lightbulb className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
  };

  const colors = {
    pattern: 'border-indigo-500/30 bg-indigo-500/5',
    suggestion: 'border-emerald-500/30 bg-emerald-500/5',
    warning: 'border-amber-500/30 bg-amber-500/5',
  };

  const iconColors = {
    pattern: 'text-indigo-400',
    suggestion: 'text-emerald-400',
    warning: 'text-amber-400',
  };

  return (
    <div className={`border rounded-xl p-4 ${colors[type]} animate-fade-in`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center ${iconColors[type]}`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
