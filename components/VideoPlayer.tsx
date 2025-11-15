'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Loader2, Play, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  streamUrl?: string;
  poster?: string;
}

export default function VideoPlayer({ streamUrl, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(false);
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
        setShowFullscreenButton(true);
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
        setShowFullscreenButton(true);
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

  // Fullscreen event listener
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleWebkitBeginFullscreen = () => {
      setIsFullscreen(true);
    };

    const handleWebkitEndFullscreen = () => {
      setIsFullscreen(false);
    };

    // Standard fullscreen events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // iOS Safari specific events for video element
    video.addEventListener('webkitbeginfullscreen', handleWebkitBeginFullscreen);
    video.addEventListener('webkitendfullscreen', handleWebkitEndFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      video.removeEventListener('webkitbeginfullscreen', handleWebkitBeginFullscreen);
      video.removeEventListener('webkitendfullscreen', handleWebkitEndFullscreen);
    };
  }, []);

  const toggleFullscreen = async (e: React.MouseEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!videoRef.current) {
      console.log('VideoRef not available');
      return;
    }

    const video = videoRef.current;
    console.log('Toggle fullscreen clicked, isFullscreen:', isFullscreen);
    console.log('Available methods:', {
      webkitEnterFullscreen: typeof (video as any).webkitEnterFullscreen,
      webkitRequestFullscreen: typeof (video as any).webkitRequestFullscreen,
      requestFullscreen: typeof video.requestFullscreen,
    });

    try {
      if (!isFullscreen) {
        // iOS Safari requires webkitEnterFullscreen on video element
        if (typeof (video as any).webkitEnterFullscreen === 'function') {
          console.log('Using webkitEnterFullscreen');
          (video as any).webkitEnterFullscreen();
        } else if (typeof (video as any).webkitRequestFullscreen === 'function') {
          console.log('Using webkitRequestFullscreen');
          await (video as any).webkitRequestFullscreen();
        } else if (video.requestFullscreen) {
          console.log('Using requestFullscreen');
          await video.requestFullscreen();
        } else if (typeof (video as any).mozRequestFullScreen === 'function') {
          console.log('Using mozRequestFullScreen');
          await (video as any).mozRequestFullScreen();
        } else if (typeof (video as any).msRequestFullscreen === 'function') {
          console.log('Using msRequestFullscreen');
          await (video as any).msRequestFullscreen();
        } else {
          console.log('No fullscreen method available');
        }
      } else {
        // Exit fullscreen
        console.log('Exiting fullscreen');
        if (typeof (video as any).webkitExitFullscreen === 'function') {
          (video as any).webkitExitFullscreen();
        } else if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (typeof (document as any).webkitExitFullscreen === 'function') {
          await (document as any).webkitExitFullscreen();
        } else if (typeof (document as any).mozCancelFullScreen === 'function') {
          await (document as any).mozCancelFullScreen();
        } else if (typeof (document as any).msExitFullscreen === 'function') {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden glass-strong border-2 border-white/10 shadow-2xl"
      >
        {/* Glow effect border */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-50"></div>

        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            poster={poster}
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
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

    {/* Fullscreen button - Outside video controls to avoid conflicts */}
    {showFullscreenButton && !error && streamUrl && (
      <button
        onPointerDown={toggleFullscreen}
        onClick={toggleFullscreen}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Touch started on fullscreen button');
          toggleFullscreen(e as any);
        }}
        className="fixed bottom-20 right-4 lg:absolute lg:bottom-4 lg:right-4 z-[999] p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 backdrop-blur-sm border-2 border-white/40 transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
        aria-label={isFullscreen ? 'Esci da schermo intero' : 'Schermo intero'}
        type="button"
        style={{ touchAction: 'manipulation' }}
      >
        {isFullscreen ? (
          <Minimize className="w-7 h-7 text-white drop-shadow-lg" />
        ) : (
          <Maximize className="w-7 h-7 text-white drop-shadow-lg" />
        )}
      </button>
    )}
  </>
  );
}
