'use client';

import { Sparkles, TrendingUp, Tv } from 'lucide-react';

export default function PromoBanner() {
  return (
    <div className="space-y-4">
      {/* Featured Event */}
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-transparent blur-3xl"></div>

        <div className="relative space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Evento Speciale</span>
          </div>

          <h3 className="text-xl font-black text-white leading-tight">
            Grande Serata Prime Event
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            Non perdere lo spettacolo più atteso dell'anno. In diretta esclusiva su Nexum Channel.
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Venerdì 21:00</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span>Canale 403</span>
            </div>
          </div>

          <button className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-white text-sm font-bold transition-all hover:scale-105">
            Scopri di più
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-strong rounded-xl p-4 hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <Tv className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">403</div>
              <div className="text-xs text-gray-400">Canale DTT</div>
            </div>
          </div>
        </div>

        <div className="glass-strong rounded-xl p-4 hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">24/7</div>
              <div className="text-xs text-gray-400">Live Stream</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="glass-strong rounded-xl p-4 space-y-3">
        <h4 className="text-sm font-bold text-white">Come sintonizzarsi</h4>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5"></div>
            <div>
              <span className="text-white font-semibold">Digitale Terrestre:</span> Canale 403
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5"></div>
            <div>
              <span className="text-white font-semibold">HbbTV:</span> Accedi alla piattaforma interattiva
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-1.5"></div>
            <div>
              <span className="text-white font-semibold">Streaming:</span> nexumchannel.it
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
