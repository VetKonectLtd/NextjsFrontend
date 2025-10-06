'use client';

import { useState } from 'react';
import VetProfile from './VetProfile';
import AnimalOwnerProfile from './AnimalOwnerProfile';

export type UserRole = 'vet' | 'animal_owner';

interface ProfileProps {
  userRole?: UserRole;
  initialEditMode?: boolean;
}

const Profile = ({ userRole = 'vet', initialEditMode = false }: ProfileProps) => {
  const [isEditMode, setIsEditMode] = useState(initialEditMode);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="min-h-screen">
      {userRole === 'vet' ? (
        <VetProfile 
          isEditMode={isEditMode} 
          onToggleEdit={toggleEditMode}
        />
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
