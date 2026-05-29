"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import CategorySelector from "@/components/vet-vendor/CategorySelector";
import SearchBar from "@/components/vet-vendor/SearchBar";
import CategoryTabs from "@/components/vet-vendor/CategoryTabs";
import ProductCard from "@/components/vet-vendor/ProductCard";

import {
  Paws,
  Cow,
  Icon11,
  Icon12,
  Icon13,
} from "@/app/assets/icons/vet-vendor";
import { Bar, Bar2, FullMap, Map2 } from "@/app/assets/images";
import Veterinarian from "@/components/Veterinarian/Veterinarian";
import VeterinaryParaprofessional from "@/components/Veterinarian/VeterinaryParaprofessional";
import VetClinic from "@/components/vetClinic/VetClinic";
// import Vendor from "@/components/Vendor/Vendor";
import { useProductService } from "@/services/productService";
import { Down } from "@/app/assets/icons";
import { useInviteService } from "@/services/inviteService";

export default function VetVendorPage() {
  const [activeTab, setActiveTab] = useState("All");

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Veterinarian";

  // State for selected location from Google Places
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // State for selected country
  const [selectedCountry, setSelectedCountry] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const { useGetAllProduct } = useProductService();
  const productsReq: any = useGetAllProduct(true, page);
  const { useGetUserPoints } = useInviteService();
  const getUserPointsQuery = useGetUserPoints(true);

  const totalPoints =
    (getUserPointsQuery.data as any)?.points[0]?.total_points ?? 0;

  useEffect(() => {
    if (productsReq.data?.products?.data) {
      setAllProducts((prev) => {
        const incoming = productsReq.data.products.data;
        // Prevent duplicates by ID
        const newOnes = incoming.filter(
          (p: any) => !prev.some((x) => x.id === p.id),
        );

        return [...prev, ...newOnes];
      });
    }
  }, [productsReq.data]);

  const handleLoadMore = () => {
    if (productsReq.data?.products?.next_page_url) {
      setPage((prev) => prev + 1);
    }
  };

  // categories
  const categories = [
    { name: "Pet", icon: Paws },
    { name: "Livestock", icon: Cow },
    { name: "Feeds", icon: Icon11 },
    { name: "Drugs", icon: Icon12 },
    { name: "Tool and Materials", icon: Icon13 },
  ];

  // categories tabs
  const tabs = categories.map((c) => {
    const count =
      c.name === "All"
        ? allProducts.length
        : allProducts.filter((p: any) => p.category === c.name).length;
    return { ...c, count };
  });

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);

    const params = new URLSearchParams(window.location.search);
    params.set("category", newCategory);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // products filter
  const filteredProducts =
    activeTab === "All"
      ? allProducts
      : allProducts.filter((p: any) => p.category === activeTab);

  return (
    <div className="w-11/12 m-auto bg-white">
      <div className="font-semibold flex items-end justify-end text-[#0F0F0F]">
        <span>
          <span className="text-gray-500">Total point: </span>
          {totalPoints}
        </span>
      </div>

      <CategorySelector
        activeCategory={activeCategory}
        onSelect={handleCategoryChange}
      />

      <div className="flex md:flex-row flex-col items-center gap-4 w-full py-2">
        <SearchBar
          setSelectedLocation={setSelectedLocation}
          setSelectedCountry={setSelectedCountry}
        />

        {/* {activeCategory == "Vendor" && (
					<div className="flex items-center justify-between md:w-auto w-full md:gap-4">
						<Link href="#">
							<Image src={Cart} alt="Shopping cart icon for veterinary products and e-commerce" width={36} height={36} />
						</Link>

						<div className="flex items-center gap-4">
							<Link href="/dashboard/messages">
								<Image src={Message} alt="Message chat icon for veterinary vendor communication" width={36} height={36} />
							</Link>
							<button className="px-5 py-2 rounded-lg border border-primary-400 text-primary-400 font-medium bg-white">
								Sell
							</button>
						</div>
					</div>
				)} */}

        {/* {(activeCategory === "Veterinarian" ||
					activeCategory === "VPP" ||
					activeCategory === "Vet Clinic") && (
					<div className="flex items-center justify-between md:w-auto w-full md:gap-4">
						<Link href="#" className="p-2 bg-white shadow-md rounded-xl">
							<Image src={Bar} alt="Bar chart icon for vendor sales analytics and statistics" width={36} height={36} />
						</Link>
						<div className="flex items-center gap-4">
							<Link href="#" className="p-2 bg-white shadow-md rounded-xl">
								<Image src={Bar2} alt="Bar chart icon for analytics visualization and performance metrics" width={36} height={36} />
							</Link>
							<Link href="#" className="p-2 bg-white shadow-md rounded-xl">
								<Image src={Map2} alt="Map location icon for veterinary vendor store locator" width={36} height={36} />
							</Link>
						</div>
					</div>
				)} */}
      </div>

      {activeCategory == "Market Place" && (
        <CategoryTabs
          tabs={tabs}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
      )}

      {activeCategory === "Market Place" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {filteredProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                {...product}
                onViewProduct={(id) => router.push(`/dashboard/products/${id}`)}
              />
            ))}
          </div>

          {/* LOAD MORE BUTTON */}
          {productsReq.data?.products?.next_page_url ? (
            <div className="flex justify-center my-6">
              <button
                onClick={handleLoadMore}
                disabled={productsReq.isFetching}
                className="mt-9 text-xs md:text-md flex items-center py-2 px-3 bg-gray-225 font-bold text-gray-55 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {productsReq.isFetching ? "Loading more..." : "Load More"}
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
      )}

      <div className="relative w-full hidden bg-white shadow-md p-2 h-screen rounded-lg overflow-hidden">
        <Image
          src={FullMap}
          alt="VetKonnect Location Map"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {activeCategory == "Veterinarian" && (
        <Veterinarian
          selectedLocation={selectedLocation}
          selectedCountry={selectedCountry}
        />
      )}
      {activeCategory == "VPP" && (
        <VeterinaryParaprofessional selectedLocation={selectedLocation} />
      )}
      {activeCategory == "Vet Clinic" && (
        <VetClinic selectedLocation={selectedLocation} />
      )}
    </div>
  );
}
