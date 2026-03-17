"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthBg } from "@/app/assets/images";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form/FormInput";
import { LoginCredentials } from "@/types";
import { useAuthService } from "@/services/authService";
import { Loader2 } from "lucide-react";
import { AUTH_ENDPOINTS } from "@/lib/api-constants";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { useLogin, setAuthCookie } = useAuthService();
  const loginMutation = useLogin();


  // Get all possible redirect parameters - but we'll prioritize returnUrl
  const returnUrlParam = searchParams.get("returnUrl");
  const redirectParam = searchParams.get("redirect"); // For backward compatibility
  const fromParam = searchParams.get("from");
  const inviteCode = searchParams.get("invite");

  // Determine the initial redirect URL (priority: returnUrl > redirect > default)
  const initialRedirect = returnUrlParam || redirectParam || "/dashboard";

  const [redirectTo, setRedirectTo] = useState<string>(initialRedirect);

  // Log for debugging
  useEffect(() => {
    console.log("🔐 Login Page - Query Params:", {
      returnUrl: returnUrlParam,
      redirect: redirectParam,
      from: fromParam,
      invite: inviteCode
    });
    console.log("🔐 Initial redirect set to:", initialRedirect);
  }, []);

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
    loginMutation.mutate(data, {
      onSuccess: (response: any) => {
        // Handle different response formats
        let token = null;
        let message = "Login successful!";

        if (response?.token) {
          token = response.token;
          message = response.message || message;
        } else if (response?.data?.token) {
          token = response.data.token;
          message = response.message || response.data.message || message;
        } else if (response?.success && response.data?.token) {
          token = response.data.token;
          message = response.message || message;
        }

        if (token) {
          // Set cookie
          setAuthCookie(token);

          // Store login flag
          sessionStorage.setItem("justLoggedIn", "true");

          // FINAL REDIRECT URL - use redirectTo state
          let finalRedirect = redirectTo;

          // Special case for comment flow
          if (fromParam === "comment") {
            // For comment flow, we might want to keep the comment-specific redirect
            console.log("💬 Comment flow redirect:", finalRedirect);
          }

          console.log("✅ Login successful, redirecting to:", finalRedirect);

          // Clear any old/stale redirect data
          sessionStorage.removeItem("redirect-after-login");
          sessionStorage.removeItem("post-login-redirect");
          sessionStorage.removeItem("redirect-after-google-login");

          // Redirect
          setTimeout(() => {
            window.location.href = finalRedirect;
          }, 100);
        } else {
          console.error("No token in login response:", response);
        }
      },
      onError: (error: any) => {
        console.error("Login error:", error);
      },
    });
  };


  const handleGoogleLogin = () => {
    // Store the final redirect URL where we want to go after Google OAuth completes
    sessionStorage.setItem("google-oauth-redirect", redirectTo);

    // Build the Google OAuth URL
    let url = `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
    const params = new URLSearchParams();

    // IMPORTANT: Pass the redirectTo as the 'state' parameter
    // This will be returned by Google OAuth
    params.set("state", redirectTo);

    if (inviteCode) {
      params.set("invite", inviteCode);
    }

    // If your backend expects a redirect_uri, add it
    // params.set("redirect_uri", `${window.location.origin}/auth/google/callback`);

    url += `?${params.toString()}`;

    // Redirect to Google OAuth
    window.location.href = url;
  };


  return (
    <div
      style={{ backgroundImage: `url(${AuthBg.src})` }}
      className="md:min-h-screen bg-white bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center py-12 px-4"
    >
      <div className="w-full pt-36 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-gray-55">Login</h1>
          <p className="text-base font-normal text-[#666666] mb-6">
            Secure access to your account
          </p>

          {fromParam === "comment" && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md mb-4">
              <p className="text-sm">
                Please login to comment on the forum post.
              </p>
            </div>
          )}
        </div>

        <form className="space-y-1">
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
            onChange={() => clearErrors("email")}
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
            })}
            onChange={() => {
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
                href="/reset-password"
                className="text-sm text-gray-700 underline"
              >
                Forgot your password?
              </Link>
            </div>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loginMutation.isLoading}
              className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
            >
              {loginMutation.isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center my-6">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
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
          onClick={() => {
            const params = new URLSearchParams();
            if (redirectParam) params.set("redirect", redirectParam);
            if (fromParam) params.set("from", fromParam);

            router.push(`/signup${params.toString() ? `?${params.toString()}` : ''}`);
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}