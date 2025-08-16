"use client";
import Link from "next/link";
import React, { useState } from "react";
import FormInput from "../form/FormInput";

const VericationPage = () => {
	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full max-w-sm flex flex-col gap-6">
				<p className="font-normal text-center text-[#666666]">
					Kindly enter the 6 digit code sent to your email in the input field
					below
				</p>

				<FormInput
					label="Pin Code"
					name="Pin"
					type="number"
					focusLabel="Pin Code :"
					maxLength={6}
					isRequired
				/>

				<div className="text-center mb-2">
					<button
						className="text-sm text-gray-700 underline"
					>
						Resend Code
					</button>
				</div>
			</div>
		</div>
	);
};

export default VericationPage;
