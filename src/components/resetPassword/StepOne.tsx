"use client";
import { ForgotPassword } from "@/types";
import FormInput from "../form/FormInput";
import { UseFormClearErrors, UseFormRegister } from "react-hook-form";

interface ForgotPasswordProps {
	register: UseFormRegister<ForgotPassword>;
	clearErrors: UseFormClearErrors<ForgotPassword>;
	errors: any;
}

const StepOne = ({register, errors, clearErrors }: ForgotPasswordProps) => {
	return (
		<div className="space-y-6">
			<FormInput
				label="Email Address"
				type="text"
				{...register("email", {
					required: "email is required",
				})}
				onChange={(e) => {
					clearErrors("email");
				}}
				focusLabel="Email Address (Required):"
				isRequired
			/>
			{errors.email && (
				<p className="text-red-500 text-xs">{errors.email.message}</p>
			)}
		</div>
	);
};

export default StepOne;
