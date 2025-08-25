"use client";

import { useState } from "react";
import { AuthBg } from "@/app/assets/images";
import { Icon1, Icon2, Icon3, Arrow, Linkedin } from "@/app/assets/icons/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import AccountDetailsStep from "@/components/signup/AccountDetailsStep";
import PersonalInfoStep from "@/components/signup/PersonalInfoStep";
import VericationPage from "@/components/signup/VerificationPage";
import { SignupCredentials } from "@/types";

export default function SignupPage() {
	const router = useRouter();
	const { signup, isLoading, error, clearError } = useAuthStore();
	const [step, setStep] = useState(0);

	const {
		register,
		handleSubmit,
		getValues,
		trigger,
		setValue,
		control,
		formState: { errors },
		clearErrors,
	} = useForm<SignupCredentials>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			phone: "",
			countryCode: "",
			state: "",
			agreeTerms: false,
		},
		mode: "onChange",
	});

	const watchedCountryCode = useWatch({
		control,
		name: "countryCode",
	});

	const handleNext = async (e: React.FormEvent) => {
		e.preventDefault();

		switch (step) {
			case 0: {
				const stepOneFields: (keyof SignupCredentials)[] = [
					"email",
					"password",
					"confirmPassword",
				];
				const isValid = await trigger(stepOneFields, { shouldFocus: true });
				if (isValid) {
					setStep((prev) => prev + 1);
				}
				break;
			}
			case 1: {
				const stepTwoFields: (keyof SignupCredentials)[] = [
					"firstName",
					"lastName",
					"phone",
					"countryCode",
					"state",
					"agreeTerms",
				];
				const isValid = await trigger(stepTwoFields, { shouldFocus: true });
				if (isValid) {
					handleSubmit(onSubmit)();
					setStep((prev) => prev + 1);
				}
				break;
			}
			case 2:{
				router.push("/success?form=Signup");
			}
			default: {
				break;
			}
		}
	};
	const onSubmit = async (data: SignupCredentials) => {
		try {
			await signup(data);
		} catch {
			// error already handled in store
		}
	};

	const handleBack = () => {
		setStep((prev) => Math.max(prev - 1, 0));
	};

	const progressItem = (icon: any, label: string, index: number) => (
		<div
			className={`flex flex-col items-center space-y-3 justify-center ${
				step === index
					? "text-primary-400"
					: step > index
						? "text-primary-400"
						: "text-gray-500"
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
			className="md:min-h-screen bg-white bg-center bg-cover bg-no-repeat flex flex-col py-12 px-4"
		>
			<div className="w-full pt-36 max-w-md mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-extrabold mb-2 text-gray-55">
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
						{progressItem(Icon1, "Account Details", 0)}
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
						{progressItem(Icon2, "Personal Info", 1)}
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
						{progressItem(Icon3, "Verify Account", 2)}
					</div>

					<form>
						{step === 0 && (
							<AccountDetailsStep
								error={error}
								errors={errors}
								register={register}
								clearError={clearError}
								clearErrors={clearErrors}
								getValues={getValues}
							/>
						)}
						{step === 1 && (
							<PersonalInfoStep
								error={error}
								errors={errors}
								register={register}
								clearError={clearError}
								clearErrors={clearErrors}
								getValues={getValues}
								control={control}
								watchedCountryCode={watchedCountryCode}
								setValue={setValue}
							/>
						)}
						{step === 2 && <VericationPage />}

						<div className="flex flex-col mt-4 gap-3">
							<button
								type="submit"
								disabled={isLoading}
								onClick={step < 2 ? handleNext : handleSubmit(onSubmit)}
								className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
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
								<hr className="flex-grow border-gray-55" />
								<span className="px-1 py-0.5 border border-gray-55 rounded-md bg-white text-gray-55 text-[10px] font-semibold">
									OR
								</span>
								<hr className="flex-grow border-gray-55" />
							</div>
						</div>
					)}
					{step === 0 && (
						<button
							type="button"
							className="w-full py-3 rounded-md border border-gray-55 text-base font-semibold bg-white hover:bg-gray-100 transition"
							onClick={() => router.push("/login")}
						>
							Login
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
