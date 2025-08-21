"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./data";

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<>
			<div
				className="hidden w-24 overflow-y-scroll scrollbar-hide pb-8 transition-all duration-300 h-vhs  fixed items-center  md:flex flex-col gap-2"
			>
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<div className="px-2 w-full" key={item.id}>
							<Link
								href={item.href}
								className={`flex flex-col items-center justify-center px-1 border-gray-225 hover:border-green-50 py-3 border-2 rounded-lg shadow-md text-center gap-2 mx-auto ${
									isActive ? "border-green-50" : "hover:border-green-50" 
								}`}
							>
								<Image
									src={item.icon}
									alt={item.label}
									width={28}
									height={28}
								/>
								<span
									style={{ fontSize: "9px" }}
									className="font-medium leading-tight text-wrap"
								>
									{item.label.length > 13
										? `${item.label.slice(0, 13)}...`
										: item.label}
								</span>
							</Link>
						</div>
					);
				})}
			</div>
			
		</>
	);
};
export default Sidebar;
