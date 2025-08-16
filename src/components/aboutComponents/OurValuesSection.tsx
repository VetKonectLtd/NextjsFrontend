'use client';

import { motion } from 'framer-motion';

interface ValueItem {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}

const values: ValueItem[] = [
  {
    id: 1,
    title: 'Vision',
    description: 'A future where animal owners across Africa have no barriers to animal care and social protection.',
    bgColor: 'bg-yellow-50',
    iconBg: 'bg-yellow-200',
    iconColor: 'text-yellow-700',
  },
  {
    id: 2,
    title: 'Tag-Line',
    description: 'Re-imagining animal care.',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-200',
    iconColor: 'text-green-700',
  },
  {
    id: 3,
    title: 'Mission',
    description: 'To leverage technology to provide animal care and social protection for animal owners across Africa.',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-200',
    iconColor: 'text-green-700',
  },
  {
    id: 4,
    title: 'Culture',
    description: 'At Vet Konect, we believe it all begins with taking initiative.',
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-200',
    iconColor: 'text-red-700',
  },
  {
    id: 5,
    title: 'Core Value',
    description: 'Adaptability, Inclusiveness, Creative Innovation, Impact Agility.',
    bgColor: 'bg-orange-50',
    iconBg: 'bg-orange-200',
    iconColor: 'text-orange-700',
  },
];

export default function OurValuesSection() {
  return (
    <section className="py-16 bg-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-nunito">
            Our Values
          </h2>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              className={`bg-white p-6 h-fit rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 ${
                index === values.length - 1 ? 'md:col-start-2' : ''
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                transition: {
                  duration: 0.7,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }}
              viewport={{ amount: 0.3 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            >
              {/* Header with Icon */}
              <div className="flex items-start gap-3 mb-4">
                <motion.div 
                  className={`w-12 h-12 ${value.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 mt-1`}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ 
                    scale: 1, 
                    rotate: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 200
                    }
                  }}
                  viewport={{ amount: 0.3 }}
                >
                  <svg 
                    className={`w-6 h-6 ${value.iconColor}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 font-nunito mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
