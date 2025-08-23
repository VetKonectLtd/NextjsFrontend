import Sidebar from "@/components/constant/Sidebar";
import CategoryModal from "@/components/modals/CategoryModal";
import { ReactNode } from "react";

export default function DashboardLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="flex w-full mt-20 pt-2 min-h-screen">
			<Sidebar />
			<CategoryModal/>
			<div className="flex-grow md:ml-16">{children}</div>
		</div>
	);
}
