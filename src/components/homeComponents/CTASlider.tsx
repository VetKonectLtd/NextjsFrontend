'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CallToAction from './CallToAction';

interface CTAData {
  backgroundClass: string;
  image: any;
  locationIcon?: any;
  heading: string;
  description: string;
  isReversed: boolean;
  showOpenStatus: boolean;
  showLocationIcon: boolean;
}

interface CTASliderProps {
  ctaData: CTAData[];
}

const CTASlider: React.FC<CTASliderProps> = ({ ctaData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = ctaData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      {/* Desktop: Show all CTAs normally */}
      <div className="hidden lg:block">
        {ctaData.map((cta, index) => (
          <CallToAction
            key={index}
            backgroundClass={cta.backgroundClass}
            image={cta.image}
            locationIcon={cta.locationIcon}
            heading={cta.heading}
            description={cta.description}
            isReversed={cta.isReversed}
            showOpenStatus={cta.showOpenStatus}
            showLocationIcon={cta.showLocationIcon}
          />
        ))}
      </div>

      {/* Mobile: Slider */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {ctaData.map((cta, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <div className={`${cta.backgroundClass}`}>
                  <CallToAction
                    backgroundClass="bg-transparent"
                    image={cta.image}
                    locationIcon={cta.locationIcon}
                    heading={cta.heading}
                    description={cta.description}
                    isReversed={cta.isReversed}
                    showOpenStatus={cta.showOpenStatus}
                    showLocationIcon={cta.showLocationIcon}
                  />
                  
                  {/* Navigation Controls - Inside CTA background */}
                  <div className="flex flex-col items-center pb-8 px-4">
                    {/* Indicator Dots */}
                    <div className="flex justify-center mb-4 gap-2">
                      {Array.from({ length: totalSlides }, (_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => setCurrentSlide(dotIndex)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            dotIndex === currentSlide
                              ? 'bg-green-600'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={prevSlide}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-custom hover:shadow-custom/80 text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                        aria-label="Previous slide"
                      >
                        <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-custom hover:shadow-custom/80 text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                        aria-label="Next slide"
                      >
                        <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CTASlider;
