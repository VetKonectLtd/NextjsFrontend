"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  StarFill,
  StarEmpty,
  Verified,
  Marker,
  GreenButton,
} from "@/app/assets/icons";
import { RecOverlay } from "@/app/assets/images";
import { MessageCircle, Phone, Mail } from "lucide-react";
import Avatar from "react-avatar";

export interface ClinicProfileProps {
  id: string;
  name: string;
  name_of_clinic?: string;
  location: string;
  image: StaticImageData | string | any;
  rating: number;
  address?: string;
  totalRatings: number;
  isAvailable: boolean;
  isVerified?: boolean;
  latitude?: string | number;
  longitude?: string | number;
  state?: string;
  country?: string;
  email?: string;
  specialty: string;
  role?: string;
  phone?: string;
  userId?: string;
  onViewProfile?: (id: string) => void;
  onContact?: (
    id: string,
    type: "phone" | "message" | "mail" | "location" | "share" | "rate",
  ) => void;
}

const isValidUrlValue = (value: unknown): value is string =>
  typeof value === "string" &&
  value.trim() !== "" &&
  value !== "null" &&
  value !== "undefined";

export const resolveClinicImageSrc = (
  image: StaticImageData | string | any,
): string | null => {
  if (isValidUrlValue(image)) {
    return image;
  }

  if (image && typeof image === "object") {
    if (isValidUrlValue(image.profile_image_url)) {
      return image.profile_image_url;
    }

    if (isValidUrlValue(image.src)) {
      return image.src;
    }
  }

  return null;
};

const ClinicProfile: React.FC<ClinicProfileProps> = ({
  id,
  name,
  address,
  image,
  rating,
  totalRatings,
  role,
  isAvailable,
  isVerified = false,
  onViewProfile,
  onContact,
}) => {
  const profileImageSrc = resolveClinicImageSrc(image);

  const renderStars = (rating: number) => {
    const hasRating = rating > 0;

    return (
      <Image
        src={hasRating ? StarFill : StarEmpty}
        alt={hasRating ? "filled star" : "empty star"}
        className="w-6 h-6"
      />
    );
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(id);
    }
  };

  const handleContact = (type: "phone" | "message" | "mail") => {
    if (onContact) {
      onContact(id, type);
    }
  };

  return (
    // <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300
    ${role === "Veterinary Clinic" ? "border-l-4 border-green-500" : "border-l-4 border-blue-500"}`}
    >
      {/* Image Container with overlays */}
      <div onClick={handleViewProfile} className=" cursor-pointer relative">
        <div className="aspect-[4/3] relative">
          {profileImageSrc ? (
            <Image
              src={profileImageSrc}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <Avatar
              name={name || "Vet Konect Clinic"}
              maxInitials={2}
              round={false}
              size="100%"
              textSizeRatio={2}
              className="w-full h-full"
            />
          )}
          <div className="absolute inset-0">
            <Image
              src={RecOverlay}
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Availability Tag - Top Right */}
        {/* <div className="absolute top-2 right-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white`}>
                        <Image
                            src={isAvailable ? Green : Red}
                            alt={isAvailable ? 'available' : 'unavailable'}
                            className="w-4 h-4"
                        />
                        <span className="font-nunito">
                            {isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                    </div>
                </div> */}

        {/* Verified Badge - Bottom Right */}
        {isVerified && (
          <div className="absolute bottom-2 right-2">
            <div className="rounded-full p-1 shadow-sm">
              <Image
                src={Verified}
                alt="Veterinary clinic verified badge icon"
                className="w-6 h-6"
              />
            </div>
          </div>
        )}

        {/* Star Rating - Bottom Left */}
        <div className="absolute bottom-2 left-2">
          <div className="rounded-full px-2 py-1 flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {renderStars(totalRatings)}
            </div>
            <span className="text-xs font-medium text-white font-nunito">
              {totalRatings} of 5
            </span>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4">
        {/* Clinic Type Badge */}
        <div className="mb-1">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              role === "Veterinary Clinic"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {role === "Veterinary Clinic" ? "Vet Clinic" : "Clinic"}
          </span>
        </div>
        {/* Name */}
        <h3 className="font-nunito font-semibold text-lg text-gray-900 mb-1">
          {name && name.length > 15
            ? `${name.slice(0, 15)}...`
            : name || "Untitled"}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3">
          <Image
            src={Marker}
            alt="location"
            width={12}
            height={12}
            className="w-3 h-3 text-gray-500"
          />
          <span className="text-sm text-gray-600 font-nunito">
            {address && address.length > 15
              ? `${address.slice(0, 15)}...`
              : address || "Untitled"}
          </span>
        </div>

        {/* Contact Icons and View Profile Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center md:gap-3 gap-2">
            <button
              onClick={() => handleContact("phone")}
              className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2"
              title="Call"
            >
              <Phone size={14} color="#1D2432" />
            </button>

            <button
              onClick={() => handleContact("message")}
              className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2"
              title="Message"
            >
              <MessageCircle size={14} color="#1D2432" />
            </button>

            <button
              onClick={() => handleContact("mail")}
              className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2"
              title="Email"
            >
              <Mail size={14} color="#1D2432" />
            </button>
          </div>

          {/* View Full Profile Button */}
          <button
            onClick={handleViewProfile}
            className="group transition-transform duration-200 hover:scale-105"
          >
            <Image
              src={GreenButton}
              alt="View profile"
              className="md:w-12 w-9  md:h-12 h-9"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
