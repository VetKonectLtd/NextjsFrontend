"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./data";
import { useState } from "react";

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<>
			<div
				style={{ width: "100px" }}
				className="hidden overflow-y-scroll lg:translate-x-0 scrollbar-hide left-0 transition-all duration-300 h-screen fixed border-none  items-center shadow-sm md:flex flex-col gap-2"
			>
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<div className="px-2 pb-10 w-full ml-3" key={item.id}>
							<Link
								href={item.href}
								style={{
									border: isActive ? "2px solid #52CE06" : "2px solid #EBEBEB",
								}}
								className="flex flex-col items-center justify-center px-1 py-3 rounded-lg shadow-md text-center gap-2 mx-auto"
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
