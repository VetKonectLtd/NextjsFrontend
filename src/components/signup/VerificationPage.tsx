"use client";
import React from "react";

const VerificationPage = () => {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center text-gray-55 mb-2">
        Verify Your Email
      </h1>

      <p className="text-base font-normal text-center text-[#666666] mb-8">
        We’ve sent a verification link to your email address. Please check your
        inbox and click on the link to activate your account.
      </p>
    </div>
  );
};

export default VerificationPage;
