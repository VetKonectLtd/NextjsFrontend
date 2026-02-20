import { useGet, usePost } from "@/lib/hooks";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

export const useDiseasePredict = () => {
	const handleSuccess = useHandleSuccess();
	const handleError = useHandleError();

	const usePredictDisease = () =>
		usePost<{ predict: any }>("/Predict", {
			api: "ai",
			onSuccess: (res: any) =>
				handleSuccess(res.message || "Disease prediction successful"),
			onError: (err) => handleError(err.message || "Prediction failed"),
		});

	const useGetCategory = (enabled = false) =>
		useGet<any>(["diseaseCategory"], "/category", { api: "ai", enabled });

	const useGetSymptom = () =>
		usePost<{ predict: any }>("/symptom", {
			api: "ai",
			onSuccess: (res: any) => {
				return res.data;
			},
			onError: (err) => handleError(err.message || "Symptom retrieval failed"),
		});
	return {
		usePredictDisease,
		useGetCategory,
		useGetSymptom,
	};
};
