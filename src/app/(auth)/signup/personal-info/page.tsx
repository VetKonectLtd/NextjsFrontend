"use client";

import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthService } from "@/services/authService";
import PersonalInfoStep from "@/components/signup/PersonalInfoStep";
import { Loader2 } from "lucide-react";
import { PersonalInfoForm } from "@/types";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function PersonalInfoPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { useCompleteProfile } = useAuthService();

	const completeProfileMutation = useCompleteProfile();

	useEffect(() => {
		const urlToken = searchParams.get("token");
		const savedToken = Cookies.get("auth-token");

		localStorage.removeItem("signup-email");

		if (urlToken) {
			Cookies.set("auth-token", urlToken);
		}

		const finalToken = urlToken || savedToken;

		if (!finalToken) {
			router.push("/signup/verification");
		}
	}, [router, searchParams]);

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		control,
		formState: { errors },
		clearErrors,
	} = useForm<PersonalInfoForm>({
		defaultValues: {
			first_name: "",
			last_name: "",
			phone_num: "",
			country: "",
			state: "",
			agreeTerms: false,
		},
	});

	const watchedCountryCode = useWatch({
		control,
		name: "country",
	});

	const onSubmit = (data: PersonalInfoForm) => {
		completeProfileMutation.mutate(data, {
			onSuccess: () => {
				sessionStorage.setItem("justLoggedIn", "true");
				router.replace("/success?form=Signup");
			},
			onError: (err: any) => {
				console.error("Profile completion failed:", err.message);
			},
		});
	};

	return (
		<>
			{!Cookies.get("auth-token") && (
				<div className="inset-0  fixed flex items-center justify-center bg-black/50 z-50">
					<div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-full max-w-sm mx-auto"
			>
				<PersonalInfoStep
					errors={errors}
					register={register}
					clearErrors={clearErrors}
					getValues={getValues}
					control={control}
					watchedCountryCode={watchedCountryCode}
					setValue={setValue}
				/>

				<button
					type="submit"
					disabled={completeProfileMutation.isLoading}
					className="w-full py-3 rounded-md bg-primary-400 disabled:bg-[#555555] text-white flex items-center justify-center"
				>
					{completeProfileMutation.isLoading ? (
						<Loader2 className="animate-spin h-4 w-4" />
					) : (
						"Complete Signup"
					)}
				</button>
			</form>
		</>
	);
}
