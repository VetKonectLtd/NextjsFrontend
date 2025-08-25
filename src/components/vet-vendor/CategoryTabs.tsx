import Image from "next/image";

interface CategoryTabsProps {
	activeTab: string;
	onSelect: (tab: string) => void;
	tabs: { name: string; count: number; icon?: string | null }[];
}

const CategoryTabs = ({ activeTab, onSelect, tabs }: CategoryTabsProps) => {
	return (
		<div className="grid grid-cols-5 md:grid-cols-5 md:gap-4 gap-2 py-2">
			{tabs.map((tab, idx) => {
				const isActive = activeTab === tab.name;
				return (
					<div
						key={idx}
						onClick={() => onSelect(tab.name)}
						className={`flex flex-col items-center justify-center md:px-7 px-3 md:py-4 py-2 border shadow-md rounded-lg cursor-pointer transition-colors
						${isActive ? "border-green-500" : "border-gray-225 hover:border-green-50"}
						`}
					>
						{tab.icon && (
							<Image src={tab.icon} alt={tab.name} width={25} height={25} />
						)}
						<div
							className={`text-center mt-1 flex items-center ${
								isActive ? "text-green-600" : "text-gray-600"
							}`}
						>
							<span className="font-medium mr-2 md:text-sm text-xs">
								{tab.name} ({tab.count})
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CategoryTabs;
