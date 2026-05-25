import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActivitiesSkeleton = () => {
  return (
    <div className="w-11/12 m-auto py-2">
      {Array.from({ length: 2 }).map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center border rounded-xl shadow-md bg-white border-gray-225 px-4 py-3 mb-2"
        >
          <div className="flex-1">
            <Skeleton width="60%" height={16} />
            <Skeleton width="40%" height={12} className="mt-1" />
          </div>
          <Skeleton width={80} height={18} className="ml-4" />
        </div>
      ))}
    </div>
  );
};

export default ActivitiesSkeleton;
