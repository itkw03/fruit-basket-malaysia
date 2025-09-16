import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoReels: React.FC = () => {
  const reels = [
    {
      id: 1,
      thumbnail: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Morning Arrangements',
      duration: '0:15'
    },
    {
      id: 2,
      thumbnail: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Fresh Fruit Selection',
      duration: '0:20'
    },
    {
      id: 3,
      thumbnail: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400',
      title: 'Hand-tied Bouquets',
      duration: '0:18'
    }
  ];

  return (
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
            >
              {/* Video Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
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
              
              {/* TikTok Style UI Elements */}
              <div className="absolute top-4 left-4">
                <span className="bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                  LIVE
                </span>
              </div>
              
              <div className="absolute bottom-20 right-4 flex flex-col space-y-4 text-white">
                <motion.button
                  className="p-3 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">❤️</span>
                </motion.button>
                <motion.button
                  className="p-3 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl">📤</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoReels;