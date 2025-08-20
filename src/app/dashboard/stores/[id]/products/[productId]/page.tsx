"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Map, Shop, Dog } from "@/app/assets/icons/vet-vendor";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetailsPage = () => {
	const [images] = useState([Shop.src, Dog.src]);
	const [available] = useState(true);

	return (
		<div className="w-11/12 m-auto mt-3">
			<Link
				href="/dashboard/stores/1/products"
				className="flex items-center text-sm text-gray-55 hover:text-green-50"
			>
				<span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
					<ChevronLeft className="w-5 h-5" />
				</span>{" "}
				Back
			</Link>
			<div className="min-h-screen py-2">
				<div className="w-full max-w-6xl shadow-md border rounded-lg border-gray-225 bg-white">
					<div className="relative w-full h-56 rounded-t-xl overflow-hidden">
						<Swiper
							navigation={{
								nextEl: ".swiper-button-next-custom",
								prevEl: ".swiper-button-prev-custom",
							}}
							pagination={{ clickable: true }}
							modules={[Navigation, Pagination]}
							className="w-full h-full"
						>
							{images.map((src, idx) => (
								<SwiperSlide key={idx}>
									<Image
										src={src}
										alt={`Product image ${idx + 1}`}
										fill
										sizes="(max-width: 768px) 100vw, 900px"
										className="object-cover w-full h-full"
									/>
								</SwiperSlide>
							))}
							{/* Custom navigation buttons */}
							<button
								className="swiper-button-prev-custom absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
								aria-label="Previous"
								type="button"
							>
								<ChevronLeft className="w-4 h-4 text-gray-700" />
							</button>
							<button
								className="swiper-button-next-custom absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
								aria-label="Next"
								type="button"
							>
								<ChevronRight className="w-4 h-4 text-gray-700" />
							</button>
						</Swiper>
						<span className="absolute top-4 right-6 bg-white rounded-full px-4 py-2 text-lg font-bold shadow">
							$7.99
						</span>
						<button className="absolute top-4 left-4 bg-white rounded-full p-2 shadow">
							<Link href="/dashboard/stores">
								<span className="text-gray-700">&larr; Back</span>
							</Link>
						</button>
					</div>

					<div className="px-6 py-4">
						<h2 className="font-bold text-xl mb-1">
							Dog Mouth Guard & Belt - PD092201a
						</h2>
						<div className="flex items-center gap-2 mb-2">
							<Image
								src={Map}
								alt="Location"
								width={20}
								height={20}
								className="mr-2"
							/>
							<span className="ml-1">Lagos, Nigeria</span>
						</div>
						<p className="text-gray-500 text-sm mb-4">
							Amet minim mollit non deserunt ullamco est sit aliqua dolor do
							amet sint. Velit officia consequat duis enim velit mollit.
							Exercitation veniam consequat sunt nostrud amet. Amet minim mollit
							non deserunt ullamco est sit aliqua dolor do amet sint. Velit
							officia consequat duis enim velit mollit. Exercitation veniam
							consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco
							est sit aliqua dolor do amet sint. Velit officia.
						</p>
						<div className="flex flex-wrap gap-2 mb-4">
							<span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
								Dog Kits
							</span>
							<span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
								Puppy
							</span>
							<span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
								Golden Retriever
							</span>
							<span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
								Dog Poops
							</span>
						</div>
						<div className="flex items-center justify-center bg-[#F1F1F1] rounded-lg px-4 py-2 mb-4">
							<span className="text-gray-55 text-center text-sm">
								{available ? (
									<div className="flex items-center rounded-lg  text-xs font-medium">
										<span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />

										<span>Available - 370 Units</span>
									</div>
								) : (
									<div className="flex items-center  rounded-lg  text-xs font-medium">
										<span className="w-2 h-2  animate-pulse rounded-full bg-red-700 mr-2 inline-block" />
										<span>Unavailable</span>
									</div>
								)}
							</span>
						</div>
						<button className="w-full bg-primary-400 text-white rounded-lg py-3 font-semibold text-md">
							Promote Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;
