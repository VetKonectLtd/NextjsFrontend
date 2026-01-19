"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { SidebarMobile } from "../constant/SidebarMobile";

export default function FloatingNavButton() {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Floating Button */}
			<button
				onClick={() => setOpen(true)}
				className="md:hidden fixed font-extrabold bottom-0 right-0 z-40 bg-white border border-gray-400 text-primary-400 py-4 px-5 shadow-xl shadow-gray-300 active:scale-95 transition"
			>
				<ArrowUp size={23} />
			</button>

			{/* Mobile Navbar Modal */}
			<SidebarMobile isOpen={open} onClose={() => setOpen(false)} />
		</>
	);
}
