'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings,
  Brain,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chat', label: 'Chat Agent', icon: MessageSquare },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-[#1E293B] border-r border-[#334155] flex flex-col transition-all duration-300 z-50 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      <div className="p-4 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold text-white">DealMind AI</h1>
              <p className="text-xs text-slate-400">Sales Intelligence</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500' 
                  : 'text-slate-400 hover:bg-[#334155] hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : ''}`} />
              {!collapsed && (
                <span className="font-medium animate-fade-in">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#334155]">
        {!collapsed ? (
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-3 border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-300">AI Memory</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">Active learning from every conversation</p>
            <div className="h-1.5 bg-[#334155] rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">156 memories stored</p>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#334155] rounded-full flex items-center justify-center border border-[#475569] hover:bg-[#475569] transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </aside>
  );
}
