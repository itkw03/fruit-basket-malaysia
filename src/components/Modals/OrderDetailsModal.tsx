import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, User, MapPin, Calendar, Clock, CreditCard, Phone, Mail, CheckCircle, MessageSquare, Truck, XCircle } from 'lucide-react';
import { Order } from '../../types';
import { mockProducts } from '../../data/mockData';
import Button from '../UI/Button';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateOrder?: (orderId: string, updates: Partial<Order>) => void;
  onRefresh?: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, onClose, order, onUpdateOrder, onRefresh }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Order['orderStatus']>('order_confirmed');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!order) return null;

  const getProductById = (id: string) => mockProducts.find(p => p.id === id);

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'payment_pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'order_confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatOrderItems = () => {
    return order.items.map((item, index) => {
      const product = getProductById(item.productId);
      return {
        name: product?.title || `Product ${index + 1}`,
        quantity: item.quantity,
        price: product?.price || 0,
        total: (product?.price || 0) * item.quantity,
        image: product?.images?.[0] || null
      };
    });
  };

  const orderItems = formatOrderItems();

  const handleMarkPaymentReceived = async () => {
    if (!onUpdateOrder) return;
    
    setIsLoading(true);
    try {
      onUpdateOrder(order.id, {
        paymentStatus: 'confirmed',
        orderStatus: 'order_confirmed',
        updatedAt: new Date().toISOString()
      });
      
      // Show success message
      alert('Payment marked as received! Order status updated to "Order Confirmed".');
      
      // Refresh the orders list
      if (onRefresh) {
        onRefresh();
      }
      
      // Close the modal
      onClose();
    } catch (error) {
      alert('Error updating payment status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateToOutForDelivery = async () => {
    if (!onUpdateOrder) return;
    
    setIsLoading(true);
    try {
      onUpdateOrder(order.id, {
        orderStatus: 'out_for_delivery',
        updatedAt: new Date().toISOString()
      });
      
      alert('Order status updated to "Out for Delivery".');
      
      // Refresh the orders list
      if (onRefresh) {
        onRefresh();
      }
      
      // Close the modal
      onClose();
    } catch (error) {
      alert('Error updating order status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsDelivered = async () => {
    if (!onUpdateOrder) return;
    
    setIsLoading(true);
    try {
      onUpdateOrder(order.id, {
        orderStatus: 'delivered',
        updatedAt: new Date().toISOString()
      });
      
      alert('Order marked as "Delivered".');
      
      // Refresh the orders list
      if (onRefresh) {
        onRefresh();
      }
      
      // Close the modal
      onClose();
    } catch (error) {
      alert('Error updating order status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!onUpdateOrder) return;
    
    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      onUpdateOrder(order.id, {
        orderStatus: 'cancelled',
        updatedAt: new Date().toISOString()
      });
      
      alert('Order has been cancelled.');
      
      // Refresh the orders list
      if (onRefresh) {
        onRefresh();
      }
      
      // Close the modal
      onClose();
    } catch (error) {
      alert('Error cancelling order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!onUpdateOrder) return;
    
    setIsLoading(true);
    try {
      onUpdateOrder(order.id, {
        orderStatus: newStatus,
        updatedAt: new Date().toISOString()
      });
      
      setShowStatusModal(false);
      alert(`Order status updated to "${newStatus.replace('_', ' ')}"`);
    } catch (error) {
      alert('Error updating order status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCustomerUpdate = () => {
    setMessage('');
    setShowMessageModal(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert('Please enter a message to send to the customer.');
      return;
    }
    
    setIsLoading(true);
    try {
      // In a real app, this would send an email/SMS to the customer
      // For now, we'll just show a success message
      console.log('Sending message to customer:', {
        orderId: order.id,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        message: message
      });
      
      setShowMessageModal(false);
      alert('Customer update sent successfully!');
    } catch (error) {
      alert('Error sending customer update. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-ash/20">
              <div>
                <h2 className="text-2xl font-display text-neutral-charcoal">Order Details</h2>
                <p className="text-neutral-ash">Order #{order.orderNumber}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-soft-blush rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Order Information */}
                <div className="space-y-6">
                  {/* Order Status */}
                  <div className="bg-neutral-off-white p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-neutral-charcoal flex items-center">
                        <Package className="w-5 h-5 mr-2" />
                        Order Status
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-ash">Order Date</p>
                        <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-neutral-ash">Order Time</p>
                        <p className="font-medium">{new Date(order.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="bg-white border border-neutral-ash/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-neutral-charcoal flex items-center mb-4">
                      <User className="w-5 h-5 mr-2" />
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-neutral-ash mr-3" />
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-neutral-ash">
                            {order.isGuest ? 'Guest Customer' : 'Registered Customer'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-neutral-ash mr-3" />
                        <p className="text-sm">{order.customerEmail}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-neutral-ash mr-3" />
                        <p className="text-sm">{order.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="bg-white border border-neutral-ash/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-neutral-charcoal flex items-center mb-4">
                      <MapPin className="w-5 h-5 mr-2" />
                      Delivery Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">{order.deliveryAddress.name}</p>
                        <p className="text-sm text-neutral-ash">{order.deliveryAddress.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm">{order.deliveryAddress.address}</p>
                        <p className="text-sm">
                          {order.deliveryAddress.city}, {order.deliveryAddress.postcode}, {order.deliveryAddress.state}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-neutral-ash mr-2" />
                          <span className="text-sm">{new Date(order.deliveryDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-neutral-ash mr-2" />
                          <span className="text-sm">{order.deliveryTime}</span>
                        </div>
                      </div>
                      {order.deliveryAddress.specialInstructions && (
                        <div className="pt-2 border-t border-neutral-ash/20">
                          <p className="text-sm font-medium text-neutral-charcoal">Special Instructions:</p>
                          <p className="text-sm text-neutral-ash">{order.deliveryAddress.specialInstructions}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-white border border-neutral-ash/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-neutral-charcoal flex items-center mb-4">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-ash">Payment Method:</span>
                        <span className="font-medium">Bank Transfer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-ash">Payment Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          order.paymentStatus === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items & Summary */}
                <div className="space-y-6">
                  {/* Order Items */}
                  <div className="bg-white border border-neutral-ash/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-neutral-charcoal mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {orderItems.map((item, index) => (
                        <div key={index} className="flex items-center p-3 bg-neutral-off-white rounded-lg">
                          {/* Product Image */}
                          {item.image && (
                            <div className="w-16 h-16 mr-4 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-neutral-ash">Quantity: {item.quantity}</p>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <p className="font-medium">RM{item.total.toFixed(2)}</p>
                            <p className="text-sm text-neutral-ash">RM{item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white border border-neutral-ash/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-neutral-charcoal mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-ash">Subtotal:</span>
                        <span className="font-medium">RM{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-ash">Delivery Fee:</span>
                        <span className="font-medium">
                          {order.deliveryFee === 0 ? 'FREE' : `RM${order.deliveryFee.toFixed(2)}`}
                        </span>
                      </div>
                      {order.subtotal < 150 && order.deliveryFee > 0 && (
                        <p className="text-xs text-neutral-ash">
                          Add RM{(150 - order.subtotal).toFixed(2)} more for free delivery
                        </p>
                      )}
                      <div className="border-t border-neutral-ash/20 pt-3">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total:</span>
                          <span className="text-primary-orange">RM{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Notes */}
                  {order.notes && (
                    <div className="bg-white border border-neutral-ash/20 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-neutral-charcoal mb-4">Order Notes</h3>
                      <p className="text-neutral-ash">{order.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="bg-neutral-off-white p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-neutral-charcoal mb-4">Action</h3>
                    <div className="flex flex-col space-y-3">
                      {/* Payment Pending -> Order Confirmed */}
                      {order.orderStatus === 'payment_pending' && (
                        <Button 
                          className="w-full" 
                          onClick={handleMarkPaymentReceived}
                          disabled={isLoading}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Confirm Payment Received
                        </Button>
                      )}
                      
                      {/* Order Confirmed -> Out for Delivery */}
                      {order.orderStatus === 'order_confirmed' && (
                        <Button 
                          className="w-full" 
                          onClick={handleUpdateToOutForDelivery}
                          disabled={isLoading}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Out for Delivery
                        </Button>
                      )}
                      
                      {/* Out for Delivery -> Delivered */}
                      {order.orderStatus === 'out_for_delivery' && (
                        <Button 
                          className="w-full" 
                          onClick={handleMarkAsDelivered}
                          disabled={isLoading}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Delivered
                        </Button>
                      )}
                      
                      {/* Cancel button for all statuses except delivered */}
                      {order.orderStatus !== 'delivered' && (
                        <Button 
                          variant="outline" 
                          className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          onClick={handleCancelOrder}
                          disabled={isLoading}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Order
                        </Button>
                      )}
                      
                      {/* Send Customer Update - available for all statuses */}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleSendCustomerUpdate}
                        disabled={isLoading}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Customer Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-neutral-ash/20">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                Print Order
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Status Update Modal */}
      <AnimatePresence>
        {showStatusModal && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-neutral-charcoal mb-4">Update Order Status</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Order['orderStatus'])}
                  className="w-full p-3 border border-neutral-ash/30 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                >
                  <option value="payment_pending">Payment Pending</option>
                  <option value="order_confirmed">Order Confirmed</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowStatusModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleStatusUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-neutral-charcoal mb-4">Send Customer Update</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-charcoal mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message to the customer..."
                  className="w-full p-3 border border-neutral-ash/30 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent h-24 resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowMessageModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
