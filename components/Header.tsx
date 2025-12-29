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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setPage(Page.Home)}
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-100">
            ♣
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            Hub<span className="text-emerald-600">OfLuck</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setPage(item.value)}
              className={`text-xs font-black tracking-[0.15em] transition-colors hover:text-emerald-600 relative py-2 uppercase ${
                activePage === item.value ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              {item.label}
              {activePage === item.value && (
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-emerald-600 rounded-full"></span>
              )}
            </button>
          ))}
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-100 active:scale-95 uppercase">
            Join Elite
          </button>
        </nav>

        <button 
          className="md:hidden text-gray-900 w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative w-6 h-4">
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 translate-y-2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 translate-y-4 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      <div className={`md:hidden bg-white border-t border-gray-50 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => { setPage(item.value); setIsOpen(false); }}
              className="block w-full text-left py-2 font-black text-gray-900 uppercase tracking-widest text-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;