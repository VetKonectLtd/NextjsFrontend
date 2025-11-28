import { usePost, useGet } from "@/lib/hooks";
import { ADS_PROMOTION } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

export interface AdsPromotionPayload {
    product_id: number;
    promotion_plan_id: number;
}

export interface AdsPromotion {
    id: number;
    product_id: number;
    promotion_plan_id: number;
    status: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

// Ads Promotion service using hooks
export const useAdsPromotionService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    /**
     * Initialize a new ads promotion
     * POST /v3/ads-promotion/initialize
     */
    const useInitializePromotion = () => {
        return usePost<AdsPromotion, AdsPromotionPayload>(
            ADS_PROMOTION.INITIALIZE,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Promotion initialized successfully!");
                    if (response.authorization_url) {
                        window.location.href = response.authorization_url;
                    }
                },
                onError: (error) => {
                    handleError(error.message || "Failed to initialize promotion");
                },
                invalidateQueries: [["userPromotions"]],
            },
        );
    };

    /**
     * Get all promotions for the current user
     * GET /api/v3/get-my-promotions
     */
    const useGetUserPromotions = (enabled: boolean = true) => {
        return useGet<AdsPromotion[]>(
            ["userPromotions"],
            ADS_PROMOTION.GET_MY_PROMOTIONS,
            {
                enabled,
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        );
    };

    /**
     * Get a specific promotion by ID
     * GET /v3/ads-promotion/{id}
     */
    const useGetPromotionById = (id: string, enabled: boolean = true) => {
        return useGet<AdsPromotion>(
            ["promotion", id],
            ADS_PROMOTION.GET_PROMOTION_BY_ID(id),
            {
                enabled: enabled && !!id,
                staleTime: 5 * 60 * 1000,
            },
        );
    };

    /**
     * Cancel a promotion
     * POST /v3/ads-promotion/{id}/cancel
     */
    const useCancelPromotion = (id: string) => {
        return usePost<void, void>(
            ADS_PROMOTION.CANCEL_PROMOTION(id),
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Promotion cancelled successfully!");
                },
                onError: (error) => {
                    handleError(error.message || "Failed to cancel promotion");
                },
                invalidateQueries: [["userPromotions"], ["promotion", id]],
            },
        );
    };

    return {
        useInitializePromotion,
        useGetUserPromotions,
        useGetPromotionById,
        useCancelPromotion,
    };
};
