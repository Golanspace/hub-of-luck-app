import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import BonusCard from './components/BonusCard.tsx';
import NewsFeed from './components/NewsFeed.tsx';
import Footer from './components/Footer.tsx';
import { Page, NewsArticle, BonusOffer } from './types.ts';
import { fetchLatestGamingNews } from './services/gemini.ts';
import { fetchWordPressPosts } from './services/wordpress.ts';

const NICHES = [
  { id: 'all', label: 'Trending', keywords: 'Gaming' },
  { id: 'casinos', label: 'Online Casinos', keywords: 'Casinos' },
  { id: 'sports', label: 'Sports Betting', keywords: 'Sports' },
  { id: 'lottery', label: 'Lottery', keywords: 'Lottery' },
  { id: 'sweeps', label: 'Sweepstakes', keywords: 'Sweepstakes' }
];

const MOCK_BONUSES: BonusOffer[] = [
  {
    id: '1',
    brand: 'FanDuel Elite',
    offer: '$1,000 Risk-Free Play',
    promoCode: 'HUBVIP',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=100&h=100&auto=format&fit=crop',
    terms: '21+ only. New customers. T&Cs apply.',
    rating: 4.9
  },
  {
    id: '2',
    brand: 'BetMGM Gold',
    offer: 'Deposit Match up to $1,500',
    promoCode: 'HUBGOLD',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=100&h=100&auto=format&fit=crop',
    terms: 'Deposit required. NJ/PA/MI/WV only.',
    rating: 4.8
  }
];

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [activeNiche, setActiveNiche] = useState('all');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const nicheObj = NICHES.find(n => n.id === activeNiche);
      const [aiData, wpData] = await Promise.allSettled([
        fetchLatestGamingNews(nicheObj?.keywords || "Gaming"),
        activeNiche === 'all' ? fetchWordPressPosts() : Promise.resolve([])
      ]);
      
      const combined = [
        ...(wpData.status === 'fulfilled' ? wpData.value : []),
        ...(aiData.status === 'fulfilled' ? aiData.value : [])
      ];
      setNews(combined);
      setIsLoading(false);
    };
    loadContent();
  }, [activeNiche]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateHeight = () => {
      const h = containerRef.current?.scrollHeight || 0;
      window.parent.postMessage({ type: 'hol-resize', height: h + 100 }, '*');
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [news, currentPage, isLoading]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Hero />
            
            {/* SEO Niche Bar */}
            <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 mb-12">
              <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
                <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-4">Explore Niches:</span>
                  {NICHES.map(niche => (
                    <button
                      key={niche.id}
                      onClick={() => setActiveNiche(niche.id)}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                        activeNiche === niche.id 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100' 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200 hover:text-emerald-600'
                      }`}
                    >
                      {niche.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8">
                  <div className="mb-10 flex items-center justify-between">
                    <h2 className="serif-title text-4xl font-black text-gray-900 tracking-tight">
                      Current <span className="text-emerald-600">Intelligence</span>
                    </h2>
                  </div>
                  <NewsFeed news={news} isLoading={isLoading} />
                </div>
                
                <aside className="lg:col-span-4">
                  <div className="sticky top-40 space-y-12">
                    <div>
                      <h3 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.25em] mb-8 border-l-4 border-emerald-600 pl-4">Verified Offers</h3>
                      <div className="space-y-6">
                        {MOCK_BONUSES.map(bonus => (
                          <BonusCard key={bonus.id} bonus={bonus} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-emerald-900 rounded-2xl p-8 text-white">
                      <h4 className="font-black text-xl mb-4 italic">The Insider Newsletter</h4>
                      <p className="text-emerald-100 text-sm mb-6 leading-relaxed">Join 24,000+ industry pros receiving weekly regulatory updates and private bonus codes.</p>
                      <div className="space-y-3">
                        <input type="email" placeholder="professional@email.com" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black py-3 rounded-xl text-xs uppercase tracking-widest transition-colors">Join Elite Feed</button>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
        );
      case Page.News:
        return <div className="max-w-5xl mx-auto px-4 py-16"><NewsFeed news={news} isLoading={isLoading} fullWidth /></div>;
      case Page.Bonuses:
        return (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="serif-title text-6xl font-black mb-16 text-center">Elite Bonus <span className="text-emerald-600">Inventory</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_BONUSES.map(bonus => <BonusCard key={bonus.id} bonus={bonus} />)}
            </div>
          </div>
        );
      default:
        return <div className="py-40 text-center text-gray-400 font-bold uppercase tracking-widest">Expansion in Progress</div>;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => <AppContent />;

export default App;