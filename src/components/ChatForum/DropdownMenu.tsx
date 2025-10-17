"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersVertical, Check } from "lucide-react";
import { useAuthService } from "@/services/authService";
import { formatRole } from "../shared/TimeFormat";
import { motion } from "framer-motion";
import { useState } from "react";

const FilterDropdownMenu = ({ setVisibilityFilter }: { setVisibilityFilter: (val: string) => void }) => {
	const { useCurrentUser } = useAuthService();
	const { data: user } = useCurrentUser(true);
	const currentUserRole = (user as any)?.profile.user.roles[1].name;
	
	const [selected, setSelected] = useState(" ");

	const handleSelect = (value: string) => {
		setSelected(value);
		setVisibilityFilter(value);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="bg-white shadow-md rounded-xl border border-gray-225 md:p-3 p-2 transition-all hover:shadow-lg">
					<SlidersVertical className="h-4 w-4 text-gray-600" />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-60 bg-white rounded-xl border border-gray-200 shadow-lg p-1 overflow-hidden"
				asChild
			>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					<DropdownMenuItem
						onClick={() => handleSelect("everyone")}
						className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer transition ${
							selected === "everyone" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
						}`}
					>
						<span>Everyone</span>
						{selected === "everyone" && <Check className="w-4 h-4 text-gray-600" />}
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => handleSelect(currentUserRole)}
						className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer transition ${
							selected === currentUserRole ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
						}`}
					>
						<span>{formatRole(currentUserRole)}</span>
						{selected === currentUserRole && <Check className="w-4 h-4 text-gray-600" />}
					</DropdownMenuItem>
				</motion.div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FilterDropdownMenu;
