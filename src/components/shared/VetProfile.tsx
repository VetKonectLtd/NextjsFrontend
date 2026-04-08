'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import {
    StarFill,
    StarEmpty,
    Verified,
    Marker,
    GreenButton
} from '@/app/assets/icons';
import { RecOverlay } from '@/app/assets/images';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import Avatar from 'react-avatar';

const isValidUrlValue = (value: unknown): value is string =>
    typeof value === 'string' && value.trim() !== '' && value !== 'null' && value !== 'undefined';

export const resolveProfileImageSrc = (image: StaticImageData | string | any): string | null => {
    if (isValidUrlValue(image)) {
        return image;
    }

    if (image && typeof image === 'object') {
        if (isValidUrlValue(image.profile_image_url)) {
            return image.profile_image_url;
        }

        if (isValidUrlValue(image.src)) {
            return image.src;
        }
    }

    return null;
};


export interface VetProfileProps {
    id: string;
    name: string;
    location: string;
    image: StaticImageData | string | any;
    rating: number;
    specialty?: string;
    totalRatings: number;
    isAvailable: boolean;
    isVerified?: boolean;
    address?: string;
    role?: string;
    latitude?: string;
    longitude?: string;
    state?: string;
    country?: string;
    email?: string;
    phone?: string;
    userId?: string;
    onViewProfile?: (id: string) => void;
    onContact?: (id: string, type: 'phone' | 'message' | 'mail' | 'location' | 'share' | 'rate') => void;
}


const VetProfile: React.FC<VetProfileProps> = ({
    id,
    name,
    image,
    rating,
    address,
    totalRatings,
    isAvailable,
    role,
    location,
    isVerified,
    onViewProfile,
    onContact
}) => {

    const displayAddress = address || location || 'No address available';
    const truncatedAddress = displayAddress.length > 15 ? `${displayAddress.slice(0, 15)}...` : displayAddress;
    const profileImageSrc = resolveProfileImageSrc(image);


    const renderStars = (rating: number) => {
        const hasRating = rating > 0;

        return (
            <Image
                src={hasRating ? StarFill : StarEmpty}
                alt={hasRating ? 'filled star' : 'empty star'}
                className="w-6 h-6"
            />
        );
    };

    const handleViewProfile = () => {
        if (onViewProfile) {
            onViewProfile(id);
        }
    };

    const handleContact = (type: 'phone' | 'message' | 'mail' | 'location') => {
        if (onContact) {
            onContact(id, type);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Container with overlays */}
            <div className="relative">
                <div onClick={handleViewProfile} className="aspect-[4/3] cursor-pointer relative overflow-hidden">
                    {profileImageSrc ? (
                        <Image
                            src={profileImageSrc}
                            alt={name}
                            width={900}
                            height={900}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <Avatar
                            name={name || 'Vet Konect'}
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
                                alt="verified"
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
                {/* Name */}
                <h3 className="font-nunito font-semibold text-lg text-gray-900 mb-1">
                    {role == "Veterinarian" && "Dr."}  {name && name.length > 10 ? `${name.slice(0, 10)}...` : name || 'Untitled'}
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
                        {truncatedAddress}
                    </span>
                </div>

                {/* Contact Icons and View Profile Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center md:gap-3 gap-2">
                        <button
                            onClick={() => handleContact('phone')}
                            className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2"
                            title="Call"
                        >
                            <Phone size={14} color="#1D2432" />
                        </button>

                        <button
                            onClick={() => handleContact('message')}
                            className="bg-white border cursor-pointer border-gray-225 shadow-md rounded-full p-2"
                            title="Message"
                        >
                            <MessageCircle size={14} color="#1D2432" />
                        </button>

                        <button
                            onClick={() => handleContact('mail')}
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

export default VetProfile;
