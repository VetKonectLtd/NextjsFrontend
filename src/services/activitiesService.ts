import { useGet } from "@/lib/hooks";
import { ACTIVITIES } from "@/lib/api-constants";
import { Activity } from "@/types";

// any service using hooks
export const useActivitiesService = () => {
	const useGetActivities = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());

        const url = `${ACTIVITIES.GET_ACTIVITIES}?${queryParams.toString()}`;
		return useGet<Activity>(
			["activity", page.toString()],
			url,
			{
				enabled,
				keepPreviousData: true,
				staleTime: 0,
			},
		);
	};

	const useGetNotification = (enabled: boolean = false) => {
		return useGet<any>(
			["notification"],
			`${ACTIVITIES.GET_USER_NOTIFICATION}`,
			{
				enabled,
				staleTime: 0,
			},
		);
	};

	return {
		useGetActivities,
		useGetNotification,
	};
};
