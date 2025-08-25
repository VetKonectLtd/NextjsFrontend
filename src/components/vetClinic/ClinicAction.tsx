"use client";
import { Copy, Link, Send, Smile } from "lucide-react";
import Image from "next/image";
import { Hand, StarFill } from "@/app/assets/icons";
import { useState } from "react";
import { ClinicProfileProps } from "../shared/ClinicProfile";

interface VetClinicProps {
    selectedClinic: ClinicProfileProps | null;
    selectedAction: string | null;
}

const ClinicAccount = ({ selectedClinic, selectedAction }: VetClinicProps) => {
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
        <div className="mt-12 pb-3 text-center w-full m-auto text-gray-500 text-sm">
            {selectedAction === "default" && (
                <>
                    <div className="flex justify-center mb-2">
                        <Image
                            src={Hand.src}
                            alt="hand"
                            width={50}
                            height={50}
                            className="object-cover"
                        />
                    </div>
                    <p className="text-gray-55 font-bold">Hey! Users</p>
                    <p className="w-3/5 m-auto">
                        Kindly click on the button above to add a new product to your store
                    </p>
                </>
            )}

            {selectedAction === "phone" && (
                <>
                    <p className="text-gray-55 font-bold">User’s Phone Number</p>
                    <p className="text-sm mt-2">+234 5678 910</p>
                    <div className="flex items-center py-3 justify-center flex-col">
                        <button
                            onClick={() => handleCopy("+234 5678 910")}
                            className="p-2 rounded-full border hover:bg-gray-100 transition"
                            title="Copy to clipboard"
                        >
                            <Copy className="w-7 h-7" />
                        </button>
                        <span className="text-xs text-gray-55">
                            {copied === "+234 5678 910" ? "Copied!" : "Click to copy"}
                        </span>
                    </div>
                </>
            )}

            {selectedAction === "message" && (
                <div className="w-full border rounded-lg shadow-md bg-white">
                    {" "}
                    <div className="flex justify-between border-b p-2">
                        {" "}
                        <div className="flex w-full items-center gap-2">
                            {" "}
                            <div className="w-7 h-7 rounded-full border border-gray-225 overflow-hidden">
                                {" "}
                                <Image
                                    src={selectedClinic?.image || "/default-vet.png"}
                                    alt={selectedClinic?.name || "Vet"}
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />{" "}
                            </div>{" "}
                            <div className="flex items-start text-left flex-col text-gray-55">
                                {" "}
                                <p className="text-sm font-semibold">
                                    {selectedClinic?.name}
                                </p>{" "}
                                <p className="text-xs">Veterinarian</p>{" "}
                            </div>{" "}
                        </div>{" "}
                        <div className="flex items-center justify-between">
                            {" "}
                            <div className="flex items-center gap-2">
                                {" "}
                                <button className="p-2 shadow-sm border border-gray-225 hover:bg-gray-100 rounded-full">
                                    {" "}
                                    <Smile size={16} />{" "}
                                </button>{" "}
                                <button className="p-2 shadow-sm border border-gray-225 hover:bg-gray-100 rounded-full">
                                    {" "}
                                    <Link size={16} />{" "}
                                </button>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="">
                        {" "}
                        <textarea
                            className="w-full resize-none min-h-[140px] border-none p-2 text-sm outline-none"
                            rows={3}
                            placeholder="What are we discussing?"
                        />{" "}
                    </div>{" "}
                    <div className="bg-gray-225 h-6 w-full"></div>{" "}
                    <button className="flex font-medium px-3 py-2 justify-center items-center text-center w-full bg-primary-400 text-white rounded-b-lg">
                        {" "}
                        Send <Send className="ml-3" size={14} />{" "}
                    </button>{" "}
                </div>
            )}

            {selectedAction === "mail" && (
                <>
                    <p className="text-gray-55 font-bold">User’s Email Address</p>
                    <p className="text-sm mt-2">
                        {selectedClinic?.name.split(" ")[0].toLowerCase()}@gmail.com
                    </p>
                    <div className="flex items-center py-3 justify-center flex-col">
                        <button
                            onClick={() =>
                                handleCopy(
                                    `${selectedClinic?.name.split(" ")[0].toLowerCase()}@gmail.com`,
                                )
                            }
                            className="p-2 rounded-full border hover:bg-gray-100 transition"
                            title="Copy to clipboard"
                        >
                            <Copy className="w-7 h-7" />
                        </button>
                        <span className="text-xs text-gray-55">
                            {copied?.includes("@gmail.com") ? "Copied!" : "Click to copy"}
                        </span>
                    </div>
                </>
            )}

            {selectedAction === "location" && (
                <>
                    <p className="text-gray-55 font-bold">Users’ Location</p>
                    <p className="text-gray-800">{selectedClinic?.location}</p>
                    <div className="flex items-center py-3 justify-center flex-col">
                        <button
                            onClick={() => handleCopy(selectedClinic?.location || "")}
                            className="p-2 rounded-full border hover:bg-gray-100 transition"
                            title="Copy to clipboard"
                        >
                            <Copy className="w-7 h-7" />
                        </button>
                        <span className="text-xs text-gray-55">
                            {copied === selectedClinic?.location ? "Copied!" : "Click to copy"}
                        </span>
                    </div>
                </>
            )}

            {selectedAction === "share" && (
                <>
                    <p className="text-gray-55 font-bold">Share Link</p>
                    <p className="text-gray-800">
                        https://vetkonect.com/{selectedClinic?.name}
                    </p>
                    <div className="flex items-center py-3 justify-center flex-col">
                        <button
                            onClick={() =>
                                handleCopy(`https://vetkonect.com/${selectedClinic?.name}`)
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
                </>
            )}

            {selectedAction === "rate" && (
                <>
                    {" "}
                    <div className="mb-3 flex items-center justify-center">
                        {" "}
                        <Image
                            src={StarFill}
                            alt="filled star"
                            className="w-12 h-12"
                        />{" "}
                    </div>{" "}
                    <p className="text-gray-55 text-2xl font-bold">User Feedback</p>{" "}
                    <p className="text-sm mt-2 w-60 m-auto text-gray-55 font-normal ">
                        {" "}
                        We would like for you to rate this user on a scale of 1 to 5{" "}
                    </p>{" "}
                </>
            )}
        </div>
    );
};

export default ClinicAccount;
