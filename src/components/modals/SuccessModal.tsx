"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Success } from "@/app/assets/icons/auth";

const SuccessModal = ({ successOpen, setSuccessOpen }: any) => {
	return (
		<>
			{/* Success Modal */}
			<Dialog open={successOpen} onOpenChange={setSuccessOpen}>
				<DialogContent className="max-w-sm rounded-lg">
					<DialogHeader className="text-center">
						<DialogDescription className="text-base">
                            <div className="mb-6 w-full flex justify-center">
								<span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600">
									<Image
										src={Success}
										alt="success Logo"
										className="object-contain"
									/>
								</span>
							</div>
							<h1 className="text-2xl font-bold text-center text-gray-55 mb-2">
								Congratulations!
							</h1>
							<p className="text-base font-normal text-center text-[#666666] mb-8">
								You have updated your Vet Konect profile. Kindly enjoy all other features present on the system.
							</p>
						</DialogDescription>
					</DialogHeader>

					<Button
						type="button"
						className="w-full py-3 rounded-md text-white text-base font-semibold bg-primary-400 hover:bg-primary-400 transition"
						onClick={() => setSuccessOpen(false)}
					>
						Done
					</Button>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default SuccessModal;
