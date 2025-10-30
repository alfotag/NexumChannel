'use client';

import { Clock, Calendar, Users } from 'lucide-react';

interface NowPlayingProps {
  channelName: string;
}

export default function NowPlaying({ channelName }: NowPlayingProps) {
  const currentTime = new Date().toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Mock data - sostituire con dati reali dal backend
  const programs = [
    {
      time: '14:00 - 16:00',
      title: 'Diretta Live',
      description: 'Programmazione in diretta',
      isLive: true,
    },
    {
      time: '16:00 - 18:00',
      title: 'Speciale Cinema',
      description: 'I migliori film del momento',
      isLive: false,
    },
    {
      time: '18:00 - 20:00',
      title: 'Notiziario Serale',
      description: 'Le ultime notizie',
      isLive: false,
    },
  ];

  return (
    <div className="glass-strong rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Guida TV
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          {currentTime}
        </div>
      </div>

      <div className="space-y-3">
        {programs.map((program, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-xl transition-all duration-300 relative overflow-hidden
              ${program.isLive
                ? 'glass-strong border-2 border-red-400/50 bg-gradient-to-r from-red-500/20 to-pink-500/20'
                : 'glass hover:glass-strong'
              }
            `}
          >
            {program.isLive && (
              <div className="absolute top-2 right-2">
                <span className="flex items-center gap-1.5 px-2 py-1 bg-red-500/30 rounded-full border border-red-400/50">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-xs text-red-300 font-bold">ORA</span>
                </span>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {program.time}
              </div>
              <h4 className={`font-bold ${program.isLive ? 'text-white text-base' : 'text-gray-200'}`}>
                {program.title}
              </h4>
              <p className="text-sm text-gray-400">
                {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-green-400" />
          <span>1,234 spettatori online</span>
        </div>
      </div>
    </div>
  );
}
