import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface AboutUsPageProps {
  onBackToHome: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBackToHome }) => {
  const basketImages = [
    'basket-on-sofa.png',
    'basket-with-balloons.png',
    'basket-with-big-strawberry.png',
    'basket-with-candle-on-the-side.png',
    'basket-with-juice-bottles.png',
    'basket-with-lotions.png',
    'basket-with-pastel-flowers.png',
    'basket-with-sparkling-juice.png',
    'basket-with-tulips-and-daisies.png',
    'fruitbox.png',
    'green-basket.png',
    'raya-basket.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 item
      if (window.innerWidth < 1024) return 2; // Tablet: 2 items
      return 3; // Desktop: 3 items
    }
    return 3; // Default for SSR
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const maxIndex = Math.max(0, basketImages.length - itemsPerView);

  // Update items per view on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 100;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 100;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-off-white via-neutral-soft-blush to-neutral-off-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-neutral-off-white/95 backdrop-blur-md border-b border-neutral-ash/20">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-neutral-charcoal hover:text-primary-peach-coral transition-colors group"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </motion.button>
            
            <div className="text-center">
              <h1 className="font-display text-2xl md:text-3xl text-neutral-charcoal">
                About Us
              </h1>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-7xl py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-light-peach/30 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Heart className="w-4 h-4 text-primary-peach-coral" />
            <span className="text-sm font-medium text-primary-peach-coral">
              Our Story
            </span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl text-neutral-charcoal mb-6 leading-tight">
            Born from Love,<br />
            <span className="text-primary-peach-coral">Crafted with Care</span>
          </h2>
          
          <p className="text-lg text-neutral-ash max-w-3xl mx-auto leading-relaxed">
            Fruitbasket Malaysia began with a simple act of love. During the Covid years, 
            a mother and her two daughters wanted to send something meaningful to friends 
            and family who were unwell.
          </p>
        </motion.section>

        {/* Founders Photo */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex justify-center">
            <div className="relative">
              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-12 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-neutral-ash/10 p-2">
                  <img
                    src="/About Us Images/the-founders.png"
                    alt="The founders of Fruitbasket Malaysia"
                    className="w-full max-w-md h-auto rounded-sm"
                  />
                </div>
                {/* Polaroid Label */}
                <div className="absolute bottom-2 left-4 right-4">
                  <p className="text-neutral-charcoal text-sm font-medium text-center">
                    The Founders
                  </p>
                  <p className="text-neutral-ash text-xs text-center mt-1">
                    A mother and her two daughters
                  </p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-peach-coral rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-primary-deep-green rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Story Content */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg h-full flex flex-col">
                <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                  The Beginning
                </h3>
                <p className="text-neutral-ash leading-relaxed flex-grow">
                  Fruit baskets were the natural choice in Malaysia, a gesture of care and sincerity. 
                  But as they searched, they realised something was missing. Most fruit baskets looked 
                  ordinary, sometimes even cheap, and rarely brought the kind of joy that flowers could.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg h-full flex flex-col">
                <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                  The Innovation
                </h3>
                <p className="text-neutral-ash leading-relaxed flex-grow">
                  So, they decided to make their own. They blended fresh fruits with beautiful floral 
                  arrangements, creating baskets that not only nourished the body but also uplifted 
                  the heart. The response was overwhelming.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg h-full flex flex-col">
                <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                  The Mission
                </h3>
                <p className="text-neutral-ash leading-relaxed flex-grow">
                  What started as a passion project grew into a mission. They took up the challenge 
                  of introducing this new way of gifting to Malaysia, believing wholeheartedly that 
                  they were among the first to bring this trend to life.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg h-full flex flex-col">
                <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                  The Purpose
                </h3>
                <p className="text-neutral-ash leading-relaxed flex-grow">
                  At the heart of Fruitbasket Malaysia is a bigger purpose. Beyond making fruit baskets 
                  look beautiful, the three ladies are driven by a passion to empower women, especially 
                  those who are underprivileged or in need.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl text-neutral-charcoal mb-4">
              Our Beautiful Creations
            </h3>
            <p className="text-neutral-ash max-w-2xl mx-auto">
              Every basket we make carries our story of family, love, creativity, and a belief 
              that beauty and sincerity can change someone's day for the better.
            </p>
            <p className="text-sm text-neutral-ash/70 mt-2 md:hidden">
              Swipe left or right to explore our creations
            </p>
          </div>

          {/* Polaroid Carousel */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons - Hidden on mobile */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg items-center justify-center transition-all duration-200 ${
                currentIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:shadow-xl hover:scale-110'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-neutral-charcoal" />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg items-center justify-center transition-all duration-200 ${
                currentIndex >= maxIndex 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:shadow-xl hover:scale-110'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-neutral-charcoal" />
            </button>

            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="overflow-hidden"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                }}
              >
                {basketImages.map((image, index) => (
                  <div 
                    key={image}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <motion.div
                      className="flex justify-center"
                      initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }}
                      animate={{ opacity: 1, y: 0, rotate: Math.random() * 10 - 5 }}
                      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                      whileHover={{ 
                        scale: 1.05, 
                        rotate: 0,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="bg-white p-3 pb-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="bg-neutral-ash/10 p-1">
                          <img
                            src={`/About Us Images/${image}`}
                            alt={`Beautiful fruit basket ${index + 1}`}
                            className="w-full h-48 md:h-56 object-cover rounded-sm"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-primary-peach-coral scale-125' 
                      : 'bg-neutral-ash/30 hover:bg-neutral-ash/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary-peach-coral to-primary-deep-green rounded-3xl p-12 text-white text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h3 className="font-display text-3xl md:text-4xl mb-6">
                Our Values
              </h3>
              <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
                This business is not just about gifting—it is about building opportunities, 
                uplifting others, and creating an impact together.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl mb-2">Love</h4>
                  <p className="text-sm opacity-80">Every basket is crafted with love and care</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl mb-2">Community</h4>
                  <p className="text-sm opacity-80">Empowering women and building opportunities</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl mb-2">Beauty</h4>
                  <p className="text-sm opacity-80">Creating moments that uplift the heart</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-lg max-w-4xl mx-auto">
            <h3 className="font-display text-3xl text-neutral-charcoal mb-6">
              Join Our Story
            </h3>
            <p className="text-lg text-neutral-ash mb-8 max-w-2xl mx-auto leading-relaxed">
              Be part of our mission to spread joy, beauty, and love through every 
              carefully crafted fruit basket. Together, we can make moments memorable.
            </p>
            
            <motion.button
              onClick={onBackToHome}
              className="bg-gradient-to-r from-primary-peach-coral to-primary-deep-green text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Collections
            </motion.button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutUsPage;
