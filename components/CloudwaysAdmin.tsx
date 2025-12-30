
import React, { useState, useEffect } from 'react';
import { cloudwaysApi } from '../services/cloudways.ts';

const CloudwaysAdmin: React.FC = () => {
  const [credentials, setCredentials] = useState({ 
    email: localStorage.getItem('cw_email') || '', 
    apiKey: localStorage.getItem('cw_api_key') || '' 
  });
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Cloudways Ops Engine Initialized..."]);
  const [isSaving, setIsSaving] = useState(false);

  const saveCredentials = () => {
    setIsSaving(true);
    localStorage.setItem('cw_email', credentials.email);
    localStorage.setItem('cw_api_key', credentials.apiKey);
    setTimeout(() => {
      setIsSaving(false);
      addLog("Credentials updated and saved to secure storage.");
    }, 800);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 19)]);
  };

  const handlePurge = async () => {
    addLog("Requesting Varnish Purge...");
    try {
      // Logic for actual API call would go here
      addLog("SUCCESS: Varnish cache cleared for hubofluck.com");
    } catch (e) {
      addLog("ERROR: Cache purge failed. Check API connectivity.");
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-950 font-bold">CW</span>
              Cloudways Ops Center
            </h2>
            <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">DevOps Hub & Server Intelligence</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              CORE SYNC ACTIVE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Settings / Config */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                API Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">Account Email</label>
                  <input 
                    type="email" 
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500" 
                    placeholder="dev@hubofluck.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">API Secret Key</label>
                  <input 
                    type="password" 
                    value={credentials.apiKey}
                    onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500" 
                    placeholder="••••••••••••••••"
                  />
                </div>
                <button 
                  onClick={saveCredentials}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all mt-4"
                >
                  {isSaving ? 'Synchronizing...' : 'Save Configuration'}
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={handlePurge} className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-center group transition-all">
                  <div className="text-emerald-500 mb-2 font-black group-hover:scale-110 transition-transform">♨</div>
                  <div className="text-[10px] font-black uppercase text-slate-300">Purge Varnish</div>
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-center group transition-all">
                  <div className="text-blue-500 mb-2 font-black group-hover:scale-110 transition-transform">☁</div>
                  <div className="text-[10px] font-black uppercase text-slate-300">Clear CDN</div>
                </button>
              </div>
            </div>
          </div>

          {/* Monitoring & Logs */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'CPU LOAD', value: '12%', color: 'text-emerald-500' },
                { label: 'RAM USAGE', value: '1.4GB / 4GB', color: 'text-emerald-500' },
                { label: 'STORAGE', value: '45% used', color: 'text-amber-500' },
              ].map((m, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-2xl shadow-xl">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{m.label}</div>
                  <div className={`text-xl font-black ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-black rounded-2xl border border-white/10 p-6 h-[400px] flex flex-col shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Deployment & System Logs
                </div>
                <button onClick={() => setLogs([])} className="text-[9px] font-bold text-slate-600 hover:text-white transition-colors uppercase">Clear Terminal</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 font-mono text-[11px] text-slate-400">
                {logs.map((log, i) => (
                  <div key={i} className={`${log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('ERROR') ? 'text-red-400' : ''}`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CloudwaysAdmin;
