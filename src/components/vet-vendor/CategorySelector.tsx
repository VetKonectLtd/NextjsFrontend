import Image from "next/image";
import {Icon6, Icon10, Icon7, Icon9} from "@/app/assets/icons/vet-vendor";

const categories = [
	{ id: 1, name: "Veterinarian", icon: Icon7, active: false },
	{ id: 2, name: "VPP", icon: Icon6, active: false },
	{ id: 3, name: "Vet Vendor", icon: Icon10, active: true },
	{ id: 4, name: "Vet Clinic", icon: Icon9, active: false },
];

const CategorySelector = () => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full py-4">
			{categories.map((cat, idx) => {
				const isFirst = idx === 0;
				const isLast = idx === categories.length - 1;
				return (
					<div
						key={cat.id}
						className={`flex items-center border hover:border-4 border-gray-225 hover:border-green-50 justify-center gap-2 shadow-md rounded-sm px-4 py-3 cursor-pointer transition-colors
        ${isFirst ? "rounded-l-xl" : ""}
        ${isLast ? "rounded-r-xl " : ""}
      `}
					>
						<Image src={cat.icon} alt={cat.name} width={20} height={20} />
						<span className="text-sm font-medium">{cat.name}</span>
					</div>
				);
			})}
		</div>
	);
};

export default CategorySelector;
