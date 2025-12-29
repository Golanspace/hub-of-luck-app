
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import BonusCard from './components/BonusCard.tsx';
import NewsFeed from './components/NewsFeed.tsx';
import Footer from './components/Footer.tsx';
import { Page, NewsArticle, BonusOffer } from './types.ts';
import { fetchLatestGamingNews } from './services/gemini.ts';
import { fetchWordPressPosts } from './services/wordpress.ts';

// Error Boundary for UI Safety - Updated with explicit constructor to fix property access issues
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  // Explicitly define state and constructor to ensure property recognition
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-10 text-center">
          <div>
            <h1 className="text-red-600 text-3xl font-black mb-4">RECOVERY MODE</h1>
            <p className="text-gray-500 font-mono text-xs max-w-lg mx-auto">{error?.toString()}</p>
            <button onClick={() => window.location.reload()} className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-full font-bold">REFRESH HUB</button>
          </div>
        </div>
      );
    }
    // Access children through this.props as defined in the generic parameter
    return this.props.children;
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
  },
  {
    id: '3',
    brand: 'DraftKings Pro',
    offer: 'Bet $5, Get $250 Bonus',
    promoCode: 'HUBSCRIPT',
    link: '#',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=100&h=100&auto=format&fit=crop',
    terms: 'Valid once. 21+ in legal states.',
    rating: 4.7
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
      window.parent.postMessage({ type: 'hol-resize', height: h + 50 }, '*');
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
          fetchLatestGamingNews("US gambling news 2024"),
          fetchWordPressPosts()
        ]);
        const validAi = aiData.status === 'fulfilled' ? aiData.value : [];
        const validWp = wpData.status === 'fulfilled' ? wpData.value : [];
        setNews([...validWp, ...validAi]);
      } catch (err) {
        console.error("Hub Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    initApp();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <section className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                  <div className="mb-12">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                      LATEST INTELLIGENCE
                      <span className="h-[2px] flex-1 bg-gray-100"></span>
                    </h2>
                  </div>
                  <NewsFeed news={news} isLoading={isLoading} />
                </div>
                <aside className="lg:col-span-4">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 sticky top-28 shadow-sm">
                    <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-8">Exclusive Offers</h3>
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
        return <div className="max-w-5xl mx-auto px-4 py-16"><NewsFeed news={news} isLoading={isLoading} fullWidth /></div>;
      case Page.Bonuses:
        return (
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-black mb-12">PREMIUM BONUSES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_BONUSES.map(bonus => <BonusCard key={bonus.id} bonus={bonus} />)}
            </div>
          </div>
        );
      default:
        return <div className="py-40 text-center text-gray-400 font-bold uppercase tracking-widest">In Development</div>;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">{renderPage()}</main>
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
