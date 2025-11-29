import { usePost } from "@/lib/hooks";
import {
    VETERINARY_ENDPOINTS,
    VETERINARY_CLINIC,
    VETERINARY_PARAPROFESSIONAL,
    PET_OwNER_ENDPOINTS,
    LIVE_STOCK_ENDPOINTS,
    STORE,
} from "@/lib/api-constants";
import { VetDoctor, VetClinic, VetParaprofessional } from "@/types";
import { useHandleSuccess, useHandleError } from "@/lib/hooks/useToastHandlers";

/**
 * Service for handling role switching/profile creation
 * Checks if user already has a role and either switches or creates new profile
 */
export const useRoleSwitchingService = () => {
    const handleSuccess = useHandleSuccess();
    const handleError = useHandleError();

    /**
     * Check if a role exists in user's roles array
     * @param user - Current user object from API
     * @param roleKey - Role key to check (e.g., 'veterinarian', 'pet_owner')
     * @returns boolean indicating if role exists
     */
    const hasRole = (user: any, roleKey: string): boolean => {
        if (!user || !user.profile) return false;

        // Map role keys to possible role names in the API
        const roleMap: Record<string, string[]> = {
            vertinary_doctor: [
                "vertinary_doctor",
                "veterinarian",
                "vet_doctor",
                "Veterinarian",
            ],
            vertinary_paraprofessional: [
                "vertinary_paraprofessional",
                "paraprofessional",
                "Veterinary Paraprofessional",
            ],
            vertinary_clinic: [
                "vertinary_clinic",
                "vet_clinic",
                "Veterinary Clinic",
                "clinic",
            ],
            vendor: ["vendor", "Vendor"],
            livestock_farmer: ["livestock_farmer", "Livestock Farmer"],
            pet_owner: ["pet_owner", "Pet Owner"],
        };

        const possibleNames = roleMap[roleKey] || [roleKey];

        // Check in user.profile.roles array if it exists
        const roles = user.profile.roles || [];
        return roles.some((role: any) => {
            const roleName =
                typeof role === "string"
                    ? role
                    : role.role_key || role.key || role.code || role.name || role.role;
            if (!roleName) return false;
            return possibleNames.some(
                (name) => String(roleName).toLowerCase() === String(name).toLowerCase()
            );
        });
    };

    /**
     * Check if role requires form data
     */
    const requiresFormData = (roleKey: string): boolean => {
        return [
            "vertinary_doctor",
            "vertinary_paraprofessional",
            "vertinary_clinic",
        ].includes(roleKey);
    };

    // Veterinarian
    const useSwitchToVeterinarian = () => {
        return usePost<VetDoctor, VetDoctor>(VETERINARY_ENDPOINTS.ADD_VET_DOCTOR, {
            onSuccess: (response: any) => {
                handleSuccess(
                    response.message || "Veterinarian profile created successfully!"
                );
            },
            onError: (error) => {
                handleError(error.message || "Failed to create veterinarian profile");
            },
            invalidateQueries: [["currentUser"]],
        });
    };

    // Paraprofessional
    const useSwitchToParaprofessional = () => {
        return usePost<VetParaprofessional, VetParaprofessional>(
            VETERINARY_PARAPROFESSIONAL.ADD_VET_PROFESSIONAL,
            {
                onSuccess: (response: any) => {
                    handleSuccess(
                        response.message ||
                        "Veterinary paraprofessional profile created successfully!"
                    );
                },
                onError: (error) => {
                    handleError(
                        error.message || "Failed to create paraprofessional profile"
                    );
                },
                invalidateQueries: [["currentUser"]],
            }
        );
    };

    // Vet Clinic
    const useSwitchToVetClinic = () => {
        return usePost<VetClinic, VetClinic>(VETERINARY_CLINIC.ADD_VET_CLINIC, {
            onSuccess: (response: any) => {
                handleSuccess(
                    response.message || "Veterinary clinic profile created successfully!"
                );
            },
            onError: (error) => {
                handleError(error.message || "Failed to create clinic profile");
            },
            invalidateQueries: [["currentUser"]],
        });
    };

    // Pet Owner (no payload)
    const useSwitchToPetOwner = () => {
        return usePost(PET_OwNER_ENDPOINTS.ADD_PET_OWNER, {
            onSuccess: (response: any) => {
                handleSuccess(
                    response.message || "Pet owner profile created successfully!"
                );
            },
            onError: (error) => {
                handleError(error.message || "Failed to create pet owner profile");
            },
            invalidateQueries: [["currentUser"]],
        });
    };

    // Livestock Farmer (no payload)
    const useSwitchToLivestockFarmer = () => {
        return usePost(LIVE_STOCK_ENDPOINTS.ADD_LIVESTOCK_FARMER, {
            onSuccess: (response: any) => {
                handleSuccess(
                    response.message || "Livestock farmer profile created successfully!"
                );
            },
            onError: (error) => {
                handleError(error.message || "Failed to create livestock farmer profile");
            },
            invalidateQueries: [["currentUser"]],
        });
    };

    // Vendor (no payload)
    const useSwitchToVendor = () => {
        return usePost(STORE.ADD_VENDOR, {
            onSuccess: (response: any) => {
                handleSuccess(
                    response.message || "Vendor profile created successfully!"
                );
            },
            onError: (error) => {
                handleError(error.message || "Failed to create vendor profile");
            },
            invalidateQueries: [["currentUser"]],
        });
    };

    return {
        hasRole,
        requiresFormData,
        useSwitchToVeterinarian,
        useSwitchToParaprofessional,
        useSwitchToVetClinic,
        useSwitchToPetOwner,
        useSwitchToLivestockFarmer,
        useSwitchToVendor,
    };
};
