'use client';

import { useApp } from '@/lib/store';
import Card from '@/components/ui/Card';
import { formatCurrency, getStatusColor } from '@/lib/utils';
import { Users, Search, Filter, ChevronRight, DollarSign, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  const { state, dispatch } = useApp();
  const { clients } = state;

  const handleSelectClient = (clientId: string) => {
    dispatch({ type: 'SELECT_CLIENT', payload: clientId });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-slate-400 mt-1">Manage your client relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 bg-[#1E293B] border border-[#334155] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-xl text-sm text-slate-400 hover:text-white hover:border-[#475569] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <Link
            key={client.id}
            href="/chat"
            onClick={() => handleSelectClient(client.id)}
            className="group"
          >
            <Card hover className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-slate-400">{client.company}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Deal Value</span>
                  </div>
                  <span className="text-emerald-400 font-medium">
                    {formatCurrency(client.dealValue)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-sm">Stage</span>
                  </div>
                  <span className="text-sm text-slate-300 capitalize">
                    {client.stage.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#334155] flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Last contact: {client.lastContact ? new Date(client.lastContact).toLocaleDateString() : 'No contact'}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No clients yet</h3>
          <p className="text-slate-400 max-w-sm">
            Add your first client to start building memory and tracking interactions.
          </p>
        </div>
      )}
    </div>
  );
}
