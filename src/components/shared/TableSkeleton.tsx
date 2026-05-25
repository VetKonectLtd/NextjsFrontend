import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableSkeleton = ({
  rows = 5,
  columns = 8,
}: {
  rows?: number;
  columns?: number;
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            {Array.from({ length: columns }).map((_, idx) => (
              <th key={idx} className="py-2 px-3 font-medium">
                <Skeleton width={80} height={16} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b text-sm text-gray-700">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="py-3 px-3">
                  <Skeleton width="100%" height={16} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
