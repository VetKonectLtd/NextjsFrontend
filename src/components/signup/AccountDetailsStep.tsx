"use client";

import FormInput from "../form/FormInput";

const AccountDetailsStep = () => {

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full max-w-sm flex flex-col gap-1">
				<FormInput
					label="Email"
					name="email-signup"
					type="email"
					focusLabel="Email Address (Required)"
					isRequired
				/>

				<FormInput
					label="Password"
					name="password-signup"
					type="password"
					focusLabel="Password (Required):"
					isRequired
				/>
				<FormInput
					label="Confirm Password"
					name="password-confirm"
					type="password"
					focusLabel="Confirm Password (Required):"
					isRequired
				/>
			</div>
		</div>
	);
};

export default AccountDetailsStep;
