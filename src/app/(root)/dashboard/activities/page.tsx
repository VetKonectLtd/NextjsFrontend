"use client";
import { useState, useEffect } from "react";
import ActivitiesSkeleton from "@/components/shared/ActivitiesSkeleton.";
import { timeAgo } from "@/components/shared/TimeFormat";
import { useActivitiesService } from "@/services/activitiesService";
import { Activity } from "@/types";
import Image from "next/image";
import { Down } from "@/app/assets/icons";

const Activities = () => {
	const { useGetActivities } = useActivitiesService();

	const [page, setPage] = useState(1);
	const [allActivities, setAllActivities] = useState<Activity[]>([]);

	const getActivities = useGetActivities(true, page);

	// whenever data changes, merge it with existing ones
	useEffect(() => {
		if ((getActivities.data as any)?.userActivity.data) {
			setAllActivities((prev) => {
				const newActivities = (getActivities.data as any)?.userActivity.data.filter(
					(a: Activity) => !prev.some((p) => p.id === a.id),
				);
				return [...prev, ...newActivities];
			});
		}
	}, [getActivities.data]);

	const handleLoadMore = () => {
		if ((getActivities.data as any)?.next_page_url) {
			setPage((prev) => prev + 1);
		}
	};

	if (getActivities.isLoading && page === 1) {
		return <ActivitiesSkeleton />;
	}

	return (
		<div className="w-11/12 m-auto py-2 px-4 bg-white shadow-md rounded-xl border border-gray-225">
			<h1 className="pb-4 text-base font-bold text-gray-55">
				Recent Activities
			</h1>

			{allActivities.length >= 1 ? (
				<>
					{allActivities
						.slice()
						.reverse()
						.map((activity: Activity) => (
							<div
								key={activity.id}
								className="flex md:flex-row gap-2 flex-col border rounded-xl shadow-md border-gray-225 justify-between md:items-center px-4 py-3 mb-2 text-sm"
							>
								<div>
									<p className="font-medium text-sm text-gray-55">
										{activity.title}
									</p>
									<p className="text-xs text-gray-55">{activity.detail}</p>
								</div>
								<span className="text-xs rounded-full w-20 px-2 py-1 bg-[#F1F1F1] text-gray-55 whitespace-nowrap">
									{timeAgo(activity.created_at)}
								</span>
							</div>
						))}

					{(getActivities.data as any)?.next_page_url ? (
						<div className="m-auto  md:w-1/3 justify-center sticky bottom-0 flex">
							<button
								onClick={handleLoadMore}
								disabled={getActivities.isFetching}
								className="mt-9 text-xs md:text-md flex items-center py-2 px-3 bg-gray-225 font-bold text-gray-55 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
							>
								{getActivities.isFetching ? "Loading more..." : "Loading more"}{" "}
								<Image
									src={Down}
									alt="down"
									width={120}
									height={120}
									className="h-5 w-5 ml-3 animate-bounce object-cover"
								/>
							</button>
						</div>
					) : (
						<p className="text-gray-55 text-center py-2 text-sm">
							No more activities
						</p>
					)}
				</>
			) : (
				<p className="text-gray-55 p-2 text-center font-bold pb-6 text-base">
					No activities yet.
				</p>
			)}
		</div>
	);
};

export default Activities;
