"use client";

import { LinkedInIcon, XIcon } from "@/app/assets/icons";
import {
	Activity1,
	Activity2,
	Activity3,
	Gani,
	Koyode,
	Moses,
	Tayo,
} from "@/app/assets/images";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CurvedImage from "./CurvedImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Navigation } from "swiper/modules";

const advisors = [
	{
		name: "Tayo Olosunde",
		image: Tayo.src,
		linkedin: "https://www.linkedin.com/in/tayo-olosunde-51b4021b/",
	},
	{
		name: "Sarah Lee Wolfe",
		image: Koyode,
		linkedin: "https://www.linkedin.com/in/sara-lee-wolfe-garc%C3%ADa-01213266/",
	},

	{
		name: "Dr. Moses Arokoyo",
		image: Moses.src,
		linkedin: "https://www.linkedin.com/in/moses-arokoyo-6587b7172/",
	},

	{
		name: "Dr. Gani Enahoro",
		image: Gani.src,
		linkedin: "https://www.linkedin.com/in/dr-gani-enahoro-79001b21/",
	},
];

const activities = [
	{
		image: Activity1.src,
		text: "An Outreach carried out at Benue state to sensitize farmers, butchers on zoonotic diseases like Brucellosis.",
	},
	{
		image: Activity2.src,
		text: "Another impactful activity description goes here.",
	},
	{
		image: Activity3.src,
		text: "Third activity with image and description.",
	},
];

export default function AdvisoryAndActivities() {
	const swiperRef = useRef<any>(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Start/stop autoplay whenever screen size changes
	useEffect(() => {
		if (!swiperRef.current) return;
		const swiper = swiperRef.current.swiper;
		if (isMobile) {
			swiper.params.autoplay = {
				delay: 5000,
				disableOnInteraction: false,
			};
			swiper.autoplay.start();
		} else {
			swiper.autoplay.stop();
		}
	}, [isMobile]);

	

	return (
		<div className="w-full py-10">
			{/* Advisory Board */}
			<section className="text-center mb-16">
				<h2 className="text-2xl font-bold my-12">Advisory Board</h2>

				<div className="w-11/12 m-auto">
					<Swiper
						ref={swiperRef}
						modules={[Autoplay]}
						spaceBetween={10}
						slidesPerView={1.5}
						breakpoints={{
							768: {
								slidesPerView: 4,
							},
						}}
					>
						{advisors.map((advisor, i) => (
							<SwiperSlide key={i}>
								<motion.div
									initial={{ scale: 0.9, y: 40 }}
									whileInView={{ scale: 1, y: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}
									viewport={{ once: true }}
									className="flex flex-col items-center flex-shrink-0"
								>
									<div className="w-40 h-40 rounded-full border-2 border-[#39C53F] overflow-hidden">
										<Image
											src={advisor.image}
											alt={advisor.name}
											width={160}
											height={160}
											className="object-cover w-full h-full"
										/>
									</div>
									<p className="mt-2 text-base text-[#555555] font-medium">
										{advisor.name}
									</p>
									<div className="flex gap-4 mt-3">
										<Link
											href={advisor.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="w-4 h-4"
										>
											<Image
												src={LinkedInIcon}
												alt="LinkedIn"
												width={20}
												height={20}
												className="object-contain w-full h-full"
											/>
										</Link>
									</div>
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			{/* Activities Carousel */}
			<section className="text-center h-auto py-5 bg-[#FFFEF4] relative">
				<div className="flex justify-between items-center w-11/12 m-auto py-5 mb-6">
					<h2 className="text-2xl font-bold">Activities</h2>
					{/* Custom Controls */}
					<div className="flex justify-center mt-4 gap-3">
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
				<div className="w-full mx-auto">
					<Swiper
						modules={[Navigation, Autoplay]}
						spaceBetween={50}
						slidesPerView={1.8} // show 1 full + part of next
						centeredSlides={true}
						loop
						navigation={{
							prevEl: "#prev-btn",
							nextEl: "#next-btn",
						}}
						className="pb-10"
					>
						{activities.map((activity, i) => (
							<SwiperSlide key={i}>
								<div
									className="flex flex-col items-center  transition-transform duration-300
    swiper-slide-active:translate-y-5"
								>
									<CurvedImage src={activity.image} alt="Activity" />
									<p className="mt-4 text-gray-700 text-sm md:text-base">
										{activity.text}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>
		</div>
	);
}
