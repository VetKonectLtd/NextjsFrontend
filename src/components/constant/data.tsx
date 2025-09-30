import {
	Home,
	Dashboard,
	Disease,
	Account,
	Activities,
	Ads,
	Client,
	Feed,
	Store,
	Chat,
	Cases,
	Pet,
} from "@/app/assets/icons/sidebar";
import { Cow } from "@/app/assets/icons/vet-vendor";

export const navItems = [
	{ id: 1, label: "Home", icon: Home, href: "/dashboard/vet-vendor" },
	{ id: 2, label: "Dashboard", icon: Dashboard, href: "/dashboard" },
	{ id: 3, label: "Pets", icon: Pet, Dashboard, href: "/dashboard/pet" },
	{ id: 4, label: "Livestock", icon: Cow, href: "/dashboard/livestock" },
	{ id: 5, label: "Cases", icon: Cases, href: "/dashboard/cases" },
	{ id: 6, label: "Clients", icon: Client, href: "/dashboard/client" },
	{ id: 7, label: "My Stores", icon: Store, href: "/dashboard/stores" },
	{ id: 8, label: "Chat Forum", icon: Chat, href: "/dashboard/chat-forum" },
	{
		id:9,
		label: "Feed Calculator",
		icon: Feed,
		href: "/dashboard/feed-calculator",
	},
	{
		id: 10,
		label: "Disease Prediction",
		icon: Disease,
		href: "/dashboard/disease-predictor",
	},
	{ id: 11, label: "Account", icon: Account, href: "/dashboard/account" },
	{
		id: 12,
		label: "Activities",
		icon: Activities,
		href: "/dashboard/activities",
	},
	{
		id: 13,
		label: "Ads Promotion",
		icon: Ads,
		href: "/dashboard/ad-promotion",
	},
];
