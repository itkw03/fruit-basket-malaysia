import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onQuickLook: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickLook, onAddToCart }) => {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const isFavorited = favorites.includes(product.id);

  const handleAddToCart = async () => {
    // Don't allow adding delisted products to cart
    if (product.isDelisted) return;
    
    setIsAddingToCart(true);
    
    // Add visual feedback delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart({
      productId: product.id,
      quantity: 1,
    });
    
    // Call the parent callback if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
    
    setIsAddingToCart(false);
  };

  const handleCardTouch = () => {
    setIsTouched(!isTouched);
  };
  // Generate random aspect ratio for Pinterest effect
  const getRandomHeight = () => {
    const ratios = [1.2, 1.4, 1.6, 1.8, 2.0];
    return ratios[Math.floor(Math.random() * ratios.length)];
  };

  const [aspectRatio] = useState(getRandomHeight());

  // Check if device supports hover (desktop) or not (mobile)
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={supportsHover ? undefined : handleCardTouch}
    >
      {/* Image Container - Full card coverage */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: `1/${aspectRatio}` }}
      >
        {/* Delisted Overlay */}
        {product.isDelisted && (
          <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-amber-600 text-sm font-medium">No Longer Available</div>
            </div>
          </div>
        )}
        <img
          src={product.images[0]}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-soft-blush to-neutral-off-white animate-pulse" />
        )}

        {/* Express Badge */}
        {product.isExpress && (
          <motion.div
            className="absolute top-4 left-4 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-success text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
              Express Today
            </span>
          </motion.div>
        )}

        {/* Favorite Button - Always visible */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavorited 
              ? 'bg-primary-peach-coral text-white shadow-lg' 
              : 'bg-white/90 text-neutral-charcoal hover:bg-primary-peach-coral hover:text-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Mobile: Always visible bottom info bar */}
        {!supportsHover && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="font-semibold text-sm leading-tight mb-1">
                  {product.title}
                </h3>
                <div className="text-lg font-bold">
                  {product.priceRange ? (
                    <span>RM{product.priceRange.min} - RM{product.priceRange.max}</span>
                  ) : (
                    <span>RM{product.price}</span>
                  )}
                </div>
              </div>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className={`bg-white text-neutral-charcoal hover:bg-neutral-charcoal hover:text-white font-semibold text-sm px-4 py-2 ${
                  isAddingToCart ? 'scale-95 opacity-75' : ''
                } transition-all duration-200`}
                size="sm"
                isLoading={isAddingToCart}
              >
                {isAddingToCart ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>
        )}
        {/* Desktop: Hover Overlay with Content */}
        {supportsHover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
          initial={false}
        >
          {/* Content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* Title */}
            <motion.h3
              className="font-display text-xl font-semibold mb-2 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {product.title}
            </motion.h3>

            {/* Price */}
            <motion.div
              className="mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.priceRange ? (
                <span className="text-2xl font-bold">
                  RM{product.priceRange.min} - RM{product.priceRange.max}
                </span>
              ) : (
                <span className="text-2xl font-bold">
                  RM{product.price}
                </span>
              )}
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white/90 backdrop-blur-sm text-neutral-charcoal px-3 py-1 rounded-full border border-white/50"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className={`flex-1 font-semibold transition-all duration-200 ${
                  product.isDelisted 
                    ? 'bg-neutral-ash text-white cursor-not-allowed' 
                    : 'bg-primary-peach-coral text-white hover:bg-primary-peach-coral/90'
                } ${
                  isAddingToCart ? 'scale-95 opacity-75' : ''
                }`}
                size="sm"
                isLoading={isAddingToCart}
                disabled={product.isDelisted}
              >
                {product.isDelisted ? 'Unavailable' : (isAddingToCart ? 'Adding...' : 'Add to Basket')}
              </Button>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickLook(product);
                }}
                className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all border border-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        )}

        {/* Mobile: Expanded info overlay when touched */}
        {!supportsHover && isTouched && (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col justify-center items-center p-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h3 className="font-display text-xl font-semibold mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-white/80 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="text-2xl font-bold mb-4">
                {product.priceRange ? (
                  <span>RM{product.priceRange.min} - RM{product.priceRange.max}</span>
                ) : (
                  <span>RM{product.price}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/90 backdrop-blur-sm text-neutral-charcoal px-3 py-1 rounded-full border border-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                    setIsTouched(false);
                  }}
                  className={`font-semibold transition-all duration-200 ${
                    product.isDelisted 
                      ? 'bg-neutral-ash text-white cursor-not-allowed' 
                      : 'bg-white text-neutral-charcoal hover:bg-neutral-charcoal hover:text-white'
                  } ${
                    isAddingToCart ? 'scale-95 opacity-75' : ''
                  }`}
                  size="sm"
                  isLoading={isAddingToCart}
                  disabled={product.isDelisted}
                >
                  {product.isDelisted ? 'Unavailable' : (isAddingToCart ? 'Adding...' : 'Add to Basket')}
                </Button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickLook(product);
                    setIsTouched(false);
                  }}
                  className="p-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all border border-white/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;