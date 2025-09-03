"use client";

import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/shared/ProductForm";

export default function NewStorePage() {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<div className="min-h-screen w-11/12 mt-3 m-auto shadow-md border rounded-lg border-gray-225 bg-white">
			<div
				onClick={handleBack}
				className="flex items-center text-sm text-gray-55 hover:text-green-50 ml-4 mt-4"
			>
				<span className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 mr-3">
					<ChevronLeft className="w-5 h-5" />
				</span>{" "}
				Back
			</div>
			<div className="max-w-xs mt-5 mx-auto">
				<div>
					<h1 className="text-3xl font-bold text-gray-55 text-center">
						Product Details
					</h1>
					<p className="text-gray-500 text-sm w-1/2 m-auto text-center mb-6">
						You can add a new Item to your product list
					</p>
				</div>

				<ProductForm />
			</div>
		</div>
	);
}
