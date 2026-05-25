import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogReaderSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-5 pt-28 pb-24 animate-pulse">
      {/* Back Button */}
      <div className="mb-6">
        <Skeleton width={90} height={36} borderRadius={999} />
      </div>

      {/* Title */}
      <div className="mb-4">
        <Skeleton height={32} width="80%" />
        <Skeleton height={32} width="60%" className="mt-2" />
      </div>

      {/* Meta */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton width={220} height={14} />
        <Skeleton width={100} height={14} />
      </div>

      {/* Image */}
      <div className="mb-10">
        <Skeleton height={320} borderRadius={16} />
      </div>

      {/* Content */}
      <div className="space-y-3 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height={14} width={`${90 - i * 3}%`} />
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-6 mb-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton circle width={32} height={32} />
            <Skeleton width={60} height={14} />
          </div>
        ))}
      </div>

      {/* Comment box */}
      <div className="flex gap-4 mb-10">
        <Skeleton circle width={40} height={40} />
        <div className="flex-1">
          <Skeleton height={60} borderRadius={12} />
          <Skeleton width={90} height={32} className="mt-3 ml-auto" />
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton circle width={40} height={40} />
            <div className="flex-1">
              <Skeleton width={120} height={14} />
              <Skeleton width={80} height={12} className="mt-1" />
              <Skeleton height={14} className="mt-3" />
              <Skeleton height={14} width="85%" className="mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
