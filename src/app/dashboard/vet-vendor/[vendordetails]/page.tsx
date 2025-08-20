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
import { ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";

const VendorDetailsPage = () => {
	const [images] = useState([Shop.src, Dog.src]);
	const [available] = useState(true);

	return (
		<div className="w-11/12 m-auto mt-3">
			<Link
				href="/dashboard/vet-vendor"
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
									<div className="relative w-full h-full">
										<Image
											src={src}
											alt={`Product image ${idx + 1}`}
											fill
											sizes="(max-width: 768px) 100vw, 900px"
											className="object-cover w-full h-full"
										/>
										
										<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
										
										<span className="absolute bottom-2 right-4 text-white font-bold text-lg">
											$7.99
										</span>
									</div>
								</SwiperSlide>
							))}
							

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
						<div className="absolute bottom-4 right-6 w-full flex items-center justify-between px-2 mt-1">
							<span className="px-4 py-2 text-lg font-bold">$7.99</span>
						</div>
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
						<div className="mt-4">
							<h2 className="font-bold text-gray-55">About</h2>
							<p className="text-gray-500 text-sm mb-4">
								Amet minim mollit non deserunt ullamco est sit aliqua dolor do
								amet sint. Velit officia consequat duis enim velit mollit.
								Exercitation veniam consequat sunt nostrud amet. Amet minim
								mollit non deserunt ullamco est sit aliqua dolor do amet sint.
								Velit officia consequat duis enim velit mollit. Exercitation
								veniam consequat sunt nostrud amet.Amet minim mollit non
								deserunt ullamco est sit aliqua dolor do amet sint. Velit
								officia.
							</p>
						</div>
						<div>
							<div className="flex items-center gap-2">
								<h2 className="font-bold text-gray-55">Disclaimer</h2>
								<CircleAlert className="w-5 h-5 rotate-180" />
							</div>
							<p className="text-gray-500 text-sm mb-4">
								Dear wonderful users, this is just to let you know that you are
								fully responsible the products you purchase on the platform. The
								delivery timeline, location is to be communicated with the
								seller. However, your money is safe until transaction has been
								completed.
							</p>
						</div>
						<div>
							<h2 className="font-bold text-gray-55">Reviews</h2>
							<p className="text-gray-500 text-sm mb-4">
								Amet minim mollit non deserunt ullamco est sit aliqua dolor do
								amet sint. Velit officia consequat duis enim velit mollit.
								Exercitation veniam consequat sunt nostrud amet. Amet minim
								mollit non deserunt ullamco est sit aliqua dolor do amet sint.
							</p>
						</div>
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
							Proceed to Payment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VendorDetailsPage;
