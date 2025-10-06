"use client";

import { Profile } from "@/components/account";

const AccountPage = () => {
	// Default to vet profile - you can change this based on user authentication/role

	return (
		<div className="w-11/12 mt-3 m-auto">
			{" "}
			<Profile userRole="vet" />{" "}
		</div>
	)
};

export default AccountPage;
