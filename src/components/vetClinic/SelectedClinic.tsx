"use client";
import { AuthBg } from "@/app/assets/images";
import Image from "next/image";
import {
    Phone,
    Mail,
    Share2,
    Star,
    MapPin,
    MessagesSquareIcon,
    Plus,
    ChevronLeft,
} from "lucide-react";
import { StarEmpty, StarFill } from "@/app/assets/icons";
import { ClinicProfileProps } from "../shared/ClinicProfile";
import ClinicAccount from "./ClinicAction";

interface VetClinicProps {
    handleContact?: (
        id: string,
        type: "phone" | "message" | "mail" | "location" | "share" | "rate",
    ) => void;

    selectedClinic: ClinicProfileProps | null;
    selectedAction: string | null;
    setSelectedClinic: React.Dispatch<React.SetStateAction<ClinicProfileProps | null>>;
}

const SelectedClinic = ({
    selectedClinic,
    selectedAction,
    setSelectedClinic,
    handleContact,
}: VetClinicProps) => {
    const renderStars = (rating: number) => {
        const hasRating = rating > 0;

        return (
            <Image
                src={hasRating ? StarFill : StarEmpty}
                alt={hasRating ? "filled star" : "empty star"}
                className="w-5 h-5"
            />
        );
    };

    return (
        <>
            {selectedClinic && (
                <>
                    <div
                        onClick={() => setSelectedClinic(null)}
                        className="flex items-center md:hidden text-sm mb-4 text-gray-55 hover:text-green-50"
                    >
                        <span className="bg-white border cursor-pointer text-gray-500 border-gray-225 shadow-md rounded-full p-1 mr-2">
                            <ChevronLeft className="w-5 h-5" />
                        </span>{" "}
                        Back
                    </div>

                    <div className="lg:col-span-2 mb-4 shadow-md border rounded-2xl border-gray-225 bg-white">
                        <div
                            style={{ backgroundImage: `url(${AuthBg.src})` }}
                            className="flex  bg-gray-100 h-24 relative rounded-t-2xl bg-no-repeat bg-top bg-cover justify-between items-start p-4"
                        >
                            <div className="absolute bottom-6 top-6 right-6">
                                <button className="bg-white font-extrabold  border text-green-50 cursor-pointer border-gray-225 shadow-md rounded-full p-2">
                                    <Plus className="w-7 h-7" size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex max-w-sm w-full justify-center px-4 relative md:px-0 m-auto flex-col items-center -mt-14">
                            <div className="flex relative">
                                <div className="w-24 h-24 rounded-full border-4 border-green-50 overflow-hidden">
                                    <Image
                                        src={selectedClinic.image}
                                        alt={selectedClinic.name}
                                        width={150}
                                        height={150}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="bg-green-50 h-4 w-4 border-2 border-white absolute bottom-5 right-0 rounded-full"></span>
                                <div className="rounded-full absolute bottom-3 -right-20 flex items-center gap-1">
                                    <p className="flex items-center gap-0.5">
                                        {renderStars(selectedClinic.rating)}
                                    </p>
                                    <span className="text-xs font-medium text-gray-55 font-nunito">
                                        {selectedClinic.rating.toFixed(1)} of{" "}
                                        {selectedClinic.totalRatings}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center">
                                <h1 className="mt-3 text-lg font-semibold">
                                    {selectedClinic.name}
                                </h1>
                                <p className="text-sm mt-2 text-gray-500">Veterinarian</p>
                            </div>

                            <div className="flex py-6 w-72 m-auto flex-wrap gap-2 mb-4">
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
                                        Small Animal Medicine
                                    </span>
                                    <span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
                                        Avian Medicine
                                    </span>
                                    <span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
                                        Ruminant medicine
                                    </span>
                                    <span className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full">
                                        Wildlife medicine
                                    </span>
                                </div>
                            </div>

                            <div className="flex w-full border-b pb-5 border-gray-225 justify-center items-center md:gap-3 gap-2">
                                <button
                                    onClick={() => handleContact?.(selectedClinic.id, "phone")}
                                    className="flex flex-col justify-center items-center space-y-3 text-gray-500"
                                >
                                    <span
                                        className={`bg-white border ${selectedAction == "phone" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
                                    >
                                        <Phone size={14} color="#1D2432" />
                                    </span>
                                    <span className="text-xs">Call</span>
                                </button>

                                <button
                                    onClick={() => handleContact?.(selectedClinic.id, "message")}
                                    className="flex flex-col justify-center items-center space-y-3 text-gray-500"
                                >
                                    <span
                                        className={`bg-white border ${selectedAction == "message" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
                                    >
                                        <MessagesSquareIcon size={14} color="#1D2432" />
                                    </span>
                                    <span className="text-xs">Message</span>
                                </button>

                                <button
                                    onClick={() => handleContact?.(selectedClinic.id, "mail")}
                                    className="flex flex-col justify-center items-center space-y-3 text-gray-500"
                                >
                                    <span
                                        className={`bg-white border ${selectedAction == "mail" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
                                    >
                                        <Mail size={14} color="#1D2432" />
                                    </span>
                                    <span className="text-xs">Email</span>
                                </button>

                                <button
                                    onClick={() => handleContact?.(selectedClinic.id, "location")}
                                    className="flex flex-col justify-center items-center space-y-3 text-gray-500"
                                >
                                    <span
                                        className={`bg-white border ${selectedAction == "location" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
                                    >
                                        <MapPin size={14} color="#1D2432" />
                                    </span>
                                    <span className="text-xs">Location</span>
                                </button>

                                <button
                                    onClick={() => handleContact?.(selectedClinic.id, "share")}
                                    className="flex flex-col justify-center items-center space-y-3 text-gray-500"
                                >
                                    <span
                                        className={`bg-white border ${selectedAction == "share" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
                                    >
                                        <Share2 size={14} color="#1D2432" />
                                    </span>
                                    <span className="text-xs">Share</span>
                                </button>

                                <button
                                    onClick={() => handleContact?.(selectedClinic.id, "rate")}
                                    className="flex flex-col justify-center items-center space-y-3 text-gray-500"
                                >
                                    <span
                                        className={`bg-white border ${selectedAction == "rate" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
                                    >
                                        <Star size={14} color="#1D2432" />
                                    </span>
                                    <span className="text-xs">Rate</span>
                                </button>
                            </div>

                            <ClinicAccount
                                selectedClinic={selectedClinic}
                                selectedAction={selectedAction}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SelectedClinic;
