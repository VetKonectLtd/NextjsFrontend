"use client";

import { useState } from "react";
import VetProfile from "./VetProfile";
import AnimalOwnerProfile from "./AnimalOwnerProfile";
import { useAuthService } from "@/services/authService";

export type UserRole = "vet" | "animal_owner";

interface ProfileProps {
  userRole?: UserRole; // optional override; if omitted, derive from API
  initialEditMode?: boolean;
}

const Profile = ({ userRole, initialEditMode = false }: ProfileProps) => {
  const [isEditMode, setIsEditMode] = useState(initialEditMode);
  const { useCurrentUser } = useAuthService();
  const { data: user } = useCurrentUser(true);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Map backend roles to grouped profiles using active role id when available
  const apiUser: any = (user as any)?.profile?.user;
  const activeRoleId: number | undefined = apiUser?.active_role_id;

  const activeRoleName: string | undefined = (apiUser?.roles || [])?.find(
    (r: any) => r?.pivot?.role_id === activeRoleId,
  )?.name;
  const backendRoleRaw: string | undefined =
    activeRoleName || (user as any)?.role;
  const normalizeRole = (raw?: string): string | undefined => {
    if (!raw) return undefined;
    const r = raw.toLowerCase();
    const map: Record<string, string> = {
      veterinarian: "vertinary_doctor",
      vet_doctor: "vertinary_doctor",
      vertinary_doctor: "vertinary_doctor",
      paraprofessional: "vertinary_paraprofessional",
      vertinary_paraprofessional: "vertinary_paraprofessional",
      vet_clinic: "vertinary_clinic",
      clinic: "vertinary_clinic",
      vertinary_clinic: "vertinary_clinic",
      vendor: "vendor",
      vendors: "vendor",
      pet_owner: "pet_owner",
      livestock_farmer: "livestock_farmer",
      farmer: "livestock_farmer",
      basic_user: "basic_user",
    };
    return map[r] || r;
  };
  const backendRole: string | undefined = normalizeRole(backendRoleRaw);

  const derivedUserRole: UserRole | undefined = (() => {
    if (!backendRole) return undefined;
    const role = backendRole.toLowerCase();
    const animalOwnerGroup = new Set([
      "vendor",
      "livestock_farmer",
      "pet_owner",
      "basic_user",
    ]);
    const vetGroup = new Set([
      "vertinary_doctor",
      "vertinary_paraprofessional",
      "vertinary_clinic",
    ]);
    if (animalOwnerGroup.has(role)) return "animal_owner";
    if (vetGroup.has(role)) return "vet";
    return undefined;
  })();

  // Final role selection: explicit prop overrides API; else use derived; fallback to vet while loading
  const finalRole: UserRole = userRole ?? derivedUserRole ?? "vet";

  return (
    <div className="min-h-screen">
      {finalRole === "vet" ? (
        <VetProfile isEditMode={isEditMode} onToggleEdit={toggleEditMode} />
      ) : (
        <AnimalOwnerProfile
          isEditMode={isEditMode}
          onToggleEdit={toggleEditMode}
        />
      )}
    </div>
  );
};

export default Profile;
