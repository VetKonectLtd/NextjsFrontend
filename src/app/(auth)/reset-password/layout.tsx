"use client";
import { AuthBg } from "@/app/assets/images";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPasswordLayout = ({ children }: { children: React.ReactNode }) => {

	const router = useRouter();
    const pathname = usePathname();
    const steps = [
		{ path: "/reset-password/verify" },
		{ path: "/reset-password/forgot-password" },
	];

	const currentIndex = steps.findIndex((step) =>
		pathname.startsWith(step.path),
	);


	const ProgressDots = () => (
		<div className="flex justify-center items-center gap-2 mb-6">
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					className={`w-5 h-5 rounded-full ${
						currentIndex >= i
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
				{children}
				
			</div>
		</div>
	);
};

export default ResetPasswordLayout;
