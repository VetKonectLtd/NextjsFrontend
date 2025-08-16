import Sidebar from "@/lib/constant/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="flex w-full min-h-screen">
			<Sidebar />
			<div className="flex-grow ml-16">{children}</div>
		</div>
	);
}
