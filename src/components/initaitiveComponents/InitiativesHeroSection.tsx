"use client";

import { Hero1, Hero2 } from "@/app/assets/images";
import Image from "next/image";

export default function InitiativesHeroSection() {
	return (
		<section className="relative bg-white py-16 mt-10 w-5/6 md:pr-20 m-auto overflow-hidden">
			<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
				{/* Left Text Section */}
				<div className="space-y-4 col-span-1 md:mt-20">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
						Initiatives
					</h2>
					<p className="text-gray-55 md:w-52 leading-relaxed md:text-2xl">
						At Vetkonect, it all starts with taking initiatives
					</p>
				</div>

				{/* Right Images Section */}
				<div className="relative flex flex-col col-span-2 items-end md:items-start md:mt-20">
					<div className="relative rounded-xl overflow-hidden shadow-md mb-3 md:mb-8 w-[100%] h-[370px]">
						<Image
							src={Hero1}
							alt="Vetkonect Initiative group"
							width={600}
							height={400}
							className="object-cover w-full h-full"
						/>
					</div>

					{/* Top image */}
					<div className="absolute hidden md:block -top-28 right-0 md:-right-20 transform md:translate-y-10 translate-y-6 rounded-xl overflow-hidden shadow-md w-[50%] md:w-[40%] h-40">
						<Image
							src={Hero2}
							alt="Vetkonect outreach"
							width={400}
							height={300}
							className="object-cover w-full h-full"
						/>
					</div>

					{/* Bottom-left overlay image */}
					<div className="absolute hidden md:block bottom-0 left-0 md:-left-44 transform md:translate-y-10 translate-y-6 rounded-xl overflow-hidden shadow-md w-[50%] md:w-[45%] h-44">
						<Image
							src={Hero2}
							alt="Vetkonect outreach"
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
