"use client";

import {
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import FormInput from "../form/FormInput";
import { SignupCredentials } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface AccountDetailsProps {
  register: UseFormRegister<SignupCredentials>;
  getValues: UseFormGetValues<SignupCredentials>;
  clearErrors: UseFormClearErrors<SignupCredentials>;
  errors: any;
  setValue: UseFormSetValue<SignupCredentials>;
}

const AccountDetailsStep = ({
  register,
  getValues,
  clearErrors,
  setValue,
  errors,
}: AccountDetailsProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const inviteCodeFromUrl =
      searchParams.get("invite_code") || searchParams.get("invite");
    if (inviteCodeFromUrl) {
      setValue("invite", inviteCodeFromUrl);
    }
  }, [searchParams, setValue]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-sm flex flex-col gap-1">
        <FormInput
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          onChange={(e) => {
            clearErrors("email");
          }}
          type="email"
          focusLabel="Email Address (Required)"
          isRequired
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <FormInput
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[!@#$%^&*()\-_=+\[\]{};:'"\\|,.<>/?`~])/,
              message: "Password must contain at least one special character",
            },
          })}
          onChange={(e) => {
            clearErrors("password");
          }}
          focusLabel="Password (Required):"
          isRequired
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <FormInput
          label="Confirm Password"
          type="password"
          {...register("password_confirmation", {
            required: "confirm password is required",
            validate: (value: any) =>
              value === getValues("password") || "Passwords do not match",
          })}
          onChange={(e) => {
            clearErrors("password_confirmation");
          }}
          focusLabel="Confirm Password (Required):"
          isRequired
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-xs">
            {errors.password_confirmation.message}
          </p>
        )}

        <FormInput
          label="Invite Code"
          {...register("invite")}
          onChange={(e) => {
            clearErrors("invite");
          }}
          focusLabel="Invite Code (Optional)"
          isRequired={false}
        />
        {errors.invite_code && (
          <p className="text-red-500 text-xs">{errors.invite_code.message}</p>
        )}
      </div>
    </div>
  );
};

export default AccountDetailsStep;
