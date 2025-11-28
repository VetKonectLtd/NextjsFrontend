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

  // Map backend roles to grouped profiles
  // AnimalOwnerProfile group: vendors | livestock_farmer | pet_owner
  // VetProfile group: veterinarian | paraprofessional | vet_clinic
  const backendRole: string | undefined = (user as any)?.role;

  const derivedUserRole: UserRole | undefined = (() => {
    if (!backendRole) return undefined;
    const role = backendRole.toLowerCase();
    const animalOwnerGroup = new Set([
      "vendors",
      "vendor",
      "livestock_farmer",
      "farmer",
      "pet_owner",
    ]);
    const vetGroup = new Set([
      "veterinarian",
      "paraprofessional",
      "vet_clinic",
      "clinic",
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
