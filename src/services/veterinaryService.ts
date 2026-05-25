import { usePost, useGet } from "@/lib/hooks";
import { VETERINARY_ENDPOINTS } from "@/lib/api-constants";
import {
  VeterinaryDoctor,
  GetNearestVetsRequest,
  GetNearestVetsResponse,
  VetDoctor,
  GetAllVetDoctorResponse,
} from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

// Veterinary service using hooks
export const useVeterinaryService = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  // GET request using useGet hook with mutation-like interface
  const useGetNearestVets = (
    request: GetNearestVetsRequest,
    enabled: boolean = true,
  ) => {
    const queryParams = new URLSearchParams();
    queryParams.append("longitude", request.longitude.toString());
    queryParams.append("latitude", request.latitude.toString());
    if (request.page) queryParams.append("page", request.page.toString());

    const url = `${VETERINARY_ENDPOINTS.GET_NEAREST_DOCTORS}?${queryParams.toString()}`;

    return useGet<GetNearestVetsResponse>(
      [
        "nearestVets",
        request.latitude.toString(),
        request.longitude.toString(),
        (request.page || 1).toString(),
      ],
      url,
      {
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    );
  };

  const useAddVetDoctor = () => {
    return usePost<{ store: VetDoctor; token: string }, VetDoctor>(
      VETERINARY_ENDPOINTS.ADD_VET_DOCTOR,
      {
        onSuccess: (response: any) => {
          handleSuccess(response.message || "Category updated successfully!");
        },
        onError: (error) => {
          handleError(error.message || "failed");
        },
      },
    );
  };

  const useGetVetDoctorById = (enabled: boolean = false, id: string) => {
    return useGet<any>(["getVetById"], VETERINARY_ENDPOINTS.GET_VET_BY_ID(id), {
      enabled,
      staleTime: 0,
    });
  };

  const useGetAllVetDoctor = (page: number = 1, enabled: boolean = true) => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());

    const url = `${VETERINARY_ENDPOINTS.GET_ALL_VET_DOCTOR}?${queryParams.toString()}`;

    return useGet<GetAllVetDoctorResponse>(
      ["allVetDoctors", page.toString()],
      url,
      {
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    );
  };

  return {
    useGetNearestVets,
    useAddVetDoctor,
    useGetAllVetDoctor,
    useGetVetDoctorById,
  };
};

// Helper function to transform API response to component props format
export const transformVetDataToProps = (apiVets: any[]) => {
  return apiVets.map((vet, index) => {
    // Handle both VeterinaryDoctor interface and actual API response structure
    const fullName =
      vet.name ||
      (vet.user
        ? `${vet.user.first_name || ""} ${vet.user.last_name || ""}`.trim()
        : "");
    const location =
      vet.location ||
      (vet.user
        ? `${vet.address || ""}${vet.user.state ? `, ${vet.user.state}` : ""}${vet.user.country ? `, ${vet.user.country}` : ""}`.replace(
            /^,\s*/,
            "",
          )
        : vet.address || "");

    // Calculate rating from ratings array or use average_rating
    const totalRatings = vet.ratings?.length || vet.totalRatings || 0;
    const averageRating =
      totalRatings > 0 && vet.ratings?.length > 0
        ? vet.ratings.reduce(
            (sum: number, r: any) => sum + (r.rating || 0),
            0,
          ) / vet.ratings.length
        : vet.average_rating || vet.rating || 0;

    return {
      id: vet.id?.toString() || String(index),
      name: fullName || "Unknown",
      location: location || "Location not specified",
      image: vet.user?.profile || vet.image || null,
      rating: averageRating,
      totalRatings: totalRatings,
      isAvailable: vet.availability === 1 || vet.isAvailable === true,
      isVerified: vet.is_approved === 1 || vet.isVerified === true,
      role: vet.role || "Veterinarian",
      // Additional data
      email: vet.user?.email || vet.email,
      phone: vet.user?.phone_num || vet.phone,
      userId: vet.user_id?.toString() || vet.user?.id?.toString(),
      specialization: vet.specialty || vet.specialization,
      distance: vet.distance,
      experience: vet.experience,
      clinicName: vet.clinicName,
      clinicAddress: vet.clinicAddress || vet.address,
      consultationFee: vet.consultationFee,
      availableHours: vet.availableHours,
    };
  });
};

// Empty data design for development and testing
export const createEmptyVetData = (): GetNearestVetsResponse => ({
  message: "success",
  veterinary_doctors: {
    current_page: 1,
    data: [],
    first_page_url: "",
    from: null,
    last_page: 1,
    last_page_url: "",
    links: [],
    next_page_url: null,
    path: "",
    per_page: 10,
    prev_page_url: null,
    to: null,
    total: 0,
  },
});
