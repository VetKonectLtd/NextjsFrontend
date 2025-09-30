"use client";
import PetForm from "@/components/AnimalOwner/PetForm";
import { usePetOwnerService } from "@/services/petOwnerService";

const EditPetPage=({ params }: { params: { id: string }})=> {
        const { useGetPetOwnerById } = usePetOwnerService();
        const petData:any = useGetPetOwnerById(true, params.id);
        
  return <PetForm mode="edit" pet={petData?.data} />;
}

export default EditPetPage;