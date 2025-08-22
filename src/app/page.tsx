'use client';

import { Search } from 'lucide-react';
import Image from 'next/image';
import CountryFlags from '@/components/homeComponents/CountryFlags';
import { motion } from 'framer-motion';
import { GooglePlay, AppStore, LocationIcon, CtaImage, SecondCtaImage, ThirdCtaImage, HeroBg } from '@/app/assets/images';
import { Marker, Green } from '@/app/assets/icons';
import RotatingGlobe from '@/components/homeComponents/RotatingGlobe';
import { NearYou, CallToAction, CTASlider, FeedCalculatorSection, ChatForumSection, TestimonialsSection, StatisticsSection } from '@/components/homeComponents';
import { Footer } from '@/components/shared';
import { div } from 'framer-motion/client';
import { Button } from '@/components/ui/button';

export default function Home() {
  // CTA data configuration
  const ctaData = [
    {
      backgroundClass: 'bg-cream',
      image: CtaImage,
      locationIcon: LocationIcon,
      heading: 'Connect with an Animal Health Professional',
      description: 'Easily connect with Veterinarians and Paraprofessionals near you.',
      isReversed: false,
      showOpenStatus: true,
      showLocationIcon: true,
    },
    {
      backgroundClass: 'bg-purple',
      image: SecondCtaImage,
      locationIcon: LocationIcon,
      heading: 'Locate Veterinary Clinic',
      description: 'Access Veterinary clinics near you for your pets and livestock',
      isReversed: true,
      showOpenStatus: true,
      showLocationIcon: true,
    },
    {
      backgroundClass: 'bg-cream',
      image: ThirdCtaImage,
      locationIcon: LocationIcon,
      heading: 'Connect to Vendors',
      description: 'Connect to a pool of vendors for all of your animal needs or sell easily.',
      isReversed: false,
      showOpenStatus: true,
      showLocationIcon: true,
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero section */}
      <div className="relative min-h-screen overflow-hidden overflow-x-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HeroBg}
            alt="Hero background"
            fill
            className="object-cover md:object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        </div>

        {/* Mobile Globe - positioned at top, cut in half */}
        <div className="lg:hidden relative z-10 h-64 overflow-hidden mt-16">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-96">
            <RotatingGlobe />
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-grow flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Content */}
                <div className="text-center lg:text-left lg:mt-0">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-nunito font-black text-gray-900 mb-6 leading-tight">
                    Quality animal care at your fingertips
                  </h1>
                  <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0">
                    Making animal care available and accessible to everyone everywhere. <span className="font-medium text-green-400">Download on</span>
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start sm:justify-between gap-4 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Image src={GooglePlay} alt="Google Play" className="cursor-pointer" width={150} height={50} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Image src={AppStore} alt="App Store" className="cursor-pointer" width={150} height={50} />
                    </motion.button>
                  </div>

                  <div className="relative max-w-xs sm:max-w-md mx-auto lg:mx-0">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Image src={Marker} alt="Location marker" className="h-5 w-5" width={20} height={20} />
                    </div>
                    <input
                      type="text"
                      className="search-bar block w-full pl-12 pr-14 py-4 bg-white/80 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                      placeholder="Type in your location"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button className="p-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white transition-colors">
                        <Search className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <CountryFlags />
                </div>

                {/* Right side - Globe visualization */}
                <div className="relative hidden lg:block">
                  <div className="w-full max-w-5xl mx-auto">
                    <RotatingGlobe />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Near you section */}
      <section className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NearYou />
        </div>
      </section>

      {/* Call to action sections */}
      <CTASlider ctaData={ctaData} />

      {/* Feed Calculator & Disease Predictor Section */}
      <FeedCalculatorSection />

      {/* Chat Forum Section */}
      <ChatForumSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Footer */}
      <Footer />

    </div>
  );
}

