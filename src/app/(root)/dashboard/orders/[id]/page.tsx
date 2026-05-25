"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Warning } from "@/app/assets/icons";
import { useOrderService } from "@/services/orderService";
import { useAuthService } from "@/services/authService";
import Link from "next/link";
import ReactStars from "react-stars";
import { useRatingService } from "@/services/ratingService";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { useCurrentUser } = useAuthService();
  const { useGetOrderById } = useOrderService();

  const { data: ordersData, refetch } = useGetOrderById(true, params?.id);
  const user = useCurrentUser(true);

  const currentUserId = (user as any)?.data?.profile?.user_id;
  const order = (ordersData as any)?.order;

  const product = {
    tracking_number: order?.tracking_number,
    id: order?.id,
    product_name: order?.items?.product_name,
    price: Number(order?.items?.price),
    location: order?.buyer?.address ?? "Unknown",
    payment_method: order?.payment_method,
    status: order?.status,
    description: order?.items?.product_snapshot?.description,
    images_url: order?.items?.product_snapshot?.images_url ?? [],
  };

  const isBuyer = order?.buyer_user_id === currentUserId;

  const progressSteps = [
    "Payment_Initiated",
    "Pending_Confirmation",
    "Processing_Product(s)",
    "In_Transit",
    "Delivered",
  ];

  const trackingStatus = order?.tracking_status;
  const currentStep = progressSteps.indexOf(trackingStatus);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { useRating } = useRatingService();
  const rateMerchantMutation = useRating();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  const handleRating = () => {
    rateMerchantMutation.mutate(
      {
        rateable_id: product.id,
        rateable_type: "App\\Models\\Products",
        rating: rating,
        comment: review,
      },
      {
        onSuccess: () => {
          setReview("");
          setRating(0);
          refetch();
        },
      },
    );
  };

  return (
    <main className="w-11/12 mx-auto px-4 py-6">
      {/* Back */}
      <div
        className="flex cursor-pointer items-center mb-6"
        onClick={() => router.back()}
      >
        <div className="bg-white p-1 mr-3 rounded-full shadow border">
          <ChevronLeft size={20} />
        </div>
        <h1 className="text-lg font-semibold">Order Details</h1>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm">
        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* ---------------- IMAGE GALLERY ---------------- */}
          <div>
            <div className="relative h-[420px] bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={product.images_url[currentImageIndex]}
                alt={product.product_name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images_url.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border ${
                    i === currentImageIndex
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ---------------- PRODUCT DETAILS ---------------- */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {product.product_name}
              </h1>

              <p className="text-3xl font-bold text-green-600 mt-2">
                ₦{product.price.toLocaleString()}
              </p>
            </div>

            {/* Info Card */}
            <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Tracking ID:</span>{" "}
                <span className="font-medium">{product.tracking_number}</span>
              </p>

              <p className="text-sm">
                <span className="text-gray-500">Sold by:</span>{" "}
                <span className="font-medium">
                  {order?.merchant?.first_name} {order?.merchant?.last_name}
                </span>
              </p>

              <p className="text-sm">
                <span className="text-gray-500">Payment Method:</span>{" "}
                <span className="font-medium">{product.payment_method}</span>
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Product Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tracking */}
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-4">
                Order Status: {trackingStatus}
              </h3>

              <div className="relative w-full">
                {/* Track Background */}
                <div className="absolute top-2 left-[5%] right-[5%] h-1 bg-gray-200"></div>

                {/* Active Progress Line */}
                <div
                  className="absolute top-2 left-[5%] h-1 bg-green-600 transition-all duration-500"
                  style={{
                    width: `${(currentStep / (progressSteps.length - 1)) * 90}%`,
                  }}
                ></div>

                {/* Step Indicators */}
                <div className="flex justify-between relative z-10">
                  {progressSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-full"
                    >
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all ${
                          index <= currentStep
                            ? "bg-green-600 border-green-600"
                            : "bg-white border-gray-300"
                        }`}
                      ></div>

                      <span
                        className={`text-[10px] mt-2 text-center w-16 leading-tight ${
                          index <= currentStep
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {step.replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-center text-xs text-gray-500 gap-3">
              <Image src={Warning} alt="warning" width={18} height={18} />
              Please make sure you confirm delivery after receiving the item.
            </div>

            {/* Rating */}
            {isBuyer && (
              <div className="border rounded-lg p-5 bg-gray-50">
                <h3 className="font-semibold mb-3">Rate Your Experience</h3>

                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  color2={"#ffd700"}
                />

                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write a review"
                  className="w-full border rounded-md p-3 text-sm mt-4"
                  rows={3}
                />

                <button
                  onClick={handleRating}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
                >
                  Submit Rating
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard/vet-vendor?category=Vendor"
                className="w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold"
              >
                Buy Again
              </Link>
            </div>

            <p className="text-xs text-gray-500">
              <strong>Return Policy:</strong> Contact support within 24 hours of
              delivery for complaints or refund issues.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
