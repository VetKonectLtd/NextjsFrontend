import { usePost } from '@/lib/hooks';
import { useHandleSuccess, useHandleError } from '@/lib/hooks/useToastHandlers';
import { GENERAL } from '@/lib/api-constants';
import { 
  DiseasePredictorRequest, 
  DiseasePredictorResponse,
  ApiResponse 
} from '@/types';

// Hook for disease prediction
export const useDiseasePredictor = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  return usePost<DiseasePredictorResponse, DiseasePredictorRequest>(
    GENERAL.DISEASE_PREDICTOR,
    {
      onSuccess: (response: ApiResponse<DiseasePredictorResponse>, variables: DiseasePredictorRequest) => {
        // Since API returns data directly, success handling is done in component
        handleSuccess('Disease prediction completed successfully!');
      },
      onError: (error: any) => {
        console.error('Disease Predictor API Error:', error);
        
        // Extract error message from different possible error structures
        let errorMessage = 'Failed to predict disease. Please try again.';
        
        if (error?.message) {
          errorMessage = error.message;
        } else if (error?.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        
        handleError(errorMessage);
      },
    }
  );
};

// Helper function to transform form data to API request format
export const transformDiseasePredictorFormData = (formData: any): DiseasePredictorRequest => {
  console.log('Transforming disease predictor form data:', formData);
  
  const request = {
    livestock_category: formData.livestockCategory,
    diseases: formData.diseases || formData.symptoms || [], // Handle different field names
  };
  
  console.log('Disease predictor API request:', request);
  return request;
};

// Helper function to format API response for display
export const formatDiseasePredictorResponse = (response: DiseasePredictorResponse): { prediction: string } => {
  console.log('Formatting disease predictor response:', response);
  
  // Since the response is just a string, return it wrapped in an object
  return {
    prediction: typeof response === 'string' ? response : String(response)
  };
};
