import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface MasonryGridProps {
  products: Product[];
  onQuickLook: (product: Product) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ products, onQuickLook }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        >
          <ProductCard product={product} onQuickLook={onQuickLook} />
        </motion.div>
      ))}
    </div>
  );
};

export default MasonryGrid;