
import React, { useState, useMemo } from 'react';
import { NewsArticle } from '../types';

type FontSize = 'standard' | 'readable' | 'extra';

interface NewsItemProps {
  article: NewsArticle;
  fontSize: FontSize;
  allNews: NewsArticle[];
  onSwitchArticle: (article: NewsArticle) => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ article, fontSize, allNews, onSwitchArticle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shareUrl = article.sources && article.sources.length > 0 
    ? article.sources[0].uri 
    : window.location.href;
  
  const encodedTitle = encodeURIComponent(article.title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const relatedArticles = useMemo(() => {
    const getKeywords = (text: string) => 
      text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 3);

    const targetKeywords = getKeywords(article.title);
    
    return allNews
      .filter(a => a.id !== article.id)
      .map(candidate => {
        let score = 0;
        if (candidate.category === article.category) score += 10;
        const candidateKeywords = getKeywords(candidate.title);
        const overlaps = candidateKeywords.filter(k => targetKeywords.includes(k));
        score += (overlaps.length * 5);
        return { article: candidate, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.article);
  }, [allNews, article]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'readable': return 'text-lg md:text-xl';
      case 'extra': return 'text-xl md:text-2xl';
      default: return 'text-base md:text-lg';
    }
  };

  return (
    <article className={`group bg-white rounded-lg overflow-hidden transition-all duration-300 border-b border-gray-100 last:border-0 pb-12 mb-12 ${isExpanded ? 'bg-gray-50/30' : ''}`}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Featured Image */}
        <div className={`shrink-0 overflow-hidden rounded-sm transition-all duration-500 ${isExpanded ? 'md:w-full lg:w-2/5' : 'md:w-80'} h-56 md:h-auto`}>
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em]">{article.category}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
            </div>
            
            {/* Social Share Buttons */}
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors" title="Share on X">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors" title="Share on Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors" title="Share on LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
              </a>
            </div>
          </div>

          <h3 
            className={`font-black text-gray-900 group-hover:text-emerald-700 transition-colors mb-4 cursor-pointer leading-[1.15] ${isExpanded ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {article.title}
          </h3>

          <div className={`text-gray-600 font-medium leading-relaxed mb-6 ${isExpanded ? '' : 'line-clamp-3'} ${getFontSizeClass()}`}>
            {isExpanded ? (
              <div className="prose prose-emerald max-w-none whitespace-pre-line text-gray-700">
                {article.content}
              </div>
            ) : (
              article.excerpt
            )}
          </div>

          <div className="flex items-center gap-6 mt-auto">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-2"
            >
              {isExpanded ? 'CLOSE STORY' : 'READ FULL STORY'}
              <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>→</span>
            </button>
            
            {!isExpanded && (
              <span className="text-[10px] text-gray-400 font-bold uppercase">5 MIN READ</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Section (Visible when expanded) */}
      {isExpanded && relatedArticles.length > 0 && (
        <div className="mt-12 pt-12 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-10 h-[2px] bg-emerald-600"></span>
              Related Intelligence
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <div 
                key={rel.id} 
                onClick={() => {
                  onSwitchArticle(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group/rel flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden mb-4 rounded-sm">
                  <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover/rel:scale-110 transition-transform duration-500" />
                </div>
                <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2">{rel.category}</div>
                <h5 className="font-bold text-base text-gray-900 line-clamp-2 group-hover/rel:text-emerald-600 transition-colors leading-tight">{rel.title}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

interface NewsFeedProps {
  news: NewsArticle[];
  isLoading: boolean;
  fullWidth?: boolean;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news, isLoading, fullWidth }) => {
  const [fontSize, setFontSize] = useState<FontSize>('standard');

  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2].map(i => (
          <div key={i} className="animate-pulse flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-80 h-60 bg-gray-100 rounded-sm"></div>
            <div className="flex-1 space-y-4 pt-4">
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-10 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${fullWidth ? 'max-w-6xl mx-auto' : ''}`}>
      {news.length > 0 && (
        <div className="flex items-center justify-end mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Layout</span>
            <div className="flex bg-gray-50 p-1 rounded-sm">
              {(['standard', 'readable', 'extra'] as FontSize[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFontSize(f)}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all ${
                    fontSize === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {f === 'standard' ? 'A' : f === 'readable' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {news.map((article) => (
        <NewsItem 
          key={article.id} 
          article={article} 
          fontSize={fontSize} 
          allNews={news}
          onSwitchArticle={() => {}}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
