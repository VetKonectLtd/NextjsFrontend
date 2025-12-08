"use client";

import { useState, useMemo } from "react";
import VetProfile, { VetProfileProps } from "@/components/shared/VetProfile";
import VetProfileSkeleton from "@/components/shared/VetProfileSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import SelectedVet from "@/components/Veterinarian/SelectedVetDetail";
import { useVendorService } from "@/services/vendorService";
import { VendorData, GetAllVendorResponse } from "@/types";

// Generic vendor placeholder image URL
const GENERIC_VENDOR_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop";

interface VendorProps {
  vendors?: VetProfileProps[];
}

const Vendor: React.FC<VendorProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allVendors, setAllVendors] = useState<VendorData[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<VetProfileProps | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<string>("default");

  const { useGetAllVendor } = useVendorService();
  // Explicitly enable the query
  const {
    data: apiData,
    isLoading,
    error,
    isFetching,
  } = useGetAllVendor(currentPage, true);

  // The API returns the paginated structure directly: { current_page, data: VendorData[], ... }
  // The API client might wrap it in { success, data, message } or return it directly
  // Check if apiData has a 'data' property that contains the vendor array, or if apiData itself is the response
  const vendorResponse =
    (apiData as any)?.data && Array.isArray((apiData as any).data.data)
      ? ((apiData as any).data as GetAllVendorResponse) // Wrapped: { success, data: GetAllVendorResponse }
      : (apiData as any as GetAllVendorResponse | undefined); // Direct: GetAllVendorResponse

  // console.log('Vendor API Debug:', {
  // 	apiData,
  // 	vendorResponse,
  // 	vendorArray: vendorResponse?.data,
  // 	vendorArrayLength: vendorResponse?.data?.length,
  // 	isLoading,
  // 	error
  // }); // Debug log

  // Transform API data to VetProfile props
  const transformedVendors: VetProfileProps[] = useMemo(() => {
    // The vendor API returns the paginated structure directly
    // vendorResponse.data is the array of vendors
    const vendorData = vendorResponse?.data || [];
    // console.log('Transforming vendors:', { vendorData, length: vendorData.length, vendorResponse });

    if (!vendorData || vendorData.length === 0) {
      // console.log('No vendor data found:', { vendorResponse, vendorData, apiData });
      return [];
    }

    // Combine all loaded vendors
    const combinedVendors =
      currentPage === 1 ? vendorData : [...allVendors, ...vendorData];

    // Update allVendors state
    if (vendorData.length > 0 && currentPage > 1) {
      setAllVendors(combinedVendors);
    } else if (currentPage === 1) {
      setAllVendors(vendorData);
    }

    return combinedVendors.map((vendor: VendorData) => {
      const fullName = `${vendor.user.first_name} ${vendor.user.last_name}`;
      const location =
        `${vendor.user.state || ""}, ${vendor.user.country || ""}`.replace(
          /^,\s*|,\s*$/g,
          ""
        );

      return {
        id: vendor.id.toString(),
        name: fullName,
        location: location || "Location not specified",
        role: vendor.role,
        image: vendor.user.profile || GENERIC_VENDOR_IMAGE,
        rating: 0,
        totalRatings: 0,
        isAvailable: true,
        isVerified: false,
        email: vendor.user.email,
        phone: vendor.user.phone_num,
        userId: vendor.user_id.toString(),
      };
    });
  }, [vendorResponse, currentPage, allVendors]);

  const handleViewProfile = (id: string) => {
    const vendor = transformedVendors.find((v) => v.id === id) || null;
    setSelectedVendor(vendor);
  };

  const handleContact = (
    id: string,
    type: "phone" | "media" | "message" | "mail" | "location" | "share" | "rate"
  ) => {
    const vendor = transformedVendors.find((v) => v.id === id);

    if (type === "phone" && vendor?.phone) {
      window.location.href = `tel:${vendor.phone}`;
    } else if (type === "mail" && vendor?.email) {
      window.location.href = `mailto:${vendor.email}`;
    } else if (type === "message") {
      // Open vendor profile and navigate to message section
      handleViewProfile(id);
      setSelectedAction("message");
    } else {
      // console.log("Contact vendor:", id, "via:", type);
      setSelectedAction(type);
    }
  };

  const handleLoadMore = () => {
    if (vendorResponse?.next_page_url) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const hasMorePages = vendorResponse?.next_page_url !== null;

  return (
    <section
      className={`grid gap-6 mt-3 transition-all duration-300 
        ${selectedVendor ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}
    >
      <div
        className={`transition-all duration-300 
          ${selectedVendor ? "lg:col-span-2 md:block hidden" : "lg:col-span-4"}`}
      >
        {isLoading && currentPage === 1 ? (
          <div
            className={`grid mt-3 md:gap-6 gap-3
            ${selectedVendor ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <VetProfileSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            title="Failed to Load"
            description="Failed to load vendors. Please try again."
          />
        ) : transformedVendors.length === 0 ? (
          <EmptyState
            title="No Vendors Found"
            description="There are no vendors available at the moment."
          />
        ) : (
          <>
            <div
              className={`grid mt-3 md:gap-6 gap-3
            ${selectedVendor ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
            >
              {transformedVendors.map((vendor) => (
                <VetProfile
                  key={vendor.id}
                  {...vendor}
                  onViewProfile={handleViewProfile}
                  onContact={handleContact}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMorePages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary-400 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <SelectedVet
        handleContact={handleContact}
        selectedVet={selectedVendor}
        selectedAction={selectedAction}
        setSelectedVet={setSelectedVendor}
      />
    </section>
  );
};

export default Vendor;
