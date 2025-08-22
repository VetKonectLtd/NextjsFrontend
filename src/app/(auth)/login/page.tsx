"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { AuthBg } from "@/app/assets/images";
import {Linkedin} from "@/app/assets/icons/auth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/FormInput";
import { LoginCredentials } from "@/types";

export default function LoginPage() {
	const router = useRouter();
	const { login, isLoading, error, clearError } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<LoginCredentials>({
		defaultValues: { email: "", password: "" },
		mode: "onChange",
	});

	const onSubmit = async (data: LoginCredentials) => {
		try {
			await login(data);
			router.push("/dashboard/vet-vendor");
		} catch {
			// error already handled in store
		}
	};

	return (
		<div
			style={{ backgroundImage: `url(${AuthBg.src})` }}
			className="md:min-h-screen bg-white bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center py-12 px-4"
		>
			<div className="w-full  pt-36  max-w-sm mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-extrabold mb-2 text-gray-55">Login</h1>
					<p className="text-base font-normal text-[#666666] mb-6">
						Secure access to your account
					</p>
				</div>
				<form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-2">
							{error}
						</div>
					)}

					<FormInput
						label="Email"
						type="email"
						focusLabel="Email Address (Required)"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
						})}
						onChange={(e) => {
							if (error) clearError();
							clearErrors("email");
						}}
						isRequired
					/>
					{errors.email && (
						<p className="text-red-500 text-xs">{errors.email.message}</p>
					)}
					<FormInput
						label="Password"
						focusLabel="Password (Required)"
						type="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
						onChange={(e) => {
							if (error) clearError();
							clearErrors("password");
						}}
						isRequired
					/>
					{errors.password && (
						<p className="text-red-500 text-xs">{errors.password.message}</p>
					)}

					<div className="space-y-3 pt-4">
						<div className="text-left mb-2">
							<Link
								href="/auth/reset-password"
								className="text-sm text-gray-700 underline"
							>
								Forgot your password?
							</Link>
						</div>
						<button
							type="submit"
							disabled={
								isLoading || !register("email") || !register("password")
							}
							className="w-full py-3 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2"
						>
							{isLoading ? "Logging in..." : "Login"}
						</button>
					</div>
				</form>
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
						<span className="px-1 py-0.5 border border-gray-55] rounded-md bg-white text-gray-55 text-[10px] font-semibold">
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
			</div>
		</div>
	);
}
