"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Map } from "@/app/assets/icons/vet-vendor";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Megaphone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductService } from "@/services/productService";
import Link from "next/link";

const ProductDetailsPage = ({
  params,
}: {
  params: { productId: string; id: string };
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();
  const { useGetProductById, useDeleteProduct } = useProductService();

  const productDat: any = useGetProductById(true, params.productId);
  const deleteMutation = useDeleteProduct(params.productId);

  const product = productDat.data?.product;

  const handleDelete = () => {
    deleteMutation.mutate(product.id, {
      onSuccess: () => router.replace(`/dashboard/stores/${params.id}`),
    });
  };

  const nextImage = () =>
    setCurrentImageIndex((p) =>
      p === product.images_url.length - 1 ? 0 : p + 1,
    );

  const prevImage = () =>
    setCurrentImageIndex((p) =>
      p === 0 ? product.images_url.length - 1 : p - 1,
    );

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* IMAGE GALLERY */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
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
                  src={product?.images_url[currentImageIndex]}
                  alt={product?.product_name}
                  fill
                  className="object-contain p-6"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-3">
            {product?.images_url?.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border ${
                  i === currentImageIndex
                    ? "border-primary-500"
                    : "border-gray-200"
                }`}
              >
                <Image src={img} alt="Store product image in carousel" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-6">
          {/* HEADER */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  {product?.product_name}
                </h1>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Image src={Map} alt="Location map icon for store address and directions" width={14} height={14} />
                  <span className="ml-2">{product?.location}</span>
                </div>

                <div className="text-3xl font-bold text-gray-900">
                  ₦ {Number(product?.price).toLocaleString()}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/stores/${params.id}/edit/${product?.id}`}
                  className="p-2 rounded-lg border bg-white hover:bg-gray-50"
                >
                  <Edit size={18} />
                </Link>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 rounded-lg border bg-white hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="mt-4">
              {product?.availability ? (
                <div className="inline-flex items-center gap-2 text-green-600 bg-gray-100 text-sm px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-primary-400 rounded-full" />
                  In stock — {product?.available_unit} units
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Out of stock
                </div>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Product Description
            </h3>

            <div
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>

          {/* TAGS */}
          {product?.tags?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PROMOTE */}
          <button
            onClick={() =>
              router.push(`/dashboard/ad-promotion?productId=${product?.id}`)
            }
            className="w-full flex items-center justify-center gap-2 bg-primary-400  text-white py-3 rounded-xl font-semibold shadow-sm"
          >
            <Megaphone size={18} />
            Promote Product
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl"
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
            >
              <h3 className="text-lg font-semibold mb-2">Delete Product?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This product will be permanently removed.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white"
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailsPage;
