
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-[#0a0f0d] text-white overflow-hidden border-b border-emerald-900/30">
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover scale-110 motion-safe:animate-[pulse_10s_infinite]" 
          alt="Gaming Intelligence Background"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-40">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            <span className="h-[2px] w-12 bg-emerald-500"></span>
            <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">
              Premium Gaming Intelligence
            </span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
            Where Luck Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Logic.</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl font-medium">
            Join the elite circle of players leveraging real-time data, regulatory insights, and exclusive strategy guides to conquer the digital gaming landscape.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 px-10 rounded-sm transition-all transform hover:scale-105 shadow-2xl shadow-emerald-900/50 flex items-center gap-3">
              EXPLORE HUB <span className="text-xl">→</span>
            </button>
            <button className="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white font-bold py-5 px-10 rounded-sm border border-white/10 transition-all">
              VIEW LATEST BONUSES
            </button>
          </div>
        </div>
      </div>
      
      {/* Social Proof / Stats Strip */}
      <div className="relative border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-between gap-8">
          {[
            { label: 'Active Guides', val: '250+' },
            { label: 'Daily Updates', val: '24/7' },
            { label: 'Legal States', val: '28' },
            { label: 'Trusted Partners', val: '15' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-emerald-500 font-black text-xl">{stat.val}</span>
              <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
