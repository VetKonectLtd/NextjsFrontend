'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { VetKonnectLogo } from '@/app/assets/images';
import { 
  Send, 
  Facebook, 
  Instagram, 
  LinkedIn, 
  Pinterest, 
  X, 
  YouTube 
} from '@/app/assets/icons';

interface SocialLink {
  name: string;
  icon: any;
  href: string;
}

interface QuickLink {
  name: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', icon: LinkedIn, href: '#' },
  { name: 'X', icon: X, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: YouTube, href: '#' },
  { name: 'Pinterest', icon: Pinterest, href: '#' },
];

const quickLinks: QuickLink[] = [
  { name: 'About Us', href: '#' },
  { name: 'Feed Calculator', href: '#' },
  { name: 'Disease Predictor', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Chat Forum', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Logo and Company Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <Image 
                src={VetKonnectLogo} 
                alt="VetKonnect Logo" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900 font-nunito">
                Vetkonnect
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>Makurdi, Nigeria.</p>
              <p>hello@vkonnect.com | +2347078340106</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                </motion.a>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Copyright Vetkonnect {currentYear}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 font-nunito">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-2">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@example.com"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  required
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded-full flex items-center gap-3 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src={Send} 
                    alt="Submit" 
                    width={16} 
                    height={16}
                    className="w-4 h-4 filter"
                  />
                  <span className="text-white text-sm font-medium">Submit</span>
                </motion.button>
              </form>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              Subscribe to our newsletter for update on our initiatives
            </p>
            
            <div className="space-y-2 text-xs">
              <Link 
                href="#" 
                className="text-gray-500 hover:text-primary-600 transition-colors duration-200 block"
              >
                Privacy Policy
              </Link>
              <Link 
                href="#" 
                className="text-gray-500 hover:text-primary-600 transition-colors duration-200 block"
              >
                Terms & Conditions
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}
