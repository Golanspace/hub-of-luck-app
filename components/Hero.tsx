import React, { useEffect } from 'react';

const FEATURED = {
  name: 'Stake.us Social Casino',
  offer: '250,000 GC + $25 Stake Cash',
  logo: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=200&h=200&auto=format&fit=crop',
  rating: 4.9,
  reviewCount: 1250,
  tag: 'Best Sweeps Casino 2024'
};

const TRENDING_TRENDS = [
  { label: 'Sweeps', keyword: 'No Deposit SC' },
  { label: 'Casinos', keyword: 'High RTP Slots' },
  { label: 'Sports', keyword: 'Live Parlay Odds' },
  { label: 'Lottery', keyword: 'Mega Millions Jackpot' },
  { label: 'New', keyword: 'McLuck Promo Code' },
  { label: 'Trends', keyword: 'Social Casino Apps' }
];

const Hero: React.FC = () => {
  useEffect(() => {
    // Inject JSON-LD Schema for SEO
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Hub of Luck",
      "url": "https://hubofluck.com",
      "description": "Your premium source for sweepstakes casino reviews, online lottery guides, and legal US sports betting bonuses.",
      "genre": "Gaming Hub",
      "keywords": "sweepstakes casinos, online casinos, sports betting, no deposit bonus, lottery reviews",
      "publisher": {
        "@type": "Organization",
        "name": "Hub of Luck",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hubofluck.com/wp-content/uploads/logo.png"
        }
      }
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": FEATURED.name,
      "description": FEATURED.offer,
      "brand": {
        "@type": "Brand",
        "name": "Stake.us"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": FEATURED.rating,
        "reviewCount": FEATURED.reviewCount
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify([schemaData, productSchema]);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-[#0f172a] text-white relative overflow-hidden border-b border-white/5" aria-labelledby="hero-heading">
      {/* Editorial Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-16 lg:pt-24 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">
          
          {/* Content Section */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Expert Verified Gaming Intelligence</span>
            </div>

            <h1 id="hero-heading" className="serif-header text-5xl lg:text-7xl font-black leading-[1.05] mb-8 tracking-tight">
              Premium <span className="text-emerald-400">Sweepstakes</span> <br/>
              Analyses & Bonuses.
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl">
              The professional’s source for <span className="text-white font-bold">Online Casino</span> reviews, legal sportsbook promo codes, and real-time gambling industry insights across the US.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-10 py-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20">
                View Best Bonuses
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                Read Lottery Guides
              </button>
            </div>
          </div>

          {/* Featured Brand Box (Brand of the Month) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-1 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-lg z-20">
                Top Rated Brand
              </div>
              
              <div className="bg-slate-50 border border-slate-100 rounded-[22px] p-8 text-slate-900">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex items-center justify-center">
                    <img 
                      src={FEATURED.logo} 
                      alt={`${FEATURED.name} - Logo`} 
                      className="max-w-full h-auto rounded-lg" 
                      loading="eager"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">{FEATURED.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-amber-500 text-xs" aria-hidden="true">★★★★★</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rated {FEATURED.rating}/5.0</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-2">{FEATURED.tag}</span>
                  <div className="text-xl font-black text-slate-900 leading-tight">
                    {FEATURED.offer}
                  </div>
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-xl text-xs uppercase tracking-[0.15em] transition-all shadow-lg shadow-emerald-600/10 mb-4">
                  Claim Exclusive Bonus
                </button>
                
                <p className="text-[9px] text-slate-400 font-bold text-center uppercase tracking-tighter">
                  21+ | Play Responsibly | Legal in US States | Updated {new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Market Pulse: Trending Keywords Section */}
        <div className="mt-8 border-t border-white/10 pt-8" aria-label="Trending Gaming Topics">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" aria-hidden="true"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live Market Pulse</span>
            </div>
            <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
              <div className="flex items-center gap-3 whitespace-nowrap">
                {TRENDING_TRENDS.map((trend, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer group"
                    role="link"
                    aria-label={`Trending topic: ${trend.label} - ${trend.keyword}`}
                  >
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest group-hover:text-white transition-colors">
                      {trend.label}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-emerald-400 transition-colors">
                      {trend.keyword}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 hidden lg:block">
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                Market Trends Archive →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;