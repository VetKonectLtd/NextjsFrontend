"use client";

import React, { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Autocomplete from "react-google-autocomplete";

interface FormGooglePlacesInputProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	focusLabel?: string;
	isRequired?: boolean;
	error?: string;
	placeholder?: string;
	onLocationSelect?: (location: {
		latitude: number | null;
		longitude: number | null;
	}) => void;
	countryRestriction?: string; // e.g. "ng"
}

const FormGooglePlacesInput = <T extends FieldValues>({
	name,
	control,
	label,
	focusLabel,
	isRequired,
	error,
	placeholder = "Type your address",
	onLocationSelect,
	countryRestriction,
}: FormGooglePlacesInputProps<T>) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			rules={isRequired ? { required: `${label} is required` } : undefined}
			render={({ field }) => (
				<div className="relative w-full font-sans">
					<Autocomplete
						value={field.value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							field.onChange(e.target.value)
						}
						apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
						placeholder={label}
						className={`peer block w-full px-4 pt-4 py-2 border bg-white border-[#1D2432] rounded-md text-base placeholder-transparent focus:outline-none
    ${error ? "border-red-500" : ""}
  `}
						options={{
							types: ["geocode"],
							fields: ["formatted_address", "geometry"],
							...(countryRestriction && {
								componentRestrictions: { country: countryRestriction },
							}),
						}}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onPlaceSelected={(place) => {
							const lat = place.geometry?.location?.lat() ?? null;
							const lng = place.geometry?.location?.lng() ?? null;

							field.onChange(place.formatted_address);

							onLocationSelect?.({
								latitude: lat,
								longitude: lng,
							});
						}}
					/>

					{/* Floating Label */}
					<label
						className={`absolute left-4 top-1 text-[#555555] text-xs transition-all
              peer-placeholder-shown:top-3.5
              peer-placeholder-shown:text-sm
              peer-placeholder-shown:text-[#555555]
              peer-focus:top-1
              peer-focus:text-xs
            `}
					>
						{isFocused && focusLabel ? focusLabel : label}
					</label>

					{/* Error */}
					{error && (
						<span className="text-red-600 text-sm mt-1 block">{error}</span>
					)}
				</div>
			)}
		/>
	);
};

export default FormGooglePlacesInput;
