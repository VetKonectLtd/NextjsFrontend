'use client';

import React, { useState, useRef, useEffect } from 'react';
import VetProfile, { VetProfileProps } from '@/components/shared/VetProfile';
import { Vet1, Vet2, Vet3, Vet4 } from '@/app/assets/images';
import { ArrowLeft, ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { useVeterinaryService, transformVetDataToProps, createEmptyVetData } from '@/services/veterinaryService';
import { GetNearestVetsRequest, ApiResponse } from '@/types';


interface NearYouProps {
  vets?: VetProfileProps[];
  onViewProfile?: (id: string) => void;
  onContact?: (id: string, type: 'phone' | 'message' | 'mail' | 'location' | 'share' | 'rate') => void;
  userLocation?: { latitude: number; longitude: number };
  useRealData?: boolean; // Flag to determine whether to use real API or sample data
}

const NearYou: React.FC<NearYouProps> = ({
  vets: propVets,
  onViewProfile,
  onContact,
  userLocation,
  useRealData = false
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vets, setVets] = useState<VetProfileProps[]>(propVets || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { useGetNearestVets } = useVeterinaryService();

  // Default images array for cycling through
  const defaultImages = [Vet1, Vet2, Vet3, Vet4];

  // Prepare request for API call
  const apiRequest: GetNearestVetsRequest = userLocation ? {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    radius: 50,
    limit: 20,
    page: 1,
  } : { latitude: 0, longitude: 0 };

  // Use the useGet hook for API call
  const { data: apiResponse, error: apiError, isLoading: apiLoading, refetch } = useGetNearestVets(
    apiRequest,
    useRealData && !!userLocation && !propVets // Only enabled when conditions are met
  );

  // Effect to handle API response and set vets data
  useEffect(() => {
    if (useRealData && userLocation && !propVets) {
      if (apiResponse?.data?.veterinary_doctors?.data) {
        const transformedVets = transformVetDataToProps(apiResponse.data.veterinary_doctors.data, defaultImages);
        setVets(transformedVets);
        setError(null);
      } else if (apiError) {
        setError(typeof apiError === 'string' ? apiError : 'Failed to load veterinary doctors');
        setVets([]); // Clear vets on error, don't show sample data
      }
      setIsLoading(apiLoading);
    } else if (!useRealData && !propVets) {
      // Use sample data for development
      const sampleData = createEmptyVetData();
      const transformedData = transformVetDataToProps(sampleData.veterinary_doctors.data, defaultImages);
      setVets(transformedData);
    }
  }, [apiResponse, apiError, apiLoading, userLocation, useRealData, propVets]);


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

  const handleContact = (id: string, type: 'phone' | 'message' | 'mail' | 'location' | 'share' | 'rate') => {
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
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2.5">
              <MapPin className="w-4 h-4 text-gray-500" />
              <p className="text-gray-500 text-base font-nunito">
                {useRealData ? 'Veterinarians near your location' : 'You can see the list of most contacted veterinarians around you'}
              </p>
            </div>
            <h2 className="text-3xl font-black text-gray-900 font-nunito">
              {useRealData ? 'Nearby Veterinarians' : 'Most Contacted Nearby Vet'}
            </h2>
            {error && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">{error}</p>
                <button
                  onClick={() => refetch()}
                  className="mt-1 text-sm text-yellow-600 hover:text-yellow-800 underline"
                >
                  Try again
                </button>
              </div>
            )}
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-green-600" />
              <p className="text-gray-600 font-nunito">Loading veterinarians...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && vets.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No veterinarians found</h3>
            <p className="text-gray-500 mb-4">We couldn't find any veterinarians in your area.</p>
            {userLocation && (
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Search again
              </button>
            )}
          </div>
        )}

        {/* Carousel Container */}
        {!isLoading && vets.length > 0 && (
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
        )}
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
