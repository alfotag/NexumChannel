'use client';

import { Film, TrendingUp, Heart, Activity, ChevronRight, Zap, Tv, Radio } from 'lucide-react';

export interface Channel {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  streamUrl?: string;
  isLive?: boolean;
  isPremium?: boolean;
}

interface ChannelSidebarProps {
  channels: Channel[];
  activeChannelId: string;
  onChannelSelect: (channelId: string) => void;
}

const channelIcons: Record<string, React.ReactNode> = {
  'nexum-channel': <Tv className="w-6 h-6" />,
  'prime-event': <Film className="w-6 h-6" />,
  'xcapital': <TrendingUp className="w-6 h-6" />,
  'italian-horse': <Heart className="w-6 h-6" />,
  'salute24': <Activity className="w-6 h-6" />,
  'controradio': <Radio className="w-6 h-6" />,
};

export default function ChannelSidebar({
  channels,
  activeChannelId,
  onChannelSelect
}: ChannelSidebarProps) {
  return (
    <div className="flex flex-col glass-strong rounded-2xl p-4">
      <div className="mb-4 pb-3 border-b border-white/10">
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <span className="gradient-text">Canali Live</span>
        </h2>
        <p className="text-xs text-gray-400">Seleziona un canale per guardarlo</p>
      </div>

      <div className="space-y-3 pr-2">
        {channels.map((channel, index) => (
          <button
            key={channel.id}
            onClick={() => onChannelSelect(channel.id)}
            style={{ animationDelay: `${index * 50}ms` }}
            className={`
              w-full p-4 rounded-xl transition-all duration-300
              flex items-center justify-between group relative overflow-hidden
              ${activeChannelId === channel.id
                ? 'glass-strong bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-blue-500/30 border-2 border-blue-400/50 scale-[1.02] shadow-lg'
                : 'glass hover:glass-strong hover:scale-[1.01]'
              }
            `}
          >
            {/* Background gradient on hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              ${activeChannelId === channel.id ? 'opacity-50' : ''}
            `}></div>

            <div className="flex items-center gap-3 flex-1 relative z-10">
              <div className={`
                p-3 rounded-xl transition-all duration-300 relative
                ${activeChannelId === channel.id
                  ? 'bg-gradient-to-br from-blue-500/40 to-purple-500/40 shadow-lg'
                  : 'bg-white/5 group-hover:bg-white/10 group-hover:scale-110'
                }
              `}>
                <div className={activeChannelId === channel.id ? 'text-white' : 'text-gray-300 group-hover:text-white transition-colors'}>
                  {channelIcons[channel.id] || <Film className="w-6 h-6" />}
                </div>
                {activeChannelId === channel.id && (
                  <div className="absolute inset-0 rounded-xl bg-blue-400/20 blur-md animate-pulse"></div>
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold transition-colors ${
                    activeChannelId === channel.id ? 'text-white text-base' : 'text-gray-200 group-hover:text-white'
                  }`}>
                    {channel.name}
                  </h3>
                  {channel.isPremium && (
                    <div className="relative">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <div className="absolute inset-0 blur-sm bg-yellow-400/50"></div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {channel.description}
                </p>
                {channel.isLive && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`w-2 h-2 rounded-full ${
                      activeChannelId === channel.id ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                    }`}></span>
                    <span className={`text-xs font-semibold ${
                      activeChannelId === channel.id ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {activeChannelId === channel.id ? 'IN DIRETTA' : 'LIVE'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <ChevronRight className={`
              w-5 h-5 transition-all duration-300 relative z-10
              ${activeChannelId === channel.id
                ? 'text-blue-400 translate-x-1'
                : 'text-gray-500 group-hover:text-white group-hover:translate-x-1'
              }
            `} />

            {/* Active indicator */}
            {activeChannelId === channel.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-r-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
