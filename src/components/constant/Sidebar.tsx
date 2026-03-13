"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, ROLE_NAV_ACCESS } from "./data";
import { useAuthService } from "@/services/authService";

const Sidebar = () => {
	const pathname = usePathname();
	const { useCurrentUser } = useAuthService();
	const user = useCurrentUser(true);

	const userRole= (user as Record<string, any>).data?.role;

	const allowedIds = ROLE_NAV_ACCESS[userRole] || ROLE_NAV_ACCESS["basic_user"];

	const filteredNav = navItems.filter((item) => allowedIds.includes(item.id));

	return (
		<>
			<div className="hidden w-24 overflow-y-scroll  pb-8 transition-all duration-300 h-vhs  fixed items-center  md:flex flex-col gap-2">
				{filteredNav.map((item, index) => {
					const isActive =
						pathname === item.href ||
						(pathname.startsWith(item.href + "/") &&
							item.href !== "/dashboard") ||
						(pathname === "/dashboard" && item.href === "/dashboard");
					return (
						<div className="px-2 w-full" key={index}>
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
