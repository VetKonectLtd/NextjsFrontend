'use client';

import React, { useState, useRef } from 'react';
import VetProfile, { VetProfileProps } from '@/components/shared/VetProfile';
import { Vet1, Vet2, Vet3, Vet4 } from '@/app/assets/images';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Sample data for demonstration
const sampleVets: VetProfileProps[] = [
  {
    id: '1',
    name: 'Dr. Orji Hyacinth C',
    location: 'Delta, Nigeria',
    image: Vet1,
    rating: 4.5,
    totalRatings: 5,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: '2',
    name: 'Dr. Semiat Adogun',
    location: 'Lagos, Nigeria',
    image: Vet2,
    rating: 4.7,
    totalRatings: 5,
    isAvailable: false,
    isVerified: true,
  },
  {
    id: '3',
    name: 'Dr. Ochola Peter',
    location: 'Abuja, Nigeria',
    image: Vet3,
    rating: 0.0,
    totalRatings: 5,
    isAvailable: true,
    isVerified: false,
  },
  {
    id: '4',
    name: 'Dr. Benedict Onoja',
    location: 'Lagos, Nigeria',
    image: Vet4,
    rating: 4.2,
    totalRatings: 5,
    isAvailable: true,
    isVerified: true,
  },
  // Duplicate for demonstration of carousel
  {
    id: '5',
    name: 'Dr. Sarah Johnson',
    location: 'Port Harcourt, Nigeria',
    image: Vet1,
    rating: 4.8,
    totalRatings: 5,
    isAvailable: true,
    isVerified: true,
  },
  {
    id: '6',
    name: 'Dr. Michael Brown',
    location: 'Kano, Nigeria',
    image: Vet2,
    rating: 4.3,
    totalRatings: 5,
    isAvailable: false,
    isVerified: true,
  },
];

interface NearYouProps {
  vets?: VetProfileProps[];
  onViewProfile?: (id: string) => void;
  onContact?: (id: string, type: 'phone' | 'message' | 'mail'| 'location' | 'share' | 'rate') => void;
}

const NearYou: React.FC<NearYouProps> = ({
  vets = sampleVets,
  onViewProfile,
  onContact
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate how many slides we can show (4 columns per slide)
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(vets.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleViewProfile = (id: string) => {
    if (onViewProfile) {
      onViewProfile(id);
    } else {
      console.log('View profile for vet:', id);
    }
  };

  const handleContact = (id: string, type: 'phone' | 'message' | 'mail'| 'location' | 'share' | 'rate') => {
    if (onContact) {
      onContact(id, type);
    } else {
      console.log('Contact vet:', id, 'via:', type);
    }
  };

  return (
    <section>
      <div>
        {/* Header with Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <p className="text-gray-500 text-base font-nunito mb-2.5">
              You can see the list of most contacted veterinarians around you
            </p>
            <h2 className="text-3xl font-black text-gray-900 font-nunito">
              Most Contacted Nearby Vet
            </h2>
          </div>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 ${currentSlide === 0
                  ? 'text-gray-300 cursor-not-allowed bg-white shadow-sm'
                  : 'text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80'
                }`}
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1 || totalSlides <= 1}
              className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 ${currentSlide === totalSlides - 1 || totalSlides <= 1
                  ? 'text-gray-300 cursor-not-allowed bg-white shadow-sm'
                  : 'text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80'
                }`}
              aria-label="Next slide"
            >
              <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Desktop Carousel */}
          <div className="hidden lg:block">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vets
                      .slice(
                        slideIndex * itemsPerSlide,
                        (slideIndex + 1) * itemsPerSlide
                      )
                      .map((vet) => (
                        <VetProfile
                          key={vet.id}
                          {...vet}
                          onViewProfile={handleViewProfile}
                          onContact={handleContact}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="w-full flex-shrink-0"
                  >
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                      {vets
                        .slice(
                          slideIndex * itemsPerSlide,
                          (slideIndex + 1) * itemsPerSlide
                        )
                        .map((vet) => (
                          <div key={vet.id} className="flex-shrink-0 w-[calc(66.666%-8px)]" style={{ scrollSnapAlign: 'start' }}>
                            <VetProfile
                              {...vet}
                              onViewProfile={handleViewProfile}
                              onContact={handleContact}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Below grid */}
        <div className="lg:hidden mt-6">
          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mb-4 gap-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                      ? 'bg-green-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${currentSlide === 0
                  ? 'text-gray-300 cursor-not-allowed bg-white shadow-sm'
                  : 'text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80'
                }`}
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1 || totalSlides <= 1}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${currentSlide === totalSlides - 1 || totalSlides <= 1
                  ? 'text-gray-300 cursor-not-allowed bg-white shadow-sm'
                  : 'text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80'
                }`}
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Desktop Slide Indicators */}
        <div className="hidden lg:block">
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                      ? 'bg-green-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NearYou;
