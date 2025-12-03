import { usePost, useGet } from "@/lib/hooks";
import { ADS_PROMOTION } from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { useQueryClient } from "@tanstack/react-query";

export interface AdsPromotionPayload {
    product_id: number;
    promotion_plan_id: number;
}

export interface AdsPromotion {
    id: number;
    user_id: number;
    product_id: number;
    promotion_plan_id: number;
    active_role: string;
    start_date: string;
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    product: {
        id: number;
        user_id: number;
        store_id: number;
        product_id: string;
        product_type: number;
        product_name: string;
        category: string;
        description: string;
        location: string;
        price: string;
        images: string[];
        availability: boolean;
        available_unit: number;
        is_featured: boolean;
        is_verified: boolean;
        disabled: number;
        deleted_at: null;
        created_at: string;
        updated_at: string;
        images_url: string[];
        ratings: any[];
        tags: any[];
    };
    promotion_plan: {
        id: number;
        promotion_code: string;
        title: string;
        currency: string;
        price: string;
        vat: string;
        date_option: string;
        duration: number;
        no_of_products: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
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

    /**
     * Cancel a promotion (new endpoint)
     * GET /v3/cancel-promotion/{id}/ad
     */
    const useCancelPromotionAd = (id: string) => {
        // Use GET with manual triggering via refetch from the component
        return useGet<void>(
            ["cancelPromotionAd", id],
            ADS_PROMOTION.CANCEL_PROMOTION_AD(id),
            {
                enabled: false, // Don't auto-fetch; component will call refetch()
            },
        );
    };

    return {
        useInitializePromotion,
        useGetUserPromotions,
        useGetPromotionById,
        useCancelPromotion,
        useCancelPromotionAd,
    };
};
