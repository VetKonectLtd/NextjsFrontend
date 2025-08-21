"use client";
import FormInput from "../form/FormInput";

const StepTwo = ({ setStep, isLoading, setForm, form }: any) => {

	return (
		<>
			<div>
				<p className="text-base font-normal text-[#666666] text-center mb-4">
					Kindly enter the 6 digit code sent to your email in the input field
					below
				</p>
			</div>
			<form
				className="space-y-3"
				onSubmit={(e) => {
					e.preventDefault();
					setStep(2);
				}}
			>
				<FormInput
					label="Pin Code"
					name="pin-code"
					type="number"
					focusLabel="Pin Code :"
					// onChange={(e) => setForm((f: any) => ({ ...f, pin: e.target.value }))}
					maxLength={6}
					isRequired
				/>

				<div className="flex justify-center items-center">
					<button type="button" className="text-xs text-gray-55 underline">
						Resend Code
					</button>
				</div>

				<div className="flex flex-col items-center w-full space-y- pt-6">
					<button
						type="submit"
						disabled={isLoading || !form.pin || form.pin.length !== 6}
						className="w-full py-3 rounded-md text-white text-base font-semibold  bg-primary-400 disabled:bg-[#666666] transition disabled:cursor-not-allowed mb-2"
					>
						Verify
					</button>
					<button
						type="button"
						className="w-full py-3 rounded-md text-base font-semibold bg-[#FFDAB0] text-gray-55 mt-2"
						onClick={() => setStep(0)}
					>
						Back
					</button>
				</div>
			</form>
		</>
	);
};

export default StepTwo;
