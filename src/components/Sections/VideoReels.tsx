import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface VideoReel {
  id: number;
  thumbnail: string;
  title: string;
  duration: string;
  instagramUrl: string;
  embedId: string;
}

/**
 * Instagram Embed component that properly loads Instagram content
 */
const InstagramEmbed: React.FC<{ url: string; embedId: string }> = ({ url, embedId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';
    setIsLoading(true);
    setHasError(false);

    // Create the Instagram blockquote with proper structure
    const blockquoteHTML = `
      <blockquote class="instagram-media" 
        data-instgrm-captioned 
        data-instgrm-permalink="${url}" 
        data-instgrm-version="14" 
        style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
        <div style="padding:16px;">
          <a href="${url}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
            <div style="display: flex; flex-direction: row; align-items: center;">
              <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
              <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
                <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
                <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
              </div>
            </div>
            <div style="padding: 19% 0;"></div>
            <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
              <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                    <g>
                      <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div style="padding-top: 8px;">
              <div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div>
            </div>
            <div style="padding: 12.5% 0;"></div>
            <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
              <div>
                <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div>
                <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div>
                <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div>
              </div>
              <div style="margin-left: 8px;">
                <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div>
                <div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div>
              </div>
              <div style="margin-left: auto;">
                <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div>
                <div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div>
                <div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;">
              <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div>
              <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div>
            </div>
          </a>
          <p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
            <a href="${url}" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by One platform, Countless Gifts 🤍 (@fruitbasket.malaysia)</a>
          </p>
        </div>
      </blockquote>
    `;

    containerRef.current.innerHTML = blockquoteHTML;

    // Load Instagram embed script
    const loadInstagramScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Function to wait for Instagram Embeds to be available
        const waitForInstagramEmbeds = (maxAttempts = 50, attempt = 0) => {
          if ((window as any).instgrm?.Embeds?.process) {
            (window as any).instgrm.Embeds.process();
            setTimeout(() => {
              setIsLoading(false);
              resolve();
            }, 2000);
            return;
          }
          
          if (attempt >= maxAttempts) {
            reject(new Error('Instagram Embeds not available after polling'));
            return;
          }
          
          // Poll every 100ms
          setTimeout(() => waitForInstagramEmbeds(maxAttempts, attempt + 1), 100);
        };

        // Check if script already exists
        const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
        
        if (existingScript) {
          // Script exists, wait for embeds to be available
          waitForInstagramEmbeds();
        } else {
          // Create and load script
          const script = document.createElement('script');
          script.src = '//www.instagram.com/embed.js';
          script.async = true;
          
          script.onload = () => {
            waitForInstagramEmbeds();
          };
          
          script.onerror = () => {
            reject(new Error('Failed to load Instagram script'));
          };
          
          document.body.appendChild(script);
        }
      });
    };

    // Load with timeout and error handling
    const timeoutId = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, 10000); // 10 second timeout

    loadInstagramScript()
      .then(() => {
        clearTimeout(timeoutId);
      })
      .catch((error) => {
        console.error('Instagram embed error:', error);
        clearTimeout(timeoutId);
        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [url, embedId]);

  if (hasError) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-gray-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <p className="text-gray-600 text-center mb-4">Unable to load Instagram content</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
        >
          View on Instagram
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-2"></div>
            <p className="text-gray-600 text-sm">Loading Instagram content...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full max-w-lg" />
    </div>
  );
};

const VideoReels: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoReel | null>(null);

  const reels: VideoReel[] = [
    {
      id: 1,
      thumbnail: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Fresh Fruit Selection',
      duration: '0:20',
      instagramUrl: 'https://www.instagram.com/reel/DMR8EqjJskt/?utm_source=ig_embed&utm_campaign=loading',
      embedId: 'DMR8EqjJskt'
    },
    {
      id: 2,
      thumbnail: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Hand-tied Bouquets',
      duration: '0:18',
      instagramUrl: 'https://www.instagram.com/reel/Cl2TzA5O4MJ/?utm_source=ig_embed&utm_campaign=loading',
      embedId: 'Cl2TzA5O4MJ'
    },
    {
      id: 3,
      thumbnail: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Morning Arrangements',
      duration: '0:15',
      instagramUrl: 'https://www.instagram.com/reel/DMR8EqjJskt/?utm_source=ig_embed&utm_campaign=loading',
      embedId: 'DMR8EqjJskt'
    }
  ];

  const openVideoModal = (video: VideoReel) => setSelectedVideo(video);
  const closeVideoModal = () => setSelectedVideo(null);

  return (
    <>
      <section className="py-20 bg-neutral-off-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-display text-neutral-charcoal mb-4">
              Behind the Scenes
            </h2>
            <p className="text-lg text-neutral-ash max-w-2xl mx-auto">
              Watch how we craft each arrangement with love and attention to detail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openVideoModal(reel)}
              >
                {/* Thumbnail */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-6 h-6 text-neutral-charcoal ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-medium mb-1">{reel.title}</h3>
                  <span className="text-sm opacity-80">{reel.duration}</span>
                </div>

                {/* Instagram Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                    Instagram
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Embed Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo?.title || 'Instagram reel player'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoModal}
          >
            <motion.div
              className="relative bg-white rounded-2xl overflow-hidden w-full max-w-lg max-h-[90vh] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Close"
                title="Close"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Embed Container */}
              <div className="bg-white p-4 flex justify-center">
                <InstagramEmbed url={selectedVideo.instagramUrl} embedId={selectedVideo.embedId} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoReels;