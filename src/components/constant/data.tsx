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
} from "@/app/assets/icons/sidebar";
import {Cow} from "@/app/assets/icons/vet-vendor";

export const navItems = [
	{ id: 1, label: "Home", icon: Home, href: "/dashboard/vet-vendor" },
	{ id: 2, label: "Dashboard", icon: Dashboard, href: "#" },
	{ id: 3, label: "Pets & Livestock", icon: Cow, href: "#" },
	{ id: 4, label: "Clients", icon: Client, href: "#" },
	{ id: 5, label: "Stores", icon: Store, href: "#" },
	{ id: 6, label: "Chat Forum", icon: Chat, href: "#" },
	{ id: 7, label: "Feed Calculator", icon: Feed, href: "#" },
	{ id: 8, label: "Disease Prediction", icon: Disease, href: "#" },
	{ id: 9, label: "Account", icon: Account, href: "#" },
	{ id: 10, label: "Activities", icon: Activities, href: "#" },
	{ id: 11, label: "Ads Promotion", icon: Ads, href: "#" },
];
