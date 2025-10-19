"use client";

import { LinkedInIcon, XIcon } from "@/app/assets/icons";
import {
	Activity1,
	Activity2,
	Activity3,
	Dr_Moses,
	Gani,
	Koyode,
	Moses,
	Tayo,
} from "@/app/assets/images";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CurvedImage from "./CurvedImage";

const advisors = [
	{
		name: "Olosunde",
		image: Tayo.src,
		linkedin: "https://linkedin.com/in/johndoe",
		twitter: "https://x.com/johndoe",
	},
	{
		name: "Olajuwon Kayode",
		image: Koyode,
		linkedin: "https://linkedin.com/in/janesmith",
		twitter: "https://x.com/janesmith",
	},
	{
		name: "Dr. Moses Arokoyo",
		image: Moses.src,
		linkedin: "https://linkedin.com/in/janesmith",
		twitter: "https://x.com/janesmith",
	},
	{
		name: "Dr. Gani Enahoro",
		image: Gani.src,
		linkedin: "https://linkedin.com/in/janesmith",
		twitter: "https://x.com/janesmith",
	},
	{
		name: "Dr. Moses Another",
		image: Dr_Moses.src,
		linkedin: "https://linkedin.com/in/janesmith",
		twitter: "https://x.com/janesmith",
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
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % activities.length);
	};

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? activities.length - 1 : prev - 1));
	};

	return (
		<div className="w-full py-10">
			{/* Advisory Board */}
			<section className="text-center mb-16">
				<h2 className="text-2xl font-bold my-12">Advisory Board</h2>
				<div className="flex justify-between w-11/12 m-auto gap-6 py-10">
					{advisors.map((advisor, i) => (
						// const isActive = index === activeIndex;

						<motion.div
							key={i}
							initial={{ scale: 0.9, y: 40 }}
							// animate={{
							//   scale: isActive ? 1.05 : 0.9,
							//   y: isActive ? -20 : 40,
							//   opacity: isActive ? 1 : 0.6,
							// }}
							transition={{ duration: 0.5 }}
							className="flex flex-col items-center cursor-pointer group"
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
									href={advisor.twitter}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#555555] w-4 h-4 hover:text-gray-700"
								>
									<Image
										src={XIcon}
										alt="Twitter"
										width={100}
										height={100}
										className="object-cover w-full h-full"
									/>
								</Link>
								<Link
									href={advisor.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-[#555555] w-4 h-4 hover:text-gray-700"
								>
									<Image
										src={LinkedInIcon}
										alt="Twitter"
										width={100}
										height={100}
										className="object-cover w-full h-full"
									/>
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Activities Carousel */}
			<section className="text-center bg-[#FFFEF4] relative">
				<div className="flex justify-between items-center w-11/12 m-auto py-5 mb-6">
					<h2 className="text-2xl font-bold mb-6">Activities</h2>
					{/* Controls */}
					<div className="flex justify-center mt-4 gap-3">
						<button
							onClick={handlePrev}
							className="w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						>
							<ArrowLeft size={16} />
						</button>
						<button
							onClick={handleNext}
							className="w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						>
							<ArrowRight size={16} />
						</button>
					</div>
				</div>
				<div className="overflow-hidden relative max-w-3xl mx-auto">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -100 }}
						transition={{ duration: 0.6 }}
						className=""
					>
						<CurvedImage src={activities[currentIndex].image} alt="Activity" />
						<p className="mt-4 text-gray-700 text-base">
							{activities[currentIndex].text}
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
