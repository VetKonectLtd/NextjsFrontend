"use client";

import { EllipsisVertical, Flag, Reply } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface CommentMenuProps {
  handleDelete: () => void;
  handleEdit: () => void;
  handleReply: () => void;
  handleFlag: () => void;
}

export default function CommentMenu({
  handleDelete,
  handleEdit,
  handleReply,
  handleFlag,
}: CommentMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical className="w-4 h-4" />
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
          className="w-full flex px-4 py-2 text-left text-xs hover:bg-gray-100"
          onClick={handleReply}
        >
          <Reply size={16} className="mr-2" />
          Reply comment
        </button>
        <button
          className="w-full flex items-center px-4 py-2 text-left text-xs hover:bg-gray-100"
          onClick={handleFlag}
        >
          <Flag size={16} className="mr-2" />
          Flag/Report comment
        </button>
        <button
          className="block w-full px-4 py-2 text-left text-xs hover:bg-gray-100 text-red-500"
          onClick={handleDelete}
        >
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
