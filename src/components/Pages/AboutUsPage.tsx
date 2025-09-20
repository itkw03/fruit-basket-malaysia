import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Users, Sparkles } from 'lucide-react';

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

  const polaroidVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: Math.random() * 10 - 5, // Random rotation between -5 and 5 degrees
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                    The Beginning
                  </h3>
                  <p className="text-neutral-ash leading-relaxed">
                    Fruit baskets were the natural choice in Malaysia, a gesture of care and sincerity. 
                    But as they searched, they realised something was missing. Most fruit baskets looked 
                    ordinary, sometimes even cheap, and rarely brought the kind of joy that flowers could.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                    The Innovation
                  </h3>
                  <p className="text-neutral-ash leading-relaxed">
                    So, they decided to make their own. They blended fresh fruits with beautiful floral 
                    arrangements, creating baskets that not only nourished the body but also uplifted 
                    the heart. The response was overwhelming.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                    The Mission
                  </h3>
                  <p className="text-neutral-ash leading-relaxed">
                    What started as a passion project grew into a mission. They took up the challenge 
                    of introducing this new way of gifting to Malaysia, believing wholeheartedly that 
                    they were among the first to bring this trend to life.
                  </p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
                    The Purpose
                  </h3>
                  <p className="text-neutral-ash leading-relaxed">
                    At the heart of Fruitbasket Malaysia is a bigger purpose. Beyond making fruit baskets 
                    look beautiful, the three ladies are driven by a passion to empower women, especially 
                    those who are underprivileged or in need.
                  </p>
                </div>
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
          </div>

          {/* Polaroid Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {basketImages.map((image, index) => (
              <motion.div
                key={image}
                className="flex justify-center"
                variants={polaroidVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="bg-white p-3 pb-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-neutral-ash/10 p-1">
                    <img
                      src={`/About Us Images/${image}`}
                      alt={`Beautiful fruit basket ${index + 1}`}
                      className="w-full h-32 md:h-40 object-cover rounded-sm"
                    />
                  </div>
                  {/* Polaroid Label */}
                  <div className="mt-2">
                    <p className="text-neutral-charcoal text-xs font-medium text-center">
                      {image.replace('.png', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
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
