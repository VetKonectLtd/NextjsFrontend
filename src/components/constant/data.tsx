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
	Message,
	ClinicImage,
	Subscription,
} from "@/app/assets/icons/sidebar";
import { Cow } from "@/app/assets/icons/vet-vendor";

export const navItems = [
	{ id: 1, label: "Home", icon: Home, href: "/dashboard/vet-vendor" },
	{ id: 2, label: "Dashboard", icon: Dashboard, href: "/dashboard" },
	{ id: 3, label: "Messages", icon: Message, href: "/dashboard/messages" },
	{ id: 4, label: "Pets", icon: Pet, Dashboard, href: "/dashboard/pet" },
	{ id: 5, label: "Livestock", icon: Cow, href: "/dashboard/livestock" },
	{ id: 6, label: "Cases", icon: Cases, href: "/dashboard/cases" },
	// { id: 7, label: "Clients", icon: Client, href: "/dashboard/client" },
	{ id: 8, label: "My Stores", icon: Store, href: "/dashboard/stores" },
	{ id: 9, label: "Chat Forum", icon: Chat, href: "/chat-forum" },
	{
		id:10,
		label: "Feed Calculator",
		icon: Feed,
		href: "/dashboard/feed-calculator",
	},
	{
		id: 11,
		label: "Disease Prediction",
		icon: Disease,
		href: "/dashboard/disease-predictor",
	},
	{ id: 12, label: "Account", icon: Account, href: "/dashboard/account" },
	{
		id: 13,
		label: "Activities",
		icon: Activities,
		href: "/dashboard/activities",
	},
	{
		id: 14,
		label: "Ads Promotion",
		icon: Ads,
		href: "/dashboard/ad-promotion",
	},
	{
		id: 15,
		label: "Clinic Listing",
		icon: ClinicImage,
		href: "/dashboard/clinic-listing",
	},
	{
		id: 16,
		label: "Subscription",
		icon: Subscription,
		href: "/dashboard/subscription",
	}

];


export const ROLE_NAV_ACCESS: Record<string, number[]> = {
	"veterinary_paraprofessional": [1, 2,3, 6, 8, 9, 10, 11, 12, 13, 14,15,16],
	"veterinary_clinic": [1, 2,3, 6,  8, 9, 10, 11, 12, 13,14,15,16],
	"veterinary_doctor": [1, 2,3, 6, 8, 9, 10, 11, 12, 13,14, 15,16],
	"livestock_farmer": [1, 2,3, 5, 8, 9, 10, 11, 12, 13,14,15, 16],
	"pet_owner": [1, 2, 3,4, 8, 9, 10, 11, 12, 13,14,15,16], 
	"vendor": [1, 2,3, 8,9, 10, 11, 12, 13, 14,15,16],       
	"others": [1, 2,3,8, 9, 10, 11, 12, 13, 14,15,16],   
	
	"basic_user": [1, 2, 3, 8, 9, 10, 11, 12, 13, 14,15,16],
};