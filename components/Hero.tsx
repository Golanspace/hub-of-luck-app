import React from 'react';

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
    <section className="bg-slate-950 text-white relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      {/* Editorial Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-7 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-emerald-400">Market Intelligence Hub</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
              Verified <br/>
              <span className="text-emerald-500">Gaming</span> Intelligence.
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-xl font-medium">
              The premium source for <span className="text-white font-bold border-b-2 border-emerald-500/30 pb-0.5">Online Casino</span> reviews, regulatory changes, and exclusive gaming market insights.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                Explore Best Bonuses
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-95">
                Market Trends
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-[40px] p-2 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl z-20">
                #1 VETTED CHOICE
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-[34px] p-8 md:p-10 text-slate-950">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-3xl shadow-sm border border-slate-200 p-3 flex items-center justify-center">
                    <img src={FEATURED.logo} alt="Brand" className="max-w-full h-auto rounded-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight">{FEATURED.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {[1,2,3,4,5].map(i => <span key={i} className="text-emerald-600 text-[10px]">★</span>)}
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Editor Approved</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 mb-8 shadow-sm">
                  <span className="text-[9px] font-extrabold text-emerald-600 uppercase tracking-[0.2em] block mb-2">{FEATURED.tag}</span>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tighter">
                    {FEATURED.offer}
                  </div>
                </div>

                <button className="w-full bg-slate-900 hover:bg-black text-white font-black py-6 rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl mb-4 active:scale-[0.98]">
                  Claim Exclusive Bonus
                </button>
                
                <p className="text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest">
                  21+ | Play Responsibly | US ONLY
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Updates</span>
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