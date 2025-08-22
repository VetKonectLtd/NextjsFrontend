'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VetKonnectLogo } from '@/app/assets/images';
import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, Bars3Icon, UserIcon, InformationCircleIcon, CalculatorIcon, HeartIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, LanguageIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${isScrolled
          ? 'shadow-md bg-gradient-to-r from-[#B2F6B9] via-[#FFE1A6] to-[#E9F6B2]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center w-full max-w-full overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 min-w-0">
            <div className="h-12 w-auto">
              <Image
                src={VetKonnectLogo}
                alt="VetKonnect Logo"
                width={180}
                height={50}
                className="h-full w-auto max-w-[120px] sm:max-w-[180px]"
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
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-shrink-0">
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
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
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
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 md:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link href="/" className="flex items-center">
                <Image
                  src={VetKonnectLogo}
                  alt="VetKonnect Logo"
                  width={180}
                  height={50}
                  className="h-full w-auto max-w-[120px] sm:max-w-[180px]"
                  priority
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="p-6 space-y-2">
              {/* Login/Signup */}
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 bg-gray-150 border border-gray-225 shadow-active-link transition-colors"
              >
                <UserIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Login / Signup</span>
              </Link>

              {/* Home */}
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <HomeIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Home</span>
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <InformationCircleIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">About Us</span>
              </Link>

              {/* Feed Calculator */}
              <Link
                href="/feed-calculator"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <CalculatorIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Feed Calculator</span>
              </Link>

              {/* Disease Predictor */}
              <Link
                href="/disease-predictor"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <HeartIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Disease Predictor</span>
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <DocumentTextIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Blog</span>
              </Link>

              {/* Chat Forum */}
              <Link
                href="/chat-forum"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Chat Forum</span>
              </Link>

              {/* Language Option */}
              <div className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors cursor-pointer">
                <LanguageIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Language Option</span>
              </div>

              {/* Customer Support */}
              <Link
                href="/support"
                onClick={closeMobileMenu}
                className="flex items-center px-4 py-4 rounded-2xl text-gray-700 hover:bg-gray-150 hover:border hover:border-gray-225 hover:shadow-active-link transition-colors"
              >
                <PhoneIcon className="w-6 h-6 mr-4" />
                <span className="text-base font-medium">Customer Support</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;