import ActivityClient from "./ActivityClient";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Recent Activities | Vet Konect",
	description:
		"View your recent activities, updates, and interactions on Vet Konect.",
	robots: {
		index: false, // ⭐ IMPORTANT (private page)
		follow: false,
	},
	openGraph: {
		title: "Recent Activities",
		description:
			"Track your latest activities and updates on Vet Konect.",
		url: "https://www.vetkonect.com/activities",
		type: "website",
	},
};

const Activities = () => {
	
	return (
		<ActivityClient />
	);
};

export default Activities;
