"use client";
import LiveStockForm from "@/components/AnimalOwner/LiveStockForm";
import { useLiveStockService } from "@/services/liveStockService";

const EditFarmPage = ({ params }: { params: { id: string } }) => {
  const { useGetLiveStockById } = useLiveStockService();
  const liveStockData: any = useGetLiveStockById(true, params.id);
  return <LiveStockForm mode="edit" liveStock={liveStockData?.data} />;
};

export default EditFarmPage;
