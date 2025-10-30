'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Newspaper, ExternalLink, TrendingUp, Loader2 } from 'lucide-react';

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

export default function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <div className="glass-strong rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
            <Newspaper className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-base font-semibold text-white tracking-tight">
            Ultime Notizie
          </h3>
        </div>
        <a
          href="https://yesmagazine.it"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium"
        >
          <span>YesMagazine</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
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
          news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-blue-500/40 transition-all group overflow-hidden"
            >
              <div className="relative w-full h-40 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(item.category)} flex items-center justify-center`}>
                    <div className="text-white/20 text-6xl font-black">
                      {item.category?.charAt(0) || '?'}
                    </div>
                  </div>
                )}
                {item.category && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-md">
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">{item.category}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </a>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <a
          href="https://yesmagazine.it"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-2.5 rounded-lg bg-blue-600/5 border border-blue-600/20 hover:bg-blue-600/10 hover:border-blue-600/30 transition-all text-xs font-medium text-gray-400 hover:text-blue-400"
        >
          Tutte le notizie →
        </a>
      </div>
    </div>
  );
}
