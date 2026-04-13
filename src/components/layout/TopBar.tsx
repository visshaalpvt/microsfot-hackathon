'use client';

import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, title: 'New insight available', message: 'Price objection pattern detected', time: '5m ago' },
    { id: 2, title: 'Deal update', message: 'ABC Corp moved to negotiation', time: '1h ago' },
    { id: 3, title: 'Memory sync', message: '3 new memories from chat', time: '2h ago' },
  ];

  return (
    <header className="h-16 bg-[#1E293B]/80 backdrop-blur-lg border-b border-[#334155] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search clients, deals, insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#334155] border border-[#475569] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 bg-[#1E293B] px-1.5 py-0.5 rounded border border-[#475569]">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 rounded-xl bg-[#334155] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#475569] transition-all"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-[#1E293B] border border-[#334155] rounded-xl shadow-xl overflow-hidden animate-fade-in">
              <div className="p-3 border-b border-[#334155]">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 border-b border-[#334155] hover:bg-[#334155]/50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm font-medium text-white">{notif.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{notif.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#334155] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">JD</span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-slate-500">Sales Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-[#1E293B] border border-[#334155] rounded-xl shadow-xl overflow-hidden animate-fade-in">
              <div className="p-3 border-b border-[#334155]">
                <p className="text-sm font-medium text-white">john.doe@company.com</p>
              </div>
              <div className="p-1">
                <button className="w-full px-3 py-2 text-left text-sm text-slate-400 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
                  Profile Settings
                </button>
                <button className="w-full px-3 py-2 text-left text-sm text-slate-400 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
                  API Keys
                </button>
                <button className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-[#334155] rounded-lg transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
