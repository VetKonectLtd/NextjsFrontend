"use client";
import { Copy, Link, Send, Smile } from "lucide-react";
import Image from "next/image";
import { Hand, StarFill } from "@/app/assets/icons";
import { useState } from "react";
import ReactStars from "react-stars";
import { ChatBox } from "@/components/shared";

interface AccountUser {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	location?: string;
	type: "animal_owner" | "veterinarian";
	profileImage?: string;
}

interface AccountActionProps {
	selectedUser: AccountUser | null;
	selectedAction: string | null;
	accountType: "animal_owner" | "veterinarian";
}

const AccountAction = ({ selectedUser, selectedAction, accountType }: AccountActionProps) => {
	const [copied, setCopied] = useState<string | null>(null);

	const ratingChanged = (newRating: any) => {
		console.log(newRating);
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

	const getWelcomeMessage = () => {
		if (accountType === "animal_owner") {
			return {
				title: "Hey! Animal Owner",
				description: "Manage your pet profiles and connect with veterinary professionals"
			};
		} else {
			return {
				title: "Hey! Veterinarian",
				description: "Manage your professional profile and connect with pet owners"
			};
		}
	};

	const welcomeMessage = getWelcomeMessage();

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
					<p className="text-gray-55 font-bold">{welcomeMessage.title}</p>
					<p className="w-3/5 m-auto">
						{welcomeMessage.description}
					</p>
				</>
			)}

			{selectedAction === "phone" && (
				<>
					<p className="text-gray-55 font-bold">Phone Number</p>
					<p className="text-sm mt-2">{selectedUser?.phone || "+234 5678 910"}</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() => handleCopy(selectedUser?.phone || "+234 5678 910")}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied === (selectedUser?.phone || "+234 5678 910") ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "message" && selectedUser && (
				<ChatBox
					selectedUser={{
						name: selectedUser.name,
						image: selectedUser.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&size=150&background=0B6614&color=fff`,
						role: accountType === "veterinarian" ? "Veterinarian" : "Animal Owner"
					}}
					placeholder={`Send a message to ${selectedUser.name}...`}
					onSendMessage={(message) => {
						console.log("Message sent to", selectedUser.name, message);
						// Handle message sending logic here
					}}
				/>
			)}

			{selectedAction === "mail" && (
				<>
					<p className="text-gray-55 font-bold">Email Address</p>
					<p className="text-sm mt-2">
						{selectedUser?.email || `${selectedUser?.name?.split(" ")[0]?.toLowerCase()}@gmail.com`}
					</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(
									selectedUser?.email || `${selectedUser?.name?.split(" ")[0]?.toLowerCase()}@gmail.com`
								)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied?.includes("@") ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "location" && (
				<>
					<p className="text-gray-55 font-bold">Location</p>
					<p className="text-gray-800">{selectedUser?.location || "Location not specified"}</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() => handleCopy(selectedUser?.location || "Location not specified")}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied === selectedUser?.location ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "share" && (
				<>
					<p className="text-gray-55 font-bold">Share Profile</p>
					<p className="text-gray-800">
						https://vetkonect.com/profile/{selectedUser?.id || selectedUser?.name}
					</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(`https://vetkonect.com/profile/${selectedUser?.id || selectedUser?.name}`)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied?.startsWith("https://vetkonect.com/profile")
								? "Copied!"
								: "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "rate" && (
				<>
					<div className="mb-3 flex items-center justify-center">
						<Image
							src={StarFill}
							alt="filled star"
							className="w-12 h-12"
						/>
					</div>
					<p className="text-gray-55 text-2xl font-bold">
						{accountType === "veterinarian" ? "Rate Veterinarian" : "Rate Service"}
					</p>
					<p className="text-sm mt-2 w-60 m-auto text-gray-55 font-normal">
						Please rate your experience on a scale of 1 to 5 stars
					</p>
					<div className="flex justify-center items-center mt-3">
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={24}
							color2={"#ffd700"}
						/>
					</div>
				</>
			)}

			{selectedAction === "edit" && (
				<>
					<p className="text-gray-55 font-bold">Edit Profile</p>
					<p className="text-sm mt-2 w-60 m-auto text-gray-55">
						Update your {accountType === "veterinarian" ? "professional" : "personal"} information
					</p>
					<div className="flex items-center py-3 justify-center">
						<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
							Edit Profile
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default AccountAction;
