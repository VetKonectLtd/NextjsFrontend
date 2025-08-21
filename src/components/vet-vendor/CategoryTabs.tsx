import Image from "next/image";
import {Paws, Cow, Icon11, Icon13, Icon12} from "@/app/assets/icons/vet-vendor";

const tabs = [
	{ name: "Pets", count: 3, icon: Paws },
	{ name: "Livestock", count: 4, icon: Cow },
	{ name: "Feed", count: 2, icon: Icon11 },
	{ name: "Drugs", count: 1, icon: Icon12 },
	{ name: "Tools and materials", count: 1, icon: Icon13 },
];

const CategoryTabs = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-2">
			{tabs.map((tab, idx) => (
				<div
					key={idx}
					className="flex flex-col items-center justify-center px-7 py-4 hover:border-2 bg-white border border-gray-225 hover:border-green-50 shadow-md rounded-lg cursor-pointer"
				>
					<Image src={tab.icon} alt={tab.name} width={25} height={25} />
					<div className="text-center mt-1 flex items-center text-gray-55">
						<span className="font-medium mr-2 text-sm">{tab.name} ({tab.count})</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default CategoryTabs;
