"use client";
import { Copy, Link, Send, Smile } from "lucide-react";
import { VetProfileProps } from "../shared/VetProfile";
import Image from "next/image";
import { Hand, StarFill } from "@/app/assets/icons";
import { useState } from "react";
import ChatBox from "./ChatBox";
import ReactStars from "react-stars";
import { useRatingService } from "@/services/ratingService";

interface VeterinarianProps {
	selectedVet: VetProfileProps | null;
	selectedAction: string | null;
	refetchData:any;
}

const VetAccount = ({ selectedVet, selectedAction, refetchData }: VeterinarianProps) => {
	const [copied, setCopied] = useState<string | null>(null);

	const { useRating } = useRatingService();

	const ratingMutation = useRating();

	const userType = selectedVet?.role == "Veterinarian" ? "App\\Models\\VeterinaryDoctor" : "App\\Models\\VeterinaryParaprofessional";

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
					<p className="text-gray-800">{selectedVet?.location}</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() => handleCopy(selectedVet?.location || "")}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied === selectedVet?.location ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "share" && (
				<>
					<p className="text-gray-55 font-bold">Share Link</p>
					<p className="text-gray-800">
						https://vetkonect.com/{selectedVet?.name}
					</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(`https://vetkonect.com/${selectedVet?.name}`)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied?.startsWith("https://vetkonect.com")
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
