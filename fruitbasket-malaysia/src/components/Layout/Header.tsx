import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, favorites, isMenuOpen, toggleMenu, toggleCart } = useStore();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cartItems.length;
  const favoriteCount = favorites.length;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-neutral-off-white/95 backdrop-blur-md py-3 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-left">
              <div className="flex items-center">
                <span className="font-logo text-2xl md:text-3xl text-primary-orange tracking-wider">
                  FRUITBASKET
                </span>
                <span className="font-logo text-2xl md:text-3xl text-primary-coral tracking-wider ml-1">
                  
                </span>
              </div>
              <div className="font-sans text-xs md:text-sm text-neutral-charcoal font-medium tracking-wide -mt-1">
                MALAYSIA
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#catalogue" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium">
              Catalogue
            </a>
            <a href="#bestsellers" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium">
              Bestsellers
            </a>
            <a href="#about" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              className="p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Favorites */}
            <motion.button
              className="relative p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button
              onClick={toggleCart}
              className="relative p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-6 py-4 border-t border-neutral-ash/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              <a href="#catalogue" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium py-2">
                Catalogue
              </a>
              <a href="#bestsellers" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium py-2">
                Bestsellers
              </a>
              <a href="#about" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium py-2">
                About
              </a>
              <a href="#contact" className="text-neutral-charcoal hover:text-primary-orange transition-colors font-medium py-2">
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;