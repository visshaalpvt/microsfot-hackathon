'use client';

import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Brain,
  Zap,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { mockStageData, mockObjectionData, mockWeeklyData, mockStats, mockInsights } from '@/lib/data';

const successPatterns = [
  {
    title: 'Follow-up Timing',
    description: 'Follow-up within 24 hours → 60% higher close rate',
    success: true,
    stat: '+60%',
    icon: Clock
  },
  {
    title: 'Objection Handling',
    description: 'Addressing price objections with ROI → 45% more likely to close',
    success: true,
    stat: '+45%',
    icon: CheckCircle
  },
  {
    title: 'Technical Demos',
    description: 'Clients requesting demos have 70% close rate',
    success: true,
    stat: '70%',
    icon: Target
  },
  {
    title: 'Discount Strategy',
    description: 'Generic discounts have only 20% success rate',
    success: false,
    stat: '20%',
    icon: AlertTriangle
  }
];

const objectionTrends = [
  { month: 'Jan', price: 35, competitor: 40, trust: 25 },
  { month: 'Feb', price: 42, competitor: 35, trust: 23 },
  { month: 'Mar', price: 45, competitor: 30, trust: 25 },
  { month: 'Apr', price: 45, competitor: 35, trust: 20 },
];

const memoryLearningData = [
  { interaction: 1, success: 45 },
  { interaction: 3, success: 58 },
  { interaction: 5, success: 72 },
  { interaction: 7, success: 78 },
  { interaction: 10, success: 85 },
  { interaction: 15, success: 89 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-[#94A3B8] mt-1">Track performance and AI learning insights</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl">
          <Brain className="w-5 h-5 text-[#6366F1]" />
          <span className="text-sm text-[#94A3B8]">AI Memory:</span>
          <span className="text-sm text-[#22C55E] font-medium">Learning</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#6366F1]" />
            </div>
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          </div>
          <p className="text-3xl font-bold text-white">{mockStats.winRate}%</p>
          <p className="text-sm text-[#94A3B8] mt-1">Win Rate</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#22C55E]" />
            </div>
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          </div>
          <p className="text-3xl font-bold text-white">${(mockStats.avgDealSize / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#94A3B8] mt-1">Avg Deal Size</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <TrendingDown className="w-5 h-5 text-[#EF4444]" />
          </div>
          <p className="text-3xl font-bold text-white">{mockStats.objectionRate}%</p>
          <p className="text-sm text-[#94A3B8] mt-1">Objection Rate</p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#EC4899]/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#EC4899]" />
            </div>
            <TrendingUp className="w-5 h-5 text-[#22C55E]" />
          </div>
          <p className="text-3xl font-bold text-white">85%</p>
          <p className="text-sm text-[#94A3B8] mt-1">Memory Confidence</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">🧠 Memory Learning Curve</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryLearningData}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="interaction" stroke="#94A3B8" label={{ value: 'Interactions', position: 'insideBottom', offset: -5, fill: '#64748B' }} />
                <YAxis stroke="#94A3B8" label={{ value: 'Success %', angle: -90, position: 'insideLeft', fill: '#64748B' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="success" stroke="#6366F1" fillOpacity={1} fill="url(#colorSuccess)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-[#94A3B8] mt-4 text-center">
            📈 AI success rate improves with more memory context
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Objection Trends Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={objectionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="price" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B' }} name="Price" />
                <Line type="monotone" dataKey="competitor" stroke="#6366F1" strokeWidth={2} dot={{ fill: '#6366F1' }} name="Competitor" />
                <Line type="monotone" dataKey="trust" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E' }} name="Trust" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="text-xs text-[#94A3B8]">Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
              <span className="text-xs text-[#94A3B8]">Competitor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-[#94A3B8]">Trust</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-[#22C55E]" />
            <h2 className="text-xl font-semibold text-white">Success Patterns</h2>
          </div>
          <div className="space-y-4">
            {successPatterns.map((pattern, i) => (
              <div 
                key={i}
                className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      pattern.success ? 'bg-[#22C55E]/10' : 'bg-[#EF4444]/10'
                    }`}>
                      <pattern.icon className={`w-5 h-5 ${pattern.success ? 'text-[#22C55E]' : 'text-[#EF4444]'}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{pattern.title}</h3>
                      <p className="text-xs text-[#94A3B8] mt-1">{pattern.description}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold ${
                    pattern.success ? 'text-[#22C55E]' : 'text-[#EF4444]'
                  }`}>
                    {pattern.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-xl font-semibold text-white">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {mockInsights.map((insight, i) => (
              <div 
                key={insight.id}
                className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{insight.title}</h3>
                  <span className="text-xs text-[#6366F1] bg-[#6366F1]/10 px-2 py-0.5 rounded-full">
                    {Math.round((insight.confidence || 0.8) * 100)}%
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">{insight.description}</p>
                {insight.suggestion && (
                  <p className="text-xs text-[#22C55E] mt-2">💡 {insight.suggestion}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Pipeline Distribution</h2>
        <div className="grid grid-cols-5 gap-4">
          {mockStageData.map((stage, i) => (
            <div 
              key={stage.name}
              className="text-center p-4 rounded-xl bg-[#0F172A] border border-[#334155]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: `${stage.color}20` }}
              >
                <span className="text-2xl font-bold" style={{ color: stage.color }}>{stage.value}</span>
              </div>
              <p className="text-sm text-white">{stage.name}</p>
              <p className="text-xs text-[#64748B]">{Math.round((stage.value / 24) * 100)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}