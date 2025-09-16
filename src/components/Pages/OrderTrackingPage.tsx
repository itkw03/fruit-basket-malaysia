import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Clock, Package, RefreshCw, Settings, CheckCircle, Truck, XCircle, CreditCard } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Order } from '../../types';
import Button from '../UI/Button';
import OrderDetailsModal from '../Modals/OrderDetailsModal';

interface OrderTrackingPageProps {
  onBackToHome: () => void;
  onNavigateToAdmin?: () => void;
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ onBackToHome, onNavigateToAdmin }) => {
  const { auth } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: 0, icon: Package, color: 'bg-gray-500', bgColor: 'bg-gray-100' },
    { value: 'payment_pending', label: 'Payment Pending', count: 0, icon: CreditCard, color: 'bg-yellow-500', bgColor: 'bg-yellow-100' },
    { value: 'order_confirmed', label: 'Order Confirmed', count: 0, icon: CheckCircle, color: 'bg-blue-500', bgColor: 'bg-blue-100' },
    { value: 'out_for_delivery', label: 'Out for Delivery', count: 0, icon: Truck, color: 'bg-orange-500', bgColor: 'bg-orange-100' },
    { value: 'delivered', label: 'Delivered', count: 0, icon: CheckCircle, color: 'bg-green-500', bgColor: 'bg-green-100' },
    { value: 'cancelled', label: 'Cancelled', count: 0, icon: XCircle, color: 'bg-red-500', bgColor: 'bg-red-100' }
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('fruitbasket_orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
      setFilteredOrders(parsedOrders);
    }
  };

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchTerm]);


  const handleUpdateOrder = (orderId: string, updates: Partial<Order>) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, ...updates }
        : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('fruitbasket_orders', JSON.stringify(updatedOrders));
  };

  const getStatusIcon = (status: Order['orderStatus']) => {
    switch (status) {
      case 'payment_pending':
        return <CreditCard className="w-5 h-5 text-yellow-500" />;
      case 'order_confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'payment_pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'order_confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'out_for_delivery':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatOrderItems = (order: Order) => {
    return order.items.map((item, index) => `Item ${index + 1} x${item.quantity}`).join(', ');
  };

  // Check if user is admin
  if (!auth.isAuthenticated || auth.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-neutral-charcoal mb-4">Access Denied</h1>
          <p className="text-neutral-ash mb-6">You need admin privileges to access this page.</p>
          <Button onClick={onBackToHome}>Back to Home</Button>
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
            <div>
              <h1 className="text-3xl font-display text-neutral-charcoal">Order Tracking</h1>
              <p className="text-neutral-ash">Monitor and manage all customer orders</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={loadOrders}
                icon={RefreshCw}
              >
                Refresh
              </Button>
              {onNavigateToAdmin && (
                <Button variant="outline" onClick={onNavigateToAdmin} icon={Settings}>
                  Admin Settings
                </Button>
              )}
              <Button variant="outline" onClick={onBackToHome}>
                Back to Site
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Summary Stats - moved to top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {statusOptions.slice(1).map((status) => {
            const count = orders.filter(order => order.orderStatus === status.value).length;
            const IconComponent = status.icon;
            return (
              <motion.button
                key={status.value}
                onClick={() => setSelectedStatus(selectedStatus === status.value ? 'all' : status.value)}
                className={`relative py-6 px-4 rounded-xl border transition-all hover:shadow-lg overflow-hidden ${
                  selectedStatus === status.value
                    ? 'bg-primary-peach-coral border-primary-peach-coral shadow-lg'
                    : 'bg-white border-neutral-ash/20 hover:border-primary-peach-coral/50 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image */}
                <div className="absolute right-0 top-0 h-full w-24 pointer-events-none">
                  <img
                    src={
                      status.value === 'payment_pending' ? '/Generated Images/malaysian-man-making-online-payment.png' :
                      status.value === 'out_for_delivery' ? '/Generated Images/malaysian-lalamove-rider-thumbs-up.png' :
                      status.value === 'delivered' ? '/Generated Images/malaysian-woman-receiving-fruit-basket.png' :
                      status.value === 'cancelled' ? '/Generated Images/malaysian-woman-sad.png' :
                      '/Generated Images/malaysian-woman-holding-fruit-basket-removebg.png'
                    }
                    alt={`${status.label} illustration`}
                    className="h-full w-full object-cover object-right"
                  />
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 pr-8 flex flex-col items-start">
                  {/* Icon */}
                  <div className={`mb-2 ${
                    selectedStatus === status.value 
                      ? 'text-white'
                      : 'text-primary-peach-coral'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  {/* Count */}
                  <div className={`text-2xl font-bold mb-1 ${
                    selectedStatus === status.value 
                      ? 'text-white'
                      : 'text-primary-peach-coral'
                  }`}>
                    {count}
                  </div>
                  
                  {/* Label */}
                  <div className={`text-sm font-medium text-left leading-tight ${
                    selectedStatus === status.value 
                      ? 'text-white'
                      : 'text-neutral-charcoal'
                  }`}>
                    {status.value === 'out_for_delivery' ? (
                      <>
                        <div>Out for</div>
                        <div>Delivery</div>
                      </>
                    ) : (
                      status.label.split(' ').map((word, index) => (
                        <div key={index}>{word}</div>
                      ))
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-xl border border-neutral-ash/20 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-ash w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by order number, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="lg:w-64">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border border-neutral-ash/20 rounded-lg focus:border-primary-orange focus:outline-none"
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

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-neutral-ash/20 text-center">
              <Package className="w-12 h-12 text-neutral-ash mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-charcoal mb-2">No Orders Found</h3>
              <p className="text-neutral-ash">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'No orders match your current filters.'
                  : 'No orders have been placed yet.'
                }
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                className="bg-white p-6 rounded-xl border border-neutral-ash/20 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.orderStatus)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-charcoal">#{order.orderNumber}</h3>
                        <p className="text-sm text-neutral-ash">
                          {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-neutral-charcoal">Customer</p>
                        <p className="text-neutral-ash">{order.customerName}</p>
                        <p className="text-neutral-ash">{order.customerEmail}</p>
                        {order.isGuest && (
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mt-1">
                            Guest
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-neutral-charcoal">Items</p>
                        <p className="text-neutral-ash">{formatOrderItems(order)}</p>
                        <p className="text-neutral-ash">{order.items.length} item(s)</p>
                      </div>

                      <div>
                        <p className="font-medium text-neutral-charcoal">Delivery</p>
                        <p className="text-neutral-ash">{order.deliveryAddress.name}</p>
                        <p className="text-neutral-ash">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                        <p className="text-neutral-ash">{order.deliveryTime}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="font-semibold text-primary-orange text-lg">RM{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:min-w-[200px]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderDetails(true);
                      }}
                      icon={Eye}
                    >
                      View Details
                    </Button>

                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={showOrderDetails}
        onClose={() => {
          setShowOrderDetails(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onUpdateOrder={handleUpdateOrder}
        onRefresh={loadOrders}
      />
    </div>
  );
};

export default OrderTrackingPage;
