import Home from "@/app/assets/icons/sidebar/home.svg";
import Dashboard from "@/app/assets/icons/sidebar/dashbord.svg";
import Disease from "@/app/assets/icons/sidebar/disease.svg";
import Ads from "@/app/assets/icons/sidebar/ads.svg";
import Activities from "@/app/assets/icons/sidebar/activities.svg";
import Account from "@/app/assets/icons/sidebar/account.svg";
import Cow from "@/app/assets/icons/sidebar/cow.svg";
import Client from "@/app/assets/icons/sidebar/clients.svg";
import Feed from "@/app/assets/icons/sidebar/feed.svg";
import Stores from "@/app/assets/icons/sidebar/stores.svg";
import Chat from "@/app/assets/icons/sidebar/chat.svg";

export const navItems = [
	{ id: 1, label: "Home", icon: Home, href: "/dashboard/vet-vendor" },
	{ id: 2, label: "Dashboard", icon: Dashboard, href: "#" },
	{ id: 3, label: "Pets & Livestock", icon: Cow, href: "#" },
	{ id: 4, label: "Clients", icon: Client, href: "#" },
	{ id: 5, label: "Stores", icon: Stores, href: "#" },
	{ id: 6, label: "Chat Forum", icon: Chat, href: "#" },
	{ id: 7, label: "Feed Calculator", icon: Feed, href: "#" },
	{ id: 8, label: "Disease Prediction", icon: Disease, href: "#" },
	{ id: 9, label: "Account", icon: Account, href: "#" },
	{ id: 10, label: "Activities", icon: Activities, href: "#" },
	{ id: 11, label: "Ads Promotion", icon: Ads, href: "#" },
];