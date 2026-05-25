import { usePost } from "@/lib/hooks";
import { MEDIA } from "@/lib/api-constants";
import { useHandleError, useHandleSuccess } from "@/lib/hooks/useToastHandlers";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/apiClient";

// Media upload service using hooks
// Expects FormData with one or more files under the key `file[]`
// Only jpeg/jpg/png should be appended by the caller
export const useMediaService = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  const useUploadMedia = () => {
    return usePost<any, FormData>(MEDIA.ADD_MEDIA, {
      onSuccess: (response: any) => {
        handleSuccess(response.message || "Media uploaded successfully!");
      },
      onError: (error) => {
        handleError(error.message || "Failed to upload media");
      },
    });
  };

  const useDeleteMedia = () => {
    return useMutation({
      mutationFn: async (id: number | string) =>
        apiClient.delete<any>(MEDIA.DELETE_MEDIA(id)),
      onSuccess: (response: any) => {
        handleSuccess(response.message || "Media deleted successfully");
      },
      onError: (error: any) => {
        handleError(error.message || "Failed to delete media");
      },
    });
  };

  return { useUploadMedia, useDeleteMedia };
};

// Helper to build FormData for multiple image files
// Accepts only image/jpeg and image/png
export function buildImagesFormData(files: File[]): FormData {
  const fd = new FormData();
  files
    .filter((f) => ["image/jpeg", "image/png", "image/jpg"].includes(f.type))
    .forEach((f) => fd.append("file[]", f));
  return fd;
}
