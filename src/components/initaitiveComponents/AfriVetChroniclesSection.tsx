"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function AfriVetChroniclesSection() {
	return (
		<section className="relative bg-[#FFFEF4] py-16 overflow-hidden">
			<div >
				<div className="md:w-4/5 w-11/12 text-center mx-auto">
					<h2 className="text-lg md:text-3xl font-extrabold text-gray-900">
						Vet konect AfriVet Chronicles
					</h2>

					<p className="text-gray-600 leading-relaxed md:text-xl py-6">
						AfriVet Chronicles is a monthly Pan-African series by Vet Konect
						that celebrates the stories, journeys, and impact of veterinary
						professionals across Africa. By highlighting their passion,
						challenges, and triumphs, the series inspires connection,
						knowledge-sharing, and meaningful action within the veterinary
						community.
					</p>
				</div>
			</div>
		</section>
	);
}
