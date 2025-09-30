// Example of how to use NearYou component with geolocation

'use client';

import React from 'react';
import NearYou from '@/components/homeComponents/NearYou';
import { useGeolocation } from '@/lib/hooks/useGeolocation';
import { Button } from '@/components/ui/button';
import { MapPin, RefreshCw } from 'lucide-react';

const NearYouWithGeolocation: React.FC = () => {
  const {
    coordinates,
    error,
    loading,
  } = useGeolocation();

  const handleViewProfile = (id: string) => {
    console.log('View profile for vet:', id);
    // Navigate to vet profile page
  };

  const handleContact = (id: string, type: 'phone' | 'message' | 'mail' | 'location' | 'share' | 'rate') => {
    console.log('Contact vet:', id, 'via:', type);
    // Handle contact action
  };

  return (
    <div className="space-y-6">
      {/* Geolocation Status */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Location Status</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Location
          </Button>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          {loading && (
            <p className="text-blue-600">Getting your location...</p>
          )}
          
          {error && (
            <div className="text-orange-600">
              <p>{error}</p>
            </div>
          )}
          
          {coordinates && (
            <p className="text-green-600">
              Location found: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
            </p>
          )}
        </div>
      </div>

      {/* NearYou Component */}
      <NearYou
        userLocation={coordinates ? {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        } : undefined}
        useRealData={true} // Set to true to use real API data
        onViewProfile={handleViewProfile}
        onContact={handleContact}
      />
    </div>
  );
};

export default NearYouWithGeolocation;
