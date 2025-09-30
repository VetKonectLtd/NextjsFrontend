"use client";
import Link from "next/link";
import { Dog, Shop } from "@/app/assets/icons/vet-vendor";
import { PlusIcon } from "lucide-react";
import StoreCard from "@/components/shared/StoreCard";
import { useRouter } from "next/navigation";
import { useStoreService } from "@/services/storeService";
import { Store } from "@/types";
import EmptyState from "@/components/shared/EmptyState";
import { Hand } from "@/app/assets/icons";
import StoreCardSkeleton from "@/components/shared/StoreCardSkeleton";

const StorePage = () => {
	const { useGetStores } = useStoreService();
	const getStore = useGetStores(true);

	const stores = (getStore.data as Record<string, any>)?.stores.data;

	const router = useRouter();

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
			) : stores?.length >= 1 ? (
				<div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
					{stores.map((store: Store) => (
						<StoreCard
							key={store.id}
							{...store}
							onViewProduct={(id) =>
								router.push(`/dashboard/stores/${id}/products`)
							}
						/>
					))}
				</div>
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
