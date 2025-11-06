"use client";

import { EllipsisVertical, Flag, Reply } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ForumMenuProps {
	handleDelete: () => void;
	handleEdit: () => void;
}

export default function ForumMenu({
	handleDelete,
	handleEdit,
}: ForumMenuProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="icon">
					<EllipsisVertical className="w-3 h-3" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-34 p-0">
				<button
					className="block w-full px-4 py-2 text-left text-xs hover:bg-gray-100"
					onClick={handleEdit}
				>
					Edit
				</button>
				<button
					className="block w-full px-4 py-2 text-left text-xs hover:bg-gray-100 text-gray-55"
					onClick={handleDelete}
				>
					Delete
				</button>
			</PopoverContent>
		</Popover>
	);
}
