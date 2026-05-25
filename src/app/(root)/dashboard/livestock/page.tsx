"use client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import FarmCard from "@/components/AnimalOwner/FarmCard";
import { useLiveStockService } from "@/services/liveStockService";
import { LiveStock } from "@/types";
import PetCardSkeleton from "@/components/AnimalOwner/PetCardSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { Hand } from "@/app/assets/icons";

const AnimalOwner = () => {
  const { useGetLiveStock } = useLiveStockService();

  const liveStocksData = useGetLiveStock(true);

  const farms = (liveStocksData.data as Record<string, any>)?.farms.data ?? [];

  return (
    <div className="w-11/12 m-auto bg-white">
      <div className="font-bold text-lg mb-6">Livestock Farms</div>

      <Link
        href="/dashboard/livestock/new-livestock"
        className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
      >
        <span className="text-gray-55 text-sm font-semibold">Add New Farm</span>
        <div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
          <PlusIcon className="w-5 h-5 font-bold text-white " />
        </div>
      </Link>

      <div className="grid md:grid-cols-1 gap-4">
        {liveStocksData.isLoading ? (
          Array.from({ length: 1 }).map((_, i) => <PetCardSkeleton key={i} />)
        ) : farms.length >= 1 ? (
          farms.map((farm: LiveStock) => (
            <FarmCard key={farm.farm_id} {...farm} />
          ))
        ) : (
          <EmptyState
            title="Hey! User"
            description="Kindly click on the button above to add new farm profile"
            image={Hand}
          />
        )}
      </div>
    </div>
  );
};

export default AnimalOwner;
