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
	Cases
} from "@/app/assets/icons/sidebar";
import {Cow} from "@/app/assets/icons/vet-vendor";

export const navItems = [
	{ id: 1, label: "Home", icon: Home, href: "/dashboard/vet-vendor" },
	{ id: 2, label: "Dashboard", icon: Dashboard, href: "/dashboard" },
	{ id: 3, label: "Pets & Livestock", icon: Cow, href: "/dashboard/animal-owner" },
	{ id: 4, label: "Cases", icon: Cases, href: "/dashboard/cases" },
	{ id: 5, label: "Clients", icon: Client, href: "#" },
	{ id: 6, label: "My Stores", icon: Store, href: "/dashboard/stores" },
	{ id: 7, label: "Chat Forum", icon: Chat, href: "/dashboard/chat-forum" },
	{ id: 8, label: "Feed Calculator", icon: Feed, href: "/dashboard/feed-calculator" },
	{ id: 9, label: "Disease Prediction", icon: Disease, href: "/dashboard/disease-predictor" },
	{ id: 9, label: "Account", icon: Account, href: "/dashboard/account" },
	{ id: 10, label: "Activities", icon: Activities, href: "/dashboard/activities" },
	{ id: 11, label: "Ads Promotion", icon: Ads, href: "/dashboard/ad-promotion" },
];
