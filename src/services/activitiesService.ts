import { useGet} from "@/lib/hooks";
import { ACTIVITIES } from "@/lib/api-constants";
import { Activity } from "@/types";

// any service using hooks
export const useActivitiesService = () => {

    const useGetActivities = (enabled: boolean = false) => {
        return useGet<Activity>(
            ["activity"],
            `${ACTIVITIES.GET_ACTIVITIES}`,
            {
                enabled,
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
       useGetNotification
    };
};
