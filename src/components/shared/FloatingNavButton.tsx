"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { SidebarMobile } from "../constant/SidebarMobile";
import { Down } from "@/app/assets/icons";
import Image from "next/image";

export default function FloatingNavButton() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Floating Button */}
			<button
				onClick={() => setOpen(true)}
				className="md:hidden flex flex-col justify-center items-center fixed font-extrabold bottom-0 right-0 z-40 bg-white border border-gray-400 text-primary-400 py-4 px-4 shadow-xl shadow-gray-300 active:scale-95 transition"
			>
				<Image
					src={Down}
					alt="down"
					width={120}
					height={120}
					className="h-4 w-4 rotate-180 object-cover"
				/>
				<h1 className="text-xs">Menu</h1>
			</button>

			{/* Mobile Navbar Modal */}
			<SidebarMobile isOpen={open} onClose={() => setOpen(false)} />
		</>
	);
}
