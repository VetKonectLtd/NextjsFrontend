import Image from "next/image";
import { Icon6, Icon10, Icon7, Icon9 } from "@/app/assets/icons/vet-vendor";

const categories = [
	{ id: 1, name: "Veterinarian", icon: Icon7, active: false },
	{ id: 2, name: "VPP", icon: Icon6, active: false },
	{ id: 3, name: "Vet Vendor", icon: Icon10, active: true },
	{ id: 4, name: "Vet Clinic", icon: Icon9, active: false },
];

interface CategorySelectorProps {
	activeCategory: string;
	onSelect: (category: string) => void;
}

const CategorySelector = ({
	activeCategory,
	onSelect,
}: CategorySelectorProps) => {
	return (
		<div className="grid grid-cols-4 text-center md:grid-cols-4 md:gap-4 gap-2 w-full py-4">
			{categories.map((cat, idx) => {
				const isActive = activeCategory === cat.name;
				const isFirst = idx === 0;
				const isLast = idx === categories.length - 1;
				return (
					<div
						key={cat.id}
						onClick={() => onSelect(cat.name)}
						className={`flex md:flex-row flex-col items-center justify-center gap-2 shadow-md rounded-sm px-4 py-3 cursor-pointer transition-colors
						${isFirst ? "rounded-l-xl" : ""}
						${isLast ? "rounded-r-xl " : ""}
						${isActive ? "border-4 border-green-50" : "border border-gray-225 hover:border-green-50"}
					`}
					>
						<Image src={cat.icon} alt={cat.name} width={20} height={20} />
						<span className="md:text-sm text-xs font-medium">{cat.name}</span>
					</div>
				);
			})}
		</div>
	);
};

export default CategorySelector;
