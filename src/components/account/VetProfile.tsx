"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Share2,
  UserPlus,
  Camera,
  ChevronDown,
  MessagesSquareIcon,
  Star,
  Info,
  ImageIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { AuthBg } from "@/app/assets/images";
import { AccountAction } from "./";
import { Bg22, User } from "@/app/assets/icons";
import { useAuthService } from "@/services/authService";
import Veterinarian from "../Veterinarian/Veterinarian";
import SwitcherIcon from "@/app/assets/icons/switcher.svg";
import UserIconPng from "@/app/assets/icons/user.png";

const DEFAULT_AVATAR = User;
interface VetProfileProps {
  isEditMode: boolean;
  onToggleEdit: () => void;
}

const VetProfile = ({ isEditMode, onToggleEdit }: VetProfileProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(
    "default"
  );
  const { useCurrentUser } = useAuthService();
  const { data: user } = useCurrentUser(true);

  const currentUser = (user as any)?.profile;
  const apiUser = currentUser?.user;

  const [formData, setFormData] = useState({
    email: apiUser?.email || "",
    specialty: currentUser?.specialty || "Small Animal Medicine",
    firstName: apiUser?.first_name || "",
    lastName: apiUser?.last_name || "",
    phoneNo: apiUser?.phone_num || "",
    location: apiUser?.state
      ? `${apiUser?.state}, ${apiUser?.country || ""}`
      : "",
    bio: currentUser?.bio || "",
    isAvailable: currentUser?.availability || false,
  });

  const [profileImage, setProfileImage] = useState(
    currentUser?.profile || UserIconPng
  );
  const [coverImage, setCoverImage] = useState("/api/placeholder/400/200");

  const specialties = [
    "Small Animal Medicine",
    "Large Animal Medicine",
    "Avian Medicine",
    "Ruminant Medicine",
    "Wildlife Medicine",
    "Emergency Medicine",
    "Surgery",
    "Dermatology",
  ];

  // Role switching logic
  const backendRole: string = ((user as any)?.role || "").toLowerCase();
  const allRoles = [
    { key: "veterinarian", label: "Veterinarian" },
    { key: "paraprofessional", label: "Paraprofessional" },
    { key: "vet_clinic", label: "Vet Clinic" },
    { key: "vendor", label: "Vendor" },
    { key: "livestock_farmer", label: "Livestock Farmer" },
    { key: "pet_owner", label: "Pet Owner" },
  ];

  const switchableRolesMap: Record<string, string[]> = {
    veterinarian: ["vendor", "vet_clinic"],
    paraprofessional: ["veterinarian", "vet_clinic", "vendor"],
    pet_owner: allRoles.map((r) => r.key),
    vendor: ["vet_clinic", "veterinarian", "paraprofessional"],
    livestock_farmer: allRoles.map((r) => r.key),
    vet_clinic: ["veterinarian", "paraprofessional", "vendor"],
  };

  const switchable = useMemo(() => {
    const list = switchableRolesMap[backendRole] || [];
    return allRoles.filter((r) => list.includes(r.key));
  }, [backendRole]);

  const [showSwitcher, setShowSwitcher] = useState(false);
  const [targetRole, setTargetRole] = useState<string>(backendRole);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwitchProfile = (roleKey: string) => {
    // Placeholder for API call to switch active role
    setTargetRole(roleKey);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? switchable.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === switchable.length - 1 ? 0 : prev + 1));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContact = (id: string, type: string) => {
    setSelectedAction(type);
    if (type === "switch-profile") {
      setShowSwitcher(true);
    }
  };

  const currentUsers = {
    id: apiUser?.id?.toString() || "",
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.phoneNo,
    location: formData.location,
    type: "veterinarian" as const,
  };

  const handleSave = () => {
    // Save logic here
    onToggleEdit();
  };

  if (isEditMode) {
    return (
      <div className="w-full">
        {/* Back Button */}
        <button
          onClick={onToggleEdit}
          className="flex items-center text-sm mb-6 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        {/* Header */}
        <div className=" max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Account Details
            </h1>
            <p className="text-gray-600">
              You can update your profile information by filling the field below
            </p>
          </div>

          {/* Form */}
          <div className="space-y-2">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Specialty Dropdown */}
            <div className="relative">
              <select
                name="specialty"
                value={formData.specialty}
                onChange={(e) => handleInputChange("specialty", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={(e) => handleInputChange("phoneNo", e.target.value)}
                placeholder="Phone No"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Location / Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Change Password Button */}
            <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              Change Password
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="w-full mx-auto">
      {/* Back Button - Mobile */}
      <div className="flex items-center justify-between pb-6">
        <button className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <button
          onClick={onToggleEdit}
          className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-225 overflow-hidden">
        {/* Cover Image */}

        <div
          style={{ backgroundImage: `url(${Bg22.src})` }}
          className="flex  bg-gray-100 h-32 relative rounded-t-2xl bg-no-repeat bg-top bg-cover justify-between items-start p-4"
        >
          {/* Decorative pattern overlay */}
          <div
            className="absolute inset-0 bg-white bg-opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-8">
          {/* Profile Image */}
          <div className="flex justify-center -mt-12 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 overflow-hidden bg-white">
                <Image
                  src={profileImage}
                  alt={`${formData.firstName} ${formData.lastName}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  onError={() => setProfileImage(UserIconPng)}
                />
              </div>
              {/* Online Status */}
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold capitalize text-gray-900 mb-1">
              {currentUser?.role == "Veterinarian" ? "Dr." : ""}
              {currentUser?.user.first_name} {currentUser?.user.last_name}
            </h1>
            <p className="text-gray-600 mb-4">{currentUser?.role}</p>

            {/* Specialties */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {currentUser?.specialty}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {currentUser?.list_them}
              </span>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Availability</p>
              <div className="flex items-center justify-center gap-3">
                <Switch
                  checked={currentUser?.availability}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isAvailable: checked }))
                  }
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full border-b pb-5 border-gray-225 justify-center items-center md:gap-3 gap-2">
            <button
              onClick={() => handleContact("1", "phone")}
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
              onClick={() => handleContact("1", "media")}
              className="flex flex-col justify-center items-center space-y-3 text-gray-500"
            >
              <span
                className={`bg-white border ${selectedAction == "media" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
              >
                <ImageIcon size={14} color="#1D2432" />
              </span>
              <span className="text-xs">Media</span>
            </button>

            <button
              onClick={() => handleContact("1", "mail")}
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
              onClick={() => handleContact("1", "info")}
              className="flex flex-col justify-center items-center space-y-3 text-gray-500"
            >
              <span
                className={`bg-white border ${selectedAction == "info" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
              >
                <Info size={14} color="#1D2432" />
              </span>
              <span className="text-xs">Bio</span>
            </button>

            <button
              onClick={() => handleContact("1", "location")}
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
              onClick={() => handleContact("1", "share")}
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
              onClick={() => handleContact("1", "switch-profile")}
              className="flex flex-col justify-center items-center space-y-3 text-gray-500"
            >
              <span
                className={`bg-white border ${selectedAction == "switch-profile" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
              >
                <Image
                  src={SwitcherIcon}
                  alt="Switch profile"
                  width={14}
                  height={14}
                />
              </span>
              <span className="text-xs">Switch profile</span>
            </button>
          </div>

          {/* Switcher Panel - Carousel */}
          {showSwitcher && switchable.length > 0 && (
            <div className="mt-6 flex flex-col items-center">
              {(() => {
                const role = switchable[currentIndex];
                const isCurrent = role.key === backendRole;
                const isTarget = role.key === targetRole;
                return (
                  <div className="w-full max-w-sm">
                    <div className={` flex flex-col items-center text-center `}>
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isCurrent ? "ring-4 ring-green-500 ring-opacity-30" : "ring-2 ring-gray-200"} bg-gray-100`}
                      >
                        <Image
                          src={UserIconPng}
                          alt={role.label}
                          width={48}
                          height={48}
                        />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-[#1D2432]">
                        {role.label}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        {isCurrent
                          ? `You are currently signed in as a '${role.label}'`
                          : `Kindly click on the select button to switch to ${role.label} account`}
                      </p>
                      <button
                        type="button"
                        disabled={isCurrent}
                        onClick={() => handleSwitchProfile(role.key)}
                        className={`w-full py-3 text-base font-medium rounded-xl border-2 transition-colors ${isCurrent ? "bg-white text-green-600 border-green-500 cursor-default" : "bg-white text-gray-900 hover:bg-gray-50 border-gray-900"}`}
                      >
                        {isCurrent ? "Selected" : "Select"}
                      </button>
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                      {switchable.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all ${idx === currentIndex ? "w-8 bg-gray-900" : "w-2 bg-gray-300"}`}
                        />
                      ))}
                    </div>

                    {/* Carousel Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Previous profile"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Next profile"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 15L12.5 10L7.5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
          {!showSwitcher && (
            <AccountAction
              selectedUser={currentUser}
              selectedAction={selectedAction}
              accountType="veterinarian"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VetProfile;
