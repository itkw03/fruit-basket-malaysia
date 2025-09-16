import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { mockProducts } from '../../data/mockData';
import Button from '../UI/Button';

const CartSlideOut: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, updateCartItem, removeFromCart } = useStore();

  const getProductById = (id: string) => mockProducts.find(p => p.id === id);

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const delivery = subtotal > 150 ? 0 : 15;
  const total = subtotal + delivery;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Cart Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-ash/20">
              <div className="flex items-center">
                <ShoppingBag className="w-6 h-6 text-primary-orange mr-2" />
                <h2 className="text-xl font-display text-neutral-charcoal">
                  Shopping Cart ({cartItems.length})
                </h2>
              </div>
              <motion.button
                onClick={toggleCart}
                className="p-2 hover:bg-neutral-soft-blush rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-neutral-ash mx-auto mb-4" />
                  <p className="text-neutral-ash mb-4">Your cart is empty</p>
                  <Button onClick={toggleCart} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <motion.div
                        key={item.productId}
                        className="flex items-start space-x-4 p-4 bg-neutral-soft-blush/30 rounded-xl"
                        layout
                      >
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-charcoal mb-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-neutral-ash mb-2">
                            RM{product.price}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                onClick={() => 
                                  item.quantity > 1 
                                    ? updateCartItem(item.productId, { quantity: item.quantity - 1 })
                                    : removeFromCart(item.productId)
                                }
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-neutral-soft-blush transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Minus className="w-4 h-4" />
                              </motion.button>
                              <span className="font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                onClick={() => 
                                  updateCartItem(item.productId, { quantity: item.quantity + 1 })
                                }
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-neutral-soft-blush transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Plus className="w-4 h-4" />
                              </motion.button>
                            </div>
                            
                            <motion.button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-error hover:text-error/80 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-neutral-ash/20 p-6">
                {/* Summary */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-ash">Subtotal</span>
                    <span className="font-medium">RM{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-ash">Delivery</span>
                    <span className="font-medium">
                      {delivery === 0 ? 'FREE' : `RM${delivery.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 150 && (
                    <p className="text-xs text-neutral-ash">
                      Add RM{(150 - subtotal).toFixed(2)} more for free delivery
                    </p>
                  )}
                  <div className="border-t border-neutral-ash/20 pt-2 flex justify-between">
                    <span className="font-semibold text-neutral-charcoal">Total</span>
                    <span className="font-semibold text-primary-orange">
                      RM{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full" size="lg">
                  Secure Checkout
                </Button>
                
                <p className="text-xs text-neutral-ash text-center mt-3">
                  Secure payment with SSL encryption
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSlideOut;