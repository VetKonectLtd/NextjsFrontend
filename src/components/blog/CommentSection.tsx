"use client";
import Image from "next/image";
import { EllipsisVertical, Send } from "lucide-react";
import { ButtonBg } from "@/app/assets/icons/vet-vendor";
import CommentModal from "@/components/blog/CommentModal";

interface Comment {
  id: string;
  avatar: any;
  name: string;
  text: string;
  time: string;
}

interface Props {
  comments: Comment[];
  openDropdownId: string | null;
  toggleDropdown: (id: string) => void;
  setOpenDropdownId: (id: string | null) => void;
}

const CommentSection = ({
  comments,
  openDropdownId,
  toggleDropdown,
  setOpenDropdownId,
}: Props) => {
  return (
    <div >
      <h4 className="font-semibold mb-4">Comments</h4>

      <div className="space-y-4 mb-4 max-h-[400px] scrollbar-hide overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className="pb-2 border-b border-gray-100 last:border-0">
              <div className="flex justify-between">
                {/* Left side */}
                <div className="flex w-full mb-2 items-center gap-2">
                  <div className="w-10 h-10 rounded-full border border-gray-225 overflow-hidden">
                    <Image
                      src={c.avatar || "/default-vet.png"}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex items-start text-left flex-col text-gray-55">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-gray-55">{c.time}</p>
                  </div>
                </div>

                {/* Dropdown trigger */}
                <button onClick={() => toggleDropdown(c.id)}>
                  <EllipsisVertical className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                {openDropdownId === c.id && (
                  <CommentModal setOpenDropdownId={setOpenDropdownId} />
                )}
              </div>
              <p className="text-sm text-gray-600">{c.text}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet</p>
        )}
      </div>

      {/* Input */}
      <div className="flex absolute bottom-0 w-full left-0 border-t border-gray-225 right-0">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 rounded-bl-xl outline-none px-3 py-3 text-sm"
        />
        <button
          style={{ backgroundImage: `url(${ButtonBg.src})` }}
          className="px-3 py-2 bg-no-repeat bg-contain bg-primary-400 text-white rounded-xl"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
