import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HotNewsChat } from "@/types";


interface HotNewsProps {
	news: HotNewsChat[];
	setShowFull: (val: boolean) => void;
	setActivePost: (post: HotNewsChat) => void;
	setShowComments: (val: boolean) => void;
}

const HotNews = ({
	news,
	setShowFull,
	setActivePost,
	setShowComments,
}: HotNewsProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	// Detect screen size
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const itemsPerPage = isMobile ? 1 : 2;

	const next = () => {
		if (currentIndex < news.length - itemsPerPage)
			setCurrentIndex(currentIndex + itemsPerPage);
	};
	const prev = () => {
		if (currentIndex > 0) setCurrentIndex(currentIndex - itemsPerPage);
	};

	// Slice the array to show correct number of cards
	const visibleNews = news.slice(currentIndex, currentIndex + itemsPerPage);

	return (
		<div className="overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentIndex}
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 50 }}
					transition={{ duration: 0.4 }}
				>
					{visibleNews.map((item) => (
						<div
							key={item.id}
							className="w-full flex-shrink-0 bg-white grid grid-cols-2 p-2 border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
						>
							<div className="h-36">
								<Image
									src={item?.picture_url}
									alt={item?.title}
									width={400}
									height={200}
									className="rounded-md w-full h-full object-cover mb-2"
								/>
							</div>
							<div className="ml-3">
								<div className="flex justify-between items-center mb-3">
									<h4 className="font-semibold md:text-lg text-sm">
										{item.title}
									</h4>
									<span
										onClick={() => {
											setActivePost(item);
											setShowFull(true);
											setShowComments(false);
										}}
										className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-1 flex items-center justify-center"
									>
										<ArrowUpRight size={12} color="#1D2432" />
									</span>
								</div>
								<p className="md:text-sm text-xs font-normal text-gray-55">
									{item.content.slice(0, 100)}...
								</p>
							</div>
						</div>
					))}
				</motion.div>
			</AnimatePresence>

			{/* Navigation */}
			<div className="m-auto mt-7 flex items-center gap-3 justify-center">
				<button
					onClick={prev}
					disabled={currentIndex === 0}
					className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center disabled:opacity-50"
				>
					<ArrowLeft size={12} color="#1D2432" />
				</button>
				<button
					onClick={next}
					disabled={currentIndex >= news.length - itemsPerPage}
					className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center disabled:opacity-50"
				>
					<ArrowRight size={12} color="#1D2432" />
				</button>
			</div>
		</div>
	);
};

export default HotNews;
