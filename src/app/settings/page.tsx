'use client';

import { useState } from 'react';
import { 
  Key, 
  Brain, 
  Palette, 
  Database, 
  Save, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState({
    groq: '',
    hindsight: '',
    supabase: ''
  });
  const [showKeys, setShowKeys] = useState({ groq: false, hindsight: false, supabase: false });
  const [theme, setTheme] = useState('dark');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      alert('Data reset successfully');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-[#94A3B8] mt-1">Configure your DealMind AI settings</p>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-[#6366F1]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">API Keys</h2>
            <p className="text-sm text-[#94A3B8]">Configure your AI service providers</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#94A3B8] mb-2">Groq API Key</label>
            <div className="relative">
              <input
                type={showKeys.groq ? 'text' : 'password'}
                value={apiKeys.groq}
                onChange={(e) => setApiKeys({ ...apiKeys, groq: e.target.value })}
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 pr-12 text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
              <button
                onClick={() => setShowKeys({ ...showKeys, groq: !showKeys.groq })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
              >
                {showKeys.groq ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-[#64748B] mt-2">Get your API key from groq.com</p>
          </div>

          <div>
            <label className="block text-sm text-[#94A3B8] mb-2">Hindsight Memory API Key</label>
            <div className="relative">
              <input
                type={showKeys.hindsight ? 'text' : 'password'}
                value={apiKeys.hindsight}
                onChange={(e) => setApiKeys({ ...apiKeys, hindsight: e.target.value })}
                placeholder="hs_xxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 pr-12 text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
              />
              <button
                onClick={() => setShowKeys({ ...showKeys, hindsight: !showKeys.hindsight })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
              >
                {showKeys.hindsight ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-[#64748B] mt-2">Hindsight memory service for persistent storage</p>
          </div>

          <div>
            <label className="block text-sm text-[#94A3B8] mb-2">Supabase URL</label>
            <input
              type="text"
              value={apiKeys.supabase}
              onChange={(e) => setApiKeys({ ...apiKeys, supabase: e.target.value })}
              placeholder="https://xxxxx.supabase.co"
              className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-white placeholder-[#64748B] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Memory Configuration</h2>
            <p className="text-sm text-[#94A3B8]">Hindsight memory settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Memory Status</p>
                <p className="text-xs text-[#94A3B8]">Persistent memory layer</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                <span className="text-sm text-[#22C55E]">Connected</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
              <p className="text-xs text-[#64748B] mb-1">Total Memories</p>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
            <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
              <p className="text-xs text-[#64748B] mb-1">Clients Tracked</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
            <div className="p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
              <p className="text-xs text-[#64748B] mb-1">Retrieval Accuracy</p>
              <p className="text-2xl font-bold text-white">92%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-[#EC4899]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Appearance</h2>
            <p className="text-sm text-[#94A3B8]">Customize the look and feel</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              theme === 'dark' ? 'border-[#6366F1] bg-[#6366F1]/10' : 'border-[#334155]'
            }`}
          >
            <div className="w-full h-12 bg-[#0F172A] rounded-lg mb-2" />
            <p className="text-sm text-white text-center">Dark Mode</p>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              theme === 'light' ? 'border-[#6366F1] bg-[#6366F1]/10' : 'border-[#334155]'
            }`}
          >
            <div className="w-full h-12 bg-white rounded-lg mb-2" />
            <p className="text-sm text-white text-center">Light Mode</p>
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
            <p className="text-sm text-[#94A3B8]">Manage your stored data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
            <div>
              <p className="text-sm font-medium text-white">Reset All Data</p>
              <p className="text-xs text-[#94A3B8]">Clear all client data and memories</p>
            </div>
            <button
              onClick={handleResetData}
              className="px-4 py-2 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-xl border border-[#334155]">
            <div>
              <p className="text-sm font-medium text-white">Export Data</p>
              <p className="text-xs text-[#94A3B8]">Download all your data as JSON</p>
            </div>
            <button className="px-4 py-2 bg-[#6366F1]/10 text-[#6366F1] hover:bg-[#6366F1]/20 rounded-lg text-sm font-medium transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-[#6366F1] hover:bg-[#5558E3] text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}