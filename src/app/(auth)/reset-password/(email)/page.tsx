"use client";

import { useForm, useWatch } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthService } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { ForgotPassword } from "@/types";
import StepOne from "@/components/resetPassword/StepOne";

export default function ForgetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { useForgotPassword } = useAuthService();
	const forgetMutation = useForgotPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<ForgotPassword>({
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: ForgotPassword) => {
		forgetMutation.mutate(data, {
			onSuccess: () => {
				router.replace("/reset-password/verify");
			},
			onError: (err: any) => {
				console.error("Profile completion failed:", err.message);
			},
		});
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-full max-w-sm mx-auto"
			>
				<StepOne
					errors={errors}
					register={register}
					clearErrors={clearErrors}
				/>

				<button
					type="submit"
					disabled={forgetMutation.isLoading}
					className="w-full py-3 rounded-md bg-primary-400 disabled:bg-[#555555] text-white flex items-center justify-center"
				>
					{forgetMutation.isLoading ? (
						<Loader2 className="animate-spin h-4 w-4" />
					) : (
						"Proceed"
					)}
				</button>

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
						onClick={() => router.push("/signup")}
					>
						Create Account
					</button>
				</>
			</form>
		</>
	);
}
