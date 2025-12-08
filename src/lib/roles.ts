export type RoleKey =
    | "vertinary_doctor"
    | "vertinary_paraprofessional"
    | "vertinary_clinic"
    | "vendor"
    | "livestock_farmer"
    | "pet_owner"
    | "others"
    | "basic_user";

export const ROLE_LABELS: Record<RoleKey, string> = {
    vertinary_doctor: "Veterinarian",
    vertinary_paraprofessional: "Paraprofessional",
    vertinary_clinic: "Vet Clinic",
    vendor: "Vendor",
    livestock_farmer: "Livestock Farmer",
    pet_owner: "Pet Owner",
    others: "Others",
    basic_user: "basic_user"
};

// Accept many backend spellings and normalize to RoleKey
const NORMALIZE_MAP: Record<string, RoleKey> = {
    veterinarian: "vertinary_doctor",
    vet_doctor: "vertinary_doctor",
    vertinary_doctor: "vertinary_doctor",
    veterinary_doctor: "vertinary_doctor",
    "veterinary doctor": "vertinary_doctor",

    paraprofessional: "vertinary_paraprofessional",
    "veterinary paraprofessional": "vertinary_paraprofessional",
    vertinary_paraprofessional: "vertinary_paraprofessional",
    veterinary_paraprofessional: "vertinary_paraprofessional",

    vet_clinic: "vertinary_clinic",
    clinic: "vertinary_clinic",
    "veterinary clinic": "vertinary_clinic",
    veterinary_clinic: "vertinary_clinic",
    vertinary_clinic: "vertinary_clinic",

    vendor: "vendor",

    pet_owner: "pet_owner",
    animal_owner: "pet_owner",
    "pet owner": "pet_owner",

    livestock_farmer: "livestock_farmer",
    "livestock farmer": "livestock_farmer",

    others: "others",
    other: "others",
    basic_user: "basic_user"
};

export const normalizeRole = (raw: string): RoleKey | (string & {}) => {
    const r = (raw || "").toLowerCase();
    return NORMALIZE_MAP[r] ?? (r as any);
};

export const ALL_ROLES: Array<{ key: RoleKey; label: string }> = (
    Object.entries(ROLE_LABELS).map(([key, label]) => ({
        key: key as RoleKey,
        label,
    }))
);

// Named constants for role keys to avoid hardcoded strings
export const ROLE = {
    VETERINARIAN: "vertinary_doctor" as RoleKey,
    PARAPROFESSIONAL: "vertinary_paraprofessional" as RoleKey,
    CLINIC: "vertinary_clinic" as RoleKey,
    VENDOR: "vendor" as RoleKey,
    LIVESTOCK_FARMER: "livestock_farmer" as RoleKey,
    PET_OWNER: "pet_owner" as RoleKey,
    OTHERS: "others" as RoleKey,
    BASIC: "basic_user" as RoleKey
} as const;
