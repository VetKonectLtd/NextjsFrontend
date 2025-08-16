"use client";

import {useSearchParams } from "next/navigation";
import SignUpSuccess from "@/components/signup/SignUpSuccess";
import { AuthBg } from "@/app/assets/images";
import LoginSuccess from "@/components/login/LoginSuccess";
import ResetPasswordSuccess from "@/components/resetPassword/ResetPasswordSuccess";

const SuccessPage = () => {
	
	const searchParams = useSearchParams();
	const formType = searchParams.get("form");

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
			className="md:min-h-screen bg-white -mt-24 bg-cover bg-no-repeat flex flex-col justify-center items-center py-12 px-4"
		>
			{renderSuccessComponent()}
		</div>
	);
};

export default SuccessPage;
