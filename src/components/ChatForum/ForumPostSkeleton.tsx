import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ForumPostSkeleton = () => (
  <div className=" items-center text-center w-full p-4 mb-6">
    {/* Header */}
    {/* <div className="flex items-center mb-3">
      <Skeleton circle width={40} height={40} className="mr-3" />

      <div className="flex flex-col gap-1 w-40">
        <Skeleton height={12} width="80%" />
        <Skeleton height={10} width="60%" />
      </div>

      <Skeleton height={14} width={60} className="ml-auto" />
    </div> */}

    {/* Post Image */}
    {/* <Skeleton height={150} className="mb-3 rounded" /> */}

    {/* Title */}
    <Skeleton height={16} width="70%" className="mb-2 text-center" />

    {/* Content */}
    {/* <Skeleton count={2} height={12} className="mb-3" /> */}

    {/* Actions */}
    {/* <div className="flex md:justify-end justify-start gap-4 items-end text-sm">
      <div className="flex items-center gap-2">
        <Skeleton circle width={32} height={32} />
        <Skeleton width={30} height={12} />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton circle width={32} height={32} />
        <Skeleton width={30} height={12} />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton circle width={32} height={32} />
        <Skeleton circle width={32} height={32} />
      </div>
    </div> */}
  </div>
);

export default ForumPostSkeleton;
