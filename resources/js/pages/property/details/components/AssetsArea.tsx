import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-player';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Play,ChevronLeft, ChevronRight, Maximize, Volume2, VolumeX } from 'lucide-react';

interface AssetsAreaProps {
  images: string[];
  videos: string[];
  title: string | null;
}

export default function AssetsArea({ images, videos, title }: AssetsAreaProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [activeVideo, setActiveVideo] = useState<string | null>(videos[0] || null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [activeMediaType, setActiveMediaType] = useState<'images' | 'videos'>(
    videos.length > 0 ? 'videos' : 'images'
  );

  const allMedia = [
    ...images.map(src => ({ type: 'image' as const, src })),
    ...videos.map(src => ({ type: 'video' as const, src }))
  ];

  const lightboxSlides = allMedia.map(media => 
    media.type === 'image' 
      ? { src: media.src }
      : { src: media.src, type: 'video' as const }
  );

  const handlePrevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex < allMedia.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  return (
    <>
      <div className="relative bg-muted/20 rounded-xl overflow-hidden">
        {/* Media Type Tabs */}
        {videos.length > 0 && images.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button
              onClick={() => setActiveMediaType('videos')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeMediaType === 'videos'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background/90 backdrop-blur-sm hover:bg-background'
              }`}
            >
              Videos ({videos.length})
            </button>
            <button
              onClick={() => setActiveMediaType('images')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeMediaType === 'images'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background/90 backdrop-blur-sm hover:bg-background'
              }`}
            >
              Images ({images.length})
            </button>
          </div>
        )}

        {/* Main Media Display */}
        <AnimatePresence mode="wait">
          {activeMediaType === 'videos' && activeVideo ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative aspect-video bg-black"
            >
              <YouTube
                url={activeVideo}
                width="100%"
                height="100%"
                playing={true}
                muted={isVideoMuted}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1, rel: 0 }
                  }
                }}
              />
              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {isVideoMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="images"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative aspect-video cursor-pointer group" onClick={() => setLightboxIndex(0)}>
                <img
                  src={images[0] || '/placeholder-image.jpg'}
                  alt={title || 'Property image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Maximize className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all transform scale-0 group-hover:scale-100" />
                </div>
              </div>

              {/* Thumbnails Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.slice(0, 4).map((image, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
                      onClick={() => setLightboxIndex(idx)}
                    >
                      <img
                        src={image}
                        alt={`${title} - image ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      {idx === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white text-lg font-bold">+{images.length - 4}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Thumbnails */}
        {activeMediaType === 'videos' && videos.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-2">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className={`relative aspect-video cursor-pointer overflow-hidden rounded-lg group ${
                  activeVideo === video ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveVideo(video)}
              >
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeId(video)}/mqdefault.jpg`}
                  alt={`Video ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                  <Play className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox for images */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        index={lightboxIndex}
        carousel={{
          finite: false,
          preload: 2,
        }}
        render={{
          buttonPrev: () => (
            <button onClick={handlePrevImage} className="lightbox-button">
              <ChevronLeft className="w-8 h-8" />
            </button>
          ),
          buttonNext: () => (
            <button onClick={handleNextImage} className="lightbox-button">
              <ChevronRight className="w-8 h-8" />
            </button>
          ),
        }}
      />
    </>
  );
}

// Helper function to extract YouTube video ID
function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}