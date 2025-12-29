import React from 'react';

const FEATURED_BRAND = {
  name: 'BetMGM Premier',
  offer: '$1,500 Deposit Match',
  highlight: 'Best for Sports & Casino 2024',
  logo: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=200&h=200&auto=format&fit=crop',
  rating: '4.9/5.0'
};

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white pt-16 pb-24 overflow-hidden border-b border-gray-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/20 skew-x-12 translate-x-32 hidden lg:block -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full mb-8 border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest">Global Intelligence Hub</span>
            </div>

            <h1 className="serif-title text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight text-gray-900 mb-8 italic">
              Gaming <br/>
              <span className="text-emerald-600 not-italic">Authority.</span>
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              The professional’s choice for the most relevant <span className="text-gray-900 font-bold">online casino bonuses</span>, <span className="text-gray-900 font-bold">sweepstakes casino reviews</span>, and <span className="text-gray-900 font-bold">sports betting odds</span>. Updated every hour with verified intelligence.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-gray-200">
                Access Member Portal
              </button>
              <button className="bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all">
                Analyze Odds Today
              </button>
            </div>

            <div className="mt-16 flex items-center gap-12 border-t border-gray-100 pt-10">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900">48+</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Legal States</span>
              </div>
              <div className="w-[1px] h-10 bg-gray-100"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900">2.4k</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Daily Insights</span>
              </div>
              <div className="w-[1px] h-10 bg-gray-100"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900">Verified</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">License Check</span>
              </div>
            </div>
          </div>

          {/* Brand of the Month Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-600/5 rounded-[3rem] -rotate-3 blur-2xl"></div>
              <div className="relative bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-10 overflow-hidden">
                
                <div className="flex items-center justify-between mb-10">
                  <div className="bg-emerald-950 text-white px-4 py-2 rounded-xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Brand of the Month</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400 text-xs">★★★★★</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{FEATURED_BRAND.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src={FEATURED_BRAND.logo} className="w-full h-full object-cover" alt={FEATURED_BRAND.name} />
                  </div>
                  <div>
                    <h3 className="serif-title text-3xl font-black text-gray-900 tracking-tight">{FEATURED_BRAND.name}</h3>
                    <p className="text-emerald-600 text-xs font-black uppercase tracking-widest mt-1">{FEATURED_BRAND.highlight}</p>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-3xl p-8 mb-10 border border-emerald-100">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block mb-2 opacity-60">Exclusive Hub Offer</span>
                  <div className="text-4xl font-black text-emerald-900 leading-tight">
                    {FEATURED_BRAND.offer}
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-6 rounded-2xl text-[12px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-100">
                    Claim Verified Bonus
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all">
                    Read Intelligence Review
                  </button>
                </div>
                
                <p className="text-center mt-6 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  21+ | Terms & Conditions Apply | Verified Jan 2024
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;