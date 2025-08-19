"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { AuthBg } from "@/app/assets/images";
import StepOne from "@/components/resetPassword/StepOne";
import StepTwo from "@/components/resetPassword/StepTwo";
import StepThree from "@/components/resetPassword/StepThree";

const ResetPasswordPage = () => {
	const router = useRouter();
	const { isLoading, error } = useAuthStore();
	const [step, setStep] = useState(0); 
	const [form, setForm] = useState({
		email: "",
		pin: "",
		newPassword: "",
		confirmPassword: "",
	});

	// Progress bar dots
	const ProgressDots = () => (
		<div className="flex justify-center items-center gap-2 mb-6">
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					className={`w-5 h-5 rounded-full ${
						step >= i
							? "bg-primary-400"
							: "bg-transparent border border-primary-400"
					}`}
				></span>
			))}
		</div>
	);

	return (
		<div
			style={{ backgroundImage: `url(${AuthBg.src})` }}
			className="md:min-h-screen bg-white bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center py-12 px-4"
		>
			<div className="w-full  pt-36  max-w-sm mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-extrabold mb-2 text-gray-55">
						Reset Password
					</h1>
					<p className="text-base font-normal text-[#666666] mb-6">
						Kindly retrieve your password
					</p>
					<ProgressDots />
				</div>

				{step === 0 && (
					<StepOne
						setStep={setStep}
						form={form}
						error={error}
						isLoading={isLoading}
						setForm={setForm}
					/>
				)}
				{step === 1 && (
					<StepTwo
						setStep={setStep}
						form={form}
						isLoading={isLoading}
						setForm={setForm}
					/>
				)}
				{step === 2 && (
					<StepThree
						setStep={setStep}
						form={form}
						isLoading={isLoading}
						setForm={setForm}
					/>
				)}

				{step === 0 && (
					<>
						<div className="flex flex-col items-center my-6">
							<div className="flex items-center w-full">
								<hr className="flex-grow border-gray-55" />
								<span className="px-1 py-0.5 border border-gray-55 rounded-md bg-white text-gray-55 text-[10px] font-semibold">
									OR
								</span>
								<hr className="flex-grow border-gray-55" />
							</div>
						</div>
						<button
							type="button"
							className="w-full py-3 rounded-md border border-gray-55 text-base font-semibold bg-white hover:bg-gray-100 transition"
							onClick={() => router.push("/auth/signup")}
						>
							Create Account
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ResetPasswordPage;
