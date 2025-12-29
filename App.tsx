
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      
      // Fetch both AI news and your real WordPress content
      const [aiData, wpData] = await Promise.all([
        fetchLatestGamingNews("Latest US online casino legalization news and sports betting updates"),
        fetchWordPressPosts()
      ]);

      // Merge and sort by date (simplified)
      const mergedNews = [...wpData, ...aiData];
      setNews(mergedNews);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === Page.Home && (
          <div className="animate-in fade-in duration-500">
            <Hero />
            
            <section className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="bg-emerald-600 w-2 h-8 mr-3 rounded-full"></span>
                      Intelligence Feed
                    </h2>
                    <NewsFeed news={news} isLoading={isLoading} />
                  </div>
                </div>

                <aside className="md:w-1/3">
                  <div className="sticky top-24 space-y-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-800">Best Bonus Offers</h3>
                      <div className="space-y-4">
                        {MOCK_BONUSES.map(bonus => (
                          <BonusCard key={bonus.id} bonus={bonus} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-emerald-900 text-white rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-2 text-emerald-100">Newsletter</h3>
                      <p className="text-emerald-300 text-sm mb-4">Get regulatory updates and exclusive bonuses.</p>
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full bg-emerald-800 border border-emerald-700 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-emerald-500"
                      />
                      <button className="w-full bg-white text-emerald-900 font-bold py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                        Join the Hub
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
        )}

        {currentPage === Page.News && (
          <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold mb-8">Industry Intelligence</h1>
            <NewsFeed news={news} isLoading={isLoading} fullWidth />
          </div>
        )}

        {currentPage === Page.Bonuses && (
          <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h1 className="text-4xl font-bold mb-8">Exclusive Bonuses</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {MOCK_BONUSES.map(bonus => (
                  <div key={bonus.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img src={bonus.logo} className="w-16 h-16 rounded-lg object-cover" alt={bonus.brand} />
                        <div>
                          <h3 className="text-xl font-bold">{bonus.brand}</h3>
                          <div className="flex text-yellow-500 text-sm">
                            {'★'.repeat(Math.floor(bonus.rating))}
                            <span className="ml-1 text-gray-400 font-normal">{bonus.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-2xl font-extrabold text-emerald-700 mb-2">{bonus.offer}</p>
                      <p className="text-gray-500 text-sm mb-6">{bonus.terms}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300">
                        <span className="text-xs uppercase font-bold text-gray-400">Promo Code</span>
                        <span className="font-mono font-bold text-gray-800">{bonus.promoCode}</span>
                      </div>
                      <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 shadow-md">
                        Claim Now
                      </button>
                    </div>
                  </div>
               ))}
             </div>
          </div>
        )}

        {currentPage === Page.Guides && (
          <div className="max-w-4xl mx-auto px-4 py-12 prose prose-emerald lg:prose-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-bold mb-8">Professional Strategy Guides</h1>
            <p>Our data-backed strategies will help you navigate the landscape of modern digital gaming.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 not-prose">
                <h3 className="text-lg font-bold mb-2">Bankroll Management</h3>
                <p className="text-sm text-gray-600">The most critical skill in any form of gaming: managing capital.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 not-prose">
                <h3 className="text-lg font-bold mb-2">Legal Landscapes</h3>
                <p className="text-sm text-gray-600">A state-by-state breakdown of where you can play legally.</p>
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
