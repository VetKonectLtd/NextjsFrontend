"use client";
import { ArrowLeftIcon, ArrowRightIcon, Copy, Link, Send, Smile, X} from "lucide-react";
import { VetProfileProps } from "../shared/VetProfile";
import Image from "next/image";
import { Hand, StarFill } from "@/app/assets/icons";
import { useState } from "react";
import ChatBox from "./ChatBox";
import ReactStars from "react-stars";
import { useRatingService } from "@/services/ratingService";
import { useVeterinaryService } from "@/services/veterinaryService";
import { useVeterinaryParaprofessionalService } from "@/services/veterinaryParaprofessional";

interface VeterinarianProps {
	selectedVet: VetProfileProps | null;
	selectedAction: string | null;
	refetchData: any;
}

const VetAccount = ({
	selectedVet,
	selectedAction,
	refetchData,
}: VeterinarianProps) => {
	const [copied, setCopied] = useState<string | null>(null);

	const { useRating } = useRatingService();
	const id = selectedVet?.id as any;
	const role = selectedVet?.role as any;
	

	const { useGetVetDoctorById } = useVeterinaryService();
	const { useGetVetParaById } = useVeterinaryParaprofessionalService();

	const { data: getVetDotors } = useGetVetDoctorById(true, id);
	const { data: getVetPara } = useGetVetParaById(true, id);
	const [activeImage, setActiveImage] = useState<number | null>(null);

	const media =
		role == "Veterinarian"
			? (getVetDotors as any)?.veterinary_doctor.user.media
			: (getVetPara as any)?.veterinary_paraprofessional.user.media;

	const ratingMutation = useRating();

	const category = role == "Veterinarian" ? "Veterinarian" : "VPP";

	const userType =
		selectedVet?.role == "Veterinarian"
			? "App\\Models\\VeterinaryDoctor"
			: "App\\Models\\VeterinaryParaprofessional";

	const ratingChanged = (newRating: any) => {
		ratingMutation.mutate(
			{
				rateable_id: selectedVet?.id,
				rateable_type: userType,
				rating: newRating,
			},
			{
				onSuccess: () => {
					refetchData();
				},
			},
		);
	};

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(text);
			setTimeout(() => setCopied(null), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="mt-12 pb-3 text-center w-full m-auto text-gray-500 text-sm">
			{selectedAction === "default" && (
				<>
					<div className="flex justify-center mb-2">
						<Image
							src={Hand.src}
							alt="hand"
							width={50}
							height={50}
							className="object-cover"
						/>
					</div>
					<p className="text-gray-55 font-bold">Hey! Users</p>
					<p className="w-3/5 m-auto">
						Kindly click on the button above to add a new product to your store
					</p>
				</>
			)}

			{selectedAction === "media" && (
				<div className="w-full px-4">
					{/* If no media */}
					{(!media || media.length === 0) && (
						<div className="flex flex-col items-center text-center text-gray-400 mt-6">
							<Image
								src={Hand.src}
								alt="empty"
								width={60}
								height={60}
								className="opacity-40"
							/>
							<p className="text-sm mt-2">No media uploaded yet</p>
						</div>
					)}

					{/* IMAGE PREVIEW MODAL STATE */}
					{media && media.length > 0 && (
						<>
							{/* CLICKABLE MEDIA GRID */}
							<div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
								{media.map((item: any, index: number) => (
									<div
										key={index}
										className="relative w-full h-24 sm:h-28 bg-gray-100 rounded-lg overflow-hidden border cursor-pointer"
										onClick={() => setActiveImage(index)}
									>
										<Image
											src={item.file_url}
											alt={`media-${index}`}
											fill
											className="object-cover"
										/>
									</div>
								))}
							</div>

							{/* MODAL OVERLAY */}
							{activeImage !== null && (
								<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
									<div className="relative w-[90%] max-w-2xl">
										{/* IMAGE */}
										<div className="relative w-full h-[60vh] sm:h-[70vh]">
											<Image
												src={media[activeImage].file_url}
												alt="Preview"
												fill
												className="object-contain rounded-lg"
											/>
										</div>

										{/* CLOSE BUTTON */}
										<button
											onClick={() => setActiveImage(null)}
											className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
										>
											<X size={16} />
										</button>

										{/* LEFT ARROW */}
										{activeImage > 0 && (
											<button
												onClick={() => setActiveImage((prev) => prev! - 1)}
												className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
											>
												<ArrowLeftIcon size={16}/>
											</button>
										)}

										{/* RIGHT ARROW */}
										{activeImage < media.length - 1 && (
											<button
												onClick={() => setActiveImage((prev) => prev! + 1)}
												className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
											>
												<ArrowRightIcon size={16}/>
											</button>
										)}
									</div>
								</div>
							)}
						</>
					)}
				</div>
			)}

			{selectedAction === "phone" && (
				<>
					<p className="text-gray-55 font-bold">User’s Phone Number</p>
					<p className="text-sm mt-2">{selectedVet?.phone}</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() => handleCopy(`${selectedVet?.phone}`)}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied === `${selectedVet?.phone}` ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "message" && <ChatBox selectedVet={selectedVet} />}

			{selectedAction === "mail" && (
				<>
					<p className="text-gray-55 font-bold">User’s Email Address</p>
					<p className="text-sm mt-2">{selectedVet?.email}</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() => handleCopy(`${selectedVet?.email}`)}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "location" && (
				<>
					<p className="text-gray-55 font-bold">Users’ Location</p>
					<p className="text-gray-800">{selectedVet?.address}</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() => handleCopy(selectedVet?.address || "")}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied === selectedVet?.address ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "share" && (
				<>
					<p className="text-gray-55 font-bold">Share Link</p>
					<p className="text-gray-800">
						https://www.vetkonect.com/dashboard/vet-vendor?vet={selectedVet?.id}&category={category}
					</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(`https://www.vetkonect.com/dashboard/vet-vendor?vet=${selectedVet?.id}&category=${category}`)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied?.startsWith(`https://www.vetkonect.com/dashboard/vet-vendor?vet=${selectedVet?.id}&category=${category}`)
								? "Copied!"
								: "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "rate" && (
				<>
					{" "}
					<div className="mb-3 flex items-center justify-center">
						{" "}
						<Image
							src={StarFill}
							alt="filled star"
							className="w-12 h-12"
						/>{" "}
					</div>{" "}
					<p className="text-gray-55 text-2xl font-bold">User Feedback</p>{" "}
					<p className="text-sm mt-2 w-60 m-auto text-gray-55 font-normal ">
						{" "}
						We would like for you to rate this user on a scale of 1 to 5{" "}
					</p>
					<div className="flex justify-center items-center mt-3">
						<ReactStars
							count={5}
							value={selectedVet?.rating || 0}
							onChange={ratingChanged}
							size={24}
							color2={"#ffd700"}
							half={false}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default VetAccount;
