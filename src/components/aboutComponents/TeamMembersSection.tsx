'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { YounglanTalyoung, Team1, Team2, EyaboGodwin, Isa, Lucy } from '@/app/assets/images';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: any;
  bgColor: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Akpem Shadrach',
    role: 'Founder',
    description: 'Veterinary expert with 10+ years experience in animal healthcare across Africa.',
    image: Team1,
    bgColor: 'bg-green-100',
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'CTO',
    description: 'Technology leader driving innovation in veterinary practice management.',
    image: YounglanTalyoung,
    bgColor: 'bg-blue-100',
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Head of Operations',
    description: 'Operations specialist ensuring seamless service delivery across all regions.',
    image: Team2,
    bgColor: 'bg-purple-100',
  },
  {
    id: 4,
    name: 'Eyabo Godwin',
    role: 'Lead Developer',
    description: 'Full-stack developer building robust solutions for veterinary professionals.',
    image: EyaboGodwin,
    bgColor: 'bg-yellow-100',
  },
  {
    id: 5,
    name: 'Isa Mohammed',
    role: 'Marketing Director',
    description: 'Marketing strategist expanding VetKonnect\'s reach across African markets.',
    image: Isa,
    bgColor: 'bg-red-100',
  },
  {
    id: 6,
    name: 'Lucy Okafor',
    role: 'Customer Success',
    description: 'Customer advocate ensuring exceptional user experience and satisfaction.',
    image: Lucy,
    bgColor: 'bg-pink-100',
  },
];

export default function TeamMembersSection() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-nunito">
            Team Members
          </h2>
        </motion.div>

        {/* Team Members - Circular Overlapping Layout */}
        <div className="flex justify-center items-center">
          <div className="relative flex items-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group relative cursor-pointer"
                style={{
                  marginLeft: index > 0 ? '-2rem' : '0',
                  zIndex: teamMembers.length - index
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
                viewport={{ amount: 0.3 }}
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
                    <div className="w-full h-full rounded-full overflow-hidden">
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
                    <h3 className="text-sm font-bold text-gray-900 font-nunito mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-green-600">
                      {member.role}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Optional) */}
        <motion.div
          className="flex justify-center mt-8 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-green-100 flex items-center justify-center transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-green-100 flex items-center justify-center transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
