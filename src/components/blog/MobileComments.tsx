import { ButtonBg } from "@/app/assets/icons/vet-vendor";
import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVertical, Send, X } from "lucide-react";
import React from "react";
import Image from "next/image";

const MobileComments = ({ showComments, setShowComments, activePost }: any) => {
	return (
		<AnimatePresence>
			{showComments && (
				<motion.div
					initial={{ y: "100%" }}
					animate={{ y: 0 }}
					exit={{ y: "100%" }}
					transition={{ duration: 0.4 }}
					className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4 md:hidden z-50"
				>
					<div
						className="bg-[#555555] w-40 h-1 mb-2 rounded-full m-auto"
						onClick={() => setShowComments(false)}
					></div>
					<div className="flex justify-between items-center mb-3">
						<h4 className="font-semibold text-lg">Comments</h4>
					</div>
					<div className="space-y-4 max-h-[60vh] overflow-y-auto">
						{activePost.commentsList.length > 0 ? (
							activePost.commentsList.map((c: any) => (
								<div key={c.id} className="pb-2">
									<div className="flex justify-between">
										<div className="flex items-center gap-2 mb-2">
											<div className="w-10 h-10 rounded-full border border-gray-225 overflow-hidden">
												<Image
													src={c?.avatar || "/default-vet.png"}
													alt={c?.name || "Vet"}
													width={40}
													height={40}
													className="object-cover w-full h-full"
												/>
											</div>
											<div>
												<p className="text-sm font-semibold">{c.name}</p>
												<p className="text-xs text-gray-600">{c.time}</p>
											</div>
										</div>
										<button className="">
											<EllipsisVertical className="w-4 h-4"/>
										</button>
									</div>
									<p className="text-sm">{c.text}</p>
								</div>
							))
						) : (
							<p className="text-sm text-gray-500">No comments yet</p>
						)}
					</div>

					{/* Input */}
					<div className="flex mt-3 border-t pt-2">
						<input
							type="text"
							placeholder="Write a comment..."
							className="flex-1 px-3 py-2 text-sm border rounded-l-md"
						/>
						<button
							style={{ backgroundImage: `url(${ButtonBg.src})` }}
							className="px-3 py-2 bg-no-repeat bg-contain bg-primary-400 text-white rounded-r-md"
						>
							<Send size={18} />
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileComments;
