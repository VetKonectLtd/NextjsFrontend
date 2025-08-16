'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Country {
  code: string;
  name: string;
  description: string;
}

const countries: Country[] = [
  { code: 'GH', name: 'Ghana', description: 'Comprehensive veterinary services across all regions' },
  { code: 'BF', name: 'Burkina Faso', description: 'Supporting livestock and pet care nationwide' },
  { code: 'TG', name: 'Togo', description: 'Quality animal healthcare from coast to interior' },
  { code: 'CM', name: 'Cameroon', description: 'Serving diverse ecosystems and animal populations' },
  { code: 'ZA', name: 'South Africa', description: 'Advanced veterinary care across provinces' },
  { code: 'NG', name: 'Nigeria', description: 'Leading animal healthcare in West Africa' },
  { code: 'KE', name: 'Kenya', description: 'Excellence in wildlife and domestic animal care' },
];

export default function AreaCoveredSection() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-nunito mb-4">
            Area Covered on Map
          </h2>
        </motion.div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.code}
              className="group flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }
              }}
              viewport={{ amount: 0.3 }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              {/* Flag Container */}
              <motion.div 
                className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden mb-4"
                whileHover={{ 
                  borderColor: '#0B6614',
                  boxShadow: '0 10px 30px rgba(11, 102, 20, 0.3)',
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`}
                  alt={`${country.name} flag`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                />
                
                {/* Overlay effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Country Name */}
              <h3 className="text-lg font-bold text-gray-900 font-nunito mb-2 group-hover:text-green-600 transition-colors duration-300">
                {country.name}
              </h3>

              {/* Description - Hidden on mobile, shown on hover for larger screens */}
              <p className="text-sm text-gray-600 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden lg:block max-w-xs">
                {country.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
