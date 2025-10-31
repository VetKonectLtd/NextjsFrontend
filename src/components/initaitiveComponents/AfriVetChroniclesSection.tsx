"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Chronicle1, Hero2 } from "@/app/assets/images";

export default function AfriVetChroniclesSection() {
	const activities = [
		{
			image: Chronicle1.src,
			text: "An Outreach carried out at Benue state to sensitize farmers, butchers on zoonotic diseases like Brucellosis.",
		},
		{
			image: Hero2.src,
			text: " The Vetkonect AfriVet Chronicles provides a platform for knowledge sharing, collaboration, and storytelling among animal health professionals across the African continent with focus on addressing emerging challenges.",
		},
		{
			image: Chronicle1.src,
			text: "Third activity with image and description.",
		},
	];

	return (
		<section className="relative bg-[#FFFEF4] py-16 overflow-hidden">
			<div className=" text-center">
				<div className="flex md:flex-row flex-col justify-between px-4 pb-5 md:pb-10 max-w-4xl mx-auto items-center">
					<h2 className="text-lg md:text-3xl font-extrabold text-gray-900">
						Vetkonect AfriVet Chronicles
					</h2>
					<div className="flex justify-center items-end gap-3">
						<button
							id="prev-btn"
							className="w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						>
							<ArrowLeft size={16} />
						</button>
						<button
							id="next-btn"
							className="w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						>
							<ArrowRight size={16} />
						</button>
					</div>
				</div>

				{/* Carousel Section */}
				<div className="relative flex justify-center items-center">
					<div className="w-full mx-auto">
						<Swiper
							modules={[Navigation, Autoplay]}
							spaceBetween={90}
							slidesPerView={1.5}
							centeredSlides={true}
							loop
							navigation={{
								prevEl: "#prev-btn",
								nextEl: "#next-btn",
							}}
							breakpoints={{
							0: {
								slidesPerView: 1,
								autoplay: {
									delay: 6000,
									disableOnInteraction: false,
								},
							},
							768: {
								slidesPerView: 1.5,
								autoplay: {
									delay: 6000,
									disableOnInteraction: false,
								},
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
										<p className="mt-4 text-gray-700 px-5 text-sm md:text-base">
											{activity.text}
										</p>
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
