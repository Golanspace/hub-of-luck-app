
import React, { useState } from 'react';
import { Page } from '../types';

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
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative z-50 bg-white">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setPage(Page.Home)}
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-2xl group-hover:bg-emerald-700 transition-colors">
            ♣
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Hub<span className="text-emerald-600">OfLuck</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setPage(item.value)}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-emerald-600 relative py-2 ${
                activePage === item.value ? 'text-emerald-600' : 'text-gray-600'
              }`}
            >
              {item.label.toUpperCase()}
              {activePage === item.value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full animate-in fade-in slide-in-from-left-2 duration-300"></span>
              )}
            </button>
          ))}
          <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95">
            JOIN NOW
          </button>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 w-10 h-10 flex items-center justify-center focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out translate-y-4 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay/Drawer */}
      <div 
        className={`md:hidden absolute left-0 right-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform origin-top ${
          isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setPage(item.value);
                setIsOpen(false);
              }}
              className={`block w-full text-left py-3 px-4 rounded-lg font-semibold transition-colors ${
                activePage === item.value 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 px-4">
            <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 active:scale-[0.98] transition-transform">
              JOIN NOW
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
