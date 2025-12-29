
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BonusCard from './components/BonusCard';
import NewsFeed from './components/NewsFeed';
import Footer from './components/Footer';
import { Page, NewsArticle, BonusOffer } from './types';
import { fetchLatestGamingNews } from './services/gemini';
import { fetchWordPressPosts } from './services/wordpress';

const MOCK_BONUSES: BonusOffer[] = [
  {
    id: '1',
    brand: 'FanDuel Casino',
    offer: 'Play It Again up to $1,000',
    promoCode: 'HUBFREE',
    link: '#',
    logo: 'https://picsum.photos/seed/fd/100/100',
    terms: 'New players only. 24h play period.',
    rating: 4.9
  },
  {
    id: '2',
    brand: 'DraftKings',
    offer: 'Bet $5, Get $200 Instantly',
    promoCode: 'LUCK200',
    link: '#',
    logo: 'https://picsum.photos/seed/dk/100/100',
    terms: 'Valid in legal states only. Min $5 deposit.',
    rating: 4.8
  },
  {
    id: '3',
    brand: 'BetMGM',
    offer: '100% Deposit Match up to $1,500',
    promoCode: 'KINGHUB',
    link: '#',
    logo: 'https://picsum.photos/seed/betmgm/100/100',
    terms: '21+. T&Cs apply.',
    rating: 4.7
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- START RESIZE BRIDGE ---
  // This tells Elementor exactly how tall to make the iframe
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.contentRect.height;
        window.parent.postMessage({ type: 'hol-resize', height: height + 100 }, '*');
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [news, currentPage]);
  // --- END RESIZE BRIDGE ---

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      const [aiData, wpData] = await Promise.all([
        fetchLatestGamingNews("Latest US online casino legalization news and sports betting updates"),
        fetchWordPressPosts()
      ]);
      const mergedNews = [...wpData, ...aiData];
      setNews(mergedNews);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#fcfcfc]">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === Page.Home && (
          <div className="animate-in fade-in duration-500">
            <Hero />
            
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3">
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-8 border-b-2 border-gray-900 pb-2">
                      <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter flex items-center">
                        <span className="bg-emerald-600 w-3 h-8 mr-4"></span>
                        Latest Intelligence
                      </h2>
                      <button 
                        onClick={() => setCurrentPage(Page.News)}
                        className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        View All Reports →
                      </button>
                    </div>
                    <NewsFeed news={news} isLoading={isLoading} />
                  </div>
                </div>

                <aside className="lg:w-1/3">
                  <div className="sticky top-28 space-y-10">
                    <div>
                      <h3 className="text-xs font-black mb-6 text-gray-900 uppercase tracking-[0.3em] border-b border-gray-100 pb-3">Premium Bonuses</h3>
                      <div className="space-y-6">
                        {MOCK_BONUSES.map(bonus => (
                          <BonusCard key={bonus.id} bonus={bonus} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-emerald-950 text-white rounded-sm p-8 shadow-2xl shadow-emerald-900/20">
                      <h3 className="text-xl font-black mb-2 text-white uppercase tracking-tight">The Hub Report</h3>
                      <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">Weekly Insider Intelligence</p>
                      <input 
                        type="email" 
                        placeholder="ENTER EMAIL ADDRESS" 
                        className="w-full bg-emerald-900/50 border border-emerald-800 rounded-sm px-4 py-4 mb-4 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-emerald-700 font-bold text-xs"
                      />
                      <button className="w-full bg-emerald-500 text-emerald-950 font-black py-4 rounded-sm hover:bg-emerald-400 transition-all text-xs tracking-widest uppercase shadow-lg shadow-emerald-500/20">
                        SUBSCRIBE NOW
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
        )}

        {currentPage === Page.News && (
          <div className="max-w-6xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-black mb-4 tracking-tighter uppercase">Industry Intelligence</h1>
            <p className="text-gray-500 font-medium mb-12 max-w-2xl">The latest data-driven reports on the US gaming landscape, regulatory changes, and legal updates.</p>
            <NewsFeed news={news} isLoading={isLoading} fullWidth />
          </div>
        )}

        {currentPage === Page.Bonuses && (
          <div className="max-w-6xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h1 className="text-5xl font-black mb-12 tracking-tighter uppercase">Exclusive Bonuses</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {MOCK_BONUSES.map(bonus => (
                  <BonusCard key={bonus.id} bonus={bonus} />
               ))}
             </div>
          </div>
        )}

        {currentPage === Page.Guides && (
          <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-black mb-12 tracking-tighter uppercase">Professional Guides</h1>
            <div className="prose prose-emerald prose-lg max-w-none">
              <p className="lead text-xl text-gray-600 font-medium">Our data-backed strategies will help you navigate the complex landscape of modern digital gaming.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 not-prose">
                <div className="bg-white p-8 border-l-4 border-emerald-600 shadow-sm">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Bankroll Management</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">The most critical skill in any form of gaming: managing capital and understanding probability curves.</p>
                </div>
                <div className="bg-white p-8 border-l-4 border-emerald-600 shadow-sm">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Legal Landscapes</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">A detailed state-by-state breakdown of where you can play legally in the United States.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
