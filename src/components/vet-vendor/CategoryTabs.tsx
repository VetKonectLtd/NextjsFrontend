import Image from "next/image";
import Paw from "@/app/assets/icons/vet-vendor/paws.png";
import Cow from "@/app/assets/icons/sidebar/cow.svg";
import Icon11 from "@/app/assets/icons/vet-vendor/icon11.png";
import Icon12 from "@/app/assets/icons/vet-vendor/icon12.png";
import Icon13 from "@/app/assets/icons/vet-vendor/icon13.png";

const tabs = [
	{ name: "Pets", count: 3, icon: Paw },
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
					className="flex flex-col items-center justify-center px-7 py-4 hover:border-2 bg-white border border-[#EBEBEB] hover:border-[#52CE06] shadow-md rounded-lg cursor-pointer"
				>
					<Image src={tab.icon} alt={tab.name} width={25} height={25} />
					<div className="text-center mt-1 flex items-center text-[#1D2432]">
						<span className="font-medium mr-2 text-sm">{tab.name} ({tab.count})</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default CategoryTabs;
