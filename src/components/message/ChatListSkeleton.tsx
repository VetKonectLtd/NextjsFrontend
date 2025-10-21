"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatListSkeleton = () => {
	return (
		<div className="bg-white md:col-span-1 col-span-4 border border-gray-225 rounded-lg shadow-md px-6 py-3">
			{/* Header */}
			<div className="flex mb-2">
				<h3 className="py-2 text-base font-bold text-gray-55">Chats</h3>
			</div>

			{/* Search bar skeleton */}
			<div className="flex items-center w-full bg-white rounded-full shadow-sm border border-gray-200 my-6 px-4 py-2">
				<Skeleton width="100%" height={20} borderRadius={50} />
			</div>

			{/* Chat list skeleton */}
			<div className="space-y-3">
				{Array.from({ length: 6 }).map((_, idx) => (
					<div
						key={idx}
						className="flex items-center justify-between rounded-lg p-2 cursor-pointer"
					>
						<div className="flex items-center gap-3">
							{/* Avatar */}
							<Skeleton circle width={48} height={48} />

							{/* Name and last message */}
							<div className="flex flex-col space-y-2">
								<Skeleton width={100} height={14} />
								<Skeleton width={150} height={12} />
							</div>
						</div>

						{/* Time */}
						<Skeleton width={40} height={18} borderRadius={8} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatListSkeleton;
