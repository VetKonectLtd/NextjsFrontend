import { AnimatePresence, motion } from "framer-motion";
import { Edit, Copy, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdsPromotionService } from "@/services/adsPromotionService";
import Image from "next/image";
import { Map } from "@/app/assets/icons/vet-vendor";
import { useEffect, useState } from "react";

interface AdCardProps {
  // promotion id (for cancellation)
  id: string;
  // underlying product id for view navigation
  productId?: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  location: string;
  units: number;
  availableUnits?: boolean;
  status?: string; // active | expired
}

const AdCard = ({
  title,
  price,
  images,
  rating,
  location,
  units,
  id,
  productId,
  availableUnits,
  status,
}: AdCardProps) => {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { useCancelPromotionAd } = useAdsPromotionService();
  const { mutate: cancelPromotion, isLoading: cancelling } =
    useCancelPromotionAd(id);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-xs rounded-xl border border-gray-200 shadow-md bg-white overflow-hidden">
      {/* Image */}
      <div className="relative">
        <div className="relative w-full h-[140px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt={title}
                fill
                className="object-cover"
                onClick={nextImage}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-2 right-2 flex gap-2">
            {/* View Product */}
            <button
              className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition"
              onClick={() => {
                if (productId) router.push(`/products/${productId}`);
              }}
              aria-label="View Product"
            >
              <Eye size={16} className="text-gray-600" />
            </button>

            {/* Edit (commented out for now) */}
            {false && (
              <button
                className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition"
                aria-label="Edit Promotion"
              >
                <Edit size={16} className="text-gray-600" />
              </button>
            )}

            {/* Copy (still optional; leaving as is or could remove) */}
            {false && (
              <button
                className="p-1.5 bg-white rounded-full shadow hover:bg-gray-100 transition"
                aria-label="Copy Details"
              >
                <Copy size={16} className="text-gray-600" />
              </button>
            )}

            {/* Delete / Cancel Promotion */}
            <button
              className="p-1.5 bg-white rounded-full shadow hover:bg-red-50 transition disabled:opacity-50"
              onClick={() => {
                if (cancelling) return;
                if (window.confirm("Cancel this promotion?")) {
                  cancelPromotion();
                }
              }}
              disabled={cancelling || status === "expired"}
              aria-label="Cancel Promotion"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>

          {/* Price */}
          <div className="absolute bottom-2 right-2 text-white font-bold rounded-md">
            ${price.toFixed(2)}
          </div>

          {/* Indicator dots */}

          <div className="absolute bottom-2 left-2 flex justify-center gap-1">
            {images.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setIndex(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === i
                    ? "bg-white scale-125"
                    : "bg-transparent border hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pt-3">
        <div className="flex">
          <span className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
            {title.length > 18 ? `${title.slice(0, 18)}...` : title}
          </span>
        </div>
        <span className="flex items-center text-xs text-gray-500 mt-1">
          <Image
            src={Map}
            alt="Location"
            width={10}
            height={10}
            className="mr-2"
          />
          <span className="ml-1">{location}</span>
        </span>

        <div className="flex items-center justify-center shadow-md bg-[#F1F1F1] rounded-lg px-4 mt-3 py-2 mb-2">
          <span className="text-gray-55 text-center text-sm">
            {availableUnits ? (
              <div className="flex items-center bg-gray-225 rounded-lg  text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block" />

                <span>Available - ({units} Units)</span>
              </div>
            ) : (
              <div className="flex items-center bg-gray-225  rounded-lg  text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-red-700 mr-2 inline-block" />
                <span>Sold Out</span>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
