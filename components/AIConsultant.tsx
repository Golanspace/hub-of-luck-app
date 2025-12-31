
import React, { useState, useRef, useEffect } from 'react';
import { consultIntelligence } from '../services/gemini.ts';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string, links?: any[]}[]>([
    { role: 'ai', text: "Welcome to Hub of Luck Intelligence. I'm connected to the live US gaming market. How can I assist your strategy today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!query.trim() || isTyping) return;
    
    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await consultIntelligence(userMsg);
    
    setMessages(prev => [...prev, { 
      role: 'ai', 
      text: response.text, 
      links: response.webLinks 
    }]);
    setIsTyping(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-10 right-10 w-16 h-16 bg-slate-900 rounded-[24px] shadow-2xl z-[150] flex items-center justify-center text-emerald-400 text-3xl hover:scale-110 transition-all hover:bg-black group ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <span className="group-hover:rotate-12 transition-transform italic serif-header">♣</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white"></span>
      </button>

      <div className={`fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-[-50px_0_100px_rgba(0,0,0,0.1)] z-[200] transition-transform duration-700 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        <div className="bg-slate-950 p-10 text-white flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-2xl text-slate-950 italic serif-header">♣</div>
            <div>
              <h3 className="font-black text-xl tracking-tight uppercase">Intelligence <span className="text-emerald-500 italic">Terminal</span></h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-400/80">Live Grounding Active</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors text-3xl font-light">&times;</button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-6 rounded-[32px] text-sm leading-relaxed shadow-sm ${
                m.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none font-medium' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {m.text}
                {m.links && m.links.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3">Verification Sources:</span>
                    <div className="space-y-2">
                      {m.links.map((l: any, idx: number) => (
                        <a key={idx} href={l.uri} target="_blank" className="flex items-center gap-2 text-[11px] text-emerald-600 font-bold hover:text-emerald-800 transition-colors">
                          <span className="text-emerald-300">›</span> {l.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-6 rounded-[24px] rounded-tl-none flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-10 bg-white border-t border-slate-100">
          <div className="relative">
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Query industry data, legal status, or brand reviews..."
              className="w-full bg-slate-50 border border-slate-200 rounded-[32px] p-6 pr-20 text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 resize-none min-h-[120px] font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={!query.trim() || isTyping}
              className="absolute bottom-6 right-6 bg-slate-900 text-emerald-400 w-12 h-12 rounded-2xl hover:bg-black disabled:opacity-50 transition-all flex items-center justify-center shadow-xl shadow-slate-900/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7M5 12h16"/></svg>
            </button>
          </div>
          <p className="text-[9px] text-slate-400 text-center mt-6 font-black uppercase tracking-[0.3em] opacity-60">Elite Intelligence Layer v4.0</p>
        </div>
      </div>
    </>
  );
};

export default AIConsultant;
