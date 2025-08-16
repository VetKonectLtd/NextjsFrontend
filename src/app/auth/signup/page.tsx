"use client";

import { useState } from "react";
import { AuthBg } from "@/app/assets/images";
import Icone1 from "@/app/assets/icons/auth/icon1.png";
import Icone2 from "@/app/assets/icons/auth/icon2.png";
import Icone3 from "@/app/assets/icons/auth/icon3.png";
import Arrow from "@/app/assets/icons/auth/arrow.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import Linkedin from "@/app/assets/icons/auth/linkedin.png";
import AccountDetailsStep from "@/components/signup/AccountDetailsStep";
import PersonalInfoStep from "@/components/signup/PersonalInfoStep";
import VericationPage from "@/components/signup/VericationPage";


type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
  state: string;
  agreeTerms: boolean;
};

export default function SignupPage() {
	const router = useRouter();
	const { signup, isLoading } = useAuthStore();
	const [step, setStep] = useState(0);
	const [infoForm, setInfoForm] = useState({
		firstName: "",
		lastName: "",
		category: "",
		phone: "",
		xHandle: "",
		instagramHandle: "",
		facebookHandle: "",
		linkedinHandle: "",
		address: "",
		agreeTerms: false,
	});

	const handleNext = async (e: React.FormEvent) => {
		e.preventDefault();

		if (step < 2) {
			setStep((prev) => prev + 1);
		} else {
			// Final submit
			router.push("/auth/success?form=Signup");
		}
	};

	const handleBack = () => {
		setStep((prev) => Math.max(prev - 1, 0));
	};

	const progressItem = (icon: any, label: string, index: number) => (
		<div
			className={`flex flex-col items-center space-y-3 justify-center ${
				step === index
					? "text-[#0B6614]"
					: step > index
						? "text-[#0B6614]"
						: "text-[#555555]"
			}`}
		>
			<Image
				src={icon}
				alt={label}
				className={`object-contain w-10 h-10 ${
					step === index
						? "filter-green"
						: step > index
							? "scale-110 filter-green"
							: "filter-gray"
				}`}
			/>
			<span className="text-xs font-normal">{label}</span>
		</div>
	);

	return (
		<div
			style={{ backgroundImage: `url(${AuthBg.src})` }}
			className="md:min-h-screen bg-white bg-cente -mt-24 bg-cover bg-no-repeat flex flex-col py-12 px-4"
		>
			<div className="w-full pt-36 max-w-md mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-extrabold mb-2 text-[#1D2432]">
						Create Account
					</h1>
					<p className="text-base max-w-sm m-auto font-normal text-[#666666] mb-6">
						Create a new account to become a user or a veterinarian on Vet
						Konect by clicking on one of the cards below
					</p>
				</div>
			</div>

			<div>
				<div className="w-full max-w-sm mx-auto">
					<div className="flex items-center max-w-xs m-auto text-center justify-center gap-8 mb-8">
						{progressItem(Icone1, "Account Details", 0)}
						<Image
							src={Arrow}
							alt="arrow"
							className={`object-contain w-3 h-3 ${
								step === 0
									? "filter-green"
									: step > 0
										? "scale-110 filter-green"
										: "filter-gray"
							}`}
						/>
						{progressItem(Icone2, "Personal Info", 1)}
						<Image
							src={Arrow}
							alt="arrow"
							className={`object-contain w-3 h-3 ${
								step === 1
									? "filter-green"
									: step > 1
										? "scale-110 filter-green"
										: "filter-gray"
							}`}
						/>
						{progressItem(Icone3, "Verify Account", 2)}
					</div>

					<form onSubmit={handleNext}>
						{step === 0 && <AccountDetailsStep />}
						{step === 1 && (
							<PersonalInfoStep
								form={infoForm}
								onChange={(e: any) => {
									const { name, value, type, checked } = e.target;
									setInfoForm((f) => ({
										...f,
										[name]: type === "checkbox" ? checked : value,
									}));
								}}
								isLoading={isLoading}
								onBack={() => setStep(1)}
							/>
						)}
						{step === 2 && <VericationPage />}

						<div className="flex flex-col mt-4 gap-3">
							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-[#0B6614] disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
							>
								{step < 2 ? "Proceed" : "Verify"}
							</button>
							{step > 0 && (
								<button
									type="button" 
									onClick={handleBack}
									className="flex-1 py-3 rounded-lg bg-[#FFDAB0] hover:bg-[#ffdab0ef] transition"
								>
									Back
								</button>
							)}
						</div>
					</form>
					{step === 0 && (
						<div className="flex flex-col items-center my-6">
							<div className="flex space-x-3">
								<button
									type="button"
									className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white text-xl font-bold mb-4 shadow-md"
									aria-label="Login with LinkedIn"
								>
									<Image
										src={Linkedin}
										alt="LinkedIn Logo"
										className="object-contain"
									/>
								</button>

								<button
									type="button"
									className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white text-xl font-bold mb-4 shadow-md"
									aria-label="Login with Google"
								>
									G
								</button>
							</div>
							<div className="flex items-center w-full">
								<hr className="flex-grow border-[#1D2432]" />
								<span className="px-1 py-0.5 border border-[#1D2432] rounded-md bg-white text-[#1D2432] text-[10px] font-semibold">
									OR
								</span>
								<hr className="flex-grow border-[#1D2432]" />
							</div>
						</div>
					)}
					{step === 0 && (
						<button
							type="button"
							className="w-full py-3 rounded-md border border-[#1D2432] text-base font-semibold bg-white hover:bg-gray-100 transition"
							onClick={() => router.push("/auth/login")}
						>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
