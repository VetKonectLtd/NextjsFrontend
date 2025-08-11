'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VetKonnectLogo } from '@/app/assets/images';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'shadow-md bg-gradient-to-r from-[#B2F6B9] via-[#FFE1A6] to-[#E9F6B2]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="h-12 w-auto">
              <Image 
                src={VetKonnectLogo} 
                alt="VetKonnect Logo" 
                width={180}
                height={50}
                className="h-full w-auto"
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/about" 
              className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
            >
              About Us
            </Link>
            <Link 
              href="/feed-calculator" 
              className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
            >
              Feed Calculator
            </Link>
            <Link 
              href="/disease-predictor" 
              className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
            >
              Disease Predictor
            </Link>
            <Link 
              href="/blog" 
              className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
            >
              Blog
            </Link>
            <Link 
              href="/chat-forum" 
              className="px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-green-600"
            >
              Chat Forum
            </Link>
          </div>
          
          {/* Right-side Icons */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="flex items-center cursor-pointer transition-colors text-gray-800 hover:text-green-600">
              <span className="text-sm font-medium">EN</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Menu Button (visible on mobile) */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 transition-colors text-gray-800 hover:text-green-600"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
            
            {/* User Profile */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors bg-gray-100 text-gray-700 hover:bg-green-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-72 shadow-xl z-50 md:hidden overflow-y-auto"
            style={{
              background: 'linear-gradient(90deg, var(--tw-gradient-stops))',
              '--tw-gradient-from': '#B2F6B9',
              '--tw-gradient-via': '#FFE1A6',
              '--tw-gradient-to': '#E9F6B2',
              '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-via) 50%, var(--tw-gradient-to)'
            } as React.CSSProperties}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <div className="h-8 w-auto">
                  <Image 
                    src={VetKonnectLogo} 
                    alt="VetKonnect Logo" 
                    width={120} 
                    height={32}
                    className="h-full w-auto"
                    priority
                  />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-800">VetKonnect</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              <Link 
                href="/about" 
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <span className="text-base font-medium">About Us</span>
              </Link>
              <Link 
                href="/feed-calculator" 
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <span className="text-base font-medium">Feed Calculator</span>
              </Link>
              <Link 
                href="/disease-predictor" 
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <span className="text-base font-medium">Disease Predictor</span>
              </Link>
              <Link 
                href="/blog" 
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <span className="text-base font-medium">Blog</span>
              </Link>
              <Link 
                href="/chat-forum" 
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <span className="text-base font-medium">Chat Forum</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
