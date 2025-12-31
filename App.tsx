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
  }
];

const App: React.FC = () => {
  const [activeNiche, setActiveNiche] = useState('sweeps');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const containerRef = useRef<HTMLDivElement>(null);

  const apiKey = (window.process?.env?.API_KEY || '').trim();
  const hasApiKey = apiKey.length > 5;

  const isEmbedded = typeof window !== 'undefined' && 
    (new URLSearchParams(window.location.search).get('embedded') === 'true' || window.self !== window.top);

  useEffect(() => {
    // Immediate height report
    if (window.parent) {
      window.parent.postMessage({ type: 'hol-app-ready' }, '*');
    }

    if (currentPage === Page.Admin) return;
    
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const wpData = await fetchWordPressPosts();
        if (!hasApiKey) {
          setNews(wpData);
          setIsLoading(false);
          return;
        }
        const nicheObj = NICHES.find(n => n.id === activeNiche);
        const aiData = await fetchLatestGamingNews(nicheObj?.keywords || "Gaming");
        setNews([...aiData, ...wpData]);
      } catch (err) { 
        console.warn("Sync failed", err); 
      } finally { 
        setIsLoading(false); 
      }
    };
    loadContent();
  }, [activeNiche, currentPage, hasApiKey]);

  useLayoutEffect(() => {
    const reportHeight = () => {
      if (containerRef.current && isEmbedded) {
        const height = containerRef.current.scrollHeight;
        window.parent.postMessage({ type: 'hol-resize', height }, '*');
      }
    };

    const resizeObserver = new ResizeObserver(reportHeight);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    
    // Fallback interval for the first few seconds
    const interval = setInterval(reportHeight, 1000);
    setTimeout(() => clearInterval(interval), 10000);

    return () => {
      resizeObserver.disconnect();
      clearInterval(interval);
    };
  }, [news, isLoading, isEmbedded, currentPage]);

  if (currentPage === Page.Admin) {
    return <div ref={containerRef} className="bg-slate-950 min-h-screen"><CloudwaysAdmin /></div>;
  }

  return (
    <div ref={containerRef} className={`flex flex-col min-h-screen ${isEmbedded ? 'bg-transparent' : 'bg-[#fcfcfd]'}`}>
      {!isEmbedded && <Header activePage={currentPage} setPage={setCurrentPage} />}
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          {!hasApiKey && (
            <div className="mb-12 p-8 bg-slate-900 border border-emerald-500/30 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 text-xl font-bold animate-pulse">!</div>
                <div>
                  <h4 className="text-white font-black text-lg tracking-tight">AI Systems Offline</h4>
                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mt-1">Configure your API_KEY in Vercel to activate AI news summaries.</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Premium <span className="text-emerald-600 uppercase italic">Intelligence</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map(n => (
                    <button 
                      key={n.id} 
                      onClick={() => setActiveNiche(n.id)}
                      className={`text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all ${
                        activeNiche === n.id ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {MOCK_BONUSES.map(bonus => (
                  <BonusCard key={bonus.id} bonus={bonus} />
                ))}
              </div>
              
              <div className="mt-20">
                <NewsFeed news={news} isLoading={isLoading} />
              </div>
            </div>

            <aside className="lg:w-80 shrink-0">
                <div className="bg-[#0f172a] text-white p-10 rounded-[32px] sticky top-32 shadow-2xl border border-white/5">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-500/20">♣</div>
                    <h4 className="font-black text-2xl mb-4 leading-tight">Elite Legal Tracking</h4>
                    <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Real-time status monitor for US regulated markets.</p>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all">Join Elite</button>
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