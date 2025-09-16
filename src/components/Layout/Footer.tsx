import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-charcoal text-neutral-off-white">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="text-left">
                <div className="flex items-center">
                  <span className="font-logo text-3xl text-primary-orange tracking-wider">
                    FRUITBASKET
                  </span>
                  <span className="font-logo text-3xl text-primary-coral tracking-wider ml-1">
                    
                  </span>
                </div>
                <div className="font-sans text-sm text-neutral-off-white font-medium tracking-wide -mt-1">
                  MALAYSIA
                </div>
              </div>
            </div>
            <p className="text-neutral-ash mb-6 max-w-md leading-relaxed">
              Flowers and fruit that make hearts full. Small acts, big feelings. 
              Made by hand with love for little moments that feel big.
            </p>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-neutral-off-white">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="https://www.instagram.com/fruitbasket.malaysia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-neutral-ash hover:text-primary-orange transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Instagram className="w-5 h-5 text-primary-orange" />
                  <span>Instagram</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://facebook.com/fruitbasketmalaysia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-neutral-ash hover:text-primary-orange transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Facebook className="w-5 h-5 text-primary-orange" />
                  <span>Facebook</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://wa.me/60123925913?text=Hi%2C%20I%20came%20across%20your%20website%20and%20I'm%20interested%20in%20your%20fruit%20baskets.%20Could%20you%20share%20more%20details%20with%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-neutral-ash hover:text-primary-orange transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <MessageCircle className="w-5 h-5 text-primary-orange" />
                  <span>WhatsApp</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-ash/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-ash text-sm">
              © 2025 FruitBasket Malaysia. Made with ❤️ in Kuala Lumpur.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-neutral-ash hover:text-primary-orange transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-neutral-ash hover:text-primary-orange transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-neutral-ash hover:text-primary-orange transition-colors">
                Delivery & Refund
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;