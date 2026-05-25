"use client";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import StoreCard from "@/components/shared/StoreCard";
import { useRouter } from "next/navigation";
import { useStoreService } from "@/services/storeService";
import { Store } from "@/types";
import EmptyState from "@/components/shared/EmptyState";
import { Down, Hand } from "@/app/assets/icons";
import StoreCardSkeleton from "@/components/shared/StoreCardSkeleton";
import { useAuthService } from "@/services/authService";
import { useEffect, useState } from "react";
import Image from "next/image";

const StorePage = () => {
  const { useGetStoreByUserId } = useStoreService();
  const { useCurrentUser } = useAuthService();
  const [page, setPage] = useState(1);
  const [allStores, setAllStores] = useState<Store[]>([]);

  const user = useCurrentUser(true);

  const getStore = useGetStoreByUserId(
    true,
    (user as Record<string, any>).data?.profile?.user?.id,
    page,
  );

  const stores = (getStore.data as Record<string, any>)?.store?.data;

  const router = useRouter();

  useEffect(() => {
    if ((getStore.data as any)?.store.data) {
      setAllStores((prev) => {
        const newStores = (getStore.data as any)?.store.data.filter(
          (s: Store) => !prev.some((p) => p.id === s.id),
        );
        return [...prev, ...newStores];
      });
    }
  }, [getStore.data]);

  const handleLoadMore = () => {
    if ((getStore.data as any)?.store.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-11/12 mt-3 m-auto bg-white">
      <h1 className="text-xl text-gray-55 font-bold mb-4">My Store</h1>

      <Link
        href="/dashboard/stores/new"
        className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
      >
        <span className="text-gray-55 text-sm font-semibold">
          Add New Store
        </span>
        <div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
          <PlusIcon className="w-5 h-5 font-bold text-white " />
        </div>
      </Link>

      {getStore.isLoading ? (
        <div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.from({ length: 1 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      ) : allStores?.length >= 1 ? (
        <>
          <div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {allStores.map((store: Store) => (
              <StoreCard
                key={store.id}
                {...store}
                onViewProduct={(id) =>
                  router.push(`/dashboard/stores/${id}/products`)
                }
              />
            ))}
          </div>

          {(getStore.data as any)?.store.next_page_url ? (
            <div className="m-auto  md:w-1/3 justify-center sticky bottom-0 flex">
              <button
                onClick={handleLoadMore}
                disabled={getStore.isFetching}
                className="mt-9 text-xs md:text-md flex items-center py-2 px-3 bg-gray-225 font-bold text-gray-55 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {getStore.isFetching ? "Loading more..." : "Loading more"}{" "}
                <Image
                  src={Down}
                  alt="down"
                  width={120}
                  height={120}
                  className="h-5 w-5 ml-3 animate-bounce object-cover"
                />
              </button>
            </div>
          ) : (
            <p className="text-gray-55 text-center py-2 text-sm">
              No more activities
            </p>
          )}
        </>
      ) : (
        <EmptyState
          title="Hey! User"
          description="Kindly click on the button above to add new store"
          image={Hand}
        />
      )}
    </div>
  );
};

export default StorePage;
