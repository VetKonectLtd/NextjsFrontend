"use client";
import Image from "next/image";
import { ArrowLeft, Mail, MapPin, Share2, ShoppingBag } from "lucide-react";
import MessageAction from "./MessageAction";
import { Bg22, User } from "@/app/assets/icons";
import { formatRole } from "../shared/TimeFormat";
const DEFAULT_AVATAR = User;

interface VetDetailsProps {
	selectedVet: any;
	selectedAction: string;
	onBack: () => void;
	handleContact: (id: string, type: any) => void;
}

export default function VetDetails({
	selectedVet,
	selectedAction,
	onBack,
	handleContact,
}: VetDetailsProps) {
	return (
		<div className="bg-white md:col-span-1 min-h-[85vh] max-h-[85vh] col-span-4 scrollbar-hide overflow-y-auto rounded-2xl shadow-md w-full max-w-sm border border-gray-200 overflow-hidden">
			<div
				style={{ backgroundImage: `url(${Bg22.src})` }}
				className="bg-gray-100 h-24 relative rounded-t-2xl bg-no-repeat bg-top bg-cover p-4 flex justify-between items-start"
			>
				<button onClick={onBack} className="md:hidden">
					<ArrowLeft className="w-5 h-5 text-gray-700" />
				</button>
			</div>

			<div className="flex flex-col relative items-center p-4 mb-4 -mt-14">
				<div className="w-20 h-20 rounded-full border-2 shadow-sm border-[#52CE06] overflow-hidden">
					<Image
						src={selectedVet?.profile_image || DEFAULT_AVATAR}
						alt={selectedVet?.name}
						width={60}
						height={60}
						className="object-cover w-full h-full"
					/>
				</div>
				<h2 className="font-semibold text-base">{selectedVet?.name}</h2>
				<p className="text-xs text-gray-500">{formatRole(selectedVet?.role)}</p>
				<p className="text-xs text-gray-400">{selectedVet?.location}</p>
			</div>

			{/* Tabs */}
			<div className="flex w-full pb-5 justify-center items-center md:gap-6 gap-2">
				{["product", "mail", "location", "share"].map((type) => (
					<button
						key={type}
						onClick={() => handleContact(selectedVet?.id || "", type as any)}
						className="flex flex-col justify-center items-center space-y-3 text-gray-500"
					>
						<span
							className={`bg-white border ${
								selectedAction === type && "border-gray-55"
							} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
						>
							{type === "product" && <ShoppingBag size={14} color="#1D2432" />}
							{type === "mail" && <Mail size={14} color="#1D2432" />}
							{type === "location" && <MapPin size={14} color="#1D2432" />}
							{type === "share" && <Share2 size={14} color="#1D2432" />}
						</span>
						<span className="text-xs capitalize">{type}</span>
					</button>
				))}
			</div>

			<MessageAction
				selectedMessage={selectedVet}
				selectedAction={selectedAction}
			/>
		</div>
	);
}
