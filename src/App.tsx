import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import VideoReels from './components/Sections/VideoReels';
import ProductShowcase from './components/Sections/ProductShowcase';
import CartSlideOut from './components/Cart/CartSlideOut';
import WhatsAppButton from './components/FloatingElements/WhatsAppButton';
import CustomArrangementWizard from './components/Modals/CustomArrangementWizard';
import FullCataloguePage from './components/Pages/FullCataloguePage';
import FavoritesPage from './components/Pages/FavoritesPage';
import MyPurchasesPage from './components/Pages/MyPurchasesPage';
import AdminDashboard from './components/Pages/AdminDashboard';
import PaymentConfirmationPage from './components/Pages/PaymentConfirmationPage';
import OrderTrackingPage from './components/Pages/OrderTrackingPage';
import { useStore } from './store/useStore';
import { mockProducts } from './data/mockData';
import { Order } from './types';

function App() {
  const { setProducts, auth } = useStore();
  const [showCustomWizard, setShowCustomWizard] = React.useState(false);
  const [showFullCatalogue, setShowFullCatalogue] = React.useState(false);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [showMyPurchases, setShowMyPurchases] = React.useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState(window.location.pathname);
  const [orders, setOrders] = React.useState<Order[]>([]);

  useEffect(() => {
    // Initialize products in store
    setProducts(mockProducts);
    
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('fruitbasket_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [setProducts]);

  // Handle route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const scrollToCollection = () => {
    const element = document.getElementById('catalogue');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If showing full catalogue, render that page instead
  if (showFullCatalogue) {
    return (
      <FullCataloguePage onBackToHome={() => setShowFullCatalogue(false)} />
    );
  }

  // If showing search, render full catalogue page with search focused
  if (showSearch) {
    return (
      <FullCataloguePage onBackToHome={() => setShowSearch(false)} focusSearch={true} />
    );
  }

  // If showing favorites, render that page instead
  if (showFavorites) {
    return (
      <FavoritesPage onBackToHome={() => setShowFavorites(false)} />
    );
  }

  // If showing my purchases, render that page instead
  if (showMyPurchases) {
    return (
      <MyPurchasesPage onBackToHome={() => setShowMyPurchases(false)} />
    );
  }

  // Debug logging
  console.log('App render:', {
    isAuthenticated: auth.isAuthenticated,
    userRole: auth.user?.role,
    currentRoute,
    showAdminDashboard
  });

  // Handle payment confirmation page
  if (currentRoute.startsWith('/payment-confirmation/')) {
    const orderId = currentRoute.split('/')[2];
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
      return (
        <PaymentConfirmationPage
          order={order}
          onBackToHome={() => {
            window.history.pushState({}, '', '/');
            setCurrentRoute('/');
          }}
        />
      );
    }
  }

  // Handle order tracking page
  if (currentRoute === '/orders' && auth.isAuthenticated && auth.user?.role === 'admin') {
    return (
      <OrderTrackingPage
        onBackToHome={() => {
          window.history.pushState({}, '', '/');
          setCurrentRoute('/');
        }}
        onNavigateToAdmin={() => {
          window.history.pushState({}, '', '/admin');
          setCurrentRoute('/admin');
        }}
      />
    );
  }

  // If showing admin settings, render that page instead
  if (showAdminDashboard || (auth.isAuthenticated && auth.user?.role === 'admin' && currentRoute === '/admin')) {
    console.log('Rendering admin settings');
    return (
      <AdminDashboard 
        onBackToHome={() => {
          setShowAdminDashboard(false);
          window.history.pushState({}, '', '/');
          setCurrentRoute('/');
        }}
        onNavigateToOrders={() => {
          window.history.pushState({}, '', '/orders');
          setCurrentRoute('/orders');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-off-white">
      {/* Header */}
      <Header 
        onShowFullCatalogue={() => setShowFullCatalogue(true)} 
        onShowFavorites={() => setShowFavorites(true)} 
        onShowMyPurchases={() => setShowMyPurchases(true)} 
        onShowSearch={() => setShowSearch(true)} 
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Video Reels */}
        <VideoReels />

        {/* Product Showcase */}
        <ProductShowcase onShowFullCatalogue={() => setShowFullCatalogue(true)} />

        {/* Social Proof Section */}
        <section className="py-20 bg-gradient-to-br from-neutral-soft-blush to-neutral-off-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-display text-neutral-charcoal mb-4">
                Gifts that make hearts full
              </h2>
              <p className="text-lg text-neutral-ash max-w-2xl mx-auto">
                Real stories from customers who chose to create magical moments
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The most beautiful surprise I've ever received. Made my birthday unforgettable! 🥺",
                  author: "Sarah M.",
                  occasion: "Birthday surprise"
                },
                {
                  quote: "Quality beyond expectations. The fruits were so fresh and the flowers lasted for weeks.",
                  author: "Ahmad K.",
                  occasion: "Anniversary gift"
                },
                {
                  quote: "Perfect for corporate gifts. Our clients were impressed and it reflected well on us.",
                  author: "Lisa T.",
                  occasion: "Corporate gifting"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <p className="text-neutral-charcoal mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-neutral-charcoal">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-neutral-ash">
                        {testimonial.occasion}
                      </p>
                    </div>
                    <div className="flex text-primary-coral">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-peach-coral to-primary-deep-green text-white">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-display mb-4">
                Ready to create something beautiful?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands who've chosen to make moments memorable with our handcrafted arrangements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => setShowCustomWizard(true)}
                  className="bg-white text-primary-peach-coral px-8 py-4 rounded-lg font-medium text-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Customising
                </motion.button>
                <motion.button
                  onClick={scrollToCollection}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-primary-peach-coral transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Express
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <WhatsAppButton />
      <CartSlideOut />
      
      {/* Custom Arrangement Wizard */}
      <CustomArrangementWizard 
        isOpen={showCustomWizard} 
        onClose={() => setShowCustomWizard(false)} 
      />
    </div>
  );
}

export default App;