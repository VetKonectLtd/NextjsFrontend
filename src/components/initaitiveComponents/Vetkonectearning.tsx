import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Bot, Learning1, Learning2, Learning3 } from "@/app/assets/images";
import { Autoplay, Pagination } from "swiper/modules";

const Vetkonectearning = () => {
	return (
		<section className="relative bg-[#FEF4EE] min-h-[90vh] py-20 px-6">
			{/* Left text section */}
			<h1 className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-7 leading-snug">
				Vet konect Early Learning <br /> & <br /> Warning System
			</h1>
			<div className="flex flex-col md:flex-row items-center justify-between w-5/6 m-auto gap-10">
				<div className="md:w-1/2 text-center md:text-left">
					<p className="mt-6 text-gray-700 text-base md:text-xl leading-relaxed">
						Vet Konect’s Early Learning & Warning System uses real-time data and
						AI to track livestock health and predict outbreaks before they
						spread. With alerts reaching 120,000+ farmers, communities can take
						quick action against zoonotic and transboundary diseases. The system
						also shares easy-to-use guidelines, best practices, and
						training—strengthening early-warning networks and improving
						preparedness across the livestock sector.
					</p>
				</div>

				{/* Swiper carousel */}
				<div className="relative w-full md:w-1/2">
					<Swiper
						modules={[Autoplay, Pagination]}
						spaceBetween={20}
						slidesPerView={1}
						loop={true}
						autoplay={{ delay: 3000 }}
						className="rounded-xl overflow-hidden shadow-md"
					>
						<SwiperSlide>
							<Image
								src={Learning1}
								alt="Vet konect students"
								width={500}
								height={350}
								className="object-cover w-full h-[300px] md:h-[350px]"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src={Learning2}
								alt="Vet konect field work"
								width={500}
								height={350}
								className="object-cover w-full h-[300px] md:h-[350px]"
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src={Learning3}
								alt="Vet konect field work"
								width={500}
								height={350}
								className="object-contain w-full h-[300px] md:h-[350px]"
							/>
						</SwiperSlide>
					</Swiper>

					{/* Static ₦1500 / USSD Tag */}
					<div className="absolute z-20 top-3 -right-10 flex gap-2 items-center bg-white shadow-sm px-4 py-1 rounded-lg border text-sm font-semibold text-gray-700">
						<div className="h-3 w-3 rounded-full bg-green-700"></div> USSD
					</div>
				</div>
			</div>

			{/* Static bot image at the bottom */}
			<div className="absolute z-20 bottom-12 left-10 md:left-[52%] transform -translate-x-1/2">
				<Image
					src={Bot}
					alt="Bot Icon"
					width={80}
					height={80}
					className="mx-auto"
				/>
			</div>
		</section>
	);
};

export default Vetkonectearning;
