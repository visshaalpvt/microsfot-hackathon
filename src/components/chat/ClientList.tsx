'use client';

import { Client } from '@/types';
import { getStatusColor } from '@/lib/utils';
import { MessageSquare, Phone, Mail, DollarSign } from 'lucide-react';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';

interface ClientListProps {
  clients: Client[];
  selectedId?: string | null;
  onSelect: (client: Client) => void;
}

export default function ClientList({ clients, selectedId, onSelect }: ClientListProps) {
  return (
    <div className="space-y-2">
      {clients.map((client) => (
        <button
          key={client.id}
          onClick={() => onSelect(client)}
          className={`w-full p-3 rounded-xl text-left transition-all duration-200 group ${
            selectedId === client.id
              ? 'bg-indigo-500/10 border border-indigo-500/30'
              : 'bg-[#1E293B] border border-transparent hover:bg-[#334155]'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-white">
                {client.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white truncate">{client.name}</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
              <p className="text-sm text-slate-400 truncate">{client.company}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {formatCurrency(client.dealValue)}
                </span>
                <span className="text-xs text-slate-500 capitalize">
                  {client.stage.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
