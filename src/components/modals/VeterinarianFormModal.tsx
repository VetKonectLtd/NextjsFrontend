import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormInput from "../form/FormInput";
import TagSelect from "../form/TagSelect";
import { useEffect, useState } from "react";
import SuccessModal from "./SuccessModal";
import Image from "next/image";
import { Icon1, Icon2, Icon3, Arrow } from "@/app/assets/icons/auth";
import progressItem from "./progressItem";
import { useVeterinaryService } from "@/services/veterinaryService";
import { VetDoctor } from "@/types";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useAuthService } from "@/services/authService";
import TagInput from "../form/TagInput";
import FormGooglePlacesInput from "../form/FormGooglePlacesInput";

const VeterinarianFormModal = ({
	progressOpen,
	setOpen,
	setProgressOpen,
}: any) => {
	const [successOpen, setSuccessOpen] = useState(false);
	const { useAddVetDoctor } = useVeterinaryService();
	const { useCurrentUser } = useAuthService();
	const { coordinates } = useGeolocation();

	const addVetDoctorMutation = useAddVetDoctor();
	const { data: user } = useCurrentUser(true);

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors, isValid },
	} = useForm<VetDoctor>();

	const [selectedLocation, setSelectedLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	useEffect(() => {
		if (selectedLocation) {
			setValue("latitude", String(selectedLocation?.latitude as any));
			setValue("longitude", String(selectedLocation?.longitude as any));
		}
		if (user) {
			setValue(
				"user_id",
				(user as Record<string, any>)?.data?.profile?.user?.id,
			);
		}
	}, [setValue, selectedLocation, user]);

	const onSubmit = (data: VetDoctor) => {
		if (Array.isArray(data.specialty)) {
			data.specialty = data.specialty.join(", ");
		}
		addVetDoctorMutation.mutate(data, {
			onSuccess: (res) => {
				setProgressOpen(false);
				setSuccessOpen(true);
			},
		});
	};

	const handleBack = () => {
		setOpen(true);
		setProgressOpen(false);
	};

	return (
		<>
			<Dialog open={progressOpen} onOpenChange={setProgressOpen}>
				<DialogContent className="max-w-sm rounded-lg max-h-[90vh] overflow-y-auto">
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

					<div className="flex items-center max-w-1/2 m-auto text-center justify-center gap-2 mb-8">
						{progressItem(Icon1, "Account Details", 0)}
						<Image
							src={Arrow}
							alt="arrow"
							className="object-contain w-3 h-3 filter-green"
						/>
						{progressItem(Icon2, "Personal Info", 1)}
						<Image
							src={Arrow}
							alt="arrow"
							className="object-contain w-3 h-3 filter-gray"
						/>
						{progressItem(Icon3, "Verify Account", 2)}
					</div>
					<form className="space-y-1">
						<FormInput
							label="Practicing License Number"
							type="text"
							focusLabel="Practicing License Number (Required) :"
							isRequired
							error={errors.practice_license_num?.message}
							{...register("practice_license_num", {
								required: "Practicing License number is required",
							})}
						/>
						<p className="text-sm font-normal">
							Type <span className="font-medium">Awaiting</span> if License
							number is not available
						</p>

						<Controller
							name="specialty"
							control={control}
							rules={{ required: "At least one tag is required" }}
							render={({ field }) => (
								<TagSelect
									label="Specialty"
									focusLabel="Specialty Required :"
									isRequired
									options={[
										"Small Animal",
										"Large Animal",
										"Avian/Poultry",
										"Exotic",
										"Wildlife",
										"Aquatic or Fishery",
										"Others",
									]}
									error={errors.specialty?.message}
									onChange={(tags) => field.onChange(tags)}
								/>
							)}
						/>

						<Controller
							name="list_them"
							control={control}
							rules={{ required: "List them is required" }}
							render={({ field }) => (
								<TagInput
									label="List them"
									focusLabel="List them (Required) :"
									isRequired
									error={errors.list_them?.message}
									onChange={(tags) => field.onChange(tags)}
								/>
							)}
						/>

						<FormInput
							label="Address"
							type="text"
							focusLabel="Address (Required) :"
							isRequired
							error={errors.address?.message}
							{...register("address", { required: "Location is required" })}
						/>

						<FormGooglePlacesInput
							name="address"
							control={control}
							label="Address"
							focusLabel="Address (Required):"
							isRequired
							error={errors.address?.message}
							onLocationSelect={(loc: any) => setSelectedLocation(loc)}
						/>

						<div className="flex items-center border cursor-pointer bg-white border-gray-55 rounded-sm py-1 px-4">
							{" "}
							<input
								id="agree-terms"
								type="checkbox"
								{...register("agreeTerms", {
									required: "You must agree to the terms and conditions",
								})}
								className="h-5 w-5 text-primary-400 cursor-pointer accent-primary-400 focus:ring-primary-400 border-gray-300 rounded"
							/>
							<label
								htmlFor="agree-terms"
								className="ml-4 text-sm font-normal cursor-pointer text-gray-55"
							>
								{" "}
								Confirm that you agree to our terms and conditions at Vet
								Konect{" "}
							</label>{" "}
						</div>

						<div className="flex flex-col mt-4 gap-3">
							<Button
								type="submit"
								onClick={handleSubmit(onSubmit)}
								disabled={addVetDoctorMutation.isLoading}
								className="w-full py-6 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
							>
								{addVetDoctorMutation.isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
										Processing...
									</>
								) : (
									"Proceed"
								)}
							</Button>

							<Button
								type="button"
								onClick={handleBack}
								className="flex-1 py-3 text-gray-55 font-medium rounded-lg bg-[#FFDAB0] hover:bg-[#ffdab0ef] transition"
							>
								Back
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
			<SuccessModal
				successOpen={successOpen}
				message={
					"Your Vet Konect account upgrade has been initiated. Kindly exercise patience, you will be contacted soon."
				}
				setSuccessOpen={setSuccessOpen}
			/>
		</>
	);
};

export default VeterinarianFormModal;
