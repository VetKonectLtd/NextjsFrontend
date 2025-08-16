'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  testimonial: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Amechi Anayor",
    location: "Lagos, Nigeria",
    testimonial: "On the Windows talking painted pasture yet its express parties use. Sure last upon he same as know next. Of believed or diverted no.",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face&auto=format"
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    location: "Abuja, Nigeria",
    testimonial: "VetKonnect has revolutionized how I connect with pet owners. The platform is intuitive and makes scheduling appointments seamless.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face&auto=format"
  },
  {
    id: 3,
    name: "Dr. Michael Okafor",
    location: "Port Harcourt, Nigeria",
    testimonial: "As a veterinarian, I appreciate how VetKonnect helps me reach more clients and provide better care through digital consultations.",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face&auto=format"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 font-nunito">
              Testimonials
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            What are people saying about vet konect
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center relative"
            >
              {/* Profile Image */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="pt-12">
                <blockquote className="text-gray-600 text-lg leading-relaxed mb-6">
                  "{testimonials[currentIndex].testimonial}"
                </blockquote>
                
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-900 font-nunito">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-500">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-gray-800' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
