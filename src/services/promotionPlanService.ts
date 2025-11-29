import { useGet } from "@/lib/hooks";
import { PROMOTION_PLANS } from "@/lib/api-constants";

export const useGetPromotionPlans = () => {
    return useGet(
        ["promotion-plans"],
        PROMOTION_PLANS.GET_ALL,
        {
            staleTime: 0,
        }
    );
};

export const usePromotionPlanService = () => {
    return {
        useGetPromotionPlans,
    };
};