"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
		<motion.section
			className="relative bg-[#FFFEF4] py-16 overflow-hidden"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6 }}
		>
			<div className="">
				<motion.div
					className=" md:w-4/5 w-11/12 text-center mx-auto"
					initial={{ opacity: 0, x: -50 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.65, ease: "easeOut" }}
				>
					<motion.h2
						className="text-lg md:text-3xl font-extrabold text-gray-900 pb-5"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.1 }}
					>
						Women in Poultry Initiative
					</motion.h2>

					<motion.p
						className="text-gray-600 leading-relaxed md:text-xl py-6"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.2 }}
					>
						WIPI empowers rural women with training, starter packs, and access
						to markets, helping them run successful poultry businesses. By
						fostering a supportive community and sustainable opportunities, the
						program strengthens households, boosts incomes, and builds a
						thriving local poultry sector.
					</motion.p>
				</motion.div>

				{/* Carousel Section */}
				<motion.div
					className="relative  w-11/12 mx-auto flex justify-center items-center mt-9"
					initial={{ opacity: 0, x: 60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
				>
					{/* Left Arrow */}
					<motion.button
						id="prev-btn-1"
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.45, delay: 0.3 }}
					>
						<ArrowLeft size={16} />
					</motion.button>

					{/* Right Arrow */}
					<motion.button
						id="next-btn-1"
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.45, delay: 0.35 }}
					>
						<ArrowRight size={16} />
					</motion.button>

					<motion.div
						className="w-full mx-auto"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, delay: 0.25 }}
					>
						<Swiper
							modules={[Navigation, Autoplay]}
							spaceBetween={20}
							slidesPerView={1.5}
							centeredSlides={true}
							loop
							autoplay={{
								delay: 2000,
								disableOnInteraction: false,
							}}
							navigation={{
								prevEl: "#prev-btn-1",
								nextEl: "#next-btn-1",
							}}
							breakpoints={{
								0: {
									slidesPerView: 1,

								},
								768: {
									slidesPerView: 2.5,
								},
							}}
						>
							{activities.map((activity, i) => (
								<SwiperSlide key={i}>
									<motion.div
										className="flex flex-col items-center w-11/12 md:h-auto h-96 m-auto"
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.5, delay: 0.1 }}
									>
										<div className="w-full h-96 overflow-hidden shadow-md rounded-xl">
											<Image
												src={activity.image}
												alt="AfriVet main group"
												width={600}
												height={400}
												className="object-cover w-full h-full"
											/>
										</div>
									</motion.div>
								</SwiperSlide>
							))}
						</Swiper>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}
