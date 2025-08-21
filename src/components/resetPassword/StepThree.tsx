"use client";

import { useRouter } from "next/navigation";
import FormInput from "../form/FormInput";

const StepThree = ({ setStep, isLoading, setForm, form }: any) => {
	const router = useRouter();

	return (
		<form
			className="space-y-1"
			onSubmit={(e) => {
				e.preventDefault(); /* handle password reset */
			}}
		>
			<FormInput
				label="Password (Required):"
				name="new-password"
				type="password"
				focusLabel="Password (Required):"
				isRequired
			/>
			<FormInput
				label="Confirm Password (Required):"
				name="password-confirms"
				type="password"
				focusLabel="Confirm Password (Required):"
				isRequired
			/>

			<div className="flex flex-col items-center w-full pt-12">
				<button
					type="submit"
					disabled={isLoading}
					onClick={() => router.push("/auth/success?form=restPassword")}
					className="w-full py-3 rounded-md text-white text-base font-semibold  bg-primary-400 disabled:bg-[#666666] transition disabled:cursor-not-allowed mb-2"
				>
					Confirm
				</button>
				<button
					type="button"
					className="w-full py-3 rounded-md text-base font-semibold bg-[#FFDAB0] text-gray-55 mt-1"
					onClick={() => setStep(1)}
				>
					Back
				</button>
			</div>
		</form>
	);
};

export default StepThree;
