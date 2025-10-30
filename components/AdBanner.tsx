'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Ad {
  id: string;
  name: string;
  logo: string;
  link: string;
  color: string;
}

export default function AdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sponsor ads con loghi reali
  const ads: Ad[] = [
    {
      id: '1',
      name: 'Condoposta',
      logo: '/sponsors/CONDOPOSTA.svg',
      link: 'https://www.condoposta.it/',
      color: 'from-blue-600/30 to-cyan-600/30',
    },
    {
      id: '2',
      name: 'Gallelli',
      logo: '/sponsors/GALLELLI.svg',
      link: 'http://www.gallelli.eu/',
      color: 'from-purple-600/30 to-pink-600/30',
    },
    {
      id: '3',
      name: 'Pewex',
      logo: '/sponsors/PEWEX.svg',
      link: 'https://www.pewex-supermercati.it/',
      color: 'from-green-600/30 to-emerald-600/30',
    },
    {
      id: '4',
      name: 'Robnik',
      logo: '/sponsors/ROBNIK.svg',
      link: 'https://www.robnikjbprotection.it/',
      color: 'from-orange-600/30 to-red-600/30',
    },
  ];

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000); // Cambia ogni 5 secondi

    return () => clearInterval(interval);
  }, [ads.length]);

  const nextAd = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const currentAd = ads[currentIndex];

  return (
    <div className="glass-strong rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Partner</h3>
        <div className="flex gap-1.5">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-blue-500 w-6'
                  : 'bg-gray-700 w-1.5 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden rounded-lg">
        <a
          href={currentAd.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 group cursor-pointer"
        >
          <div className="h-full w-full p-6 flex flex-col items-center justify-center transition-all group-hover:opacity-90">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Sfondo più sobrio */}
              <div className={`absolute inset-0 rounded-lg ${
                currentAd.name === 'Robnik'
                  ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                  : 'bg-white/95'
              }`}></div>
              <div className="relative w-4/5 h-4/5 flex items-center justify-center p-8">
                <Image
                  src={currentAd.logo}
                  alt={currentAd.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500 font-medium">
                Partner Ufficiale
              </span>
            </div>
          </div>
        </a>

        {/* Navigation Arrows */}
        <button
          onClick={prevAd}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all z-10"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={nextAd}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all z-10"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
