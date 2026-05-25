import { useGet } from "@/lib/hooks";
import { VENDOR_ENDPOINTS } from "@/lib/api-constants";
import { GetAllVendorResponse } from "@/types";

// Vendor service using hooks
export const useVendorService = () => {
  const useGetAllVendor = (page: number = 1, enabled: boolean = true) => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());

    const url = `${VENDOR_ENDPOINTS.GET_ALL_VENDOR}?${queryParams.toString()}`;

    return useGet<GetAllVendorResponse>(["allVendors", page.toString()], url, {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return {
    useGetAllVendor,
  };
};
