"use client";
import FormInput from "../form/FormInput";

const StepOne = ({ setStep, isLoading, error, setForm, form }: any) => {
	return (
		<form
			className="space-y-6"
			onSubmit={(e) => {
				e.preventDefault();
				setStep(1);
			}}
		>
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-2">
					{error}
				</div>
			)}

			<FormInput
				label="Email"
				name="email-reset"
				type="email"
				focusLabel="Email Address (Required):"
				// value={formData.email}
				onChange={(e) => setForm((f: any) => ({ ...f, email: e.target.value }))}
				isRequired
			/>

			<button
				type="submit"
				disabled={isLoading || !form.email}
				className="w-full py-3 rounded-md text-white text-base font-semibold  bg-primary-400 disabled:bg-[#666666] transition disabled:cursor-not-allowed mb-2"
			>
				{isLoading ? "Processing..." : "Proceed"}
			</button>
		</form>
	);
};

export default StepOne;
