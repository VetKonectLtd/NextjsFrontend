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
  const redirect = searchParams.get("redirect");
  const from = searchParams.get("from");

  useEffect(() => {
    if (token) {
      // Set the token
      Cookies.set("auth-token", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      localStorage.setItem("auth-token", token);
      
      // Remove token from URL for security
      const cleanUrl = `/success?form=${formType || "Login"}`;
      window.history.replaceState({}, "", cleanUrl);

      // Set flag to indicate successful login
      sessionStorage.setItem("justLoggedIn", "true");
      
      // Determine where to redirect
      let targetUrl = "/dashboard";
      
      // Priority 1: Check if coming from comment
      if (from === "comment") {
        const storedRedirect = sessionStorage.getItem("redirect-after-login");
        if (storedRedirect) {
          targetUrl = storedRedirect;
          sessionStorage.removeItem("redirect-after-login");
        }
      }
      // Priority 2: Use redirect param
      else if (redirect) {
        targetUrl = redirect;
      }
      // Priority 3: Check for stored Google login redirect
      else {
        const googleRedirect = sessionStorage.getItem("redirect-after-google-login");
        if (googleRedirect) {
          targetUrl = googleRedirect;
          sessionStorage.removeItem("redirect-after-google-login");
        }
      }

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1500);
    }
  }, [token, formType, router, redirect, from]);

  const renderSuccessComponent = () => {
    switch (formType) {
      case "Signup":
        return <SignUpSuccess />;
      case "Login":
        return <LoginSuccess />;
      case "restPassword":
        return <ResetPasswordSuccess />;
      default:
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Login successful! Redirecting...</p>
          </div>
        );
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