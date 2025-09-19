"use client";

import { useRouter } from "next/navigation";
import FormInput from "../form/FormInput";
import { UseFormClearErrors, UseFormRegister } from "react-hook-form";
import { ResetPasswordCredentials } from "@/types";

interface ResetPasswordProps {
	register: UseFormRegister<ResetPasswordCredentials>;
	clearErrors: UseFormClearErrors<ResetPasswordCredentials>;
	errors: any;
}

const StepThree = ({ register, errors, clearErrors }: ResetPasswordProps) => {
	const router = useRouter();

	return (
		<div className="space-y-1">
			<FormInput
				label="Password"
				type="password"
				{...register("password", {
					required: "email is required",
				})}
				onChange={(e) => {
					clearErrors("password");
				}}
				focusLabel="Password (Required):"
				isRequired
			/>
			{errors.password && (
				<p className="text-red-500 text-xs">{errors.password.message}</p>
			)}

			<FormInput
				label="Confirm Password (Required):"
				type="password"
				{...register("password_confirmation", {
					required: "Confirm Password is required",
				})}
				onChange={(e) => {
					clearErrors("password_confirmation");
				}}
				focusLabel="Confirm Password (Required):"
				isRequired
			/>
			{errors.password_confirmation && (
				<p className="text-red-500 text-xs">
					{errors.password_confirmation.message}
				</p>
			)}
		</div>
	);
};

export default StepThree;
