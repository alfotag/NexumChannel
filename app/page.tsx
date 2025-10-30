'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import VideoPlayer from '@/components/VideoPlayer';
import ChannelSidebar, { Channel } from '@/components/ChannelSidebar';
import NowPlaying from '@/components/NowPlaying';
import PromoBanner from '@/components/PromoBanner';
import NewsWidget from '@/components/NewsWidget';
import AdBanner from '@/components/AdBanner';
import { ExternalLink, Play, Film, TrendingUp, Heart, Activity, Tv, Radio } from 'lucide-react';

// Channel icons mapping
const channelIcons: Record<string, React.ReactNode> = {
  'nexum-channel': <Tv className="w-7 h-7" />,
  'prime-event': <Film className="w-7 h-7" />,
  'xcapital': <TrendingUp className="w-7 h-7" />,
  'italian-horse': <Heart className="w-7 h-7" />,
  'salute24': <Activity className="w-7 h-7" />,
  'controradio': <Radio className="w-7 h-7" />,
};

// Channel data configuration
const channels: Channel[] = [
  {
    id: 'nexum-channel',
    name: 'Nexum Channel',
    description: 'Canale Principale',
    icon: channelIcons['nexum-channel'],
    isLive: true,
    isPremium: true,
    streamUrl: 'https://64b16f23efbee.streamlock.net:443/nexumchannel/nexumchannel/playlist.m3u8',
  },
  {
    id: 'prime-event',
    name: 'Prime Event',
    description: 'Grandi Spettacoli',
    icon: channelIcons['prime-event'],
    isLive: true,
    isPremium: true,
    streamUrl: 'https://64b16f23efbee.streamlock.net:443/primeevent/primeevent/playlist.m3u8',
  },
  {
    id: 'xcapital',
    name: 'XCapital',
    description: 'Finanza e Mercati',
    icon: channelIcons['xcapital'],
    isLive: true,
    streamUrl: 'https://64b16f23efbee.streamlock.net:443/xcapital/xcapital/playlist.m3u8',
  },
  {
    id: 'italian-horse',
    name: 'Italian Horse TV',
    description: 'Passione Ippica',
    icon: channelIcons['italian-horse'],
    isLive: true,
    streamUrl: 'https://64b16f23efbee.streamlock.net:443/italianhorsetv/italianhorsetv/playlist.m3u8',
  },
  {
    id: 'salute24',
    name: 'Salute 24',
    description: 'Benessere Oggi',
    icon: channelIcons['salute24'],
    isLive: true,
    streamUrl: 'https://64b16f23efbee.streamlock.net:443/salute24/salute24/playlist.m3u8',
  },
  {
    id: 'controradio',
    name: 'Controradio',
    description: 'Radio e Musica',
    icon: channelIcons['controradio'],
    isLive: true,
    streamUrl: 'https://64b16f23efbee.streamlock.net:443/controradio/controradio/playlist.m3u8',
  },
];

export default function Home() {
  const [activeChannelId, setActiveChannelId] = useState('nexum-channel');

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];

  const handleLiveClick = () => {
    // Find first live channel or go to prime-event
    const liveChannel = channels.find(c => c.isLive);
    if (liveChannel) {
      setActiveChannelId(liveChannel.id);
    }
  };

  const handleSiteClick = () => {
    window.open('https://nexumchannel.it', '_blank');
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col overflow-hidden">
      <Header onLiveClick={handleLiveClick} onSiteClick={handleSiteClick} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 overflow-y-auto lg:overflow-hidden lg:min-h-0">
        <div className="min-h-full lg:h-full flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6">
          {/* LEFT COLUMN - News Widget (Hidden on mobile, shown on desktop) */}
          <div className="hidden lg:flex lg:w-[420px] flex-col lg:h-full">
            <NewsWidget />
          </div>

          {/* CENTER COLUMN - Video Player + Info */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-5 justify-start lg:justify-center lg:h-full lg:max-h-full">
            {/* Video Player */}
            <div className="w-full lg:flex-shrink-0">
              <VideoPlayer
                streamUrl={activeChannel.streamUrl}
                poster="/placeholder-video.jpg"
              />
            </div>

            {/* Info Bar */}
            <div className="min-h-[80px] lg:h-20 glass-strong rounded-xl lg:rounded-2xl px-4 sm:px-5 py-4 lg:py-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 lg:gap-6 shrink-0">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center border border-cyan-400/50 p-2 shrink-0">
                  <Image
                    src="/nexum-logo.png"
                    alt="Nexum Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-0.5">
                    <h2 className="text-lg sm:text-xl font-black text-white truncate">
                      {activeChannel.name}
                    </h2>
                    {activeChannel.isLive && (
                      <span className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-full border border-red-400/50 shrink-0">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs text-red-300 font-black">LIVE</span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">{activeChannel.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <div className="flex gap-3 sm:gap-6 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold">403 DTT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-semibold">HbbTV</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-semibold">HD</span>
                  </div>
                </div>

                <button
                  onClick={handleSiteClick}
                  className="glass px-4 sm:px-5 py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-blue-400/50 hover:from-blue-500/40 hover:to-purple-500/40 transition-all hover:scale-105 flex items-center gap-2 group shrink-0"
                >
                  <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-300 group-hover:rotate-12 transition-transform" />
                  <span className="text-white font-bold text-xs sm:text-sm">Sito</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Channels + Ads */}
          <div className="w-full lg:w-[420px] flex flex-col gap-4 sm:gap-5 lg:h-full">
            {/* Channel Grid */}
            <div className="glass-strong rounded-xl p-4 sm:p-5 lg:p-6 shrink-0">
              <div className="flex items-center gap-3 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/5">
                <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
                  <Tv className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  Canali Live
                </h3>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannelId(channel.id)}
                    className={`
                      group relative p-2 sm:p-3 lg:p-4 rounded-lg transition-all
                      ${activeChannelId === channel.id
                        ? 'bg-blue-600/10 border-2 border-blue-600/40'
                        : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-blue-600/20'
                      }
                    `}
                  >
                    <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 lg:gap-2.5 text-center">
                      <div className={`
                        p-1.5 sm:p-2 lg:p-2.5 rounded-lg transition-all
                        ${activeChannelId === channel.id
                          ? 'bg-blue-600/20'
                          : 'bg-white/[0.03] group-hover:bg-white/[0.06]'
                        }
                      `}>
                        <div className={activeChannelId === channel.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300 transition-colors'}>
                          {channelIcons[channel.id] || <Film className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </div>
                      </div>

                      <div className="w-full">
                        <h4 className={`font-semibold text-[10px] sm:text-xs mb-0.5 sm:mb-1 line-clamp-1 ${
                          activeChannelId === channel.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {channel.name}
                        </h4>
                        <p className="hidden lg:block text-[11px] text-gray-500 line-clamp-1 mb-2">
                          {channel.description}
                        </p>
                        {channel.isLive && (
                          <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                            <span className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${
                              activeChannelId === channel.id ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                            }`}></span>
                            <span className={`text-[9px] sm:text-[10px] font-semibold ${
                              activeChannelId === channel.id ? 'text-red-400' : 'text-emerald-400'
                            }`}>
                              LIVE
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
            <div className="h-[250px] sm:h-[300px] lg:flex-1 lg:min-h-0 lg:h-auto">
              <AdBanner />
            </div>
          </div>

          {/* News Widget - Shown on mobile/tablet at bottom */}
          <div className="lg:hidden w-full min-h-[400px]">
            <NewsWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
