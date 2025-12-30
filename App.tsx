
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import BonusCard from './components/BonusCard.tsx';
import NewsFeed from './components/NewsFeed.tsx';
import Footer from './components/Footer.tsx';
import AIConsultant from './components/AIConsultant.tsx';
import CloudwaysAdmin from './components/CloudwaysAdmin.tsx';
import { Page, NewsArticle, BonusOffer } from './types.ts';
import { fetchLatestGamingNews } from './services/gemini.ts';
import { fetchWordPressPosts } from './services/wordpress.ts';

const NICHES = [
  { id: 'sweeps', label: 'Sweepstakes', keywords: 'Sweepstakes' },
  { id: 'casinos', label: 'Online Casinos', keywords: 'Casinos' },
  { id: 'sports', label: 'Sports Betting', keywords: 'Sports' }
];

const MOCK_BONUSES: BonusOffer[] = [
  {
    id: '1',
    brand: 'Pulsz Casino',
    offer: '5,000 Free GC + 2.3 SC Welcome Bonus',
    promoCode: 'HUBLUCK',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=100&h=100&auto=format&fit=crop',
    terms: 'New customers only. 21+. No purchase required.',
    rating: 4.9
  },
  {
    id: '2',
    brand: 'McLuck.com',
    offer: '7,500 Gold Coins + 5 SC No Deposit',
    promoCode: 'HUBGOLD',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=100&h=100&auto=format&fit=crop',
    terms: 'Available in most US states. Daily login rewards.',
    rating: 4.8
  }
];

const App: React.FC = () => {
  const [activeNiche, setActiveNiche] = useState('sweeps');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we are running in an Elementor iFrame
  const isEmbedded = new URLSearchParams(window.location.search).get('embedded') === 'true';

  useEffect(() => {
    if (currentPage === Page.Admin) return;
    const loadContent = async () => {
      setIsLoading(true);
      const nicheObj = NICHES.find(n => n.id === activeNiche);
      try {
        const [aiData, wpData] = await Promise.allSettled([
          fetchLatestGamingNews(nicheObj?.keywords || "Gaming"),
          fetchWordPressPosts()
        ]);
        const combined = [
          ...(wpData.status === 'fulfilled' ? wpData.value : []),
          ...(aiData.status === 'fulfilled' ? aiData.value : [])
        ];
        setNews(combined);
      } catch (err) { console.error(err); } 
      finally { setIsLoading(false); }
    };
    loadContent();
  }, [activeNiche, currentPage]);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (!containerRef.current) return;
      const h = containerRef.current.getBoundingClientRect().height;
      window.parent.postMessage({ type: 'hol-resize', height: h + 50 }, '*');
    };
    const observer = new ResizeObserver(() => requestAnimationFrame(updateHeight));
    if (containerRef.current) observer.observe(containerRef.current);
    updateHeight();
    const interval = setInterval(updateHeight, 2000);
    return () => { observer.disconnect(); clearInterval(interval); };
  }, [news, isLoading, currentPage]);

  if (currentPage === Page.Admin) {
    return (
      <div ref={containerRef} className="bg-slate-950">
        <div className="sticky top-0 z-[100] bg-slate-900 p-4 border-b border-white/5 flex justify-between items-center">
          <button onClick={() => setCurrentPage(Page.Home)} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
            ← Return to Hub Front
          </button>
          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Administrator Access Locked</div>
        </div>
        <CloudwaysAdmin />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`min-h-screen flex flex-col ${isEmbedded ? 'bg-transparent' : 'bg-[#fcfcfd]'}`}>
      {!isEmbedded && <Header activePage={currentPage} setPage={setCurrentPage} />}
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:col-span-8 flex-1">
              <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Top Verified <span className="text-emerald-600 uppercase italic">Sweeps</span>
                </h2>
                <div className="flex gap-2">
                  {NICHES.map(n => (
                    <button 
                      key={n.id} 
                      onClick={() => setActiveNiche(n.id)}
                      className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${
                        activeNiche === n.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {MOCK_BONUSES.map(bonus => (
                  <BonusCard key={bonus.id} bonus={bonus} />
                ))}
              </div>
              
              <div className="mt-24">
                <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                  Industry News
                  <div className="flex-1 h-px bg-slate-100"></div>
                </h3>
                <NewsFeed news={news} isLoading={isLoading} />
              </div>
            </div>

            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#0f172a] text-white p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full"></div>
                    <h4 className="font-black text-xl mb-4 relative z-10">Hub Intelligence</h4>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">Join 5,000+ gamers getting weekly regulatory updates and private promo codes.</p>
                    <input type="email" placeholder="Email address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Join Elite Feed</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {!isEmbedded && <Footer onAdminClick={() => setCurrentPage(Page.Admin)} />}
      <AIConsultant />
    </div>
  );
};

export default App;
