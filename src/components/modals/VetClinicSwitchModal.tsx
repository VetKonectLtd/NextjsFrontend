"use client";

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
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { resilientGetLocation, NIGERIAN_CITIES } from "@/lib/geolocation";
import { useAuthService } from "@/services/authService";
import { useRoleSwitchingService } from "@/services/roleSwitchingService";
import { VetClinic } from "@/types";
import FormSelect from "../form/FormSelect";
import { State } from "country-state-city";
import TagInput from "../form/TagInput";
import FormGooglePlacesInput from "../form/FormGooglePlacesInput";

interface VetClinicSwitchModalProps {
	open: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

const VetClinicSwitchModal = ({
	open,
	onClose,
	onSuccess,
}: VetClinicSwitchModalProps) => {
	const { useSwitchToVetClinic } = useRoleSwitchingService();
	const { useCurrentUser } = useAuthService();
	const { coordinates, error: geoError } = useGeolocation();
	const [locLoading, setLocLoading] = useState(false);

	const switchMutation = useSwitchToVetClinic();
	const { data: user } = useCurrentUser(true);

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<VetClinic>();

	const [selectedLocation, setSelectedLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);


	// Watch latitude/longitude to determine if location is effectively set
	const latitudeValue = useWatch({ control, name: "latitude" });
	const longitudeValue = useWatch({ control, name: "longitude" });
	const isLocationSet =
		latitudeValue !== undefined &&
		longitudeValue !== undefined &&
		latitudeValue !== null &&
		longitudeValue !== null;

	// Nigerian states for styled select
	const nigeriaStates = useMemo(
		() =>
			State.getStatesOfCountry("NG").map((s) => ({
				value: s.name,
				label: s.name,
			})),
		[],
	);
	const [selectedState, setSelectedState] = useState("");

	useEffect(() => {
		if (selectedLocation) {
			setValue("latitude", Number(selectedLocation?.latitude) as any);
			setValue("longitude", Number(selectedLocation?.longitude) as any);
		}
	}, [setValue, selectedLocation, user]);

	const handleUseMyLocation = async () => {
		try {
			setLocLoading(true);
			const coords = await resilientGetLocation();
			setValue("latitude", Number(coords.latitude) as any);
			setValue("longitude", Number(coords.longitude) as any);
		} catch (e) {
			// no-op: user can fall back to manual fields
		} finally {
			setLocLoading(false);
		}
	};

	// Prefill from user's state when available and coords not yet set
	useEffect(() => {
		const state = (user as any)?.profile?.user?.state as string | undefined;
		if (!coordinates && state) {
			const key = state.toUpperCase().replace(/\s+/g, "_");
			const city = (NIGERIAN_CITIES as any)[key];
			if (city) {
				setValue("latitude", city.latitude as any);
				setValue("longitude", city.longitude as any);
			}
		}
	}, [coordinates, setValue, user]);

	const onSubmit = (data: VetClinic) => {
		if (Array.isArray(data.specialty)) {
			data.specialty = data.specialty.join(", ");
		}
		if (Array.isArray(data.list_them)) {
			data.list_them = data.list_them.join(", ");
		}
		if (typeof (data as any).latitude === "string") {
			(data as any).latitude = parseFloat((data as any).latitude);
		}
		if (typeof (data as any).longitude === "string") {
			(data as any).longitude = parseFloat((data as any).longitude);
		}
		switchMutation.mutate(data, {
			onSuccess: () => {
				onClose();
				onSuccess();
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-sm rounded-lg max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="text-center px-7 m-auto">
						<DialogTitle className="font-extrabold text-2xl">
							Switch to Vet Clinic
						</DialogTitle>
						<DialogDescription>
							Please provide the required information to create your veterinary
							clinic profile.
						</DialogDescription>
					</div>
				</DialogHeader>

				<form className="space-y-1">
					{geoError && !isLocationSet && (
						<div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-2">
							Location permission denied or unavailable. Enter coordinates
							manually, retry, or select a city below.
						</div>
					)}
					<FormInput
						label="Clinic Name"
						type="text"
						focusLabel="Clinic Name (Required) :"
						isRequired
						error={errors.clinic_name?.message}
						{...register("clinic_name", {
							required: "Clinic name is required",
						})}
					/>

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
						Type <span className="font-medium">Awaiting</span> if License number
						is not available
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
									"Exotic",
									"Wildlife",
									"Surgery",
									"Diagnostics",
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
						label="Contact Number"
						type="tel"
						focusLabel="Contact Number (Required) :"
						isRequired
						error={errors.contact_num?.message}
						{...register("contact_num", {
							required: "Contact number is required",
						})}
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

					{/* Longitude / Latitude manual fallback */}
					<div className="grid grid-cols-2 gap-3">
						<FormInput
							label="Longitude"
							type="number"
							focusLabel="Longitude (Required) :"
							isRequired
							error={(errors as any).longitude?.message}
							step="any"
							{...register("longitude" as any, {
								required: "Longitude is required",
								valueAsNumber: true,
							})}
						/>
						<FormInput
							label="Latitude"
							type="number"
							focusLabel="Latitude (Required) :"
							isRequired
							error={(errors as any).latitude?.message}
							step="any"
							{...register("latitude" as any, {
								required: "Latitude is required",
								valueAsNumber: true,
							})}
						/>
					</div>

					{!isLocationSet && (
						<div className="flex flex-col gap-3 md:flex-row md:items-center">
							<Button
								type="button"
								variant="secondary"
								onClick={handleUseMyLocation}
								disabled={locLoading}
								className="py-2"
							>
								{locLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Using
										current location...
									</>
								) : (
									"Use my current location"
								)}
							</Button>
							<div className="flex-1">
								<FormSelect
									label="State (Optional)"
									focusLabel="State (Optional) :"
									options={nigeriaStates}
									value={selectedState}
									onChange={(v) => setSelectedState(v)}
								/>
							</div>
						</div>
					)}

					<div className="flex items-center border cursor-pointer bg-white border-gray-55 rounded-sm py-1 px-4">
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
							Confirm that you agree to our terms and conditions at Vet Konect
						</label>
					</div>

					<div className="flex flex-col mt-4 gap-3">
						<Button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={switchMutation.isLoading}
							className="w-full py-6 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
						>
							{switchMutation.isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Processing...
								</>
							) : (
								"Create Profile"
							)}
						</Button>

						<Button
							type="button"
							onClick={onClose}
							className="flex-1 py-3 text-gray-55 font-medium rounded-lg bg-[#FFDAB0] hover:bg-[#ffdab0ef] transition"
						>
							Cancel
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default VetClinicSwitchModal;
