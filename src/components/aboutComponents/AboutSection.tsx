'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AboutImage, LemonBg, YellowBg, CreamBg, PinkBg } from '@/app/assets/images';

interface StatisticItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string;
  background: any;
}

const statistics: StatisticItem[] = [
  {
    id: 1,
    value: 8000,
    suffix: 'k+',
    label: 'Number of',
    description: 'Veterinarians',
    background: LemonBg,
  },
  {
    id: 2,
    value: 5700,
    suffix: 'k+',
    label: 'Number of',
    description: 'Vet Clinics',
    background: YellowBg,
  },
  {
    id: 3,
    value: 9300,
    suffix: 'k+',
    label: 'Vet Vendor',
    description: '& Store',
    background: CreamBg,
  },
  {
    id: 4,
    value: 2000000,
    suffix: 'm+',
    label: 'Pet Owners &',
    description: 'Livestock Farmers',
    background: PinkBg,
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-white mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Standalone Heading */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 font-nunito">
            About Vet Konect
          </h1>
        </motion.div>

        {/* Overview and Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content - Overview and Statistics */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 font-nunito">
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Vet Konect is a digital animal health company that is leveraging technology to
                provide access to animal care and social protection for Africa.
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="relative h-32 flex flex-col items-center justify-center text-center p-4 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1
                    }
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={stat.background}
                      alt=""
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-1">
                    <div className="text-2xl font-black font-nunito text-gray-900">
                      {stat.value >= 1000000
                        ? `${(stat.value / 1000000).toFixed(1)}${stat.suffix}`
                        : stat.value >= 1000
                          ? `${(stat.value / 1000).toFixed(1)}${stat.suffix}`
                          : `${stat.value}${stat.suffix}`
                      }
                    </div>
                    <div className="space-y-0">
                      <div className="text-xs font-medium text-gray-700">
                        {stat.label}
                      </div>
                      <div className="text-xs font-medium text-gray-700">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative rounded-full overflow-hidden">
                <Image
                  src={AboutImage}
                  alt="About Vet Konect - Veterinarian with pet"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
