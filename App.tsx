import React, { useState, useEffect } from 'react';
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

  // Check for API Key in both Vercel env and WordPress Config
  const apiKey = (window.process?.env?.API_KEY || (window as any).HOL_CONFIG?.API_KEY || '').trim();
  const hasApiKey = apiKey.length > 5;

  useEffect(() => {
    if (currentPage === Page.Admin) return;
    
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const wpData = await fetchWordPressPosts();
        if (!hasApiKey) {
          setNews(wpData);
          return;
        }
        const nicheObj = NICHES.find(n => n.id === activeNiche);
        const aiData = await fetchLatestGamingNews(nicheObj?.keywords || "Gaming");
        setNews([...aiData, ...wpData]);
      } catch (err) { 
        console.warn("Content sync failed", err); 
      } finally { 
        setIsLoading(false); 
      }
    };
    loadContent();
  }, [activeNiche, currentPage, hasApiKey]);

  if (currentPage === Page.Admin) {
    return <div className="bg-slate-950 min-h-screen"><CloudwaysAdmin /></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] text-slate-900">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          {!hasApiKey && (
            <div className="mb-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4 shadow-sm">
              <span className="text-2xl">💡</span>
              <p className="text-amber-800 text-sm font-medium">
                AI Mode is currently limited. Add your <code className="bg-amber-100 px-1 rounded">API_KEY</code> to the WordPress script to enable real-time industry tracking.
              </p>
            </div>
          )}

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
                      className={`text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all ${
                        activeNiche === n.id ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
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
                <div className="bg-[#0f172a] text-white p-10 rounded-[32px] sticky top-32 shadow-2xl">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-emerald-500/20">♣</div>
                    <h4 className="font-black text-2xl mb-4 leading-tight text-white">Legal Market Tracking</h4>
                    <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">The most accurate real-time status monitor for US regulated gaming.</p>
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all">Join Elite Access</button>
                </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer onAdminClick={() => setCurrentPage(Page.Admin)} />
      <AIConsultant />
    </div>
  );
};

export default App;