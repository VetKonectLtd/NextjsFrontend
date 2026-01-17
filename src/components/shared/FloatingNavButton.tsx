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
				className="md:hidden fixed font-extrabold bottom-0 right-0 z-40 bg-primary-400 text-white py-4 px-6 shadow-xl active:scale-95 transition"
			>
				<ArrowUp size={23} />
			</button>

			{/* Mobile Navbar Modal */}
			<SidebarMobile isOpen={open} onClose={() => setOpen(false)} />
		</>
	);
}
