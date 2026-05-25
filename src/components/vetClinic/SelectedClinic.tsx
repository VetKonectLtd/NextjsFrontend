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
  X,
  ImageIcon,
} from "lucide-react";
import { StarEmpty, StarFill } from "@/app/assets/icons";
import {
  ClinicProfileProps,
  resolveClinicImageSrc,
} from "../shared/ClinicProfile";
import ClinicAccount from "./ClinicAction";
import { useRouter, useSearchParams } from "next/navigation";
import Avatar from "react-avatar";

interface VetClinicProps {
  handleContact?: (
    id: string,
    type:
      | "phone"
      | "media"
      | "message"
      | "mail"
      | "location"
      | "share"
      | "rate",
  ) => void;

  selectedClinic: ClinicProfileProps | null;
  selectedAction: string | null;
  refetchData?: any;
  setSelectedClinic: React.Dispatch<
    React.SetStateAction<ClinicProfileProps | null>
  >;
}

const SelectedClinic = ({
  selectedClinic,
  selectedAction,
  setSelectedClinic,
  handleContact,
  refetchData,
}: VetClinicProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("clinic");

    const query = params.toString();
    router.push(query ? `?${query}` : window.location.pathname);

    setSelectedClinic(null);
  };

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

  const profileImageSrc = selectedClinic
    ? resolveClinicImageSrc(selectedClinic.image)
    : null;

  return (
    <>
      {selectedClinic && (
        <>
          <div
            onClick={handleBack}
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
                <button
                  onClick={handleBack}
                  className="bg-white font-extrabold  border text-green-50 cursor-pointer border-gray-225 shadow-md rounded-full p-2"
                >
                  <X className="w-7 h-7" size={16} />
                </button>
              </div>
            </div>

            <div className="flex max-w-sm w-full justify-center px-4 relative md:px-0 m-auto flex-col items-center -mt-14">
              <div className="flex relative">
                <div className="w-24 h-24 rounded-full border-4 border-green-50 overflow-hidden">
                  {profileImageSrc ? (
                    <Image
                      src={profileImageSrc}
                      alt={selectedClinic.name}
                      width={150}
                      height={150}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Avatar
                      name={selectedClinic.name || "Vet Konect Clinic"}
                      maxInitials={2}
                      round
                      size="96"
                      textSizeRatio={2}
                      className="w-full h-full"
                    />
                  )}
                </div>
                <span className="bg-green-50 h-4 w-4 border-2 border-white absolute bottom-5 right-0 rounded-full"></span>
                <div className="rounded-full absolute bottom-3 -right-20 flex items-center gap-1">
                  <p className="flex items-center gap-0.5">
                    {renderStars(selectedClinic.totalRatings)}
                  </p>
                  <span className="text-xs font-medium text-gray-55 font-nunito">
                    {selectedClinic.totalRatings.toFixed(1)} of 5
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h1 className="mt-3 text-lg font-semibold">
                  {selectedClinic.name}
                </h1>
                <p className="text-sm mt-2 text-gray-500">
                  {selectedClinic.role}
                </p>
              </div>

              <div className="flex py-6 w-72 m-auto flex-wrap gap-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  {selectedClinic?.specialty
                    ?.split(",")
                    .map((item) => item.trim())
                    .filter((item) => item.length > 0)
                    .map((spec, index) => (
                      <span
                        key={index}
                        className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
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
                  onClick={() => handleContact?.(selectedClinic.id, "media")}
                  className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
                >
                  <span
                    className={`bg-white border ${selectedAction == "media" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
                  >
                    <ImageIcon
                      size={14}
                      color="#1D2432"
                      className="sm:w-4 sm:h-4"
                    />
                  </span>
                  <span className="text-[10px] sm:text-xs text-center">
                    Media
                  </span>
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
                refetchData={refetchData}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectedClinic;
