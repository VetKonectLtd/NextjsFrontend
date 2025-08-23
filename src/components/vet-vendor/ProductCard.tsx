import Image from "next/image";
import {
	Phone,
	MessageCircle,
	ShoppingCart,
	ArrowRight,
	Check,
	Mail,
} from "lucide-react";
import { ButtonBg, Map } from "@/app/assets/icons/vet-vendor";
import { GreenButton } from "@/app/assets/icons";

interface ProductCardProps {
	title: string;
	id: string;
	price: number;
	image: string;
	rating?: number;
	seller?: string;
	location: string;
	open: boolean;
	onViewProduct?: (id: string) => void;
}

const ProductCard = ({
	title,
	price,
	image,
	seller,
	rating = 0,
	location,
	open,
	id,
	onViewProduct,
}: ProductCardProps) => {

	const handleViewProduct = () => {
		if (onViewProduct && id) {
			onViewProduct(id);
		}
	};
	return (
		<div className="bg-white rounded-2xl shadow-md flex flex-col relative">

			<div>
				<div className="absolute top-3 left-3 flex items-center gap-2 z-10">
					{open ?
						<div className="flex items-center bg-white rounded-lg px-5 py-1 shadow text-xs font-medium">
							<span className="w-2 h-2 rounded-full bg-green-50 mr-2 inline-block" />
							Open
						</div> : <div className="flex items-center bg-white rounded-lg px-5 py-1 shadow text-xs font-medium">
							<span className="w-2 h-2 rounded-full bg-red-700 mr-2 inline-block" />
							Closed
						</div>
					}
				</div>
				<div className="absolute rounded-full text-white p-1 bg-green-50 top-3 right-3 z-10">
					<Check size={14} />
				</div>
			</div>

			<div className="rounded-t-xl overflow-hidden w-full h-[190px] mb-1 relative">
				<Image
					src={image}
					alt={title}
					width={220}
					height={120}
					className="object-cover w-full h-full"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
				<div className="absolute bottom-0 w-full flex items-center justify-between px-2 mt-1">
					<span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
								fill="#FACC15"
							/>
						</svg>
						<span className="text-white text-xs font-medium">{rating} of 5</span>
					</span>
					<span className="text-lg font-bold text-white">
						${price?.toFixed(2) || '0.00'}
					</span>
				</div>
			</div>

			<div className="p-2 pb-5">
				<div className="flex md:flex-row flex-col justify-between px-2 mt-1">
					<div className="flex items-center">
						<div className="flex flex-col">
							<div className="flex">
								<span className="text-sm font-semibold text-gray-900 truncate max-w-[120px]">
									{title && title.length > 15 ? `${title.slice(0, 15)}...` : title || 'Untitled'}
								</span>
								<span className="ml-3">
									<ShoppingCart size={16} color="#64748B" />
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
						</div>
					</div>
					<div className="flex justify-end">
						<span className="text-xs text-green-500 font-semibold">Ads</span>
					</div>
				</div>

				<div className="flex items-center justify-between px-2 mt-3">
					<div className="flex items-center md:gap-3 gap-2">
						<button className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2">
							<Phone size={14} color="#1D2432" />
						</button>
						<button className="bg-white border border-gray-225 shadow-md rounded-full p-2">
							<MessageCircle size={14} color="#1D2432" />
						</button>
						<button className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2">
							<Mail size={14} color="#1D2432" />
						</button>
					</div>
					{/* View Full Profile Button */}
					<button
						onClick={handleViewProduct}
						className="group transition-transform duration-200 hover:scale-105"
					>
						<Image
							src={GreenButton}
							alt="View profile"
							className="w-12 h-12"
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
