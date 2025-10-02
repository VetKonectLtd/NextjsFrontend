"use client";
import ActivitiesSkeleton from "@/components/shared/ActivitiesSkeleton.";
import { timeAgo } from "@/components/shared/TimeFormat";
import { useActivitiesService } from "@/services/activitiesService";
import { Activity } from "@/types";

const Activities = () => {
	const { useGetActivities } = useActivitiesService();
	const getActivities = useGetActivities(true);

	const activities = Array.isArray(getActivities.data?.data)
		? getActivities.data.data
		: [];

	return (
		<div className="w-11/12 m-auto py-2 px-4 bg-white shadow-md rounded-xl border border-gray-225">
			<h1 className="pb-4 text-base font-bold text-gray-55">
				Recent Activities
			</h1>

			{getActivities.isLoading ? (
				<ActivitiesSkeleton />
			) : activities.length >= 1 ? (
				activities.map((activity: Activity) => (
					<div
						key={activity.id}
						className="flex md:flex-row flex-col border rounded-xl shadow-md   border-gray-225 justify-between md:items-center px-4 py-3 mb-2 text-sm"
					>
						<div>
							<p className="font-medium text-sm text-gray-55">
								{activity.title}
							</p>
							<p className=" text-xs text-gray-55">{activity.detail}</p>
						</div>
						<span className="text-xs rounded-full px-2 py-1 bg-[#F1F1F1] text-gray-55 whitespace-nowrap">
							{timeAgo(activity.created_at)}
						</span>
					</div>
				))
			) : (
				<p className="text-gray-55 p-2 text-center font-bold pb-6 text-base">
					No activities yet.
				</p>
			)}
		</div>
	);
};

export default Activities;
