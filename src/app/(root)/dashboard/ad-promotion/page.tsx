"use client";

import { Bag } from "@/app/assets/icons";
import AdProductForm from "@/components/Ads-promotions/AdProductForm";
import { ChevronLeft, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import AdCard from "@/components/Ads-promotions/AdCard";
import { useSearchParams } from "next/navigation";
import { useAdsPromotionService } from "@/services/adsPromotionService";

const page = () => {
  const [addPromotion, selectAddPromotion] = useState(true);

  const searchParams = useSearchParams();
  const preSelectedId = searchParams.get("productId");

  const { useGetUserPromotions } = useAdsPromotionService();
  const { data: userPromotions, refetch: refetchPromotions } =
    useGetUserPromotions();

  // Map API data to ads format with strong null-safety and sensible defaults
  const ads: any[] = (Array.isArray(userPromotions) ? userPromotions : [])
    .map((promotion: any) => {
      const product = promotion?.product ?? {};
      const id = promotion?.id ?? product?.id;

      // Skip entries without a usable id or product
      if (!id || !product) return null;

      const priceRaw = product?.price;
      const price =
        typeof priceRaw === "number"
          ? priceRaw
          : parseFloat(String(priceRaw ?? 0));

      const availableUnit =
        typeof product?.available_unit === "number"
          ? product.available_unit
          : parseInt(String(product?.available_unit ?? 0));

      return {
        id: String(id),
        productId: product?.id ?? "",
        title: product?.product_name ?? "Untitled Product",
        price: Number.isFinite(price) ? price : 0,
        images: Array.isArray(product?.images_url) ? product.images_url : [],
        rating:
          typeof product?.ratings_average === "number"
            ? product.ratings_average
            : 4.5,
        location: product?.location ?? "",
        units: availableUnit,
        status: promotion?.status === "active" ? "active" : "expired",
        open: Boolean(product?.availability),
        availableUnits: availableUnit > 0,
        endDate: promotion?.end_date ?? null,
      };
    })
    .filter(Boolean) as any[];

  const activeAds = ads.filter((ad) => ad.status === "active");
  const expiredAds = ads.filter((ad) => ad.status === "expired");

  // Format date helper
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-11/12 mt-3 m-auto">
      {addPromotion && (
        <div
          onClick={() => selectAddPromotion(false)}
          className="flex md:hidden items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
        >
          <span className="text-gray-55 text-sm font-semibold">
            Add Promotion
          </span>
          <div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
            <PlusIcon className="w-5 h-5 font-bold text-white " />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3  gap-4 pb-6">
        {ads.length > 0 && (
          <div
            className={`w-full min-h-screen md:col-span-2 ${addPromotion ? "block" : "md:block hidden"} col-span-3 py-8 px-4 mx-auto bg-white shadow-md rounded-xl border border-gray-200`}
          >
            <h2 className="font-bold text-lg mb-4">Ads Promotions</h2>

            {/* Active Section */}
            {activeAds.length > 0 && (
              <div className="mb-6">
                <div className="flex text-center justify-center text-sm py-2 items-center bg-[#E7FFE9] rounded-md mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />
                  <span className="font-semibold">
                    Active - ( Till{" "}
                    {activeAds[0] ? formatDate(activeAds[0].endDate) : ""} )
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 px-6 gap-4">
                  {activeAds.map((ad) => (
                    <AdCard key={ad.id} {...ad} />
                  ))}
                </div>
              </div>
            )}

            {/* Expired Section */}
            {expiredAds.length > 0 && (
              <div>
                <div className="flex text-center justify-center text-sm py-2 items-center bg-[#FFE7E7] rounded-md mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2 inline-block animate-pulse" />
                  <span className="font-semibold">
                    Expired - (On{" "}
                    {expiredAds[0] ? formatDate(expiredAds[0].endDate) : ""})
                    (Renew Ads Promotion)
                  </span>
                </div>

                <div className="grid grid-cols-1 px-6 md:grid-cols-2 gap-4">
                  {expiredAds.map((ad) => (
                    <AdCard key={ad.id} {...ad} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {ads.length === 0 && (
          <div
            className={`w-full  md:h-screen  md:col-span-2 ${addPromotion ? "block" : "md:block hidden"}  px-10 col-span-3 py-8  mx-auto bg-white shadow-md rounded-xl border border-gray-200`}
          >
            <h2 className="font-bold text-left text-md mb-8">Ads Promotions</h2>

            <div className="max-w-xs text-center py-20  flex-col h-full  justify-center m-auto">
              <div className="w-16 h-16 mb-3 m-auto overflow-hidden">
                <Image
                  src={Bag}
                  alt={"Messages"}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              <p className="text-gray-55 font-normal text-base">
                Kindly fill out the form to your right to promote your products.
              </p>
            </div>
          </div>
        )}

        <div
          className={`w-full md:col-span-1 ${addPromotion ? "hidden md:block" : "block"} col-span-3 px-4 pb-6  mx-auto bg-white shadow-md rounded-lg border border-gray-200`}
        >
          <div
            onClick={() => selectAddPromotion(true)}
            className="flex items-center md:hidden text-sm mb-4  mt-2 text-gray-55 hover:text-green-50"
          >
            <span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
              <ChevronLeft className="w-5 h-5" />
            </span>{" "}
            Back
          </div>
          <div className="mb-5 pt-8">
            <h2 className="font-bold text-xl">Ads Promotions</h2>
            <p className="text-gray-500 text-sm">
              You can add a new promotion to your list
            </p>
          </div>
          <AdProductForm preSelectedId={preSelectedId} />
        </div>
      </div>
    </div>
  );
};

export default page;
