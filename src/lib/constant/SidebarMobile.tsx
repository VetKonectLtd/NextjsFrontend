import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "./data";
import Link from "next/link";
import Image from "next/image";

export function SidebarMobile({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const pathname = usePathname();
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.aside
					initial={{ x: "-100%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: "-100%", opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed top-0 left-0 z-50 w-full py-6 h-screen bg-white rounded-r-2xl shadow-lg flex flex-col justify-between"
				>
					{/* Header */}
					<div className="flex items-center justify-between px-5 pt-5 pb-2">
						<span className="text-lg font-bold">Nav bar</span>
						<button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
							&times;
						</button>
					</div>
					{/* Nav Items */}
					<nav className="flex-1 px-5 py-2 overflow-y-auto">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									href={item.href}
									key={item.id}
									className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-4 transition text-base font-medium
										${isActive ? "border border-green-500 bg-green-50" : "border border-transparent hover:border-green-500"}`}
								>
									<Image src={item.icon} alt={item.label} width={24} height={24} />
									<span className="truncate">{item.label}</span>
								</Link>
							);
						})}
					</nav>
					{/* User Profile */}
					<div className="flex items-center gap-2 px-5 py-4 border-t">
						<span className="text-sm font-semibold">Alice Jane</span>
						<Image src="/images/user-avatar.png" alt="User" width={32} height={32} className="rounded-full" />
					</div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
