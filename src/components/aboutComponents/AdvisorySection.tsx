'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tayo, Gani, Moses, Nelson } from '@/app/assets/images';

interface AdvisoryMember {
  id: number;
  name: string;
  image: any;
  bgColor: string;
}

const advisoryMembers: AdvisoryMember[] = [
  {
    id: 1,
    name: 'Tayo',
    image: Tayo,
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    name: 'Olajuwon Kayode',
    image: Nelson,
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    name: 'Dr. Moses Arokoyo',
    image: Moses,
    bgColor: 'bg-purple-100',
  },
  {
    id: 4,
    name: 'Dr. Gani Enahoro',
    image: Gani,
    bgColor: 'bg-yellow-100',
  },
];

export default function AdvisorySection() {
  return (
    <section className="py-16 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-nunito">
            Advisory Board
          </h2>
        </motion.div>

        {/* Advisory Members - Circular Overlapping Layout */}
        <div className="w-full">
          {/* Desktop: Centered Overlapping layout */}
          <div className="hidden lg:flex items-center justify-center w-full">
            <div className="relative flex items-center">
              {advisoryMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="group relative cursor-pointer"
                  style={{
                    marginLeft: index > 0 ? '-2rem' : '0',
                    zIndex: advisoryMembers.length - index
                  }}
                  initial={{ opacity: 0, x: -50, scale: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 120
                    }
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{
                    scale: 1.1,
                    zIndex: 999,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Circular Image Container */}
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                    {/* Main Circle with proper masking */}
                    <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg bg-white group-hover:border-green-400 transition-all duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                    </div>

                    {/* Hover Info Panel */}
                    <motion.div
                      className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${member.bgColor} rounded-xl p-3 shadow-lg border border-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap min-w-max`}
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      <h3 className="text-sm font-bold text-gray-900 font-nunito">
                        {member.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        {/* X (Twitter) Icon */}
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                        {/* LinkedIn Icon */}
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Horizontal Scroll with Interlocking */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex pb-4 justify-center" style={{ width: 'max-content', paddingLeft: '1rem', paddingRight: '2rem', margin: '0 auto' }}>
              {advisoryMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="group relative cursor-pointer"
                  style={{
                    marginLeft: index > 0 ? '-1rem' : '0',
                    zIndex: advisoryMembers.length - index,
                    minWidth: '6rem',
                    flexShrink: 0
                  }}
                >
                  {/* Circular Image Container */}
                  <div className="relative w-24 h-24">
                    {/* Main Circle */}
                    <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg bg-white group-hover:border-green-400 transition-all duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                    </div>

                    {/* Name below image */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                      <h3 className="text-xs font-bold text-gray-900 font-nunito">
                        {member.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        {/* X (Twitter) Icon */}
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                        {/* LinkedIn Icon */}
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
