'use client';

import { Memory, Client } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, Target, Lightbulb, FileText, Brain, TrendingUp } from 'lucide-react';

interface MemoryPanelProps {
  client: Client | null;
  memories: Memory[];
  recentMemories?: Memory[];
}

export default function MemoryPanel({ client, memories, recentMemories = [] }: MemoryPanelProps) {
  if (!client) {
    return (
      <div className="h-full flex items-center justify-center text-slate-500 text-sm">
        Select a client to view memory
      </div>
    );
  }

  const objections = memories.filter(m => m.type === 'objection');
  const successes = memories.filter(m => m.type === 'success' || m.success);
  const strategies = memories.filter(m => m.type === 'strategy');
  const preferences = memories.filter(m => m.type === 'preference');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'objection': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'strategy': return <Target className="w-4 h-4 text-indigo-400" />;
      case 'preference': return <Lightbulb className="w-4 h-4 text-amber-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Client Memory</h2>
      </div>

      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {client.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{client.name}</h3>
            <p className="text-sm text-slate-400">{client.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-emerald-400 font-medium">${client.dealValue.toLocaleString()}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 capitalize">{client.stage.replace('-', ' ')}</span>
        </div>
      </div>

      {objections.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Past Objections ({objections.length})
          </h4>
          <div className="space-y-2">
            {objections.map((mem) => (
              <div key={mem.id} className="bg-[#1E293B] border border-[#334155] rounded-lg p-3">
                <p className="text-sm text-slate-300">{mem.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500">{formatRelativeTime(mem.createdAt)}</span>
                  {mem.success === false && (
                    <span className="text-xs text-red-400">Needs resolution</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {successes.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Winning Strategies ({successes.length})
          </h4>
          <div className="space-y-2">
            {successes.map((mem) => (
              <div key={mem.id} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                <p className="text-sm text-emerald-300">{mem.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">This worked before</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {strategies.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Suggested Strategies
          </h4>
          <div className="space-y-2">
            {strategies.map((mem) => (
              <div key={mem.id} className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
                <p className="text-sm text-indigo-300">{mem.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {preferences.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Client Preferences
          </h4>
          <div className="space-y-2">
            {preferences.map((mem) => (
              <div key={mem.id} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                <p className="text-sm text-amber-300">{mem.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {memories.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No memories yet</p>
          <p className="text-xs">Start a conversation to build memory</p>
        </div>
      )}
    </div>
  );
}
