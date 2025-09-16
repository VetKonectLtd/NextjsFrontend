"use client";
import { useRouter } from "next/navigation";
import VericationPage from "@/components/signup/VerificationPage";
import { useEffect } from "react";

const Verification = () => {
	const router = useRouter();
	useEffect(() => {
		const token = localStorage.getItem("auth-token");

		if (token) {
			// If token exists, redirect to personal-info
			router.replace("/signup/personal-info");
		}
	}, [router]);

	return (
		<div>
			<VericationPage />
			{/* 
			<button
				onClick={() => router.push("/signup/personal-info")}
				className="py-2 px-6 rounded-md bg-primary-400 text-white"
			>
				Continue
			</button> */}
		</div>
	);
};

export default Verification;
