"use client";

import Image from "next/image";
import {
	Champion1,
	Champion2,
	Champion3,
	Champion4,
} from "@/app/assets/images";

export default function VetkonectChampionProgram() {
	return (
		<section className="relative bg-[#FAFFF4] py-20 overflow-hidden">
      <h2 className="text-2xl w-4/5 m-auto pb-8 md:text-3xl font-extrabold text-gray-900">
						Vet konect Champion Program
					</h2>
			<div className="w-4/5 m-auto grid md:grid-cols-3 gap-12 items-start">
				{/* Left Text Section */}
				<div className="space-y-4 col-span-1">
					<p className="text-gray-600 leading-relaxed md:text-2xl md:max-w-xs">
						We are part of Vet konect’s mission to democratize animal health and
						become empowered as students of Veterinary medicine, animal science,
						and related fields to become leaders in our communities.
					</p>
				</div>

				{/* Right Image Grid */}
				<div className="grid grid-cols-2 col-span-2 gap-4 md:gap-5">
					<div className="rounded-xl overflow-hidden shadow-md md:h-60">
						<Image
							src={Champion1}
							alt="Vet konect training session"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</div>

					<div className="rounded-xl overflow-hidden shadow-md md:h-48">
						<Image
							src={Champion2}
							alt="Vet konect outreach"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</div>

					<div className="rounded-xl overflow-hidden shadow-md md:w-[385px] md:-ml-10 md:h-48">
						<Image
							src={Champion3}
							alt="Vet konect team"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</div>

					<div className="rounded-xl overflow-hidden shadow-md md:-mt-12 md:h-60">
						<Image
							src={Champion4}
							alt="Vet konect community project"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
			</div>
</section>
	);
}
