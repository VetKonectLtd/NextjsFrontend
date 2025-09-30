import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StoreCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col relative p-2">
      {/* Open/Closed badge */}
      <div className="absolute top-3 right-3">
        <Skeleton width={60} height={20} borderRadius={8} />
      </div>

      {/* Image */}
      <div className="rounded-t-xl overflow-hidden w-full h-[190px] mb-1">
        <Skeleton height="100%" />
      </div>

      <div className="p-2 pb-5">
        {/* Name + Location */}
        <div className="flex md:flex-row flex-col justify-between px-2 mt-1">
          <div className="flex items-center">
            <div className="flex flex-col space-y-2">
              <Skeleton width={120} height={18} />
              <div className="flex items-center gap-2">
                <Skeleton width={14} height={14} />
                <Skeleton width={80} height={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Actions + View Button */}
        <div className="flex items-center justify-between px-2 mt-3">
          <div className="flex items-center md:gap-3 gap-2">
            <Skeleton circle width={32} height={32} />
            <Skeleton circle width={32} height={32} />
            <Skeleton circle width={32} height={32} />
          </div>
          <Skeleton circle width={40} height={40} />
        </div>
      </div>
    </div>
  );
};

export default StoreCardSkeleton;
