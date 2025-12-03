"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="w-11/12 m-auto animate-pulse">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Skeleton circle width={40} height={40} />
        <Skeleton width={80} height={20} className="ml-2" />
      </div>

      {/* Image Carousel */}
      <Skeleton height={300} className="mb-4 rounded-2xl" />

      {/* Product Info */}
      <div className="space-y-4">
        <Skeleton width="60%" height={24} /> {/* Product name */}
        <Skeleton width="40%" height={16} /> {/* Location */}
        <Skeleton width="80%" height={12} count={3} /> {/* About */}
        <Skeleton width="50%" height={12} /> {/* Disclaimer */}

        {/* Reviews */}
        <Skeleton width="30%" height={16} className="mt-2" />
        <Skeleton height={80} className="rounded-lg" />

        {/* Tags */}
        <Skeleton width="100%" height={30} className="mt-2 rounded-lg" />

        {/* Units and Buttons */}
        <Skeleton width="40%" height={40} />
        <Skeleton width="100%" height={40} className="mt-2" />
      </div>

      {/* Similar Products */}
      <div className="mt-6">
        <Skeleton width="40%" height={20} />
        <div className="grid grid-cols-4 gap-4 mt-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} height={150} className="rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
