"use client";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import StoreProductCard from "@/components/shared/StoreProductCard";
import { useStoreService } from "@/services/storeService";
import { useProductService } from "@/services/productService";
import StoreCardSkeleton from "@/components/shared/StoreCardSkeleton";
import { Product } from "@/types";
import EmptyState from "@/components/shared/EmptyState";
import { Down, Hand } from "@/app/assets/icons";
import { useEffect, useState } from "react";
import Image from "next/image";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { useGetStoreById } = useStoreService();
  const { useGetProductByStore } = useProductService();
  const storeProduct = useGetProductByStore(true, params.id, page);
  const storeData: any = useGetStoreById(true, params.id);

  const store = (storeData.data as Record<string, any>)?.store;
  const product = (storeProduct.data as Record<string, any>)?.products.data;

  // whenever data changes, merge it with existing ones
  useEffect(() => {
    if ((storeProduct.data as Record<string, any>)?.products.data) {
      setAllProducts((prev) => {
        const newOnes = (storeProduct.data as any)?.products.data.filter(
          (a: Product) => !prev.some((p) => p.id === a.id),
        );

        return [...prev, ...newOnes];
      });
    }
  }, [storeProduct.data]);

  const handleLoadMore = () => {
    if ((storeProduct.data as any)?.products?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-11/12 mt-3 m-auto bg-white">
      <h1 className="text-xl capitalize text-gray-55 font-bold mb-4">
        {store?.store_name}
      </h1>

      <Link
        href={`/dashboard/stores/${params.id}/add`}
        className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
      >
        <span className="text-gray-55 text-sm font-semibold">
          Add New Product
        </span>
        <div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
          <PlusIcon className="w-5 h-5 font-bold text-white " />
        </div>
      </Link>

      {storeProduct.isLoading && page === 1 ? (
        <div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        </div>
      ) : allProducts?.length >= 1 ? (
        <>
          <div className="grid grid-cols-2 py-5 sm:grid-cols-3 md:grid-cols-4 md:gap-5 gap-2">
            {allProducts.map((product: Product) => (
              <StoreProductCard
                key={product?.id}
                {...product}
                onViewProduct={(id) =>
                  router.push(`/dashboard/stores/${params.id}/products/${id}`)
                }
              />
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          {(storeProduct.data as any)?.products?.next_page_url ? (
            <div className="flex justify-center my-6">
              <button
                onClick={handleLoadMore}
                disabled={storeProduct.isFetching}
                className="mt-9 text-xs md:text-md flex items-center py-2 px-3 bg-gray-225 font-bold text-gray-55 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {storeProduct.isFetching ? "Loading more..." : "Load More"}
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
            <p className="text-center text-gray-500 py-4">No more products</p>
          )}
        </>
      ) : (
        <EmptyState
          title="Hey! User"
          description="Kindly click on the button above to add new product"
          image={Hand}
        />
      )}
    </div>
  );
};

export default ProductPage;
