
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
  { id: 'sweeps', label: 'Sweepstakes', keywords: 'US Sweepstakes Casinos' },
  { id: 'casinos', label: 'Online Casinos', keywords: 'US Legal Online Casinos' },
  { id: 'sports', label: 'Sports Betting', keywords: 'US Legal Sports Betting' }
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
    brand: 'Stake.us',
    offer: '250,000 GC + $25 Stake Cash Drop',
    promoCode: 'LUCK777',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=100',
    terms: 'Daily login bonus available. 21+ US residents.',
    rating: 5.0
  }
];

const App: React.FC = () => {
  const [activeNiche, setActiveNiche] = useState('sweeps');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  useEffect(() => {
    if (currentPage === Page.Admin) return;
    
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const wpData = await fetchWordPressPosts();
        const nicheObj = NICHES.find(n => n.id === activeNiche);
        const aiData = await fetchLatestGamingNews(nicheObj?.keywords || "Gaming");
        
        // Merge AI news and WP data, deduplicating or prioritizing
        setNews([...aiData, ...wpData]);
      } catch (err) { 
        console.warn("Content sync failed", err); 
      } finally { 
        setIsLoading(false); 
      }
    };
    loadContent();
  }, [activeNiche, currentPage]);

  if (currentPage === Page.Admin) {
    return <div className="bg-slate-950 min-h-screen"><CloudwaysAdmin /></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500/20 overflow-x-hidden">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-8 border-b border-slate-200 pb-10">
                <div>
                  <h2 className="serif-header text-5xl font-black text-slate-900 tracking-tighter italic">
                    Verified <span className="text-emerald-500 italic underline decoration-slate-200 underline-offset-[12px]">Intelligence</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-4">Top Industry Recommendations</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map(n => (
                    <button 
                      key={n.id} 
                      onClick={() => setActiveNiche(n.id)}
                      className={`text-[9px] font-black uppercase tracking-[0.2em] px-6 py-4 rounded-2xl transition-all ${
                        activeNiche === n.id 
                          ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                          : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'
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
              
              <div className="mt-40">
                <div className="mb-16">
                  <h2 className="serif-header text-5xl font-black text-slate-900 tracking-tighter italic">
                    Industry <span className="text-emerald-500 underline decoration-slate-200 underline-offset-[12px]">Pulse</span>
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-4">Real-time Regulatory Tracking</p>
                </div>
                <NewsFeed news={news} isLoading={isLoading} />
              </div>
            </div>

            <aside className="lg:w-[360px] xl:w-[400px] shrink-0">
                <div className="dark-glass text-white p-10 md:p-12 rounded-[48px] sticky top-32 shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-white/5 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="w-16 h-16 bg-emerald-500 rounded-[24px] flex items-center justify-center text-3xl mb-8 shadow-2xl shadow-emerald-500/20 italic serif-header text-slate-950 relative z-10">♣</div>
                    
                    <div className="relative z-10">
                      <h4 className="font-black text-3xl mb-6 leading-tight tracking-tight uppercase">Elite Market Monitoring</h4>
                      <p className="text-slate-400 text-base mb-12 leading-relaxed font-medium">Access the most accurate US legal status monitor. Updated by our intelligence engine.</p>
                      
                      <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-emerald-500/20 active:scale-95 mb-10">
                        Get Access Today
                      </button>
                      
                      <div className="pt-10 border-t border-white/5">
                          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6">Market Statistics</div>
                          <div className="space-y-6">
                              {[
                                  { label: 'Legal States', value: '45/50' },
                                  { label: 'Active Sweeps', value: '112' },
                                  { label: 'Avg Bonus Value', value: '$24.50' }
                              ].map((stat, i) => (
                                  <div key={i} className="flex justify-between items-center group cursor-default">
                                      <span className="text-xs font-bold text-slate-500 uppercase group-hover:text-slate-300 transition-colors">{stat.label}</span>
                                      <span className="text-xs font-black text-white font-mono">{stat.value}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                    </div>
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
