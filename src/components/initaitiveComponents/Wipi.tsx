"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Wipi1, Wipi3, Wipi2, Wipi4, Wipi5 } from "@/app/assets/images";

export default function Wipi() {
	const activities = [
		{ image: Wipi1.src },
		{ image: Wipi2.src },
		{ image: Wipi3.src },
		{ image: Wipi4.src },
		{ image: Wipi5.src },
	];

	return (
		<section className="relative bg-[#FFFEF4] py-16 overflow-hidden">
			<div className="text-center">
				<div className=" w-4/5 mx-auto">
				<h2 className="text-lg md:text-3xl font-extrabold text-gray-900 pb-5">
					Women in Poultry Initiative
				</h2>

				<p className="text-gray-600 md:text-left leading-relaxed md:text-xl py-6">
					WIPI empowers rural women with training, starter packs, and access
					to markets, helping them run successful poultry businesses. By
					fostering a supportive community and sustainable opportunities, the
					program strengthens households, boosts incomes, and builds a
					thriving local poultry sector.
				</p>
				</div>
				
				{/* Carousel Section */}
				<div className="relative  w-11/12 mx-auto flex justify-center items-center mt-9">
					{/* Left Arrow */}
					<button
						id="prev-btn-1"
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
					>
						<ArrowLeft size={16} />
					</button>

					{/* Right Arrow */}
					<button
						id="next-btn-1"
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
					>
						<ArrowRight size={16} />
					</button>

					<div className="w-full mx-auto">
						<Swiper
							modules={[Navigation, Autoplay]}
							spaceBetween={20}
							slidesPerView={1.5}
							centeredSlides={true}
							loop
							navigation={{
								prevEl: "#prev-btn-1",
								nextEl: "#next-btn-1",
							}}
							breakpoints={{
								0: {
									slidesPerView: 1,
									autoplay: { delay: 6000, disableOnInteraction: false },
								},
								768: {
									slidesPerView: 2.5,
									autoplay: { delay: 6000, disableOnInteraction: false },
								},
							}}
						>
							{activities.map((activity, i) => (
								<SwiperSlide key={i}>
									<div className="flex flex-col items-center w-11/12 md:h-auto h-96 m-auto">
										<div className="w-full h-96 overflow-hidden shadow-md rounded-xl">
											<Image
												src={activity.image}
												alt="AfriVet main group"
												width={600}
												height={400}
												className="object-cover w-full h-full"
											/>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
