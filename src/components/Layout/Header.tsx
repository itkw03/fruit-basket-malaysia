import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Menu, X, User, LogOut, Package } from 'lucide-react';
import { useStore } from '../../store/useStore';
import LoginModal from '../Modals/LoginModal';

interface HeaderProps {
  onShowFullCatalogue?: () => void;
  onShowFavorites?: () => void;
  onShowMyPurchases?: () => void;
  onShowSearch?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowFullCatalogue, onShowFavorites, onShowMyPurchases, onShowSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { cartItems, favorites, isMenuOpen, toggleMenu, toggleCart, auth } = useStore();
  
  // Debug auth state
  console.log('Header auth state:', {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    isLoading: auth.isLoading
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cartItems.length;
  const favoriteCount = favorites.length;

  // Navigation functions
  const handleCatalogueClick = () => {
    if (onShowFullCatalogue) {
      onShowFullCatalogue();
    }
  };

  const handleBestsellersClick = () => {
    const element = document.getElementById('catalogue');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    const message = encodeURIComponent("Hi, I came across your website and I'm interested in your fruit baskets. Could you share more details with me?");
    const whatsappUrl = `https://wa.me/60123925913?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFavoritesClick = () => {
    if (onShowFavorites) {
      onShowFavorites();
    }
  };

  const handleMyPurchasesClick = () => {
    if (onShowMyPurchases) {
      onShowMyPurchases();
    }
  };

  const handleSearchClick = () => {
    if (onShowSearch) {
      onShowSearch();
    }
  };

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
            {/* Admin-only navigation items */}
            {auth.isAuthenticated && auth.user?.role === 'admin' && (
              <>
                <button
                  onClick={() => {
                    window.history.pushState({}, '', '/orders');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="border-2 border-primary-peach-coral text-primary-peach-coral hover:bg-primary-peach-coral hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  Orders
                </button>
                <button
                  onClick={() => {
                    window.history.pushState({}, '', '/admin');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="border-2 border-primary-peach-coral text-primary-peach-coral hover:bg-primary-peach-coral hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105"
                >
                  Settings
                </button>
              </>
            )}
            <button onClick={handleCatalogueClick} className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20">
              Catalogue
            </button>
            <button onClick={handleBestsellersClick} className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20">
              Bestsellers
            </button>
            <a href="#about" className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20">
              About
            </a>
            <button onClick={handleContactClick} className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20">
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              onClick={handleSearchClick}
              className="p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Favorites */}
            <motion.button
              onClick={handleFavoritesClick}
              className="relative p-2 text-neutral-charcoal hover:text-primary-peach-coral transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-peach-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </motion.button>

            {/* User Account / Login */}
            {auth.isAuthenticated ? (
              <div className="relative group">
                <motion.button
                  className="flex items-center space-x-2 p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {auth.user?.avatar ? (
                    <img
                      src={auth.user.avatar}
                      alt={auth.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="hidden md:block text-sm font-medium">
                    {auth.user?.name}
                  </span>
                </motion.button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-ash/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-neutral-ash/10">
                      <p className="text-sm font-medium text-neutral-charcoal">{auth.user?.name}</p>
                      <p className="text-xs text-neutral-ash">{auth.user?.email}</p>
                    </div>
                    <button
                      onClick={handleMyPurchasesClick}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-charcoal hover:bg-neutral-soft-blush flex items-center space-x-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>My Purchases</span>
                    </button>
                    <button
                      onClick={auth.logout}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-charcoal hover:bg-neutral-soft-blush flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <motion.button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 p-2 text-neutral-charcoal hover:text-primary-orange transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                <span className="hidden md:block text-sm font-medium">Sign In</span>
              </motion.button>
            )}

            {/* Cart */}
            <motion.button
              onClick={toggleCart}
              className="relative p-2 text-neutral-charcoal hover:text-primary-peach-coral transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fa fa-shopping-basket w-5 h-5" aria-hidden="true"></i>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-peach-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
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
              {/* Admin-only navigation items for mobile */}
              {auth.isAuthenticated && auth.user?.role === 'admin' && (
                <>
                  <button
                    onClick={() => {
                      window.history.pushState({}, '', '/orders');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                      toggleMenu();
                    }}
                    className="border-2 border-primary-peach-coral text-primary-peach-coral hover:bg-primary-peach-coral hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 text-left"
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => {
                      window.history.pushState({}, '', '/admin');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                      toggleMenu();
                    }}
                    className="border-2 border-primary-peach-coral text-primary-peach-coral hover:bg-primary-peach-coral hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 text-left"
                  >
                    Settings
                  </button>
                </>
              )}
              <button onClick={() => { handleCatalogueClick(); toggleMenu(); }} className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium py-2 px-3 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20 text-left">
                Catalogue
              </button>
              <button onClick={() => { handleBestsellersClick(); toggleMenu(); }} className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium py-2 px-3 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20 text-left">
                Bestsellers
              </button>
              <a href="#about" className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium py-2 px-3 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20">
                About
              </a>
              <button onClick={() => { handleContactClick(); toggleMenu(); }} className="text-neutral-charcoal hover:text-primary-peach-coral transition-all duration-200 font-medium py-2 px-3 rounded-lg hover:shadow-md hover:bg-primary-light-peach/20 text-left">
                Contact
              </button>
            </div>
          </motion.nav>
        )}

        {/* Login Modal */}
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </div>
    </motion.header>
  );
};

export default Header;