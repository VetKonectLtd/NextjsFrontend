"use client";
import { useRouter } from "next/navigation";
import VericationPage from "@/components/signup/VerificationPage";
import { useEffect, useState } from "react";
import { useAuthService } from "@/services/authService";
import Cookies from "js-cookie";

const Verification = () => {
  const router = useRouter();
  const { useResendVerification } = useAuthService();
  const resendVerification = useResendVerification();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("auth-token");

    if (token) {
      // If token exists, redirect to personal-info
      localStorage.removeItem("signup-email");
      router.replace("/signup/personal-info");
    }
  }, [router]);

  const handleResend = () => {
    const email = localStorage.getItem("signup-email");
    if (email) {
      resendVerification.mutate(
        { email },
        {
          onSuccess: () => {
            setMessage("A new verification link has been sent to your email.");
          },
          onError: (error: any) => {
            setMessage(error.message);
          },
        },
      );
    } else {
      setMessage("No email found to resend verification.");
    }
  };

  return (
    <div>
      <VericationPage />

      <div className="max-w-sm m-auto ">
        <button
          onClick={handleResend}
          disabled={resendVerification.isPending}
          className="w-full py-3 rounded-md bg-primary-400 disabled:bg-[#555555] text-white flex items-center justify-center"
        >
          {resendVerification.isPending
            ? "Resending..."
            : "Resend Verification Email"}
        </button>

        {message && (
          <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Verification;
