import React, { useState, useRef, useEffect } from 'react';
import { consultIntelligence } from '../services/gemini.ts';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string, links?: any[]}[]>([
    { role: 'ai', text: "Welcome to the Hub. I'm your direct line to real-time gaming intelligence. What can I help you find today?" }
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
      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 rounded-full shadow-2xl z-[60] flex items-center justify-center text-white text-3xl hover:scale-110 transition-all hover:bg-emerald-500 group ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <span className="group-hover:rotate-12 transition-transform">♣</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>

      {/* Chat Interface */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="bg-[#0f172a] p-8 text-white flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-xl">♣</div>
            <div>
              <h3 className="font-black text-lg tracking-tight">Direct Intelligence</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/80">Real-time Search Active</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors text-2xl">&times;</button>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none font-medium' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {m.text}
                {m.links && m.links.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Verified Sources:</span>
                    <div className="space-y-1">
                      {m.links.map((l: any, idx: number) => (
                        <a key={idx} href={l.uri} target="_blank" className="block text-[11px] text-emerald-600 font-bold hover:underline">› {l.title}</a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="relative">
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask anything about US sweeps, odds, or legal status..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none min-h-[100px]"
            />
            <button 
              onClick={handleSend}
              disabled={!query.trim() || isTyping}
              className="absolute bottom-4 right-4 bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <p className="text-[9px] text-slate-400 text-center mt-4 font-bold uppercase tracking-widest">Powered by HubOfLuck Advanced Intelligence</p>
        </div>
      </div>
    </>
  );
};

export default AIConsultant;