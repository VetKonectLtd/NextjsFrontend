import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PetCardSkeleton = () => (
  <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col gap-4 animate-pulse">
    <div className="flex md:flex-row flex-col-reverse justify-center items-center md:justify-between">
      {/* Image + Name */}
      <div className="flex md:flex-row flex-col gap-4 items-center">
        <Skeleton circle width={64} height={64} />
        <div className="md:text-left text-center">
          <Skeleton width={120} height={20} />
          <Skeleton width={80} height={14} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex md:flex-row flex-col mb-5 md:mb-0 items-center md:gap-3 gap-2">
        <Skeleton width={80} height={28} />
        <div className="flex items-center md:gap-3 gap-2">
          <Skeleton circle width={32} height={32} />
          <Skeleton circle width={32} height={32} />
          <Skeleton circle width={32} height={32} />
          <Skeleton circle width={32} height={32} />
        </div>
      </div>
    </div>

    {/* Details */}
    <div className="mt-2 space-y-2 text-sm text-gray-55">
      <Skeleton height={16} width="80%" />
      <Skeleton height={16} width="70%" />
      <Skeleton height={16} width="75%" />
      <Skeleton height={16} width="60%" />
    </div>
  </div>
);

export default PetCardSkeleton;
