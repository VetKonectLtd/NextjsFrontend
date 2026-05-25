"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useAuthService } from "@/services/authService";
import StepTwo from "@/components/resetPassword/StepTwo";

const Verify = () => {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const { useResetPassword } = useAuthService();

  return (
    <div>
      <StepTwo />
    </div>
  );
};

export default Verify;
