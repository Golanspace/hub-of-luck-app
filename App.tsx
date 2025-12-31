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
    brand: 'Stake.us',
    offer: '250,000 GC + $25 Stake Cash Drop',
    promoCode: 'HUBLUCK',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=200&h=200&auto=format&fit=crop',
    terms: '21+ | US Only. T&Cs apply.',
    rating: 5.0
  },
  {
    id: '2',
    brand: 'Pulsz',
    offer: '5,000 GC + 2.3 SC Welcome Bonus',
    promoCode: 'STAKEHUB',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=200&h=200&auto=format&fit=crop',
    terms: 'New players only. Valid 2024.',
    rating: 4.8
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
        setNews([...aiData, ...wpData]);
      } catch (err) { 
        console.warn("Sync failed", err); 
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
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-emerald-500/20">
      {/* Reduced Header height to feel less intrusive */}
      <Header activePage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 gap-6 border-b border-slate-100 pb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                    Market <span className="text-emerald-500 underline decoration-slate-100 underline-offset-8">Vetted</span>
                  </h2>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-2">Verified Gaming Incentives</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map(n => (
                    <button 
                      key={n.id} 
                      onClick={() => setActiveNiche(n.id)}
                      className={`text-[9px] font-black uppercase tracking-widest px-5 py-3 rounded-full transition-all border ${
                        activeNiche === n.id 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white border-slate-200 text-slate-400 hover:border-slate-400'
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
              
              <div className="mt-24">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                    Industry <span className="text-emerald-500 underline decoration-slate-100 underline-offset-8">Pulse</span>
                  </h2>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-2">Intelligence Tracker</p>
                </div>
                <NewsFeed news={news} isLoading={isLoading} />
              </div>
            </div>

            {/* Adaptive Sidebar */}
            <aside className="lg:col-span-4">
                <div className="bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-[40px] sticky top-28">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg italic font-black text-slate-950">♣</div>
                    <h4 className="font-black text-2xl mb-4 tracking-tight uppercase leading-none">Elite Access</h4>
                    <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">Join our verified tracking network for real-time legal updates and no-deposit bonus drops.</p>
                    
                    <button className="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 mb-8">
                      Sign Up For Intelligence
                    </button>
                    
                    <div className="pt-8 border-t border-slate-200">
                        <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-6">Real-Time Stats</div>
                        <div className="space-y-5">
                            {[
                                { label: 'Legal States', value: '45/50', trend: 'UP' },
                                { label: 'Active Promos', value: '112', trend: 'NEW' },
                                { label: 'Verified Hubs', value: '28', trend: 'HOLD' }
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                    <div className="flex items-center gap-3">
                                      <span className="text-xs font-black text-slate-900 font-mono">{stat.value}</span>
                                      <span className="text-[8px] font-black px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-400">${stat.trend}</span>
                                    </div>
                                </div>
                            ))}
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