import { usePost } from "@/lib/hooks";
import { RATING,} from "@/lib/api-constants";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import {  Rating } from "@/types";

export const useRatingService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    const useRating= () => {
        return usePost<Rating>(
            RATING.RATING,
            {
                onSuccess: (response: any) => {
                    handleSuccess(response.message || "Rating Successful!");
                },
                onError: (error) => {
                    handleError(error.message || "failed");
                },
            },
        );
    };

 
 

    return {
       useRating,
    };
};
