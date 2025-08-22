"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthBg } from "@/app/assets/images";
import { Shop } from "@/app/assets/icons/vet-vendor";
import Image from "next/image";
import { Hand, Lock } from "@/app/assets/icons";
import {
	Share2,
	Plus,
	ChevronLeft,
	SquarePen,
} from "lucide-react";

export default function StoreDetailsPage() {
	const [available, setAvailable] = useState(true);

	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
			<div
				style={{ backgroundImage: `url(${AuthBg.src})` }}
				className="flex  bg-gray-100 h-32 bg-no-repeat bg-top bg-cover justify-between items-start p-4"
			>
				<Link
					href="/dashboard/stores"
					className="flex items-center text-sm text-gray-55 hover:text-green-50"
				>
					<span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
						<ChevronLeft className="w-5 h-5" />
					</span>{" "}
					Back
				</Link>

				<button className="flex items-center text-sm text-gray-55 hover:text-green-50">
					Edit
					<span className="bg-white border text-gray-500 cursor-pointer border-gray-225 shadow-md rounded-full p-1 ml-2">
						<SquarePen className="w-5 h-5" />
					</span>
				</button>
			</div>

			<div className="flex max-w-sm px-4 md:px-0 m-auto flex-col items-center -mt-12">
				<div className="w-24 h-24 rounded-full border-4 border-green-50 overflow-hidden">
					<Image
						src={Shop.src}
						alt="Store"
						width={150}
						height={150}
						className="object-cover w-full h-full"
					/>
				</div>
				<h1 className="mt-3 text-lg font-semibold">Treequote Store</h1>
				<p className="text-sm mt-2 text-gray-500">Store</p>

				<div className="flex flex-col items-center gap-2 mt-6">
					<span className="text-sm text-gray-600">Availability</span>
					<button
						onClick={() => setAvailable(!available)}
						className="w-12 h-6 flex border border-[#51D86F] items-center rounded-full p-1 transition bg-white"
					>
						<span
							className={`w-4 h-4 bg-[#51D86F] rounded-full shadow transform transition ${
								available ? "translate-x-6" : "translate-x-0"
							}`}
						/>
					</button>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-2 mt-6 w-full items-center justify-center  border-b py-7">
					<button className="flex flex-col items-center text-gray-700 space-y-3 ">
						<span className="bg-white border mb-2 hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 mr-3 flex items-center justify-center">
							<Image
								src={Lock.src}
								alt="lock"
								width={24}
								height={24}
								className="object-contain w-6 h-6"
							/>
						</span>

						<span className="text-xs">Products</span>
					</button>
					<button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
						<span className="bg-white border mb-2 hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 mr-3 flex items-center justify-center">
							<Share2 className="w-6 h-6" />
						</span>
						<span className="text-xs">Share</span>
					</button>
				</div>

				<div className="flex max-w-sm items-center justify-between w-full border-2 bg-white border-green-50 rounded-xl p-2 pl-3 mt-8 transition">
					<span className="text-gray-55 text-sm font-bold">Add New Store</span>
					<Link
						href="/dashboard/stores/1/add"
						className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl"
					>
						<Plus className="w-5 h-5 font-bold text-white " />
					</Link>
				</div>

				<div className="mt-10 pb-3 text-center max-w-sm m-auto text-gray-500 text-sm">
					<div className="flex justify-center mb-2">
						<Image
							src={Hand.src}
							alt="hand"
							width={50}
							height={50}
							className="object-cover"
						/>
					</div>
					<p className="text-gray-55 font-bold">Hey! Users </p>

					<p className="w-3/5 m-auto">
						Kindly click on the button above to add a new product to your store
					</p>
				</div>
			</div>
		</div>
	);
}
