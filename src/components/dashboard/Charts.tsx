'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const stageData = [
  { name: 'Lead', value: 6, color: '#6366F1' },
  { name: 'Contacted', value: 4, color: '#8B5CF6' },
  { name: 'Negotiation', value: 3, color: '#A855F7' },
  { name: 'Proposal', value: 2, color: '#EC4899' },
  { name: 'Closed', value: 9, color: '#22C55E' },
];

const weeklyData = [
  { day: 'Mon', deals: 3, objections: 2 },
  { day: 'Tue', deals: 5, objections: 3 },
  { day: 'Wed', deals: 4, objections: 1 },
  { day: 'Thu', deals: 6, objections: 4 },
  { day: 'Fri', deals: 4, objections: 2 },
  { day: 'Sat', deals: 1, objections: 0 },
  { day: 'Sun', deals: 1, objections: 1 },
];

const objectionData = [
  { name: 'Price', value: 45, color: '#F59E0B' },
  { name: 'Competitor', value: 35, color: '#6366F1' },
  { name: 'Trust', value: 20, color: '#22C55E' },
];

export function DealProgressChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklyData}>
          <defs>
            <linearGradient id="dealGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
          <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F8FAFC',
            }}
          />
          <Area
            type="monotone"
            dataKey="deals"
            stroke="#6366F1"
            strokeWidth={2}
            fill="url(#dealGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ObjectionChart() {
  return (
    <div className="h-[300px] flex items-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={objectionData} layout="vertical">
          <XAxis type="number" stroke="#64748B" fontSize={12} tickLine={false} />
          <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={12} tickLine={false} width={80} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F8FAFC',
            }}
            formatter={(value: any) => [`${value}%`, 'Percentage']}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {objectionData.map((entry, index) => (
              <rect key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PipelineChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stageData}>
          <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
          <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F8FAFC',
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {stageData.map((entry, index) => (
              <rect key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
