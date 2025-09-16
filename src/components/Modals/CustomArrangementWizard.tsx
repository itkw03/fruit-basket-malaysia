import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MessageSquare, User, Phone, Gift } from 'lucide-react';
import { colorMoods, flowers, fruits } from '../../data/mockData';
import Button from '../UI/Button';

interface CustomArrangementWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  colors: string[];
  flowers: string[];
  fruits: { id: string; quantity: number }[];
  buyerName: string;
  whatsappNumber: string;
  occasion: string;
  deliveryDate: string;
  message: string;
}

const CustomArrangementWizard: React.FC<CustomArrangementWizardProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    colors: [],
    flowers: [],
    fruits: [],
    buyerName: '',
    whatsappNumber: '',
    occasion: '',
    deliveryDate: '',
    message: ''
  });

  const occasions = [
    'Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Get Well Soon',
    'Thank You', 'Congratulations', 'Valentine\'s Day', 'Mother\'s Day',
    'Corporate Gift', 'Housewarming', 'Just Because'
  ];

  const totalSteps = 4;

  const handleColorSelect = (colorName: string) => {
    if (formData.colors.includes(colorName)) {
      setFormData(prev => ({
        ...prev,
        colors: []
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        colors: [colorName]
      }));
    }
  };

  const handleFlowerSelect = (flowerId: string) => {
    if (formData.flowers.includes(flowerId)) {
      setFormData(prev => ({
        ...prev,
        flowers: prev.flowers.filter(f => f !== flowerId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        flowers: [...prev.flowers, flowerId]
      }));
    }
  };

  const handleFruitQuantityChange = (fruitId: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      fruits: prev.fruits.some(f => f.id === fruitId)
        ? prev.fruits.map(f => f.id === fruitId ? { ...f, quantity } : f)
        : [...prev.fruits, { id: fruitId, quantity }]
    }));
  };

  const getFruitQuantity = (fruitId: string) => {
    return formData.fruits.find(f => f.id === fruitId)?.quantity || 0;
  };

  const calculateEstimatedCost = () => {
    const baseCost = 80;
    const fruitCost = formData.fruits.reduce((total, fruit) => total + (fruit.quantity * 15), 0);
    return baseCost + fruitCost;
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return formData.colors.length > 0;
      case 2: return formData.flowers.length > 0;
      case 3: return formData.fruits.some(f => f.quantity > 0);
      case 4: return formData.buyerName && formData.whatsappNumber && formData.occasion && formData.deliveryDate;
      default: return false;
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Custom arrangement order:', formData);
    onClose();
    // Here you would typically send the data to your backend
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Choose Your Colour Mood</h3>
              <p className="text-neutral-ash">Select the main mood for your arrangement</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colorMoods.map((mood) => (
                <motion.div
                  key={mood.name}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.colors.includes(mood.name)
                      ? 'border-primary-peach-coral bg-primary-peach-coral/10'
                      : 'border-neutral-ash/20 hover:border-primary-peach-coral/50'
                  }`}
                  onClick={() => handleColorSelect(mood.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex space-x-1">
                      {mood.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium text-neutral-charcoal">{mood.name}</h4>
                  </div>
                  <p className="text-sm text-neutral-ash">{mood.mood}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center text-sm text-neutral-ash">
            You’ve selected: {formData.colors.length > 0 ? formData.colors[0] : 'None'}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Select Your Flowers</h3>
              <p className="text-neutral-ash">Choose the flowers that speak to your heart</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {flowers.map((flower) => (
                <motion.div
                  key={flower.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.flowers.includes(flower.id)
                      ? 'border-primary-peach-coral bg-primary-peach-coral/10'
                      : 'border-neutral-ash/20 hover:border-primary-peach-coral/50'
                  }`}
                  onClick={() => handleFlowerSelect(flower.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-neutral-charcoal mb-1">{flower.name}</h4>
                  {flower.allergyTags && (
                    <p className="text-xs text-neutral-ash">⚠️ {flower.allergyTags.join(', ')}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Choose Your Fruits</h3>
              <p className="text-neutral-ash">Fresh, premium fruits to complete your arrangement</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fruits.map((fruit) => (
                <div
                  key={fruit.id}
                  className="p-4 rounded-xl border border-neutral-ash/20 hover:border-primary-peach-coral/50 transition-all"
                >
                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-neutral-charcoal mb-2">{fruit.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-ash">+RM15 each</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleFruitQuantityChange(fruit.id, Math.max(0, getFruitQuantity(fruit.id) - 1))}
                        className="w-8 h-8 rounded-full bg-neutral-soft-blush flex items-center justify-center hover:bg-primary-peach-coral hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{getFruitQuantity(fruit.id)}</span>
                      <button
                        onClick={() => handleFruitQuantityChange(fruit.id, getFruitQuantity(fruit.id) + 1)}
                        className="w-8 h-8 rounded-full bg-neutral-soft-blush flex items-center justify-center hover:bg-primary-peach-coral hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-neutral-soft-blush/50 p-4 rounded-xl text-center">
              <p className="text-lg font-medium text-neutral-charcoal">
                Estimated Cost: RM{calculateEstimatedCost()}
              </p>
              <p className="text-sm text-neutral-ash mt-1">Base arrangement (RM80) + selected fruits</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-display text-neutral-charcoal mb-2">Order Details</h3>
              <p className="text-neutral-ash">Tell us about yourself and your special occasion</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.buyerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyerName: e.target.value }))}
                  className="w-full p-3 border border-neutral-ash/20 rounded-full focus:border-primary-peach-coral focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                  className="w-full p-3 border border-neutral-ash/20 rounded-full focus:border-primary-peach-coral focus:outline-none"
                  placeholder="+60 12-345 6789"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Gift className="w-4 h-4 inline mr-1" />
                  Occasion *
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                  className="w-full p-3 border border-neutral-ash/20 rounded-full focus:border-primary-peach-coral focus:outline-none"
                >
                  <option value="">Select an occasion</option>
                  {occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>{occasion}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Delivery Date *
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full p-3 border border-neutral-ash/20 rounded-full focus:border-primary-peach-coral focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Special Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-3 border border-neutral-ash/20 rounded-xl focus:border-primary-peach-coral focus:outline-none"
                rows={3}
                placeholder="Add a personal message for the recipient..."
              />
            </div>
            
            <div className="bg-neutral-soft-blush/50 p-4 rounded-xl">
              <h4 className="font-medium text-neutral-charcoal mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Colors:</strong> {formData.colors.join(', ')}</p>
                <p><strong>Flowers:</strong> {formData.flowers.map(id => flowers.find(f => f.id === id)?.name).join(', ')}</p>
                <p><strong>Fruits:</strong> {formData.fruits.filter(f => f.quantity > 0).map(f => `${fruits.find(fruit => fruit.id === f.id)?.name} (${f.quantity})`).join(', ')}</p>
                <p className="text-lg font-medium text-primary-peach-coral pt-2">
                  <strong>Total: RM{calculateEstimatedCost()}</strong>
                </p>
              </div>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-ash/20 flex-shrink-0">
              <div>
                <h2 className="text-xl font-display text-neutral-charcoal">Create Your Custom Arrangement</h2>
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
            <div className="px-6 py-4 bg-neutral-off-white flex-shrink-0">
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

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Disclaimer */}
              {currentStep === 1 && (
                <div className="mx-6 mt-4 p-4 bg-primary-peach-coral/10 border border-primary-peach-coral/20 rounded-xl">
                  <p className="text-sm text-primary-peach-coral font-medium">
                    ⚠️ Custom arrangements require 7-30 days advance notice for preparation
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="p-6 pb-8">
                {renderStepContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-neutral-ash/20 flex-shrink-0">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                icon={ChevronLeft}
                iconPosition="left"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext()}
                >
                  Submit Order
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomArrangementWizard;