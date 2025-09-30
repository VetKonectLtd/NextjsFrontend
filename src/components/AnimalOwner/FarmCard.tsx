import { LiveStock } from "@/types";
import {
	Share2,
	SquareArrowOutDownLeft,
	SquareArrowOutUpRight,
	SquarePen,
	Trash,
} from "lucide-react";
import Image from "next/image";
import { useLiveStockService } from "@/services/liveStockService";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { timeAgo } from "../shared/TimeFormat";

const FarmCard = ({
	farm_name,
	picture_url,
	no_of_worker,
	location,
	no_of_livestock,
	livestock_type,
	created_at,
	farm_id,
	id,
	sex,
	age,
}: LiveStock) => {
	const { useDeleteLiveStock } = useLiveStockService();
	const deleteLiveStockMutation = useDeleteLiveStock(id as string);
	const [showDetails, setShowDetails] = useState(false);
	const router = useRouter();

	const handleDeleteLiveStock = () => {
		if (window.confirm(`Are you sure you want to delete ${farm_name}?`)) {
			deleteLiveStockMutation.mutate();
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/dashboard/livestock/farm/${id}/edit`);
	};

	return (
		<div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
			<div className="flex md:flex-row flex-col-reverse justify-center items-center md:justify-between">
				{/* Image + Name */}
				<div className="flex md:flex-row items-center flex-col gap-4">
					<Image
						src={picture_url as string}
						alt={farm_name}
						width={200}
						height={200}
						className="md:w-16 md:h-16 w-16 h-16 m-auto border-2 border-gray-225 rounded-full object-cover"
					/>
					<div className="md:text-left text-center">
						<h2 className="font-bold text-lg">{farm_name}</h2>
						<p className="text-xs text-gray-400">{farm_id}</p>
					</div>
				</div>

				{/* Actions */}
				<div className="flex md:flex-row flex-col mb-5 md:mb-0 items-center md:gap-3 gap-2">
					<span className="px-3 py-1 mb-3 md:mb-0 bg-gray-100 border border-gray-225 text-gray-700 text-sm rounded-full">
						{timeAgo(created_at)}
					</span>
					<div className="flex items-center md:gap-3 gap-2">
						<button onClick={() => handleEdit(id as string)} className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2">
							<SquarePen size={14} color="#1D2432" />
						</button>
						<button
							onClick={handleDeleteLiveStock}
							className="bg-white border border-gray-225 shadow-md rounded-full p-2"
						>
							<Trash size={14} color="#1D2432" />
						</button>
						<button
							onClick={() => setShowDetails(!showDetails)}
							className="bg-white border border-gray-225 shadow-md rounded-full p-2"
						>
							{showDetails ? (
								<SquareArrowOutDownLeft size={14} color="#1D2432" />
							) : (
								<SquareArrowOutUpRight size={14} color="#1D2432" />
							)}
						</button>
						<button className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2">
							<Share2 size={14} color="#1D2432" />
						</button>
					</div>
				</div>
			</div>

			{/* Details */}
			<AnimatePresence>
				{showDetails && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden mt-2 space-y-2 text-sm text-gray-55"
					>
						<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
							<span className="font-semibold">Location / Address</span>{" "}
							{location}
						</p>
						<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
							<span className="font-semibold">Number of Workers</span>{" "}
							{no_of_worker} Workers
						</p>
						<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
							<span className="font-semibold">Type of Livestock</span>{" "}
							{livestock_type}
						</p>
						<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
							<span className="font-semibold">Number of Livestock</span>{" "}
							{no_of_livestock} Livestock
						</p>
						<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
							<span className="font-semibold">Sex</span> {sex}
						</p>
						<p className="flex md:flex-row flex-col justify-center items-center md:justify-between">
							<span className="font-semibold">Age</span> {age}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FarmCard;
