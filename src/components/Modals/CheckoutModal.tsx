import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Calendar, Clock, CreditCard, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CartItem, Order } from '../../types';
import { mockProducts } from '../../data/mockData';
import Button from '../UI/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderComplete }) => {
  const { cartItems, auth, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGuest, setIsGuest] = useState(false);
  const [formData, setFormData] = useState({
    customerName: auth.user?.name || '',
    customerEmail: auth.user?.email || '',
    customerPhone: '',
    deliveryAddress: {
      name: '',
      phone: '',
      address: '',
      city: '',
      postcode: '',
      state: '',
      specialInstructions: ''
    },
    deliveryDate: '',
    deliveryTime: '',
    notes: ''
  });

  const totalSteps = 3;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const getProductById = (id: string) => mockProducts.find(p => p.id === id);

  const subtotal = cartItems.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 150 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const generateOrderNumber = () => {
    return 'FB' + Date.now().toString().slice(-6);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.customerName && formData.customerEmail && formData.customerPhone;
      case 2:
        return formData.deliveryAddress.name && 
               formData.deliveryAddress.phone && 
               formData.deliveryAddress.address && 
               formData.deliveryAddress.city && 
               formData.deliveryAddress.postcode && 
               formData.deliveryAddress.state &&
               formData.deliveryDate &&
               formData.deliveryTime;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOrder = () => {
    const order: Order = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      customerId: auth.isAuthenticated ? auth.user?.id : undefined,
      customerEmail: formData.customerEmail,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      isGuest: isGuest || !auth.isAuthenticated,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      deliveryAddress: formData.deliveryAddress,
      deliveryDate: formData.deliveryDate,
      deliveryTime: formData.deliveryTime,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      orderStatus: 'payment_pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: formData.notes
    };

    onOrderComplete(order);
    clearCart();
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Customer Information</h3>
              <p className="text-neutral-ash">Tell us who you are and how to reach you</p>
            </div>

            {/* Login/Guest Selection */}
            {!auth.isAuthenticated && (
              <div className="bg-neutral-soft-blush/50 p-4 rounded-xl">
                <h4 className="font-medium text-neutral-charcoal mb-3">Choose your checkout method:</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsGuest(false)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      !isGuest
                        ? 'bg-primary-peach-coral text-white'
                        : 'bg-white text-neutral-charcoal border border-neutral-ash/20'
                    }`}
                  >
                    Sign In to Checkout
                  </button>
                  <button
                    onClick={() => setIsGuest(true)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      isGuest
                        ? 'bg-primary-peach-coral text-white'
                        : 'bg-white text-neutral-charcoal border border-neutral-ash/20'
                    }`}
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                  placeholder="+60 12-345 6789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                placeholder="your@email.com"
              />
              <p className="text-xs text-neutral-ash mt-1">
                We'll send your order confirmation and tracking updates to this email
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Delivery Information</h3>
              <p className="text-neutral-ash">Where should we deliver your beautiful arrangement?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={formData.deliveryAddress.name}
                  onChange={(e) => handleInputChange('deliveryAddress.name', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                  placeholder="Recipient's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Recipient Phone *
                </label>
                <input
                  type="tel"
                  value={formData.deliveryAddress.phone}
                  onChange={(e) => handleInputChange('deliveryAddress.phone', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                  placeholder="+60 12-345 6789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Delivery Address *
              </label>
              <textarea
                value={formData.deliveryAddress.address}
                onChange={(e) => handleInputChange('deliveryAddress.address', e.target.value)}
                className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                rows={3}
                placeholder="Enter complete delivery address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">City *</label>
                <input
                  type="text"
                  value={formData.deliveryAddress.city}
                  onChange={(e) => handleInputChange('deliveryAddress.city', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                  placeholder="Kuala Lumpur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">Postcode *</label>
                <input
                  type="text"
                  value={formData.deliveryAddress.postcode}
                  onChange={(e) => handleInputChange('deliveryAddress.postcode', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">State *</label>
                <select
                  value={formData.deliveryAddress.state}
                  onChange={(e) => handleInputChange('deliveryAddress.state', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                >
                  <option value="">Select State</option>
                  <option value="Kuala Lumpur">Kuala Lumpur</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Penang">Penang</option>
                  <option value="Johor">Johor</option>
                  <option value="Perak">Perak</option>
                  <option value="Sabah">Sabah</option>
                  <option value="Sarawak">Sarawak</option>
                  <option value="Kedah">Kedah</option>
                  <option value="Kelantan">Kelantan</option>
                  <option value="Melaka">Melaka</option>
                  <option value="Negeri Sembilan">Negeri Sembilan</option>
                  <option value="Pahang">Pahang</option>
                  <option value="Perlis">Perlis</option>
                  <option value="Terengganu">Terengganu</option>
                  <option value="Putrajaya">Putrajaya</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Delivery Date *
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Delivery Time *
                </label>
                <select
                  value={formData.deliveryTime}
                  onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                  className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                >
                  <option value="">Select Time</option>
                  <option value="09:00-12:00">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="12:00-15:00">Afternoon (12:00 PM - 3:00 PM)</option>
                  <option value="15:00-18:00">Evening (3:00 PM - 6:00 PM)</option>
                  <option value="18:00-21:00">Night (6:00 PM - 9:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                Special Delivery Instructions
              </label>
              <textarea
                value={formData.deliveryAddress.specialInstructions}
                onChange={(e) => handleInputChange('deliveryAddress.specialInstructions', e.target.value)}
                className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                rows={2}
                placeholder="Any special instructions for delivery (optional)"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Order Summary</h3>
              <p className="text-neutral-ash">Review your order and proceed to payment</p>
            </div>

            {/* Order Items */}
            <div className="bg-neutral-off-white p-4 rounded-xl">
              <h4 className="font-medium text-neutral-charcoal mb-3">Order Items:</h4>
              <div className="space-y-2">
                {cartItems.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex items-center justify-between text-sm">
                      <span>{product.title} x {item.quantity}</span>
                      <span className="font-medium">RM{(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-4 rounded-xl border border-neutral-ash/20">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-ash">Subtotal</span>
                  <span className="font-medium">RM{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-ash">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'FREE' : `RM${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 150 && (
                  <p className="text-xs text-neutral-ash">
                    Add RM{(150 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}
                <div className="border-t border-neutral-ash/20 pt-2 flex justify-between">
                  <span className="font-semibold text-neutral-charcoal">Total</span>
                  <span className="font-semibold text-primary-orange text-lg">
                    RM{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                rows={3}
                placeholder="Any special requests or notes for your order..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-ash/20">
            <div>
              <h2 className="text-xl font-display text-neutral-charcoal">Checkout</h2>
              <p className="text-sm text-neutral-ash">Step {currentStep} of {totalSteps}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-soft-blush rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-neutral-off-white">
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-colors ${
                    i + 1 <= currentStep ? 'bg-primary-peach-coral' : 'bg-neutral-ash/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-neutral-ash/20">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                icon={ArrowRight}
                iconPosition="right"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleCompleteOrder}
                disabled={!canProceedToNext()}
                icon={CreditCard}
                iconPosition="right"
              >
                Complete Order
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
