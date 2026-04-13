'use client';

import { useApp } from '@/lib/store';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import InsightCard from '@/components/dashboard/InsightCard';
import { DealProgressChart, ObjectionChart, PipelineChart } from '@/components/dashboard/Charts';
import { formatCurrency } from '@/lib/utils';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Sparkles, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { mockInsights } from '@/lib/data';

export default function DashboardPage() {
  const { state } = useApp();
  const { clients } = state;

  const stats = {
    totalDeals: clients.length || 5,
    activeDeals: clients.filter(c => !c.stage.includes('closed')).length || 3,
    totalValue: clients.reduce((sum, c) => sum + c.dealValue, 0) || 287000,
    hotLeads: clients.filter(c => c.status === 'hot').length || 2,
  };

  const recentClients = [...(clients.length ? clients : [])]
    .sort((a, b) => new Date(b.lastContact || b.createdAt).getTime() - new Date(a.lastContact || a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Overview of your sales intelligence</p>
        </div>
        <Link 
          href="/chat"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Start Chat
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Deals"
          value={stats.totalDeals}
          change={12}
          changeLabel="vs last month"
          icon={<DollarSign className="w-6 h-6" />}
          color="emerald"
        />
        <StatCard
          title="Active Deals"
          value={stats.activeDeals}
          change={8}
          changeLabel="vs last month"
          icon={<TrendingUp className="w-6 h-6" />}
          color="indigo"
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(stats.totalValue)}
          change={15}
          changeLabel="vs last month"
          icon={<Target className="w-6 h-6" />}
          color="amber"
        />
        <StatCard
          title="Hot Leads"
          value={stats.hotLeads}
          change={-5}
          changeLabel="vs last month"
          icon={<Sparkles className="w-6 h-6" />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-white">Deal Progress</h2>
              <p className="text-sm text-slate-400">Weekly deal activity</p>
            </CardHeader>
            <CardContent>
              <DealProgressChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-white">Pipeline Stage</h2>
              </CardHeader>
              <CardContent>
                <PipelineChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-white">Objection Types</h2>
              </CardHeader>
              <CardContent>
                <ObjectionChart />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">AI Insights</h2>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full">
                  Live
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type as 'pattern' | 'suggestion' | 'warning'}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentClients.map((client) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="flex items-center gap-3 p-3 bg-[#1E293B] rounded-xl hover:bg-[#334155] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{client.name}</p>
                    <p className="text-sm text-slate-400 truncate">{client.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-400">
                      {formatCurrency(client.dealValue)}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {client.stage.replace('-', ' ')}
                    </p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
