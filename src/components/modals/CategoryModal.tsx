"use client";

import * as React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import VeterinarianFormModal from "./VeterinarianFormModal";
import VetClinicFormModal from "./VetClinicFormModal";
import { useLiveStockService } from "@/services/liveStockService";
import { useStoreService } from "@/services/storeService";
import { usePetOwnerService } from "@/services/petOwnerService";
import { useOtherService } from "@/services/otherService";
import { useAuthService } from "@/services/authService";
import VetProfessionalsFormModal from "./VetProfessionalsFormModal";

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
	const [progressOpen2, setProgressOpen2] = useState(false);

	const { useAddPetOwner } = usePetOwnerService();
	const { useAddLiveStockFarmer } = useLiveStockService();
	const { useAddVendor } = useStoreService();
	const { useOthers } = useOtherService();
	const { useCurrentUser } = useAuthService();

	const addPetOwnerMutation = useAddPetOwner();
	const addLiveStockFarmerMutation = useAddLiveStockFarmer();
	const addVendorMutaion = useAddVendor();
	const addOtherMutation = useOthers();
	const { data: user, isLoading } = useCurrentUser(true);

	const handleSave = () => {
		if (!selected) return;
		setOpen(false);

		switch (selected) {
			case "Veterinarian":
				setProgressOpen(true);
				break;

			case "Veterinary Paraprofessional":
				setProgressOpen2(true);
				break;

			case "Veterinary Clinic":
				setProgressOpen1(true);
				break;

			case "Livestock Farmer":
				addLiveStockFarmerMutation.mutate(
					{},
					{
						onSuccess: () => {
							setSuccessOpen(true);
						},
					},
				);
				break;
			case "Vendor":
				addVendorMutaion.mutate(
					{},
					{
						onSuccess: () => {
							setSuccessOpen(true);
						},
					},
				);
				break;

			case "Others":
				addOtherMutation.mutate(
					{},
					{
						onSuccess: () => {
							setSuccessOpen(true);
						},
					},
				);
				break;

			case "Pet Owner":
				addPetOwnerMutation.mutate(
					{},
					{
						onSuccess: () => {
							setSuccessOpen(true);
						},
					},
				);

				break;

			default:
				setSuccessOpen(true);
				break;
		}
	};

	useEffect(() => {
		if (isLoading) return;

		const justLoggedIn = sessionStorage.getItem("justLoggedIn");

		const userRole = (user as any)?.role || (user as any)?.profile?.role;

		if (!userRole && justLoggedIn) {
			setOpen(true);
			sessionStorage.removeItem("justLoggedIn");
		} else {
			setOpen(false);
		}
	}, [user, isLoading]);

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
				setOpen={setOpen}
				setProgressOpen={setProgressOpen}
			/>
			<VetClinicFormModal
				progressOpen={progressOpen1}
				setOpen={setOpen}
				setProgressOpen={setProgressOpen1}
			/>
			<VetProfessionalsFormModal
				progressOpen={progressOpen2}
				setOpen={setOpen}
				setProgressOpen={setProgressOpen2}
			/>
			<SuccessModal
				successOpen={successOpen}
				message={
					"You have updated your Vet Konect profile. Kindly enjoy all other features present on the system."
				}
				setSuccessOpen={setSuccessOpen}
			/>
		</>
	);
};

export default CategoryModal;
