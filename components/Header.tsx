'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Bell, Sparkles, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onLiveClick: () => void;
  onSiteClick: () => void;
}

export default function Header({ onLiveClick, onSiteClick }: HeaderProps) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // News ticker data - sostituire con fetch reale
  const newsItems = [
    "🔴 LIVE: Grande evento su Prime Event alle 21:00",
    "📰 Nuova programmazione autunnale su Nexum Channel",
    "🏆 Italian Horse TV: Risultati gare del weekend",
    "💰 XCapital: Analisi mercati finanziari in tempo reale",
    "💊 Salute 24: Speciale benessere e prevenzione",
    "🎵 Controradio: Le migliori hit del momento",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000); // Cambia ogni 5 secondi

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <header className="px-8 py-5 relative">
      <div className="flex items-center gap-6">
        {/* LEFT - Logo (420px come sidebar news) */}
        <div className="w-[420px] glass-strong px-6 py-4 rounded-xl flex items-center gap-4 group">
          <div className="relative w-11 h-11">
            <Image
              src="/nexum-logo.png"
              alt="Nexum Channel Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-semibold text-white tracking-tight">
            NEXUM <span className="text-blue-400">CHANNEL</span>
          </h1>
        </div>

        {/* CENTER - News Ticker */}
        <div className="flex-1 glass-strong rounded-xl px-5 py-4 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20 shrink-0">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#141923] to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#141923] to-transparent z-10"></div>
              <div
                className="whitespace-nowrap transition-all duration-1000 ease-in-out text-gray-300 font-medium text-sm"
                style={{
                  transform: `translateX(${currentNewsIndex * -100}%)`,
                  display: 'flex',
                  width: `${newsItems.length * 100}%`
                }}
              >
                {newsItems.map((news, index) => (
                  <span key={index} className="inline-block" style={{ width: `${100 / newsItems.length}%` }}>
                    {news}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - Actions Bar (420px come sidebar channels) */}
        <div className="w-[420px] glass-strong rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {/* Notifications */}}
              className="p-2.5 rounded-lg hover:bg-white/[0.08] transition-all relative group"
              aria-label="Notifiche"
            >
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#141923]"></span>
            </button>

            <div className="h-8 w-px bg-white/10"></div>

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">403 DTT</span>
              <span className="text-[10px] text-gray-500">Canale Digitale</span>
            </div>
          </div>

          <button
            onClick={onLiveClick}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/40 hover:from-red-500/30 hover:to-red-600/30 hover:border-red-500/60 transition-all flex items-center gap-2.5 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-white font-bold text-sm tracking-wide">DIRETTA</span>
          </button>
        </div>
      </div>
    </header>
  );
}
