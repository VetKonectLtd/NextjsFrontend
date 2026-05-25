"use client";
import { User } from "@/app/assets/icons";
import { directMessageService } from "@/services/directMessageService";
import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
const DEFAULT_AVATAR = User;

interface ChatListProps {
  messages: any[];
  selectedVet: any;
  onSelectVet: (vet: any) => void;
  getChatList: any;
}

export default function ChatList({
  messages,
  selectedVet,
  onSelectVet,
  getChatList,
}: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) =>
      msg?.user?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, messages]);

  return (
    <div
      className={`
        bg-white md:col-span-1 min-h-[85vh] overflow-hidden max-h-[85vh] col-span-4 md:border border-gray-225 rounded-lg md:shadow-md px-2 md:px-6 py-2 md:py-3
      `}
    >
      <div className="md:flex hidden mb-2">
        <h3 className="py-2 text-base font-bold text-gray-55">Chats</h3>
      </div>

      <div className="flex items-center w-full bg-white rounded-full shadow-sm border border-gray-200 my-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent outline-none text-sm px-4"
        />
        <button className="bg-gray-500 rounded-r-full px-7 py-3 flex items-center justify-center">
          <Search size={15} color="#fff" />
        </button>
      </div>

      <div className="space-y-3 h-[350px] overflow-y-auto">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div
              key={msg.user.id}
              onClick={() => {
                onSelectVet(msg?.user);
                setTimeout(() => {
                  getChatList.refetch();
                }, 0);
              }}
              className={`flex items-center justify-between hover:bg-gray-50 cursor-pointer rounded-lg p-2 transition ${
                selectedVet?.user?.id === msg?.user.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 mr-3 rounded-full border-2 shadow-sm border-[#52CE06] overflow-hidden">
                  <Image
                    src={msg?.user?.profile_image || DEFAULT_AVATAR}
                    alt={msg?.user?.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-55">{msg?.user?.name}</p>
                  <p className="text-sm text-gray-55 font-normal truncate w-28">
                    {msg.last_message}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {msg.unread_count === 0 ? null : (
                  <span className="text-xs mr-2 bg-primary-500 rounded-full p-1 h-5 w-5 items-center flex justify-center text-gray-55">
                    {msg.unread_count}
                  </span>
                )}
                <p className="text-xs mr-2  text-gray-55">
                  {msg.last_message_display_time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center text-sm py-4">
            No matches found.
          </p>
        )}
      </div>
    </div>
  );
}
