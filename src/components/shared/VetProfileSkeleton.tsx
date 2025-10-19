import React from 'react';

const VetProfileSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            {/* Image Container */}
            <div className="relative">
                <div className="aspect-[4/3] bg-gray-200" />
                
                {/* Availability Tag Skeleton - Top Right */}
                <div className="absolute top-2 right-2">
                    <div className="h-6 w-24 bg-gray-300 rounded-full" />
                </div>

                {/* Star Rating Skeleton - Bottom Left */}
                <div className="absolute bottom-2 left-2">
                    <div className="h-6 w-20 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4">
                {/* Name Skeleton */}
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />

                {/* Location Skeleton */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />

                {/* Contact Icons and Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default VetProfileSkeleton;
