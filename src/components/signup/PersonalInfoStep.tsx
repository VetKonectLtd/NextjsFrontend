"use client";
import { Country, State } from "country-state-city";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import PhoneInput from "../form/PhoneInput";
import { SignupCredentials } from "@/types";
import {
	UseFormClearErrors,
	UseFormGetValues,
	UseFormRegister,
	Controller,
	Control,
	UseFormSetValue,
} from "react-hook-form";

interface PersonalInfoProps {
	register: UseFormRegister<SignupCredentials>;
	getValues: UseFormGetValues<SignupCredentials>;
	clearErrors: UseFormClearErrors<SignupCredentials>;
	clearError: () => void;
	errors: any;
	error: string | null;
	control: Control<SignupCredentials>;
	setValue:UseFormSetValue<SignupCredentials>;
	watchedCountryCode: any
}

const PersonalInfoStep = ({
	register,
	getValues,
	clearErrors,
	clearError,
	errors,
	error,
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
		getValues("countryCode") &&
		State.getStatesOfCountry(getValues("countryCode")).map((s) => ({
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
					{...register("firstName", {
						required: "first name is required",
					})}
					onChange={(e) => {
						if (error) clearError();
						clearErrors("firstName");
					}}
					focusLabel="First Name (Required):"
					isRequired
				/>
				{errors.firstName && (
					<p className="text-red-500 text-xs">{errors.firstName.message}</p>
				)}
				{/* Last Name */}
				<FormInput
					label="Last Name"
					type="text"
					{...register("lastName", {
						required: "Last name is required",
					})}
					onChange={(e) => {
						if (error) clearError();
						clearErrors("lastName");
					}}
					focusLabel="Last Name (Required):"
					isRequired
				/>
				{errors.lastName && (
					<p className="text-red-500 text-xs">{errors.lastName.message}</p>
				)}
				<Controller
					name="phone"
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
								setValue("countryCode", countryCode);
							}}
						/>
					)}
				/>
				{errors.phone && (
					<p className="text-red-500 text-xs">{errors.phone.message}</p>
				)}
				<Controller
					name="countryCode"
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
				{errors.countryCode && (
					<p className="text-red-500 text-xs">{errors.countryCode.message}</p>
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
				{/* Terms */}{" "}
				<div className="flex items-center border cursor-pointer bg-white border-gray-55 rounded-sm py-1 px-4">
					
					<input
						id="agree-terms"
						type="checkbox"
						{...register("agreeTerms", {
							required: " You must agree to the terms and conditions",
						})}
						onChange={(e) => {
							if (error) clearError();
							clearErrors("agreeTerms");
						}}
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
				{errors.agreeTerms && (
					<p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>
				)}
			</div>
		</div>
	);
};

export default PersonalInfoStep;
