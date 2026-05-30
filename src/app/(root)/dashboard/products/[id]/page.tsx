"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Info,
  Minus,
  Plus,
} from "lucide-react";
import { Map } from "@/app/assets/icons/vet-vendor";
import ProductCard from "@/components/vet-vendor/ProductCard";
import { usePaymentService } from "@/services/paymentService";
import { useAuthService } from "@/services/authService";
import { useProductService } from "@/services/productService";
import ProductSkeleton from "@/components/shared/ProductSkeleton";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [units, setUnits] = useState(1);

  const { useCurrentUser } = useAuthService();
  const { useGetRelatedProduct, useGetProductById } = useProductService();
  const { useOrderPayment, usePayment } = usePaymentService();

  const user = useCurrentUser(true);
  const orderPayment = useOrderPayment();
  const paymentMutation = usePayment();

  const productData: any = useGetProductById(true, params.id);
  const product = productData.data?.product;

  const relatedProductsData = useGetRelatedProduct(true, params.id);
  const relatedProducts =
    (relatedProductsData.data as Record<string, any>)?.products?.data || [];

  if (productData.isLoading) return <ProductSkeleton />;

  const handleBack = () => router.back();

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images_url.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images_url.length - 1 : prev - 1,
    );
  };

  const incrementUnits = () => {
    if (units < product.available_unit) setUnits(units + 1);
  };

  const decrementUnits = () => {
    if (units > 1) setUnits(units - 1);
  };

  const handlePayment = () => {
    if (product.product_type == 1) {
      orderPayment.mutate(
        {
          merchant_user_id: product?.user_id,
          product_id: product.id,
          quantity: units,
        },
        {
          onSuccess: (data: any) => {
            if (data?.authorization_url) {
              window.location.href = data.authorization_url;
            }
          },
        },
      );
    } else {
      paymentMutation.mutate(
        {
          merchant_user_id: product?.user_id,
          product_id: product.id,
          quantity: units,
        },
        {
          onSuccess: () => router.replace("/dashboard/messages"),
        },
      );
    }
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }
      />
    ));

  return (
    <div className="w-11/12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="px-4 py-4 flex items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full mr-2 shadow hover:shadow-md text-gray-600"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-medium">Back</span>
      </div>

      {/* PRODUCT MAIN */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* LEFT IMAGE */}
          {product?.images_url?.length > 0 && (
            <div>
              <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images_url[currentImageIndex]}
                      alt={product.product_name}
                      fill
                      className="object-contain p-6"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-3">
                {product.images_url.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden border ${
                      i === currentImageIndex
                        ? "border-green-600"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="Product image in gallery carousel"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* RIGHT INFO */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {product?.product_name}
            </h1>

            <div className="flex items-center text-gray-500 mb-4">
              <Image
                src={Map}
                alt="Location"
                width={14}
                height={14}
                className="mr-2"
              />
              <span className="text-sm">{product?.location}</span>
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-4">
              ₦ {Number(product?.price).toLocaleString() || "0.00"}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <div
                className="prose prose-sm text-gray-600 max-w-none"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            </div>

            {/* Units */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-gray-900">Units</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decrementUnits}
                  disabled={units <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center">{units}</span>
                <button
                  onClick={incrementUnits}
                  disabled={units >= product?.available_unit}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              {product?.available_unit == 0 ? (
                <div className="flex items-center text-red-600 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-600 mr-2 animate-pulse" />
                  Sold Out
                </div>
              ) : (
                <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium">
                  Available ({product?.available_unit})
                </button>
              )}

              <button
                onClick={handlePayment}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STORE CARD */}
      {product?.store && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
          <div className="flex items-start justify-between gap-4">
            {/* LEFT — Seller */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100">
                <Image
                  src={product.store.picture_url}
                  alt={product.store.store_name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="text-sm text-gray-500">Sold by</div>

                <div className="font-semibold text-gray-900 leading-tight">
                  {product.store.store_name}
                </div>

                <div className="text-xs text-gray-500 mt-0.5">
                  {product.store.location}
                </div>
              </div>
            </div>

            {/* RIGHT — Status */}
            <div
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                product.store.availability
                  ? "bg-primary-400 text-white"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {product.store.availability ? "Open" : "Closed"}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-5" />

          {/* Contact */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium text-gray-800">Email:</span>
              <span className="truncate">{product.store.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium text-gray-800">Phone:</span>
              <span>{product.store.phone_number}</span>
            </div>
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <h3 className="text-base font-semibold text-gray-900">Disclaimer</h3>
          <Info size={16} className="ml-2 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Dear wonderful users, this is just to let you know that you are fully
          responsible for the products you purchase on the platform. The
          delivery timeline and location is to be communicated with the seller.
          However, your money is safe until transaction has been completed.
        </p>
      </div>

      {/* REVIEWS */}
      <div className="mb-10">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Reviews</h3>
        {product?.ratings?.length === 0 ? (
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to leave a review!
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product?.ratings.map((review: any) => (
              <div
                key={review.id}
                className="min-w-[280px] bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">
                    {review.user.first_name} {review.user.last_name}
                  </span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TAGS */}
      <div className="mb-10 flex flex-wrap gap-2">
        {product?.tags?.map((tag: any, i: number) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* RELATED PRODUCTS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Similar Products
        </h3>

        {relatedProducts.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No similar products found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p: any) => (
              <ProductCard
                key={p.id}
                id={p.id}
                product_name={p.product_name}
                price={p.price}
                images_url={p.images_url}
                average_rating={p.average_rating}
                seller={p.seller}
                location={p.location}
                availability={p.availability}
                onViewProduct={(id) => router.push(`/dashboard/products/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
