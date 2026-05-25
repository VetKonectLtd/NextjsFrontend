import { usePost } from "@/lib/hooks";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";
import { GENERAL } from "@/lib/api-constants";
import {
  FeedCalculatorRequest,
  FeedCalculatorResponse,
  ApiResponse,
} from "@/types";

// Hook for calculating feed requirements
export const useFeedCalculator = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  return usePost<FeedCalculatorResponse, FeedCalculatorRequest>(
    GENERAL.FEED_CALCULATOR,
    {
      onSuccess: (
        response: ApiResponse<FeedCalculatorResponse>,
        variables: FeedCalculatorRequest,
      ) => {
        // Since API returns data directly, success handling is done in component
        handleSuccess("Feed calculation completed successfully!");
      },
      onError: (error: any) => {
        console.error("Feed Calculator API Error:", error);

        // Extract error message from different possible error structures
        let errorMessage =
          "Failed to calculate feed requirements. Please try again.";

        if (error?.message) {
          errorMessage = error.message;
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }

        handleError(errorMessage);
      },
    },
  );
};

// Helper function to transform form data to API request format
export const transformFormDataToApiRequest = (
  formData: any,
): FeedCalculatorRequest => {
  console.log("Transforming form data:", formData);

  switch (formData.livestockCategory) {
    case "Poultry":
      const poultryRequest = {
        livestock_category: "Poultry" as const,
        bird_type: formData.birdsType,
        feed_type: formData.feedType,
        no_of_bird: formData.numberOfBirds,
        no_of_week: formData.numberOfWeeks,
      };
      console.log("Poultry API request:", poultryRequest);
      return poultryRequest;

    case "Fish":
      const fishRequest = {
        livestock_category: "Fish" as const,
        no_of_fish: formData.numberOfFish,
        fish_size: formData.sizeOfFish,
      };
      console.log("Fish API request:", fishRequest);
      return fishRequest;

    case "Pig":
      const pigRequest = {
        livestock_category: "Pig" as const,
        no_of_pig: formData.numberOfPigs,
      };
      console.log("Pig API request:", pigRequest);
      return pigRequest;

    default:
      console.error("Invalid livestock category:", formData.livestockCategory);
      throw new Error("Invalid livestock category");
  }
};

// Helper function to format API response for display
export const formatApiResponseForDisplay = (
  response: FeedCalculatorResponse,
) => {
  console.log("Formatting response:", response);

  if (!response || !response.feed_required) {
    throw new Error("Invalid response format: missing feed_required");
  }

  const feedAmount = response.feed_required.replace(/[^\d.]/g, ""); // Extract numeric value

  switch (response.livestock_category) {
    case "Poultry":
      return {
        feedAmount: parseFloat(feedAmount),
        formData: {
          livestockCategory: "Poultry",
          birdsType: response.bird_type,
          feedType: response.feed_type,
          numberOfBirds: response.number_of_birds,
          numberOfWeeks: undefined, // Not returned in response
        },
      };

    case "Fish":
      return {
        feedAmount: parseFloat(feedAmount),
        formData: {
          livestockCategory: "Fish",
          sizeOfFish: response.fish_size.replace(/[^\d.]/g, ""), // Extract numeric value
          numberOfFish: response.number_of_fish,
        },
      };

    case "Pig":
      return {
        feedAmount: parseFloat(feedAmount),
        formData: {
          livestockCategory: "Pig",
          numberOfPigs: response.number_of_pigs,
        },
      };

    default:
      throw new Error("Invalid response format");
  }
};
