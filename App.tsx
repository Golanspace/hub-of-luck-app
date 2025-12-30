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

  const isEmbedded = typeof window !== 'undefined' && 
    (new URLSearchParams(window.location.search).get('embedded') === 'true' || window.self !== window.top);

  useEffect(() => {
    // Send READY signal to Parent (Elementor)
    if (window.parent) {
      window.parent.postMessage({ type: 'hol-app-ready' }, '*');
    }

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
      } catch (err) { 
        console.warn("Content sync failed", err); 
      } finally { 
        setIsLoading(false); 
      }
    };
    loadContent();
  }, [activeNiche, currentPage]);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (!containerRef.current || !isEmbedded) return;
      const h = containerRef.current.scrollHeight;
      if (h > 0) {
        window.parent.postMessage({ type: 'hol-resize', height: h }, '*');
      }
    };
    
    const observer = new ResizeObserver(updateHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    const timer = setInterval(updateHeight, 2000);
    
    return () => { observer.disconnect(); clearInterval(timer); };
  }, [news, isLoading, currentPage, isEmbedded]);

  if (currentPage === Page.Admin) {
    return (
      <div ref={containerRef} className="bg-slate-950 min-h-screen">
        <CloudwaysAdmin />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`flex flex-col ${isEmbedded ? 'bg-transparent' : 'bg-[#fcfcfd]'}`}>
      {!isEmbedded && <Header activePage={currentPage} setPage={setCurrentPage} />}
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Verified <span className="text-emerald-600 uppercase italic">Intelligence</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map(n => (
                    <button 
                      key={n.id} 
                      onClick={() => setActiveNiche(n.id)}
                      className={`text-[9px] font-black uppercase tracking-widest px-3 py-2 rounded-lg transition-all ${
                        activeNiche === n.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {MOCK_BONUSES.map(bonus => (
                  <BonusCard key={bonus.id} bonus={bonus} />
                ))}
              </div>
              
              <div className="mt-20">
                <NewsFeed news={news} isLoading={isLoading} />
              </div>
            </div>

            <aside className="lg:w-80 shrink-0">
                <div className="bg-[#0f172a] text-white p-8 rounded-3xl sticky top-32">
                    <h4 className="font-black text-xl mb-4">Elite Access</h4>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">The only source for verified sweepstakes legal tracking.</p>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">Join Elite Feed</button>
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