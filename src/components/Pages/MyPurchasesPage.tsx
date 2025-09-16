import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Calendar, MapPin, CreditCard, Eye, Filter, Search, X, Clock, User, Phone } from 'lucide-react';
import { Order } from '../../types';
import { useStore } from '../../store/useStore';
import Button from '../UI/Button';

interface MyPurchasesPageProps {
  onBackToHome: () => void;
}

const MyPurchasesPage: React.FC<MyPurchasesPageProps> = ({ onBackToHome }) => {
  const { auth } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data - in a real app, this would come from an API
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'FB-2024-001',
      customerId: auth.user?.id || '1',
      customerEmail: auth.user?.email || 'customer@example.com',
      customerName: auth.user?.name || 'Customer',
      customerPhone: '+60123456789',
      isGuest: false,
      items: [
        {
          productId: '1',
          quantity: 1,
          customizations: {
            colors: ['#FF6B6B', '#4ECDC4'],
            flowers: ['Rose', 'Lily'],
            fruits: [{ id: 'apple', quantity: 3 }],
            budget: 100,
            message: 'Happy Birthday!'
          }
        }
      ],
      subtotal: 89,
      deliveryFee: 15,
      total: 104,
      deliveryAddress: {
        name: 'John Doe',
        phone: '+60123456789',
        address: '123 Main Street',
        city: 'Kuala Lumpur',
        postcode: '50000',
        state: 'Kuala Lumpur',
        specialInstructions: 'Leave at front door'
      },
      deliveryDate: '2024-01-20',
      deliveryTime: '14:00-16:00',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'confirmed',
      orderStatus: 'delivered',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T15:30:00Z',
      notes: 'Delivered successfully'
    },
    {
      id: '2',
      orderNumber: 'FB-2024-002',
      customerId: auth.user?.id || '1',
      customerEmail: auth.user?.email || 'customer@example.com',
      customerName: auth.user?.name || 'Customer',
      customerPhone: '+60123456789',
      isGuest: false,
      items: [
        {
          productId: '2',
          quantity: 1
        }
      ],
      subtotal: 129,
      deliveryFee: 15,
      total: 144,
      deliveryAddress: {
        name: 'John Doe',
        phone: '+60123456789',
        address: '123 Main Street',
        city: 'Kuala Lumpur',
        postcode: '50000',
        state: 'Kuala Lumpur'
      },
      deliveryDate: '2024-01-25',
      deliveryTime: '10:00-12:00',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      orderStatus: 'payment_pending',
      createdAt: '2024-01-22T14:20:00Z',
      updatedAt: '2024-01-22T14:20:00Z'
    }
  ]);

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusOptions = [
    { value: 'All', label: 'All Orders' },
    { value: 'payment_pending', label: 'Payment Pending' },
    { value: 'order_confirmed', label: 'Confirmed' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.orderStatus === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.productId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, statusFilter, searchQuery]);

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'payment_pending':
        return 'bg-amber-100 text-amber-800';
      case 'order_confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Order['orderStatus']) => {
    switch (status) {
      case 'payment_pending':
        return 'Payment Pending';
      case 'order_confirmed':
        return 'Confirmed';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-MY', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  if (orders.length === 0) {
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
                  <h1 className="text-3xl font-display text-neutral-charcoal">My Purchases</h1>
                  <p className="text-neutral-ash">Track your orders and delivery status</p>
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
              <Package className="w-16 h-16 text-primary-peach-coral" />
            </div>
            <h2 className="text-2xl font-display text-neutral-charcoal mb-4">No Orders Yet</h2>
            <p className="text-neutral-ash mb-8 max-w-md mx-auto">
              You haven't made any purchases yet. Start exploring our beautiful fruit baskets and arrangements.
            </p>
            <Button onClick={onBackToHome} size="lg">
              Start Shopping
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
                <h1 className="text-3xl font-display text-neutral-charcoal">My Purchases</h1>
                <p className="text-neutral-ash">
                  {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-ash/20">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-ash w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-ash/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-peach-coral/50 focus:border-primary-peach-coral"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-neutral-ash" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-neutral-ash/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-peach-coral/50 focus:border-primary-peach-coral"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-neutral-ash/20 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-neutral-ash/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-charcoal">
                      Order #{order.orderNumber}
                    </h3>
                    <p className="text-sm text-neutral-ash">
                      Placed on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                      {getStatusLabel(order.orderStatus)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Items */}
                  <div>
                    <h4 className="font-medium text-neutral-charcoal mb-2 flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-neutral-ash">
                          <span className="font-medium">Product {item.productId}</span>
                          <span className="ml-2">× {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery */}
                  <div>
                    <h4 className="font-medium text-neutral-charcoal mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Delivery
                    </h4>
                    <div className="text-sm text-neutral-ash space-y-1">
                      <p>{order.deliveryAddress.name}</p>
                      <p>{order.deliveryAddress.address}</p>
                      <p>{order.deliveryAddress.city}, {order.deliveryAddress.postcode}</p>
                      <p className="flex items-center mt-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(order.deliveryDate)} • {order.deliveryTime}
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h4 className="font-medium text-neutral-charcoal mb-2 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment
                    </h4>
                    <div className="text-sm text-neutral-ash space-y-1">
                      <p>RM{order.total.toFixed(2)}</p>
                      <p className="capitalize">{order.paymentMethod.replace('_', ' ')}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentStatus === 'confirmed' ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-display text-neutral-charcoal">Order Details</h3>
                  <p className="text-neutral-ash">Order #{selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-neutral-ash hover:text-neutral-charcoal transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Order Info */}
                <div className="space-y-6">
                  {/* Order Status */}
                  <div className="bg-neutral-off-white p-4 rounded-lg">
                    <h4 className="font-semibold text-neutral-charcoal mb-3 flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Order Status
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.orderStatus)}`}>
                        {getStatusLabel(selectedOrder.orderStatus)}
                      </span>
                      <span className="text-sm text-neutral-ash">
                        {formatDate(selectedOrder.createdAt)} at {formatTime(selectedOrder.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-neutral-off-white p-4 rounded-lg">
                    <h4 className="font-semibold text-neutral-charcoal mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-ash">Subtotal:</span>
                        <span className="font-medium">RM{selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-ash">Delivery Fee:</span>
                        <span className="font-medium">RM{selectedOrder.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-neutral-ash/20 pt-2">
                        <span className="font-semibold text-neutral-charcoal">Total:</span>
                        <span className="font-semibold text-primary-peach-coral">RM{selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-neutral-ash">Payment Method:</span>
                        <span className="capitalize">{selectedOrder.paymentMethod.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-ash">Payment Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedOrder.paymentStatus === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {selectedOrder.paymentStatus === 'confirmed' ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-neutral-off-white p-4 rounded-lg">
                    <h4 className="font-semibold text-neutral-charcoal mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Delivery Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <User className="w-4 h-4 mr-2 mt-0.5 text-neutral-ash" />
                        <div>
                          <p className="font-medium text-neutral-charcoal">{selectedOrder.deliveryAddress.name}</p>
                          <p className="text-neutral-ash">{selectedOrder.deliveryAddress.address}</p>
                          <p className="text-neutral-ash">{selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.postcode}</p>
                          <p className="text-neutral-ash">{selectedOrder.deliveryAddress.state}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-neutral-ash" />
                        <span className="text-neutral-ash">{selectedOrder.deliveryAddress.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-neutral-ash" />
                        <span className="text-neutral-ash">
                          {formatDate(selectedOrder.deliveryDate)} • {selectedOrder.deliveryTime}
                        </span>
                      </div>
                      {selectedOrder.deliveryAddress.specialInstructions && (
                        <div className="mt-3 p-3 bg-primary-light-peach rounded-lg">
                          <p className="text-sm text-neutral-charcoal">
                            <span className="font-medium">Special Instructions:</span><br />
                            {selectedOrder.deliveryAddress.specialInstructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Items */}
                <div className="space-y-6">
                  {/* Order Items */}
                  <div className="bg-neutral-off-white p-4 rounded-lg">
                    <h4 className="font-semibold text-neutral-charcoal mb-3 flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Order Items ({selectedOrder.items.length})
                    </h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-neutral-ash/10">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-neutral-charcoal">Product {item.productId}</span>
                            <span className="text-sm text-neutral-ash">× {item.quantity}</span>
                          </div>
                          
                          {item.customizations && (
                            <div className="text-sm text-neutral-ash space-y-1">
                              {item.customizations.colors && item.customizations.colors.length > 0 && (
                                <div>
                                  <span className="font-medium">Colors: </span>
                                  <span>{item.customizations.colors.join(', ')}</span>
                                </div>
                              )}
                              {item.customizations.flowers && item.customizations.flowers.length > 0 && (
                                <div>
                                  <span className="font-medium">Flowers: </span>
                                  <span>{item.customizations.flowers.join(', ')}</span>
                                </div>
                              )}
                              {item.customizations.fruits && item.customizations.fruits.length > 0 && (
                                <div>
                                  <span className="font-medium">Fruits: </span>
                                  <span>{item.customizations.fruits.map(f => `${f.id} (${f.quantity})`).join(', ')}</span>
                                </div>
                              )}
                              {item.customizations.budget && (
                                <div>
                                  <span className="font-medium">Budget: </span>
                                  <span>RM{item.customizations.budget}</span>
                                </div>
                              )}
                              {item.customizations.message && (
                                <div className="mt-2 p-2 bg-primary-light-peach rounded">
                                  <span className="font-medium">Message: </span>
                                  <span>"{item.customizations.message}"</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Notes */}
                  {selectedOrder.notes && (
                    <div className="bg-neutral-off-white p-4 rounded-lg">
                      <h4 className="font-semibold text-neutral-charcoal mb-3 flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Order Notes
                      </h4>
                      <p className="text-sm text-neutral-ash">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyPurchasesPage;
