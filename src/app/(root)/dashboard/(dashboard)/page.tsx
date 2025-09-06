"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, PlusIcon } from "lucide-react";
import { Ads, Search, Store } from "@/app/assets/icons/sidebar";
import { Cow } from "@/app/assets/icons/vet-vendor";
import Image from "next/image";
import { Arrow } from "@/app/assets/icons";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter, useSearchParams } from "next/navigation";

const quickActions = [
	{
		title: "Search for what you need",
		description:
			"Browse our platform for vendors, vets, pet clinics, livestock and more.",
		icon: Search,
		href: "/dashboard",
	},
	{
		title: "Manage your store",
		description: "Set up, edit, and customize your store on the platform.",
		icon: Store,
		href: "/dashboard/stores",
	},
	{
		title: "Manage Your Pet & Livestock Farm",
		description:
			"Manage your farm and livestock care on our platform to access high-quality vet care.",
		icon: Cow,
		href: "/dashboard/animal-owner",
	},
	{
		title: "Manage Your Promotions",
		description:
			"Manage your advertisements by selecting promotion subscription plans.",
		icon: Ads,
		href: "/dashboard/ad-promotion",
	},
];

const activities = [
	{
		id: 1,
		text: "Deleted Vendor From Client List",
		meta: "Vendor Name",
		time: "39 mins ago",
	},
	{ id: 2, text: "Liked a Forum Chat", meta: "Topic", time: "51 mins ago" },
	{
		id: 3,
		text: "Case Closed",
		meta: "Case Title - Case ID",
		time: "2 hrs ago",
	},
	{
		id: 4,
		text: "Sent a Direct Message",
		meta: "Message first paragraph",
		time: "Today 12:47 PM CST",
	},
	{
		id: 5,
		text: "Replied a Direct Message",
		meta: "Message first paragraph",
		time: "Jan 20, 2023 12:47 PM CST",
	},
];

const Dashboard = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [role, setRole]= useState(false);

	const initialTab = searchParams.get("tab") || "recent";
	const [tab, setTab] = useState(initialTab);

	useEffect(() => {
		const urlTab = searchParams.get("tab");
		if (urlTab && urlTab !== tab) {
			setTab(urlTab);
		}
	}, [searchParams]);

	const handleTabChange = (value: string) => {
		setTab(value);
		router.replace(`?tab=${value}`);
	};

	return (
		<div className="w-11/12 m-auto">
			{/* ✅ Congratulations Card */}
			{role && 
			<div className="flex items-center justify-between w-full border-2 pl-2 bg-white border-green-50 rounded-xl p-1 mb-2 transition">
				<div className="text-gray-55 flex flex-col">
				<span className="text-xs font-normal">Congratulations</span>	
				<p className="text-gray-55 text-sm font-medium">Your Vet Number (VCN) has been verified and Approved</p>
				</div>
				<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
					<Check className="w-5 h-5 font-bold text-white " />
				</div>
			</div>}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{quickActions.map((action, idx) => (
					<Link
						href={action.href}
						key={idx}
						className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-225 hover:shadow-md transition"
					>
						<div className="flex gap-4 md:w-3/5 w-11/12">
							<Image
								src={action.icon}
								alt={action.title}
								width={28}
								height={28}
							/>
							<div>
								<h3 className="font-bold text-sm text-gray-55">
									{action.title}
								</h3>
								<p className="text-xs font-normal text-gray-55">
									{action.description}
								</p>
							</div>
						</div>

						<Image src={Arrow} alt="arrow" width={20} height={20} />
					</Link>
				))}
			</div>

			{/* ✅ Add New Case Button */}
			{role && <div
				// onClick={() => selectAddPromotion(false)}
				className="flex items-center justify-between md:w-1/2 border-2 pl-2 bg-white border-green-50 rounded-xl p-2 my-6 transition"
			>
				<span className="text-gray-55 text-sm font-semibold">Add new Case</span>
				<div className="w-8 h-8 flex items-center justify-center bg-green-50 text-white rounded-xl text-xl">
					<PlusIcon className="w-5 h-5 font-bold text-white " />
				</div>
			</div>}

			{/* Tabs */}
			<div className=" py-2 px-4 mt-6 bg-white shadow-md rounded-xl border border-gray-225">
				<Tabs
					defaultValue={tab}
					onValueChange={handleTabChange}
					className="w-full"
				>
					<TabsList className="mb-6 bg-transparent">
						<TabsTrigger
							className="data-[state=active]:font-bold text-base mr-6 data-[state=active]:bg-transparent data-[state=active]:shadow-none font-normal"
							value="recent"
						>
							Recent Activities
						</TabsTrigger>
						<TabsTrigger
							className="data-[state=active]:font-bold text-base data-[state=active]:bg-transparent data-[state=active]:shadow-none font-normal"
							value="forum"
						>
							Forum Trending Topics
						</TabsTrigger>
					</TabsList>

					<TabsContent value="recent">
						<div className="mt-3">
							{activities.map((item) => (
								<div
									key={item.id}
									className="flex border rounded-xl shadow-md  bg-white border-gray-225 justify-between items-center px-4 py-3 mb-2 text-sm"
								>
									<div>
										<p className="font-bold text-sm text-gray-55">
											{item.text}
										</p>
										<p className="text-gray-55 text-xs">{item.meta}</p>
									</div>
									<span className="text-xs rounded-full px-2 py-1 bg-[#F1F1F1] text-gray-55 whitespace-nowrap">
										{item.time}
									</span>
								</div>
							))}
						</div>
					</TabsContent>

					<TabsContent value="forum">
						<div className="text-center pb-5 text-gray-500  rounded-2xl mt-2">
							Forum Trending Topics will appear here.
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default Dashboard;
