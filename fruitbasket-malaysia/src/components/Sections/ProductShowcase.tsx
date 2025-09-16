import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { mockProducts } from '../../data/mockData';
import MasonryGrid from '../UI/MasonryGrid';
import Button from '../UI/Button';

const ProductShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showQuickLook, setShowQuickLook] = useState<Product | null>(null);

  const categories = ['All', 'Bestseller', 'Express Today', 'Premium', 'Seasonal'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? mockProducts.slice(0, 8) 
    : mockProducts.filter(product => 
        product.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (selectedCategory === 'Express Today' && product.isExpress)
      );

  const handleQuickLook = (product: Product) => {
    setShowQuickLook(product);
  };

  return (
    <section id="catalogue" className="py-20 bg-neutral-off-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-display text-neutral-charcoal mb-4">
            Our Signature Collection
          </h2>
          <p className="text-lg text-neutral-ash max-w-2xl mx-auto">
            Handcrafted arrangements that turn ordinary moments into extraordinary memories
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-orange to-primary-coral text-white shadow-lg'
                  : 'bg-white text-neutral-charcoal hover:bg-neutral-soft-blush'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <MasonryGrid products={filteredProducts} onQuickLook={handleQuickLook} />
        </motion.div>

        {/* Additional Content to Fill Space */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-neutral-soft-blush to-white p-8 rounded-2xl">
            <h3 className="font-display text-2xl text-neutral-charcoal mb-4">
              Why Choose FruitBasket Malaysia?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-orange rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-ash">Handcrafted with love by our skilled artisans</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-orange rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-ash">Premium fresh fruits sourced daily</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-orange rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-ash">Same-day delivery available in KL & Selangor</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-orange rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-neutral-ash">100% satisfaction guarantee</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
              <div className="text-3xl font-display text-primary-orange mb-2">500+</div>
              <p className="text-neutral-ash text-sm">Happy Customers</p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
              <div className="text-3xl font-display text-primary-orange mb-2">24h</div>
              <p className="text-neutral-ash text-sm">Express Delivery</p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
              <div className="text-3xl font-display text-primary-orange mb-2">100%</div>
              <p className="text-neutral-ash text-sm">Fresh Guarantee</p>
            </div>
            <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
              <div className="text-3xl font-display text-primary-orange mb-2">5★</div>
              <p className="text-neutral-ash text-sm">Average Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="outline" size="lg">
            Explore Full Catalogue
          </Button>
        </motion.div>
      </div>

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
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full">
                    Customise This Design
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProductShowcase;