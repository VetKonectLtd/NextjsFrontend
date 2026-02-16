"use client";
import { useForm } from "react-hook-form";
import { SignupCredentials } from "@/types";
import { useAuthService } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import AccountDetailsStep from "@/components/signup/AccountDetailsStep";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";
import { AUTH_ENDPOINTS } from "@/lib/api-constants";

export default function AccountPage() {
	const router = useRouter();
	const { useSignup, useGoogleLogin } = useAuthService();
	const signupMutation = useSignup();
	const searchParams = useSearchParams();

	const inviteCode = searchParams.get("invite");

	const {
		register,
		handleSubmit,
		getValues,
		clearErrors,
		setValue,
		formState: { errors },
	} = useForm<SignupCredentials>({
		defaultValues: { email: "", password: "", password_confirmation: "" },
	});

	const onSubmit = (data: SignupCredentials) => {
		signupMutation.mutate(data, {
			onSuccess: () => {
				localStorage.setItem("signup-email", data.email);
				router.replace("/signup/verification");
			},
		});
	};

	const handleGoogleLogin = () => {

		let url = `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
		if (inviteCode) {
			url += `?invite=${inviteCode}`;
		}

		window.location.href = url;

	};


	return (
		<div className="w-full max-w-sm mx-auto">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<AccountDetailsStep
					register={register}
					getValues={getValues}
					clearErrors={clearErrors}
					errors={errors}
					setValue={setValue}
				/>

				<button
					type="submit"
					className="w-full py-3 bg-primary-400 text-white disabled:bg-[#555555] rounded-md flex items-center justify-center"
					disabled={signupMutation.isLoading}
				>
					{signupMutation.isLoading ? (
						<Loader2 className="animate-spin h-4 w-4" />
					) : (
						"Proceed"
					)}
				</button>
			</form>
			<div className="flex flex-col items-center my-6">
				<div className="flex space-x-3">
					{/* <button
						type="button"
						onClick={handleLinkedInLogin}
						className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white text-xl font-bold mb-4 shadow-md"
						aria-label="Login with LinkedIn"
					>
						<Image
							src={Linkedin}
							alt="LinkedIn Logo"
							className="object-contain"
						/>
					</button> */}

					<button
						type="button"
						onClick={handleGoogleLogin}
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
			<button
				type="button"
				className="w-full py-3 rounded-md border border-gray-55 text-base font-semibold bg-white hover:bg-gray-100 transition"
				onClick={() => router.push("/login")}
			>
				Login
			</button>
		</div>
	);
}
