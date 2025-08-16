import { useState, useEffect } from "react";
import { Country } from "country-state-city";
import { fail } from "assert";

interface PhoneInputProps {
	label: string;
	isRequired?: boolean;
	value: string;
	countryCode: string;
    focusLabel:string;
	onChange: (data: { phone: string; countryCode: string }) => void;
}

const PhoneInput = ({
	label,
	isRequired = false,
	value,
	countryCode,
	onChange,
    focusLabel,
}: PhoneInputProps) => {
	const countries = Country.getAllCountries().map((c) => ({
		code: c.isoCode,
		name: c.name,
		phoneCode: c.phonecode,
		flag: c.flag,
	}));

	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		if (!countryCode) {
			onChange({ phone: value, countryCode: "US" });
		}
	}, []);

	return (
		<div className="relative w-full border border-[#1D2432] rounded-sm bg-white flex items-center">
		
			<select
				value={countryCode}
				onChange={(e) =>
					onChange({ phone: value, countryCode: e.target.value })
				}
				className="pl-2 pr-1 py-[17px] text-sm bg-transparent outline-none"
			>
				{countries.map((c) => (
					<option key={c.code} value={c.code}>
						{c.flag}
					</option>
				))}
			</select>

			
			<input
				type="tel"
				value={value}
				onChange={(e) => onChange({ phone: e.target.value, countryCode })}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				className="flex-1 px-3 py-2 pb-1 text-sm outline-none"
			/>

			
			<label
				className={`absolute left-3 transition-all pointer-events-none ${
					isFocused || value
						? "top-1 text-xs text-[#555555]"
						: "top-1 text-xs text-[#555555]"
				}`}
			>
				{isFocused && focusLabel ? focusLabel : label}
			</label>
		</div>
	);
};

export default PhoneInput;
