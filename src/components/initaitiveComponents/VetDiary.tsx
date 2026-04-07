import React from "react";
import { Dairy } from "@/app/assets/images";
import Image from "next/image";
import { motion } from "framer-motion";

const VetDiary = () => {
	return (
		<div>
			<motion.section
				className="text-center h-auto py-5 bg-[#FAFFF4] relative"
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.6 }}
			>
				<motion.div
					className="flex justify-center items-center md:w-4/5 w-11/12  m-auto py-5 mb-6"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.55, delay: 0.1 }}
				>
					<motion.h2
						className="text-xl md:text-3xl font-bold"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.55, delay: 0.15 }}
					>
						Vet konect Dairy Show
					</motion.h2>
				</motion.div>

				<div className="md:w-4/5 w-11/12 m-auto grid md:grid-cols-2 gap-6">
					<motion.div
						className="col-span-1"
						initial={{ opacity: 0, x: -60 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
					>
						<div className="rounded-xl overflow-hidden shadow-md md:h-auto">
							<Image
								src={Dairy}
								alt="Vet konect training session"
								width={600}
								height={600}
								className="object-cover w-full h-full"
							/>
						</div>
					</motion.div>

					<motion.div
						className="md:w-4/5 w-full m-auto col-span-1"
						initial={{ opacity: 0, x: 60 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.25 }}
						transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
					>
						<motion.p
							className=" text-gray-700 text-left pb-6 text-base md:text-xl leading-relaxed "
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.55, delay: 0.35 }}
						>
							This showcases the full dairy value chain showing how healthy
							animals, good farm management, and proper processing lead to
							better milk.{" "}
						</motion.p>
						<motion.p
							className=" text-gray-700 text-left pb-6 text-base md:text-xl leading-relaxed "
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.55, delay: 0.45 }}
						>
							Built to unlock Africa’s dairy potential, the show promotes better
							practices, smarter investments, and stronger partnerships to drive
							improved nutrition, jobs, and economic growth.
						</motion.p>
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
};

export default VetDiary;
