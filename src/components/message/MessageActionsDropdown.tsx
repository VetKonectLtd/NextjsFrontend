"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface MessageActionsDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

const MessageActionsDropdown = ({
  onEdit,
  onDelete,
}: MessageActionsDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full absolute -right-2 -top-3 hover:bg-gray-200 transition">
          <ChevronDown className="w-4 h-4 text-black" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-36 bg-white rounded-xl border border-gray-200 shadow-lg p-1"
        asChild
      >
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
        >
          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-red-50 text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageActionsDropdown;
