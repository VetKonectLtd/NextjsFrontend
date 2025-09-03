"use client";

import ProductForm from "@/components/shared/ProductForm";
import { ChevronLeft, PlusIcon } from "lucide-react";
import React, { useState } from "react";

const page = () => {
	const [addPromotion, selectAddPromotion] = useState(true);
	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto">
			{addPromotion && (
				<div
					onClick={() => selectAddPromotion(false)}
					className="flex md:hidden items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-2 mb-6 transition"
				>
					<span className="text-gray-55 text-sm font-semibold">
						Add Promotion
					</span>
					<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
						<PlusIcon className="w-5 h-5 font-bold text-white " />
					</div>
				</div>
			)}

			<div className="grid grid-cols-3  gap-4">
				<div
					className={`w-full md:col-span-2 ${addPromotion ? "block" : "md:block hidden"} col-span-3 py-8 px-4  mx-auto bg-white shadow-md rounded-xl border border-gray-200`}
				>
					<h2 className="font-bold text-md">Ads Promotions</h2>

					<div className="flex text-center justify-center text-sm py-2 items-center bg-[#E7FFE9]">
						<span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />
						<span className="font-semibold">Active - ( Till Jun 20, 2023)</span>
					</div>

					<div className="flex text-center justify-center text-sm py-2 items-center bg-[#FFE7E7]">
						<span className="w-2 h-2 rounded-full bg-[#FF0000] mr-2 inline-block animate-pulse" />
						<span className="font-semibold">
							{" "}
							Expired - (On Jan 30, 2023) (Renew Ads Promotion)
						</span>
					</div>
				</div>

				<div className={`w-full md:col-span-1 ${addPromotion ? "hidden md:block" : "block"} col-span-3 px-4  mx-auto bg-white shadow-md rounded-lg border border-gray-200`}>
					<div
						onClick={() => selectAddPromotion(true)}
						className="flex items-center md:hidden text-sm mb-4  mt-2 text-gray-55 hover:text-green-50"
					>
						<span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
							<ChevronLeft className="w-5 h-5" />
						</span>{" "}
						Back
					</div>
					<div className="mb-5 pt-8">
						<h2 className="font-bold text-xl">Ads Promotions</h2>
						<p className="text-gray-500 text-sm">
							You can add a new promotion to your list
						</p>
					</div>
					<ProductForm />
				</div>
			</div>
		</div>
	);
};

export default page;
