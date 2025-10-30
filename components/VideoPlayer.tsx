'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Loader2, Play } from 'lucide-react';

interface VideoPlayerProps {
  streamUrl?: string;
  poster?: string;
}

export default function VideoPlayer({ streamUrl, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoRef.current || !streamUrl) return;

    const video = videoRef.current;

    // Check if HLS is supported
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hlsRef.current = hls;
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch((err) => {
          console.error('Autoplay prevented:', err);
          setIsLoading(false);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError('Errore di rete. Riprovo...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError('Errore media. Riprovo...');
              hls.recoverMediaError();
              break;
            default:
              setError('Errore fatale durante lo streaming');
              setIsLoading(false);
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().catch((err) => {
          console.error('Autoplay prevented:', err);
          setIsLoading(false);
        });
      });
    } else {
      setError('HLS non supportato su questo browser');
      setIsLoading(false);
    }
  }, [streamUrl]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-strong border-2 border-white/10 shadow-2xl">
      {/* Glow effect border */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-50"></div>

      <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls
          poster={poster}
          playsInline
        />

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-blue-500/30 animate-pulse"></div>
              <Loader2 className="w-16 h-16 text-blue-400 animate-spin mb-4 relative" />
            </div>
            <p className="text-white font-semibold text-lg mb-2">Caricamento stream...</p>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/50 via-black to-gray-900">
            <div className="glass-strong rounded-2xl p-8 text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-400 text-lg font-semibold mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl text-white font-semibold transition-all hover:scale-105"
              >
                Riprova
              </button>
            </div>
          </div>
        )}

        {!streamUrl && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="relative mb-6">
              <div className="absolute inset-0 blur-3xl bg-blue-500/20 animate-pulse"></div>
              <Play className="w-20 h-20 text-white/30 relative" />
            </div>
            <p className="text-white/50 text-xl font-semibold">Seleziona un canale per iniziare</p>
            <p className="text-white/30 text-sm mt-2">Stream non disponibile</p>
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/30 rounded-tl-2xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-400/30 rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-400/30 rounded-bl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-400/30 rounded-br-2xl"></div>
    </div>
  );
}
