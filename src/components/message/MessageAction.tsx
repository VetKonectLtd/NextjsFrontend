"use client";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MessageProps {
  selectedMessage: any;
  selectedAction: string | null;
}

const MessageAction = ({ selectedMessage, selectedAction }: MessageProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-6 pb-3 w-full m-auto text-gray-500 text-sm">
      {selectedAction === "product" && (
        <div className="px-4">
          <h3 className="text-base text-gray-55 font-semibold mb-2">
            Shared images
          </h3>
          {/* <div className="grid grid-cols-3 gap-2">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<Image
								key={i}
								src={`/images/sample${i}.jpg`}
								alt={`Shared ${i}`}
								width={100}
								height={100}
								className="rounded-lg object-cover"
							/>
						))}
					</div> */}
        </div>
      )}

      {selectedAction === "mail" && (
        <div className="text-center">
          <p className="text-gray-55 font-bold">User’s Email Address</p>
          <p className="text-sm mt-2">{selectedMessage?.email}</p>
          <div className="flex items-center py-3 justify-center flex-col">
            <button
              onClick={() => handleCopy(`${selectedMessage?.email}`)}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              title="Copy to clipboard"
            >
              <Copy className="w-7 h-7" />
            </button>
            <span className="text-xs text-gray-55">
              {copied ? "Copied!" : "Click to copy"}
            </span>
          </div>
        </div>
      )}

      {selectedAction === "location" && (
        <div className="text-center">
          <p className="text-gray-55 font-bold">Users’ Location</p>
          <p className="text-gray-800">{selectedMessage?.location}</p>
          <div className="flex items-center py-3 justify-center flex-col">
            <button
              onClick={() => handleCopy(selectedMessage?.location || "")}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              title="Copy to clipboard"
            >
              <Copy className="w-7 h-7" />
            </button>
            <span className="text-xs text-gray-55">
              {copied === selectedMessage?.location
                ? "Copied!"
                : "Click to copy"}
            </span>
          </div>
        </div>
      )}

      {selectedAction === "share" && (
        <div className="text-center">
          <p className="text-gray-55 font-bold">Share Link</p>
          <p className="text-gray-800">
            https://vetkonect.com/{selectedMessage?.name}
          </p>
          <div className="flex items-center py-3 justify-center flex-col">
            <button
              onClick={() =>
                handleCopy(`https://vetkonect.com/${selectedMessage?.name}`)
              }
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              title="Copy to clipboard"
            >
              <Copy className="w-7 h-7" />
            </button>
            <span className="text-xs text-gray-55">
              {copied?.startsWith("https://vetkonect.com")
                ? "Copied!"
                : "Click to copy"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageAction;
