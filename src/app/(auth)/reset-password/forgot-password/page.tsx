"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthService } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { ResetPasswordCredentials } from "@/types";
import { useEffect } from "react";
import StepThree from "@/components/resetPassword/StepThree";

const ForgetPassword = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { useResetPassword } = useAuthService();
	const resetPasswordMutation = useResetPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<ResetPasswordCredentials>({
		defaultValues: {
			email: searchParams.get("email") || "",
			password: "",
			password_confirmation: "",
			token: searchParams.get("token") || "",
		},
	});

	const onSubmit = async (data: ResetPasswordCredentials) => {
		resetPasswordMutation.mutate(data, {
			onSuccess: () => {
				router.replace("/success?form=restPassword");
			},
			onError: (err: any) => {
				console.error(err.message);
			},
		});
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 w-full max-w-sm mx-auto"
			>
				{/* {resetPasswordMutation.error && (
					<div className="mb-4 p-3 rounded-md bg-red-100 text-red-600 text-sm">
						{resetPasswordMutation.error?.message ||
							"Something went wrong, please try again."}
					</div>
				)} */}
				<StepThree
					errors={errors}
					register={register}
					clearErrors={clearErrors}
				/>

				<button
					type="submit"
					disabled={resetPasswordMutation.isLoading}
					className="w-full py-3 rounded-md bg-primary-400 disabled:bg-[#555555] text-white flex items-center justify-center"
				>
					{resetPasswordMutation.isLoading ? (
						<Loader2 className="animate-spin h-4 w-4" />
					) : (
						"Confirm"
					)}
				</button>
			</form>
		</>
	);
};

export default ForgetPassword;
