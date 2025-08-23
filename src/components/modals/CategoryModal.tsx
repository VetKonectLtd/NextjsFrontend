"use client";

import * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Success } from "@/app/assets/icons/auth";
import SuccessModal from "./SuccessModal";
import VeterinarianFormModal from "./VeterinarianFormModal";
import VetClinicFormModal from "./VetClinicFormModal";

const categories = [
	"Pet Owner",
	"Veterinarian",
	"Livestock Farmer",
	"Veterinary Paraprofessional",
	"Vendor",
	"Veterinary Clinic",
	"Others",
];

const CategoryModal = () => {
	const [selected, setSelected] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false);
	const [progressOpen, setProgressOpen] = useState(false);
	const [progressOpen1, setProgressOpen1] = useState(false);

	const handleSave = () => {
		if (selected) {
			console.log("Selected category:", selected);
			setOpen(false);

			if (selected === "Veterinarian") {
				setProgressOpen(true);
			}
			else if (selected === "Veterinary Clinic") {
				setProgressOpen1(true);
			} 
			else {
				setSuccessOpen(true);
			}
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setOpen(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-sm max-h-[90vh] overflow-y-auto rounded-lg">
					<DialogHeader>
						<div className="text-center px-7 m-auto">
							<DialogTitle className="font-extrabold text-2xl">
								Select Category
							</DialogTitle>
							<DialogDescription>
								Choose a user category that best explains your user type.
							</DialogDescription>
						</div>
					</DialogHeader>

					<div className="flex flex-col gap-2 mt-4">
						{categories.map((cat) => (
							<button
								key={cat}
								onClick={() => setSelected(cat)}
								className={cn(
									"w-full py-2 px-4 outline-none font-medium text-center border rounded-lg transition",
									selected === cat
										? "border-primary-400 text-primary-700"
										: "border-gray-225 text-gray-55 hover:bg-gray-100",
								)}
							>
								{cat}
							</button>
						))}
					</div>

					<div className="mt-6">
						<Button
							onClick={handleSave}
							disabled={!selected}
							className={cn(
								"w-full",
								selected
									? "bg-primary-400 hover:bg-primary-400 py-5 text-white"
									: "bg-gray-200 text-gray-500 cursor-not-allowed",
							)}
						>
							Save
						</Button>
					</div>
				</DialogContent>
			</Dialog>
			<VeterinarianFormModal
				progressOpen={progressOpen}
				setProgressOpen={setProgressOpen}
			/>
			<VetClinicFormModal
				progressOpen={progressOpen1}
				setProgressOpen={setProgressOpen1}
			/>
			<SuccessModal successOpen={successOpen} setSuccessOpen={setSuccessOpen} />
		</>
	);
};

export default CategoryModal;
