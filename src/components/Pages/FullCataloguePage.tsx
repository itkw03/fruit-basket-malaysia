import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, SlidersHorizontal, Home, CheckCircle, Heart } from 'lucide-react';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';
import MasonryGrid from '../UI/MasonryGrid';
import Button from '../UI/Button';
import CartSlideOut from '../Cart/CartSlideOut';
import { useStore } from '../../store/useStore';

interface FullCataloguePageProps {
  onBackToHome: () => void;
  focusSearch?: boolean;
}

const FullCataloguePage: React.FC<FullCataloguePageProps> = ({ onBackToHome, focusSearch = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showQuickLook, setShowQuickLook] = useState<Product | null>(null);
  const [showCartToast, setShowCartToast] = useState<{ show: boolean; productName: string }>({ 
    show: false, 
    productName: '' 
  });
  const { cartItems, favorites, toggleCart } = useStore();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Focus search input when focusSearch prop is true
  useEffect(() => {
    if (focusSearch && searchInputRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [focusSearch]);

  const categories = ['All', 'Bestseller', 'Express Today', 'Premium', 'Seasonal', 'For Her', 'For Him', 'Corporate', 'Luxury'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under RM100', min: 0, max: 100 },
    { label: 'RM100 - RM150', min: 100, max: 150 },
    { label: 'RM150 - RM200', min: 150, max: 200 },
    { label: 'Above RM200', min: 200, max: Infinity }
  ];

  // Extended mock products for demonstration
  const allProducts = useMemo(() => {
    // Duplicate and modify existing products to create more variety
    const extendedProducts = [...mockProducts];
    
    // Add more products by modifying existing ones
    mockProducts.forEach((product, index) => {
      if (index < 3) { // Create 3 additional variants
        extendedProducts.push({
          ...product,
          id: `${product.id}-variant`,
          title: `${product.title} - Premium`,
          price: product.price + 30,
          category: 'Premium',
          tags: [...product.tags, 'premium']
        });
      }
    });

    return extendedProducts;
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => !product.isDelisted); // Hide delisted products

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Express Today' && product.isExpress)
      );
    }

    // Price range filter
    if (selectedPriceRange !== 'All') {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [allProducts, selectedCategory, selectedPriceRange, searchQuery]);

  const handleQuickLook = (product: Product) => {
    setShowQuickLook(product);
  };

  const handleCustomizeClick = (product: Product) => {
    const message = encodeURIComponent(`Hi! I'm interested in ordering the ${product.title} and would like to know if I can customise it to my preference.`);
    const whatsappUrl = `https://wa.me/60123925913?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowQuickLook(null); // Close the modal after opening WhatsApp
  };

  const handleAddToCart = (product: Product) => {
    // Show toast notification
    setShowCartToast({ show: true, productName: product.title });
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowCartToast({ show: false, productName: '' });
    }, 3000);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-neutral-off-white">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm border-b border-neutral-ash/20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="flex items-center justify-between">
            {/* Back Button & Title */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-neutral-charcoal hover:text-primary-orange transition-colors p-2 hover:bg-neutral-soft-blush rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </motion.button>
              
              <div className="h-6 w-px bg-neutral-ash/20"></div>
              
              <div>
                <h1 className="text-2xl font-display text-neutral-charcoal">Full Catalogue</h1>
                <p className="text-sm text-neutral-ash">
                  {filteredProducts.length} of {allProducts.length} products
                </p>
              </div>
            </div>

            {/* Home Icon */}
            <div className="flex items-center space-x-4">
              {/* Favorites */}
              <motion.button
                className="relative p-3 text-neutral-charcoal hover:text-primary-orange hover:bg-neutral-soft-blush rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-peach-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                onClick={toggleCart}
                className="relative p-3 text-neutral-charcoal hover:text-primary-peach-coral hover:bg-primary-light-peach rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fa fa-shopping-basket w-6 h-6" aria-hidden="true"></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-peach-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.button>

              {/* Home Icon */}
              <motion.button
                onClick={onBackToHome}
                className="p-3 text-neutral-charcoal hover:text-primary-orange hover:bg-neutral-soft-blush rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-7xl py-8">
        {/* Search and Filter Bar */}
        <motion.div
          className="bg-white rounded-2xl shadow-sm border border-neutral-ash/10 p-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-ash" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-ash/20 rounded-full focus:border-primary-peach-coral focus:outline-none"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              icon={SlidersHorizontal}
              className="lg:w-auto"
            >
              Filters
            </Button>

            {/* Clear Filters */}
            {(selectedCategory !== 'All' || selectedPriceRange !== 'All' || searchQuery) && (
              <Button
                onClick={clearFilters}
                variant="ghost"
                className="lg:w-auto"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              className="space-y-6 pt-4 border-t border-neutral-ash/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category Filter */}
              <div>
                <h3 className="font-medium text-neutral-charcoal mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary-peach-coral text-white'
                          : 'bg-primary-light-peach text-neutral-charcoal hover:bg-primary-peach-coral/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium text-neutral-charcoal mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <motion.button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(range.label)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedPriceRange === range.label
                          ? 'bg-primary-peach-coral text-white'
                          : 'bg-primary-light-peach text-neutral-charcoal hover:bg-primary-peach-coral/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {range.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredProducts.length > 0 ? (
            <MasonryGrid products={filteredProducts} onQuickLook={handleQuickLook} />
          ) : (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-neutral-ash mx-auto mb-6" />
              <h3 className="text-2xl font-display text-neutral-charcoal mb-4">No products found</h3>
              <p className="text-neutral-ash mb-8 max-w-md mx-auto">
                Try adjusting your filters or search terms to find what you're looking for
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* Cart Toast Notification */}
        {showCartToast.show && (
          <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-success text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-3"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              "{showCartToast.productName}" added to cart!
            </span>
          </motion.div>
        )}
      </main>

      {/* Cart Slideout */}
      <CartSlideOut />

      {/* Quick Look Modal */}
      {showQuickLook && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowQuickLook(null)}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={showQuickLook.images[0]}
                  alt={showQuickLook.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl text-neutral-charcoal mb-2">
                  {showQuickLook.title}
                </h3>
                <p className="text-neutral-ash mb-4">
                  {showQuickLook.description}
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-semibold text-neutral-charcoal">
                    {showQuickLook.priceRange 
                      ? `RM${showQuickLook.priceRange.min} - RM${showQuickLook.priceRange.max}`
                      : `RM${showQuickLook.price}`
                    }
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {showQuickLook.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-neutral-ash bg-neutral-soft-blush px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <Button className="w-full">
                    Add to Basket
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleCustomizeClick(showQuickLook)}
                  >
                    Customise This Design
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FullCataloguePage;