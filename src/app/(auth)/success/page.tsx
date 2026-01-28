"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SignUpSuccess from "@/components/signup/SignUpSuccess";
import { AuthBg } from "@/app/assets/images";
import LoginSuccess from "@/components/login/LoginSuccess";
import ResetPasswordSuccess from "@/components/resetPassword/ResetPasswordSuccess";
import { useEffect } from "react";
import Cookies from "js-cookie";

const SuccessPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const formType = searchParams.get("form");
	const token = searchParams.get("token");

	useEffect(() => {
		if (token) {
			const isSecure = window.location.protocol === 'https:';
			const domain = window.location.hostname;
			Cookies.set("auth-token", token, {
				secure: isSecure,
				sameSite: "lax",
				domain,
				path: "/"
			});

			const cleanUrl = `/success?form=${formType || "Login"}`;

			sessionStorage.setItem("justLoggedIn", "true");

			router.replace(cleanUrl, { scroll: false });
		}
	}, [token, formType, router]);

	const renderSuccessComponent = () => {
		switch (formType) {
			case "Signup":
				return <SignUpSuccess />;
			case "Login":
				return <LoginSuccess />;
			case "restPassword":
				return <ResetPasswordSuccess />;
			default:
				return <p>No form type found</p>;
		}
	};
	return (
		<div
			style={{ backgroundImage: `url(${AuthBg.src})` }}
			className="md:min-h-screen bg-white bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center py-12 px-4"
		>
			{renderSuccessComponent()}
		</div>
	);
};

export default SuccessPage;
