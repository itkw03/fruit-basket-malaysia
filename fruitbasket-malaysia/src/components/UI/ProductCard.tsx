import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../store/useStore';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onQuickLook: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickLook }) => {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const isFavorited = favorites.includes(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <motion.div
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            {/* Favorite Button */}
            <motion.button
              onClick={() => toggleFavorite(product.id)}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorited 
                  ? 'bg-primary-coral text-white' 
                  : 'bg-white/90 text-neutral-charcoal hover:bg-primary-coral hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Quick Look Button */}
            <motion.button
              onClick={() => onQuickLook(product)}
              className="p-2 bg-white/90 text-neutral-charcoal rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary-orange hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Express Badge */}
        {product.isExpress && (
          <div className="absolute top-3 left-3">
            <span className="bg-success text-white text-xs font-medium px-2 py-1 rounded-full">
              Express Today
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-display text-lg text-neutral-charcoal group-hover:text-primary-orange transition-colors">
            {product.title}
          </h3>
          <p className="text-neutral-ash text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.priceRange ? (
            <span className="font-semibold text-neutral-charcoal">
              RM{product.priceRange.min} - RM{product.priceRange.max}
            </span>
          ) : (
            <span className="font-semibold text-neutral-charcoal">
              RM{product.price}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-ash bg-neutral-soft-blush px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;