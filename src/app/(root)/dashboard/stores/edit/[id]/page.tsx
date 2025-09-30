"use client";
import StoreForm from "@/components/shared/StoreForm";
import { useStoreService } from "@/services/storeService";

const EditStore=({ params }: { params: { id: string }})=> {
        const { useGetStoreById } = useStoreService();
        const storeData:any = useGetStoreById(true, params.id);
        
  return <StoreForm mode="edit" store={storeData?.data} />;
}

export default EditStore;