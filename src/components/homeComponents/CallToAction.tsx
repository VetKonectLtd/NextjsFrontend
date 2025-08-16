'use client';

import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CallToActionProps {
  backgroundClass: string;
  image: StaticImageData;
  locationIcon: StaticImageData;
  heading: string;
  description: string;
  isReversed?: boolean;
  showOpenStatus?: boolean;
  showLocationIcon?: boolean;
}

export default function CallToAction({
  backgroundClass,
  image,
  locationIcon,
  heading,
  description,
  isReversed = false,
  showOpenStatus = true,
  showLocationIcon = true,
}: CallToActionProps) {
  // Animation variants for left and right sides
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  const transitionConfig = {
    duration: 0.8
  };

  return (
    <section className={`py-16 ${backgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center gap-12 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={isReversed ? rightVariants : leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            transition={transitionConfig}
          >
            <div className="relative h-80 w-80">
              <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-primary-100">
                <Image 
                  src={image} 
                  alt="Call to action image" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              {showOpenStatus && (
                <div className="absolute top-16 -right-14 bg-white/95 px-8 py-1.5 rounded-[10px] text-sm font-medium text-gray-800 flex items-center gap-2 shadow-sm">
                  <div className="relative">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></div>
                  </div>
                  <span>Open</span>
                </div>
              )}
              {showLocationIcon && (
                <div className="absolute bottom-6 -left-12">
                  <Image 
                    src={locationIcon} 
                    alt="Location" 
                    width={100}
                    height={100}
                    className="drop-shadow-sm"
                  />
                </div>
              )}
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 space-y-6"
            variants={isReversed ? leftVariants : rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            transition={transitionConfig}
          >
            <h2 className="text-4xl font-bold text-gray-900 font-nunito max-w-md">{heading}</h2>
            <p className="text-lg text-gray-600 max-w-md">{description}</p>
            <Button className="px-6 py-3 bg-transparent border border-primary-600 hover:bg-primary-600 text-primary-600 font-medium rounded-lg transition-colors duration-200 ">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
