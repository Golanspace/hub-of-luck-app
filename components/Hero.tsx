
import React, { useEffect } from 'react';

const FEATURED = {
  name: 'Stake.us Social Casino',
  offer: '250,000 GC + $25 Stake Cash',
  logo: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=200&h=200&auto=format&fit=crop',
  rating: 4.9,
  tag: 'Editor\'s Top Choice 2024'
};

const TRENDING_TRENDS = [
  { label: 'Sweeps', keyword: 'Stake.us Promo' },
  { label: 'Casinos', keyword: 'High RTP Slots' },
  { label: 'Sports', keyword: 'Legal Betting States' },
  { label: 'Lottery', keyword: 'Online Mega Millions' }
];

const Hero: React.FC = () => {
  return (
    <section className="bg-slate-950 text-white relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32">
      {/* Editorial Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">Validated Market Intelligence</span>
            </div>

            <h1 className="serif-header text-6xl lg:text-8xl font-black leading-[0.95] mb-10 tracking-tight">
              Premium <br/>
              <span className="text-emerald-400 italic">Gaming</span> <br/>
              Analyses.
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-xl font-medium">
              The professional’s source for <span className="text-white font-bold underline decoration-emerald-500/50 underline-offset-8 text-xl">Online Casino</span> reviews, legal sportsbook insights, and the web's most accurate gaming intelligence.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-emerald-500/20">
                Explore Best Bonuses
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Market Trends Archive
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-[40px] p-2 shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="absolute -top-6 -right-6 bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl z-20">
                Top Rated Brand
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-[34px] p-10 text-slate-950">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-200 p-3 flex items-center justify-center">
                    <img src={FEATURED.logo} alt="Brand" className="max-w-full h-auto rounded-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{FEATURED.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {[1,2,3,4,5].map(i => <span key={i} className="text-emerald-600 text-[10px]">★</span>)}
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Vetted Partner</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-8 shadow-sm">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] block mb-2">{FEATURED.tag}</span>
                  <div className="text-3xl serif-header font-black text-slate-900 leading-tight italic">
                    {FEATURED.offer}
                  </div>
                </div>

                <button className="w-full bg-slate-900 hover:bg-black text-white font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl mb-4">
                  Claim Exclusive Bonus
                </button>
                
                <p className="text-[8px] text-slate-400 font-bold text-center uppercase tracking-widest leading-relaxed">
                  21+ | Play Responsibly | Legal US Only | Updated Hourly
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Pulse</span>
            </div>
            <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex items-center gap-4">
                {TRENDING_TRENDS.map((trend, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-emerald-500/10 transition-all cursor-pointer group whitespace-nowrap">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest group-hover:text-white">{trend.label}</span>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-emerald-400">{trend.keyword}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
