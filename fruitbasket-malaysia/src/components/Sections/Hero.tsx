import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye } from 'lucide-react';
import Button from '../UI/Button';
import CustomArrangementWizard from '../Modals/CustomArrangementWizard';

const Hero: React.FC = () => {
  const [showWizard, setShowWizard] = React.useState(false);

  const scrollToCollection = () => {
    const element = document.getElementById('catalogue');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/image copy.png')" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        />
        {/* Clean overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <motion.div
          className="max-w-4xl text-left pt-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Heading */}
          <motion.h1
            className="font-display text-6xl md:text-7xl lg:text-8xl text-neutral-charcoal mb-6 leading-none font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            FLOWERS
            <br />
            <span className="text-primary-coral font-bold">& FRUIT</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-neutral-charcoal/70 mb-12 font-light leading-relaxed max-w-lg uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            That make hearts full
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Customize Button */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => setShowWizard(true)}
                variant="primary" 
                size="lg"
                className="px-8 py-4 text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                icon={Palette}
                iconPosition="left"
              >
                Create Custom Arrangement
              </Button>
            </motion.div>

            {/* Browse Collections Button */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={scrollToCollection}
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-base font-medium rounded-full border-2 border-neutral-charcoal text-neutral-charcoal hover:bg-neutral-charcoal hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                icon={Eye}
                iconPosition="left"
              >
                Curated Collections
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>

      {/* Custom Arrangement Wizard */}
      <CustomArrangementWizard 
        isOpen={showWizard} 
        onClose={() => setShowWizard(false)} 
      />
    </>
  );
};

export default Hero;