"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
	YounglanTalyoung,
	Team1,
	Team2,
	EyaboGodwin,
	Isa,
	Lucy,
	Abiodun,
	Vivian,
	Nelson,
	Yusuf,
	Fola,
	Moturayo,
	Godwin,
	Jacob,
	Aondover,
	Osakuni,
	Swem,
	Bem,
	Orum,
} from "@/app/assets/images";
import { LinkedInIcon } from "@/app/assets/icons";
import Link from "next/link";
import { useRef } from "react";

interface TeamMember {
	id: number;
	name: string;
	role: string;
	linkedin: string;
	image: any;
	bgColor: string;
}

const teamMembers: TeamMember[] = [
	{
		id: 1,
		name: "Dr. Akpem Terese S.",
		role: "CEO",
		linkedin: "https://www.linkedin.com/in/akpemshadrach",
		image: Team1,
		bgColor: "bg-green-100",
	},
	{
		id: 2,
		name: "Dr. Abiodun Samuel O.",
		role: "COO",
		linkedin: "https://www.linkedin.com/in/oluwaponmile-abiodun-3a915216a",
		image: Abiodun,
		bgColor: "bg-blue-100",
	},
	{
		id: 3,
		name: "Ms. Godwin Eyabo",
		role: "Head of Operations",
		linkedin: "https://www.linkedin.com/in/ogbene-godwin-64b1a0244",
		image: EyaboGodwin,
		bgColor: "bg-white",
	},
	{
		id: 4,
		name: "Dr. Onadeji Motunrayo",
		role: "Head of Marketing",
		linkedin: "https://www.linkedin.com/in/motunrayo-onadeji-388719174",
		image: Moturayo,
		bgColor: "bg-pink-100",
	},
	{
		id: 5,
		name: "Mr. Oyeku Gideon",
		role: "Creative Director & Lead VPPs",
		linkedin: "http://www.linkedin.com/in/oyeku-gideon-8a6580274",
		image: Godwin,
		bgColor: "bg-orange-100",
	},
	{
		id: 6,
		name: "Ms. ⁠Iorhen Vivian S.",
		role: "Social and Community Manager",
		linkedin: "https://www.linkedin.com/in/vivian-seember-iorhen-37a751261",
		image: Vivian,
		bgColor: "bg-white",
	},

	{
		id: 7,
		name: "Dr. Jacob Undo",
		role: "Learning and Development Lead",
		linkedin: "https://www.linkedin.com/in/jacob-undo-4227061a4/",
		image: Jacob,
		bgColor: "bg-white",
	},

	{
		id: 8,
		name: "Mr. Aondover Aondovear ",
		role: "Product Manager",
		linkedin: "https://www.linkedin.com/in/",
		image: Aondover,
		bgColor: "bg-white",
	},
	{
		id: 9,
		name: "Isa Abdulmajeed",
		role: "Product UI/UX Designer",
		linkedin: "https://www.linkedin.com/in/",
		image: Isa,
		bgColor: "bg-white",
	},
	{
		id: 10,
		name: "Osakuni Folashade",
		role: "Volunteer Chair Manager",
		linkedin: "https://www.linkedin.com/in/otitochukwuka-osakuni-110973220",
		image: Osakuni,
		bgColor: "bg-white",
	},
	{
		id: 11,
		name: "Dr. Swem Festus",
		role: "Partnership and Stakeholder Engagement Lead",
		linkedin: "https://www.linkedin.com/in/dr-terhemen-swem-33099a9b/",
		image: Swem,
		bgColor: "bg-white",
	},
	{
		id: 12,
		name: "Dr. Bem Akuve",
		role: "Dairy Programme Facilitator",
		linkedin: "https://www.linkedin.com/in/bem-david-akuve-a3a027141/",
		image: Bem,
		bgColor: "bg-white",
	},
	{
		id: 13,
		name: "Dr. Orum Gabriel Terese",
		role: "Chairperson , Vet Konect Research Committee",
		linkedin: "https://www.linkedin.com/in/terese-gabriel-orum-a91706140",
		image: Orum,
		bgColor: "bg-white",
	},
];

export default function TeamMembersSection() {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scrollLeft = () => {
		scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
	};

	const scrollRight = () => {
		scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
	};

	return (
		<section className="py-16 bg-offbrown overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Heading */}
				<motion.div
					className="mb-12 flex items-center justify-between"
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ amount: 0.3 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-nunito">
						Team Members
					</h2>

					{/* Navigation Arrows - Desktop only */}
					<div className="hidden lg:flex items-center gap-4">
						<button
							onClick={scrollLeft}
							className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80"
							aria-label="Previous slide"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						<button
							onClick={scrollRight}
							className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200 text-gray-600 bg-white hover:bg-gray-50 active:bg-gray-100 shadow-custom hover:shadow-custom/80"
							aria-label="Next slide"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</motion.div>

				{/* Team Members - Circular Overlapping Layout */}
				<div className="w-full h-full">
					{/* Desktop: Overlapping layout */}
					<div
						ref={scrollRef}
						className="hidden lg:block w-full overflow-x-auto scrollbar-hide"
					>
						<div className="relative flex py-6 px-6 items-center">
							{teamMembers.map((member, index) => (
								<motion.div
									key={member.id}
									className="group relative cursor-pointer"
									style={{
										marginLeft: index > 0 ? "-2rem" : "0",
										zIndex: teamMembers.length - index,
									}}
									initial={{ opacity: 0, x: -50, scale: 0.8 }}
									whileInView={{
										opacity: 1,
										x: 0,
										scale: 1,
										transition: {
											duration: 0.6,
											delay: index * 0.15,
											type: "spring",
											stiffness: 120,
										},
									}}
									viewport={{ amount: 0.3 }}
									whileHover={{
										scale: 1.1,
										zIndex: 999,
										transition: { duration: 0.3 },
									}}
								>
									{/* Circular Image Container */}
									<div className="relative w-32 h-32 lg:w-40 lg:h-40">
										{/* Main Circle with proper masking */}
										<div className="relative w-full h-full rounded-full border-4 border-white shadow-lg bg-white group-hover:border-green-400 transition-all duration-300">
											<div className="w-full h-full rounded-full overflow-hidden">
												<Image
													src={member.image}
													alt={member.name}
													width={160}
													height={160}
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
													style={{ borderRadius: "50%" }}
												/>
											</div>
										</div>

										{/* Hover Info Panel */}
										<motion.div
											className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${member.bgColor} rounded-xl p-3 shadow-lg border border-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap min-w-max`}
											initial={{ y: 20, opacity: 0 }}
											whileHover={{ y: 0, opacity: 1 }}
										>
											<h3 className="text-sm text-center font-bold text-gray-900 font-nunito mb-1">
												{member.name}
											</h3>
											<p className="text-xs text-wrap w-52 text-center font-semibold text-green-600">
												{member.role}
											</p>
											<div className="flex items-center justify-center gap-4 mt-3">
												<Link
													href={member.linkedin}
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
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* Mobile: Horizontal Scroll with Interlocking */}
					<div className="lg:hidden overflow-x-auto scrollbar-hide">
						<motion.div
							className="flex pb-4"
							style={{
								width: "max-content",
								paddingLeft: "1rem",
								paddingRight: "2rem",
							}}
							animate={{ x: ["0%", "-100%"] }}
							transition={{
								ease: "linear",
								duration: 100,
								repeat: Infinity,
							}}
						>
							<div
								className="flex py-10"
								style={{
									width: "max-content",
									paddingLeft: "1rem",
									paddingRight: "2rem",
								}}
							>
								{teamMembers.map((member, index) => (
									<div
										key={member.id}
										className="group relative cursor-pointer"
										style={{
											marginLeft: 0,
											marginRight: "1rem",
											zIndex: teamMembers.length - index,
											minWidth: "6rem",
											flexShrink: 0,
										}}
									>
										{/* Circular Image Container */}
										<div className="gap-4 flex w-40 pb-10 pl-4 pr-8 h-40">
											{/* Main Circle */}
											<div className="relative w-full h-full rounded-full border-4 border-white shadow-lg bg-white group-hover:border-green-400 transition-all duration-300">
												<div className="w-full h-full rounded-full overflow-hidden">
													<Image
														src={member.image}
														alt={member.name}
														width={96}
														height={96}
														className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
														style={{ borderRadius: "50%" }}
													/>
												</div>
											</div>

											{/* Name and Role below image */}
											<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
												<h3 className="text-xs font-bold text-gray-900 font-nunito">
													{member.name}
												</h3>
												<p className="text-xs  w-40 text-wrap font-medium text-green-600 mt-1">
													{member.role}
												</p>
												<div className="flex items-center justify-center mt-2">
													<Link
														href={member.linkedin}
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
											</div>
										</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
