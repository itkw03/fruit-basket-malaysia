import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Eye, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';
import MasonryGrid from '../UI/MasonryGrid';
import Button from '../UI/Button';
import CartSlideOut from '../Cart/CartSlideOut';
import { useStore } from '../../store/useStore';

interface FavoritesPageProps {
  onBackToHome: () => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onBackToHome }) => {
  const [showQuickLook, setShowQuickLook] = useState<Product | null>(null);
  const [showCartToast, setShowCartToast] = useState<{ show: boolean; productName: string }>({ 
    show: false, 
    productName: '' 
  });
  const { cartItems, favorites, toggleFavorite, addToCart } = useStore();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get favorited products
  const favoritedProducts = useMemo(() => {
    return mockProducts.filter(product => favorites.includes(product.id));
  }, [favorites]);

  // Separate active and delisted products
  const { activeProducts, delistedProducts } = useMemo(() => {
    const active = favoritedProducts.filter(product => !product.isDelisted);
    const delisted = favoritedProducts.filter(product => product.isDelisted);
    return { activeProducts: active, delistedProducts: delisted };
  }, [favoritedProducts]);

  const handleQuickLook = (product: Product) => {
    setShowQuickLook(product);
  };

  const handleAddToCart = (product: Product) => {
    // Don't allow adding delisted products to cart
    if (product.isDelisted) return;
    
    // Show toast notification
    setShowCartToast({ show: true, productName: product.title });
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowCartToast({ show: false, productName: '' });
    }, 3000);
  };

  const handleRemoveFromFavorites = (productId: string) => {
    toggleFavorite(productId);
  };

  if (favoritedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-off-white">
        {/* Header */}
        <div className="bg-white border-b border-neutral-ash/20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between py-6">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={onBackToHome}
                  icon={ArrowLeft}
                  className="text-neutral-charcoal hover:text-primary-peach-coral"
                >
                  Back to Home
                </Button>
                <div>
                  <h1 className="text-3xl font-display text-neutral-charcoal">My Favorites</h1>
                  <p className="text-neutral-ash">Your saved fruit baskets and arrangements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-primary-light-peach rounded-full flex items-center justify-center">
              <Heart className="w-16 h-16 text-primary-peach-coral" />
            </div>
            <h2 className="text-2xl font-display text-neutral-charcoal mb-4">No Favorites Yet</h2>
            <p className="text-neutral-ash mb-8 max-w-md mx-auto">
              Start exploring our beautiful fruit baskets and arrangements. When you find something you love, 
              click the heart icon to save it here.
            </p>
            <Button onClick={onBackToHome} size="lg">
              Explore Products
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-off-white">
      {/* Header */}
      <div className="bg-white border-b border-neutral-ash/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBackToHome}
                icon={ArrowLeft}
                className="text-neutral-charcoal hover:text-primary-peach-coral"
              >
                Back to Home
              </Button>
              <div>
                <h1 className="text-3xl font-display text-neutral-charcoal">My Favorites</h1>
                <p className="text-neutral-ash">
                  {favoritedProducts.length} saved item{favoritedProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Active Products */}
        {activeProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-display text-neutral-charcoal mb-6">Available Products</h2>
            <MasonryGrid 
              products={activeProducts} 
              onQuickLook={handleQuickLook}
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        )}

        {/* Delisted Products */}
        {delistedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-display text-neutral-charcoal">No Longer Available</h2>
            </div>
            <p className="text-neutral-ash mb-6">
              These products have been delisted and are no longer available for purchase.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {delistedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-neutral-ash/20 overflow-hidden relative"
                >
                  {/* Delisted Overlay */}
                  <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-neutral-charcoal">No Longer Available</p>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Remove from Favorites Button */}
                    <motion.button
                      onClick={() => handleRemoveFromFavorites(product.id)}
                      className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 text-neutral-charcoal rounded-full backdrop-blur-md transition-all duration-300 hover:bg-primary-peach-coral hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </motion.button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-neutral-charcoal mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-neutral-ash mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-neutral-charcoal">
                        RM{product.price}
                      </span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        Delisted
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Look Modal */}
      {showQuickLook && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuickLook(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display text-neutral-charcoal">Quick Look</h3>
                <button
                  onClick={() => setShowQuickLook(null)}
                  className="text-neutral-ash hover:text-neutral-charcoal"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={showQuickLook.images[0]}
                    alt={showQuickLook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-neutral-charcoal mb-2">
                      {showQuickLook.title}
                    </h4>
                    <p className="text-neutral-ash mb-4">{showQuickLook.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      {showQuickLook.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary-light-peach text-neutral-charcoal px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-primary-peach-coral mb-6">
                    RM{showQuickLook.price}
                  </div>

                  <div className="space-y-3">
                    {!showQuickLook.isDelisted ? (
                      <Button 
                        onClick={() => {
                          addToCart({
                            productId: showQuickLook.id,
                            quantity: 1,
                          });
                          handleAddToCart(showQuickLook);
                          setShowQuickLook(null);
                        }}
                        className="w-full bg-primary-peach-coral text-white hover:bg-primary-peach-coral/90"
                        size="lg"
                      >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Add to Basket
                      </Button>
                    ) : (
                      <div className="w-full bg-amber-100 text-amber-800 px-4 py-3 rounded-lg text-center">
                        <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
                        <p className="text-sm font-medium">This product is no longer available</p>
                      </div>
                    )}
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleRemoveFromFavorites(showQuickLook.id);
                        setShowQuickLook(null);
                      }}
                      className="w-full"
                      size="sm"
                    >
                      <Heart className="w-4 h-4 mr-2 fill-current" />
                      Remove from Favorites
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Cart Slide Out */}
      <CartSlideOut />

      {/* Toast Notification */}
      {showCartToast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 bg-primary-peach-coral text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>{showCartToast.productName} added to basket!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FavoritesPage;
