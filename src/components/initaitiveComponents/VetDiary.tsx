import React from "react";
import { Dairy } from "@/app/assets/images";
import Image from "next/image";

const VetDiary = () => {
	return (
		<div>
			<section className="text-center h-auto py-5 bg-[#FAFFF4] relative">
				<div className="flex justify-between items-center w-4/5 m-auto py-5 mb-6">
					<h2 className="text-xl md:text-3xl font-bold">
						Vet konect Dairy Show
					</h2>
				</div>

				<div className="w-4/5 m-auto grid md:grid-cols-2 gap-6">
					<div className="col-span-1">
						<div className="rounded-xl overflow-hidden shadow-md md:h-auto">
							<Image
								src={Dairy}
								alt="Vet konect training session"
								width={600}
								height={600}
								className="object-cover w-full h-full"
							/>
						</div>
					</div>

					<div className="w-4/5 m-auto col-span-1">
						<p className=" text-gray-700 md:text-left pb-6 text-base md:text-xl leading-relaxed ">
							This showcases the full dairy value chain showing how healthy
							animals, good farm management, and proper processing lead to
							better milk.{" "}
						</p>
						<p className=" text-gray-700 md:text-left pb-6 text-base md:text-xl leading-relaxed ">
							Built to unlock Africa’s dairy potential, the show promotes better
							practices, smarter investments, and stronger partnerships to drive
							improved nutrition, jobs, and economic growth.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default VetDiary;
