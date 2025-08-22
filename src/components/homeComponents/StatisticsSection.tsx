'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';
import { LemonBg, BrownBg, YellowBg, CreamBg, PinkBg } from '@/app/assets/images';

interface StatisticItem {
  id: number;
  value: number;
  suffix: string;
  title: string;
  subtitle: string;
  background: any;
  textColor: string;
}

const statistics: StatisticItem[] = [
  {
    id: 1,
    value: 8000,
    suffix: 'k+',
    title: 'Number of',
    subtitle: 'Veterinarians',
    background: LemonBg,
    textColor: 'text-gray-900'
  },
  {
    id: 2,
    value: 1200,
    suffix: 'k+',
    title: 'Number of',
    subtitle: 'Vet Paraprofessionals',
    background: BrownBg,
    textColor: 'text-white'
  },
  {
    id: 3,
    value: 5700,
    suffix: 'k+',
    title: 'Number of',
    subtitle: 'Vet Clinics',
    background: YellowBg,
    textColor: 'text-gray-900'
  },
  {
    id: 4,
    value: 9300,
    suffix: 'k+',
    title: 'Vet Vendor',
    subtitle: '& Store',
    background: CreamBg,
    textColor: 'text-gray-900'
  },
  {
    id: 5,
    value: 2000000,
    suffix: 'm+',
    title: 'Pet Owners &',
    subtitle: 'livestock Farmers',
    background: PinkBg,
    textColor: 'text-gray-900'
  }
];

interface CounterProps {
  end: number;
  suffix: string;
  duration: number;
}

function Counter({ end, suffix, duration }: CounterProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const controls = useAnimation();

  const formatNumber = (num: number) => {
    if (suffix === 'm+') {
      return (num / 1000000).toFixed(1);
    } else if (suffix === 'k+') {
      return (num / 1000).toFixed(1);
    }
    return num.toString();
  };

  return (
    <motion.span 
      className="text-2xl md:text-4xl font-black font-nunito"
      onViewportEnter={() => {
        setDisplayCount(0);
        controls.start({
          scale: [1, 1.1, 1],
          transition: { duration: 0.3 }
        });
      }}
      onAnimationStart={() => {
        const start = 0;
        const increment = end / (duration * 60); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            setDisplayCount(end);
            clearInterval(timer);
          } else {
            setDisplayCount(Math.floor(current));
          }
        }, 1000/60);

        return () => clearInterval(timer);
      }}
      animate={controls}
    >
      {formatNumber(displayCount)}{suffix}
    </motion.span>
  );
}

export default function StatisticsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative h-36 md:h-48 flex flex-col items-center justify-center text-center p-4 md:p-6 rounded-2xl md:rounded-3xl overflow-hidden"
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
              <div className={`relative z-10 ${stat.textColor}`}>
                <div className="mb-2">
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs md:text-sm font-medium leading-tight">
                    {stat.title}
                  </p>
                  <p className="text-xs md:text-sm font-medium leading-tight">
                    {stat.subtitle}
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
