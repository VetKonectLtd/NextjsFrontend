"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
	Champion1,
	Champion2,
	Champion3,
	Champion4,
} from "@/app/assets/images";

export default function VetkonectChampionProgram() {
	return (
		<motion.section
			className="relative bg-[#FAFFF4] py-20 overflow-hidden"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6 }}
		>
			<motion.h2
				className="text-2xl md:w-4/5 w-11/12  m-auto pb-8 md:text-3xl font-extrabold text-gray-900"
				initial={{ opacity: 0, x: -40 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.65, ease: "easeOut" }}
			>
				Vet konect Champion Program
			</motion.h2>
			<div className="md:w-4/5 w-11/12 m-auto grid md:grid-cols-3 gap-12 items-start">
				{/* Left Text Section */}
				<motion.div
					className="space-y-4 col-span-1"
					initial={{ opacity: 0, x: -60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
				>
					<motion.p
						className="text-gray-600 leading-relaxed md:text-xl md:max-w-xs"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.6, delay: 0.15 }}
					>
						This equips vet students and One Health learners with skills,
						mentorship, and networking. With 300+ Champions in Nigeria and
						growing chapters in Cameroon, Kenya, and Uganda, the impact is real,
						over 5,000 people reached through awareness campaigns and 800+
						animals supported in vaccination outreaches.
					</motion.p>
				</motion.div>

				{/* Right Image Grid */}
				<motion.div
					className="grid grid-cols-2 col-span-2 gap-4 md:gap-5"
					initial={{ opacity: 0, x: 60 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true, amount: 0.25 }}
					transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
				>
					<motion.div
						className="rounded-xl overflow-hidden shadow-md md:h-60"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.25 }}
					>
						<Image
							src={Champion1}
							alt="Vet konect training session"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</motion.div>

					<motion.div
						className="rounded-xl overflow-hidden shadow-md md:h-48"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.35 }}
					>
						<Image
							src={Champion2}
							alt="Vet konect outreach"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</motion.div>

					<motion.div
						className="rounded-xl overflow-hidden shadow-md md:w-[385px] md:-ml-10 md:h-48"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.45 }}
					>
						<Image
							src={Champion3}
							alt="Vet konect team"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</motion.div>

					<motion.div
						className="rounded-xl overflow-hidden shadow-md md:-mt-12 md:h-60"
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.55 }}
					>
						<Image
							src={Champion4}
							alt="Vet konect community project"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}
