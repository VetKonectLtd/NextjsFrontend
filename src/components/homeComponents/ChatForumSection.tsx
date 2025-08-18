'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChatLikes, ChatMessage1, ChatMessage2, ChatImage } from '@/app/assets/images';

export default function ChatForumSection() {
  // Animation variants for left and right sides
  const leftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  // Chat animation variants - sequential appearance and disappearance
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 }
  };

  const transitionConfig = {
    duration: 0.8
  };

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Content Section */}
          <motion.div 
            className="md:w-1/2 space-y-6"
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            transition={transitionConfig}
          >
            <h2 className="text-4xl font-bold text-gray-900 font-nunito max-w-md">
              Chat Forum
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Join a growing community of animal owners and animal health professionals.
            </p>
            <Button className="px-6 py-3 border border-primary-600 bg-transparent hover:bg-primary-600 text-primary-600 hover:text-white font-medium rounded-lg transition-colors duration-200">
              Get Started
            </Button>
          </motion.div>

          {/* Animated Chat Section */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            transition={transitionConfig}
          >
            <div className="relative h-80 w-80">
              {/* Circular Chat Image */}
              <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-primary-100">
                <Image 
                  src={ChatImage} 
                  alt="Chat Forum" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>

              {/* Chat Likes - Top Right */}
              <motion.div
                className="absolute -top-16 -right-8 z-30"
                initial="hidden"
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                  y: [20, 0, 0, -20]
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src={ChatLikes}
                  alt="Chat Likes"
                  className="drop-shadow-lg"
                />
              </motion.div>

              {/* Chat Message 1 - Left Center */}
              <motion.div
                className="absolute top-1/3 -left-64 transform -translate-y-1/2 z-20"
                initial="hidden"
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                  y: [20, 0, 0, -20]
                }}
                transition={{
                  duration: 1.2,
                  delay: 1.8,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src={ChatMessage1}
                  alt="Chat Message 1"
                  className="drop-shadow-lg"
                />
              </motion.div>

              {/* Chat Message 2 - Bottom Right */}
              <motion.div
                className="absolute -bottom-16 -right-12 z-10"
                initial="hidden"
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1, 1, 0.8],
                  y: [20, 0, 0, -20]
                }}
                transition={{
                  duration: 1.2,
                  delay: 3.1,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src={ChatMessage2}
                  alt="Chat Message 2"
                  className="drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
