import { useGet } from "@/lib/hooks";
import { ACTIVITIES } from "@/lib/api-constants";
import { Activity } from "@/types";
import Cookies from "js-cookie";

// any service using hooks
export const useActivitiesService = () => {
	const useGetActivities = (enabled: boolean = false, page: number = 1) => {
		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());

		const url = `${ACTIVITIES.GET_ACTIVITIES}?${queryParams.toString()}`;
		return useGet<Activity>(["activity", page.toString()], url, {
			enabled,
			keepPreviousData: true,
			staleTime: 0,
		});
	};

	const useGetNotification = (enabled: boolean = false) => {
		const token = Cookies.get("auth-token");

		const isEnabled = Boolean(token) && Boolean(enabled);
		return useGet<any>(
			["notifications"],
			`${ACTIVITIES.GET_USER_NOTIFICATION}`,
			{
				enabled: isEnabled,
				staleTime: 0,
			},
		);
	};

	const useGetUserNotificationById = (Id: string, enabled: boolean = false) => {
		const token = Cookies.get("auth-token");

		const isEnabled = Boolean(token) && Boolean(enabled) && Boolean(Id);

		return useGet<any>(
			["notification", Id],
			`${ACTIVITIES.GET_USER_NOTIFICATIONS_BY_ID(Id)}`,
			{
				enabled: isEnabled,
				staleTime: 0,
			},
		);
	};

	return {
		useGetActivities,
		useGetNotification,
		useGetUserNotificationById,
	};
};
