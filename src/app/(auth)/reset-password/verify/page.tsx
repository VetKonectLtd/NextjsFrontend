"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {  useResetPassword } from "@/services/authService";
import StepTwo from "@/components/resetPassword/StepTwo";

const Verify = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const resetPasswordMutation = useResetPassword();

	return (
		<div>
            <StepTwo />
        </div>
	);
};

export default Verify;
