
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import BonusCard from './components/BonusCard.tsx';
import NewsFeed from './components/NewsFeed.tsx';
import Footer from './components/Footer.tsx';
import { Page, NewsArticle, BonusOffer } from './types.ts';
import { fetchLatestGamingNews } from './services/gemini.ts';
import { fetchWordPressPosts } from './services/wordpress.ts';

// Simple Error Boundary Wrapper - Fixed TypeScript visibility errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  // Use class fields for state to avoid constructor-based visibility issues
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    // Destructure state and props for cleaner access and to satisfy strict checks
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-10 text-center">
          <div>
            <h1 className="text-red-500 text-4xl font-black mb-4">UI ENGINE CRASH</h1>
            <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto">
              {error?.toString()}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-8 bg-emerald-600 px-6 py-3 rounded-xl font-bold"
            >
              REBOOT SYSTEM
            </button>
          </div>
        </div>
      );
    }
    return children;
  }
}

const MOCK_BONUSES: BonusOffer[] = [
  {
    id: '1',
    brand: 'FanDuel Elite',
    offer: '$1,000 Play It Again',
    promoCode: 'HUBVIP',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=100&h=100&auto=format&fit=crop',
    terms: '21+ only. New customers. T&Cs apply.',
    rating: 4.9
  },
  {
    id: '2',
    brand: 'BetMGM Platinum',
    offer: '100% Match up to $1,500',
    promoCode: 'HUBGOLD',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=100&h=100&auto=format&fit=crop',
    terms: 'Deposit required. NJ/PA/MI/WV only.',
    rating: 4.8
  }
];

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateHeight = () => {
      const h = containerRef.current?.scrollHeight || 0;
      window.parent.postMessage({ type: 'hol-resize', height: h + 100 }, '*');
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(containerRef.current);
    updateHeight();
    return () => observer.disconnect();
  }, [news, currentPage, isLoading]);

  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        const [aiData, wpData] = await Promise.allSettled([
          fetchLatestGamingNews("Online gambling legislation US 2024"),
          fetchWordPressPosts()
        ]);
        
        const validAi = aiData.status === 'fulfilled' ? aiData.value : [];
        const validWp = wpData.status === 'fulfilled' ? wpData.value : [];
        
        setNews([...validWp, ...validAi]);
      } catch (err) {
        console.error("Initialization Failed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  const renderContent = () => {
    switch(currentPage) {
      case Page.Home:
        return (
          <div className="animate-in fade-in duration-700">
            <Hero />
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h2 className="text-3xl font-extrabold tracking-tight mb-2">INTELLIGENCE FEED</h2>
                      <div className="h-1 w-20 bg-emerald-500"></div>
                    </div>
                  </div>
                  <NewsFeed news={news} isLoading={isLoading} />
                </div>
                <aside className="lg:col-span-4 space-y-12">
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 sticky top-28">
                    <h3 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-emerald-500">Premium Offers</h3>
                    <div className="space-y-6">
                      {MOCK_BONUSES.map(bonus => (
                        <BonusCard key={bonus.id} bonus={bonus} />
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
        );
      case Page.News:
        return <div className="max-w-6xl mx-auto px-4 py-20"><h1 className="text-5xl font-black mb-12 uppercase">LATEST NEWS</h1><NewsFeed news={news} isLoading={isLoading} fullWidth /></div>;
      case Page.Bonuses:
        return <div className="max-w-6xl mx-auto px-4 py-20"><h1 className="text-5xl font-black mb-12 uppercase">BONUSES</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{MOCK_BONUSES.map(bonus => <BonusCard key={bonus.id} bonus={bonus} />)}</div></div>;
      default:
        return <div className="max-w-6xl mx-auto px-4 py-20 h-[60vh] flex items-center justify-center"><h1 className="text-2xl font-bold opacity-20 uppercase tracking-widest">Section under maintenance</h1></div>;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <AppContent />
  </ErrorBoundary>
);

export default App;
