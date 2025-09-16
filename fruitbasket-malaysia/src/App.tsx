import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import VideoReels from './components/Sections/VideoReels';
import ProductShowcase from './components/Sections/ProductShowcase';
import CartSlideOut from './components/Cart/CartSlideOut';
import WhatsAppButton from './components/FloatingElements/WhatsAppButton';
import { useStore } from './store/useStore';
import { mockProducts } from './data/mockData';

function App() {
  const { setProducts } = useStore();

  useEffect(() => {
    // Initialize products in store
    setProducts(mockProducts);
  }, [setProducts]);

  return (
    <div className="min-h-screen bg-neutral-off-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Video Reels */}
        <VideoReels />

        {/* Product Showcase */}
        <ProductShowcase />

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
        <section className="py-20 bg-gradient-to-r from-primary-orange to-primary-coral text-white">
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
                  className="bg-white text-primary-orange px-8 py-4 rounded-lg font-medium text-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Customising
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-primary-orange transition-all"
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
    </div>
  );
}

export default App;