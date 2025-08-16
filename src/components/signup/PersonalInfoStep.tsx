"use client";
import { Country, State } from "country-state-city";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import PhoneInput from "../form/PhoneInput";

const PersonalInfoStep = ({ form, onChange }: any) => {
	// Country options
	const countries = Country.getAllCountries().map((c) => ({
		value: c.isoCode,
		label: `${c.name}`,
	}));

	// State options based on selected country
	const states =
		form.countryCode &&
		State.getStatesOfCountry(form.countryCode).map((s) => ({
			value: s.name,
			label: s.name,
		}));

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full max-w-sm flex flex-col gap-1">
				{/* First Name */}
				<FormInput
					label="First Name"
					name="firstName"
					type="text"
					focusLabel="First Name (Required):"
					isRequired
				/>
				{/* Last Name */}
				<FormInput
					label="Last Name"
					name="lastName"
					type="text"
					focusLabel="Last Name (Required):"
					isRequired
				/>
				<PhoneInput
					label="Phone No."
					isRequired
					focusLabel="Phone No. (Required):"
					value={form.phone}
					countryCode={form.countryCode}
					onChange={({ phone, countryCode }) => {
						onChange({ target: { name: "phone", value: phone } });
						onChange({ target: { name: "countryCode", value: countryCode } });
					}}
				/>
				<FormSelect
					label="Country"
					focusLabel="Country (Required) :"
					isRequired
					searchable
					options={countries}
					value={form.countryCode}
					onChange={(val) =>
						onChange({ target: { name: "countryCode", value: val } })
					}
				/>
				<FormSelect
					label="State"
					focusLabel="State (Required) :"
					isRequired
					searchable
					options={states}
					value={form.state}
					disabled={!form.countryCode}
					onChange={(val) =>
						onChange({ target: { name: "state", value: val } })
					}
				/>
				{/* Terms */}{" "}
				<div className="flex items-center border cursor-pointer bg-white border-[#1D2432] rounded-sm py-1 px-4">
					{" "}
					<input
						id="agree-terms"
						name="agreeTerms"
						type="checkbox"
						required
						checked={form.agreeTerms}
						onChange={onChange}
						className="h-5 w-5 text-[#0B6614] cursor-pointer accent-[#0B6614] focus:ring-[#0B6614] border-gray-300 rounded"
					/>{" "}
					<label
						htmlFor="agree-terms"
						className="ml-4 text-sm font-normal cursor-pointer text-[#1D2432]"
					>
						{" "}
						Confirm that you agree to our terms and conditions at Vet
						Konect{" "}
					</label>{" "}
				</div>
			</div>
		</div>
	);
};

export default PersonalInfoStep;
