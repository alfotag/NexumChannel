'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Newspaper, ExternalLink, TrendingUp, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
  title: string;
  excerpt: string;
  url: string;
  image?: string;
  date: string;
  category?: string;
}

// Generate placeholder image based on category
function getCategoryGradient(category?: string): string {
  const gradients: Record<string, string> = {
    'CINEMA': 'from-purple-600 to-pink-600',
    'CUCINA': 'from-orange-600 to-red-600',
    'GOSSIP': 'from-pink-600 to-rose-600',
    'MUSICA': 'from-blue-600 to-cyan-600',
    'SPORT': 'from-green-600 to-emerald-600',
    'JUVENTUS': 'from-slate-700 to-slate-900',
    'default': 'from-gray-600 to-gray-800'
  };

  return gradients[category?.toUpperCase() || 'default'] || gradients['default'];
}

// Get stock image URL based on category
function getCategoryStockImage(category?: string, index: number = 0): string {
  const categoryImages: Record<string, string> = {
    'CINEMA': '/category-images/cinema.jpg',
    'GOSSIP': '/category-images/gossip.jpg',
    'JUVENTUS': '/category-images/juventus.png',
    'NAPOLI': '/category-images/napoli.jpg',
    'MUSICA': '/category-images/musica.jpg',
    'INTER': '/category-images/inter.jpg',
  };

  const normalizedCategory = category?.toUpperCase() || 'default';
  return categoryImages[normalizedCategory] || '/category-images/cinema.jpg';
}

export default function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch('/api/news');

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(true);
        // Fallback data
        setNews([
          {
            title: "Grande successo per l'ultimo evento su Nexum Channel",
            excerpt: "Record di ascolti per la serata speciale trasmessa ieri...",
            url: "https://yesmagazine.it",
            date: "2 ore fa"
          },
          {
            title: "Nuovi programmi in arrivo sulla piattaforma HbbTV",
            excerpt: "Scopri le novità della programmazione autunnale...",
            url: "https://yesmagazine.it",
            date: "5 ore fa"
          },
          {
            title: "Italian Horse TV: intervista esclusiva",
            excerpt: "Il mondo dell'ippica raccontato dai protagonisti...",
            url: "https://yesmagazine.it",
            date: "1 giorno fa"
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Carousel navigation
  const itemsPerPage = 1; // Show 1 news item at a time
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 8000); // Change every 8 seconds
    return () => clearInterval(interval);
  }, [news.length, totalPages]);

  return (
    <div className="glass-strong rounded-xl p-4 sm:p-5 lg:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
            <Newspaper className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-400" />
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Ultime Notizie
          </h3>
        </div>
        <a
          href="https://yesmagazine.it"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1 sm:gap-1.5 font-medium"
        >
          <span className="hidden sm:inline">YesMagazine</span>
          <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
        </a>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 relative overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
            <p className="text-sm text-gray-400">Caricamento notizie...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-sm text-gray-400">Impossibile caricare le notizie. Mostrando contenuti di fallback.</p>
          </div>
        ) : news.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-400">Nessuna notizia disponibile al momento.</p>
          </div>
        ) : (
          <>
            {/* Carousel Slides */}
            <div className="h-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="min-w-full h-full flex items-center justify-center px-2 py-3">
                    {news.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex flex-col rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/[0.1] hover:from-white/[0.08] hover:to-white/[0.04] hover:border-blue-500/40 transition-all group overflow-hidden shadow-lg max-h-full"
                      >
                          <div className="relative w-full h-24 sm:h-28 lg:h-36 overflow-hidden shrink-0">
                            <Image
                              src={item.image || getCategoryStockImage(item.category, pageIndex * itemsPerPage + index)}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              unoptimized
                            />
                            {item.category && (
                              <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg border border-white/10">
                                <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider">{item.category}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          </div>
                          <div className="flex-1 p-2.5 sm:p-3 lg:p-4 flex flex-col min-h-0">
                            <h4 className="font-bold text-white text-[11px] sm:text-sm lg:text-base mb-1 sm:mb-1.5 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[9px] sm:text-xs text-gray-400 line-clamp-2 mb-1.5 sm:mb-2 leading-relaxed">
                              {item.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-1.5 border-t border-white/5 mt-auto">
                              <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium">{item.date}</span>
                              <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                                <span className="text-[9px] sm:text-[10px] font-medium">Leggi</span>
                                <ExternalLink className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators and Navigation */}
            <div className="absolute -bottom-1 left-0 right-0 flex items-center justify-between px-2 z-10">
              {/* Left Arrow */}
              <button
                onClick={prevPage}
                className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all group"
              >
                <ChevronLeft className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Dots Indicators */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`transition-all rounded-full ${
                      index === currentPage
                        ? 'w-8 h-2 bg-blue-500'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextPage}
                className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all group"
              >
                <ChevronRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
        <a
          href="https://yesmagazine.it"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-blue-600/5 border border-blue-600/20 hover:bg-blue-600/10 hover:border-blue-600/30 transition-all text-xs font-medium text-gray-400 hover:text-blue-400"
        >
          Tutte le notizie →
        </a>
      </div>
    </div>
  );
}
