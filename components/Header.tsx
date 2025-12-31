
import React, { useState } from 'react';
import { Page } from '../types.ts';

interface HeaderProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'News', value: Page.News },
    { label: 'Bonuses', value: Page.Bonuses },
    { label: 'Guides', value: Page.Guides }
  ];

  return (
    <header className="glass-effect border-b border-gray-100 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setPage(Page.Home)}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl group-hover:rotate-12 transition-transform shadow-xl">
            ♣
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
            Hub<span className="text-emerald-500 italic">OfLuck</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setPage(item.value)}
              className={`text-[10px] font-black tracking-[0.2em] transition-all hover:text-emerald-500 relative py-2 uppercase ${
                activePage === item.value ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {item.label}
              {activePage === item.value && (
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-emerald-500 rounded-full"></span>
              )}
            </button>
          ))}
          <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-2xl hover:shadow-emerald-500/20 active:scale-95 uppercase">
            Join Elite Access
          </button>
        </nav>

        <button 
          className="md:hidden text-slate-900 w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative w-6 h-0.5 bg-current">
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? 'opacity-0' : 'translate-y-0'}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
          </div>
        </button>
      </div>

      <div className={`md:hidden bg-white border-t border-gray-50 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => { setPage(item.value); setIsOpen(false); }}
              className="block w-full text-left font-black text-slate-900 uppercase tracking-widest text-xs"
            >
              {item.label}
            </button>
          ))}
          <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">
            Join Elite Access
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
