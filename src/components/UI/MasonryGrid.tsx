import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface MasonryGridProps {
  products: Product[];
  onQuickLook: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ products, onQuickLook, onAddToCart }) => {
  const [columns, setColumns] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 640) setColumns(1);
        else if (width < 768) setColumns(2);
        else if (width < 1024) setColumns(3);
        else if (width < 1280) setColumns(4);
        else setColumns(5);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute products across columns
  const columnArrays = Array.from({ length: columns }, () => [] as Product[]);
  products.forEach((product, index) => {
    columnArrays[index % columns].push(product);
  });

  return (
    <div ref={containerRef} className="w-full">
      <div 
        className="flex gap-4"
        style={{ 
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}
      >
        {columnArrays.map((columnProducts, columnIndex) => (
          <div 
            key={columnIndex} 
            className="flex-1 flex flex-col gap-4"
          >
            {columnProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4,
                  delay: (columnIndex * columnProducts.length + index) * 0.1,
                  ease: "easeOut"
                }}
              >
                <ProductCard product={product} onQuickLook={onQuickLook} onAddToCart={onAddToCart} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;