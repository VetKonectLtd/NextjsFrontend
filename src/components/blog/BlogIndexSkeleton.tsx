import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BlogIndexSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-5 pt-28 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <Skeleton height={48} width={300} className="mx-auto" />
        <Skeleton height={20} width={500} className="mt-2 mx-auto" />
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-12">
        <Skeleton height={48} />
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm animate-pulse"
          >
            {/* Image */}
            <Skeleton height={192} />

            {/* Content */}
            <div className="p-5 space-y-2">
              <Skeleton height={20} width="80%" />
              <Skeleton height={14} width="60%" />
              <Skeleton height={40} width="100%" />
            </div>

            {/* Stats */}
            <div className="flex gap-4 items-center p-5 mt-2">
              <Skeleton height={32} width={70} borderRadius={999} />
              <Skeleton height={32} width={70} borderRadius={999} />
              <Skeleton height={32} width={70} borderRadius={999} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
