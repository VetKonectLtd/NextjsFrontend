"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function AfriVetChroniclesSection() {
	return (
		<motion.section
			className="relative bg-[#FFFEF4] py-16 overflow-hidden"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.6 }}
		>
			<div>
				<motion.div
					className="md:w-4/5 w-11/12 text-center mx-auto"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					<motion.h2
						className="text-lg md:text-3xl font-extrabold text-gray-900"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.55, delay: 0.15 }}
					>
						Vet konect AfriVet Chronicles
					</motion.h2>

					<motion.p
						className="text-gray-600 leading-relaxed md:text-xl py-6"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.55, delay: 0.25 }}
					>
						AfriVet Chronicles is a monthly Pan-African series by Vet Konect
						that celebrates the stories, journeys, and impact of veterinary
						professionals across Africa. By highlighting their passion,
						challenges, and triumphs, the series inspires connection,
						knowledge-sharing, and meaningful action within the veterinary
						community.
					</motion.p>
				</motion.div>
			</div>
		</motion.section>
	);
}
