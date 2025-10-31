import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { SwiperSlide , Swiper} from "swiper/react";
import CurvedImage from "../aboutComponents/CurvedImage";
import { Activity1, Activity2, Activity3 } from "@/app/assets/images";
import { Autoplay, Navigation } from "swiper/modules";

const VetDiary = () => {
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

	return (
		<div>
			<section className="text-center h-auto py-5 bg-[#FAFFF4] relative">
				<div className="flex justify-between items-center w-11/12 m-auto py-5 mb-6">
					<h2 className="text-xl md:text-3xl font-bold">Vetkonect Dairy Show</h2>
					{/* Custom Controls */}
					<div className="flex justify-center mt-4 gap-3">
						<button
							id="prev-btn"
							className="w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						>
							<ArrowLeft size={16} />
						</button>
						<button
							id="next-btn"
							className="w-10 h-10 flex items-center justify-center border border-gray-50 bg-white text-black shadow-sm rounded-full"
						>
							<ArrowRight size={16} />
						</button>
					</div>
				</div>
				<div className="w-full mx-auto">
					<Swiper
						modules={[Navigation, Autoplay]}
						spaceBetween={50}
						slidesPerView={1.8} // show 1 full + part of next
						centeredSlides={true}
						loop
						navigation={{
							prevEl: "#prev-btn",
							nextEl: "#next-btn",
						}}
                        
						className="pb-10"
					>
						{activities.map((activity, i) => (
							<SwiperSlide key={i}>
								<div
									className="flex flex-col items-center md:h-96  transition-transform duration-300
    swiper-slide-active:translate-y-5"
								>
									<CurvedImage src={activity.image} alt="Activity" />
									<p className="mt-4 text-gray-700 text-sm md:text-base">
										{activity.text}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>
		</div>
	);
};

export default VetDiary;
