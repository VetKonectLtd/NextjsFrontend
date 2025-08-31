"use client";

import React, { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
	isRequired?: boolean;
	focusLabel?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			label,
			focusLabel,
			error,
			type = "text",
			maxLength,
			isRequired,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);

		const inputType = type === "password" && isPasswordVisible ? "text" : type;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (type === "number" && maxLength) {
				e.target.value = e.target.value.slice(0, maxLength);
			}
			props.onChange?.(e);
		};

		return (
			<div className="relative w-full font-sans">
				<input
					ref={ref}
					type={inputType}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={handleChange}
					className={`peer block w-full px-4 pt-6 font-normal py-1 border bg-white border-[#1D2432] rounded-md text-base placeholder-transparent focus:outline-none
            ${error ? "border-red-500" : ""}
          `}
					placeholder={label}
					{...props}
				/>

				<label
					className={`absolute left-4 top-3 text-[#555555] text-xs transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#555555] peer-focus:top-2 peer-focus:text-xs
          `}
				>
					{isFocused && focusLabel ? focusLabel : label}
				</label>

				{type === "password" && (
					<button
						type="button"
						tabIndex={-1}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1D2432]"
						onClick={() => setIsPasswordVisible((v) => !v)}
						aria-label={isPasswordVisible ? "Hide password" : "Show password"}
					>
						{isPasswordVisible ? (
							<EyeIcon className="h-5 w-5" />
						) : (
							<EyeOffIcon className="h-5 w-5" />
						)}
					</button>
				)}

				{error && <span className="text-red-600 text-sm mt-1">{error}</span>}
			</div>
		);
	},
);

FormInput.displayName = "FormInput";
export default FormInput;
