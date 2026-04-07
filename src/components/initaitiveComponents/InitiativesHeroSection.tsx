"use client";

import { Hero1, Hero2, Hero3 } from "@/app/assets/images";
import { motion } from "framer-motion";
import Image from "next/image";

export default function InitiativesHeroSection() {
	return (
		<section className="relative bg-white py-16 mt-10 w-5/6 md:pr-20 m-auto overflow-hidden">
			<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
				{/* Left Text Section */}
				<motion.div
					className="space-y-4 col-span-1 md:mt-20"
					initial={{ opacity: 0, x: -60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
				>
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
						Initiatives
					</h2>
					<p className="text-gray-55 md:w-72 leading-relaxed md:text-xl">
						This represent our commitment to improving animal health, strengthening communities, and advancing One Health across Africa.
					</p>
				</motion.div>

				{/* Right Images Section */}
				<motion.div
					className="relative flex flex-col col-span-2 items-end md:items-start md:mt-20"
					initial={{ opacity: 0, x: 60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
				>
					<motion.div
						className="relative rounded-xl overflow-hidden shadow-md mb-3 md:mb-8 w-full md:w-11/12 h-[370px]"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						<Image
							src={Hero3}
							alt="Vet konect Initiative group"
							width={600}
							height={400}
							className="object-cover w-full h-full"
						/>
					</motion.div>

					{/* Top image */}
					<motion.div
						className="absolute hidden md:block -top-28 right-0 md:-right-20 transform md:translate-y-10 translate-y-6 rounded-xl overflow-hidden shadow-md w-[50%] md:w-[40%] h-40"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.65, delay: 0.3 }}
					>
						<Image
							src={Hero2}
							alt="Vet konect outreach"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</motion.div>

					{/* Bottom-left overlay image */}
					<motion.div
						className="absolute hidden md:block bottom-0 left-0 md:-left-44 transform md:translate-y-10 translate-y-6 rounded-xl overflow-hidden shadow-md w-[50%] md:w-[45%] h-44"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.65, delay: 0.4 }}
					>
						<Image
							src={Hero1}
							alt="Vet konect outreach"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
