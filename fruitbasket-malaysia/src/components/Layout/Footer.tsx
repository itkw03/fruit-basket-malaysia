import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-charcoal text-neutral-off-white">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="p-3 bg-neutral-off-white/10 rounded-full hover:bg-primary-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 bg-neutral-off-white/10 rounded-full hover:bg-primary-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="p-3 bg-neutral-off-white/10 rounded-full hover:bg-primary-orange transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl mb-6 text-neutral-off-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#catalogue" className="text-neutral-ash hover:text-primary-orange transition-colors">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="text-neutral-ash hover:text-primary-orange transition-colors">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#seasonal" className="text-neutral-ash hover:text-primary-orange transition-colors">
                  Seasonal
                </a>
              </li>
              <li>
                <a href="#corporate" className="text-neutral-ash hover:text-primary-orange transition-colors">
                  Corporate
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl mb-6 text-neutral-off-white">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-primary-orange" />
                <span className="text-neutral-ash">WhatsApp Chat</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-orange" />
                <span className="text-neutral-ash">hello@fruitbasket.my</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-orange" />
                <span className="text-neutral-ash">+60 12-345 6789</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-ash/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-ash text-sm">
              © 2024 FruitBasket Malaysia. Made with ❤️ in Kuala Lumpur.
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