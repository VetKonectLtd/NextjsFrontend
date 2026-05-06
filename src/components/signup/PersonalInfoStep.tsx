"use client";
import { Country, State } from "country-state-city";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import PhoneInput from "../form/PhoneInput";
import { PersonalInfoForm } from "@/types";
import {
	UseFormClearErrors,
	UseFormGetValues,
	UseFormRegister,
	Controller,
	Control,
	UseFormSetValue,
} from "react-hook-form";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import TermsPage from "../terms/terms";

interface PersonalInfoProps {
	register: UseFormRegister<PersonalInfoForm>;
	getValues: UseFormGetValues<PersonalInfoForm>;
	clearErrors: UseFormClearErrors<PersonalInfoForm>;
	errors: any;
	control: Control<PersonalInfoForm>;
	setValue:UseFormSetValue<PersonalInfoForm>;
	watchedCountryCode: any
}

const PersonalInfoStep = ({
	register,
	getValues,
	clearErrors,
	errors,
	control,
	setValue,
	watchedCountryCode,
}: PersonalInfoProps) => {
	// Country options
	const countries = Country.getAllCountries().map((c) => ({
		value: c.isoCode,
		label: `${c.name}`,
	}));

	// State options based on selected country
	const states =
		getValues("country") &&
		State.getStatesOfCountry(getValues("country")).map((s) => ({
			value: s.name,
			label: s.name,
		}));

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full max-w-sm flex flex-col gap-1">
				{/* First Name */}
				<FormInput
					label="First Name"
					type="text"
					{...register("first_name", {
						required: "first name is required",
					})}
					onChange={(e) => {
						clearErrors("first_name");
					}}
					focusLabel="First Name (Required):"
					isRequired
				/>
				{errors.first_name && (
					<p className="text-red-500 text-xs">{errors.first_name.message}</p>
				)}
				{/* Last Name */}
				<FormInput
					label="Last Name"
					type="text"
					{...register("last_name", {
						required: "Last name is required",
					})}
					onChange={(e) => {
						clearErrors("last_name");
					}}
					focusLabel="Last Name (Required):"
					isRequired
				/>
				{errors.last_name && (
					<p className="text-red-500 text-xs">{errors.last_name.message}</p>
				)}

				<Controller
					name="country"
					control={control}
					rules={{ required: "Country is required" }}
					render={({ field }) => (
						<FormSelect
							label="Country"
							focusLabel="Country (Required) :"
							isRequired
							searchable
							options={countries}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				{errors.country && (
					<p className="text-red-500 text-xs">{errors.country.message}</p>
				)}
				<Controller
					name="state"
					control={control}
					rules={{ required: "State is required" }}
					render={({ field }) => (
						<FormSelect
							label="State"
							focusLabel="State (Required) :"
							isRequired
							searchable
							options={states || []}
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				{errors.state && (
					<p className="text-red-500 text-xs">{errors.state.message}</p>
				)}
				<Controller
					name="phone_num"
					control={control}
					rules={{ required: "Phone number is required" }}
					render={({ field }) => (
						<PhoneInput
							label="Phone No."
							isRequired
							focusLabel="Phone No. (Required):"
							value={field.value || ""}
							countryCode={watchedCountryCode || "US"}
							onChange={({ phone, countryCode }) => {
								field.onChange(phone); 
								setValue("country", countryCode);
							}}
						/>
					)}
				/>
				{errors.phone_num && (
					<p className="text-red-500 text-xs">{errors.phone_num.message}</p>
				)}
				
				{/* Terms */}
				<div className="flex items-center border cursor-pointer bg-white border-gray-55 rounded-sm py-1 px-4">
					
					<input
						id="agree-terms"
						type="checkbox"
						{...register("agreeTerms", {
							required: " You must agree to the terms and conditions",
						})}
						onChange={(e) => {
							clearErrors("agreeTerms");
						}}
						className="h-5 w-5 text-primary-400 cursor-pointer accent-primary-400 focus:ring-primary-400 border-gray-300 rounded"
					/>
					<label
						htmlFor="agree-terms"
						className="ml-4 text-sm font-normal cursor-pointer text-gray-55"
					>
						Confirm that you agree to our
						<Dialog>
							<DialogTrigger asChild>
								<span className="text-primary-600 hover:underline cursor-pointer ml-1">
									terms and conditions
								</span>
							</DialogTrigger>
							<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg">
								<DialogHeader>
									<DialogTitle>Terms and Conditions</DialogTitle>
									<DialogDescription>
										{/* Render the terms content here */}
										<TermsPage />
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
						at Vet Konect
					</label>
				</div>
				{errors.agreeTerms && (
					<p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>
				)}
			</div>
		</div>
	);
};

export default PersonalInfoStep;
