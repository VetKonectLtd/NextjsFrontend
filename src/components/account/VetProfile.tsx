"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useRoleSwitchingService } from "@/services/roleSwitchingService";
import VeterinarianSwitchModal from "../modals/VeterinarianSwitchModal";
import ParaprofessionalSwitchModal from "../modals/ParaprofessionalSwitchModal";
import VetClinicSwitchModal from "../modals/VetClinicSwitchModal";
import { ALL_ROLES, ROLE, normalizeRole, RoleKey } from "@/lib/roles";
import { usePaymentService } from "@/services/paymentService";
// Media is handled inside AccountAction's built-in view

const DEFAULT_AVATAR = User;
interface VetProfileProps {
	isEditMode: boolean;
	onToggleEdit: () => void;
}

const VetProfile = ({ isEditMode, onToggleEdit }: VetProfileProps) => {
	const [selectedAction, setSelectedAction] = useState<string | null>(
		"default",
	);
	const { useCurrentUser, useUpdateProfile } = useAuthService();
	const { useAddPaymentDetails } = usePaymentService();
	const paymentDetailsMutation = useAddPaymentDetails();

	const { data: user, refetch: refetchUser, isLoading } = useCurrentUser(true);

	const updateProfileMutation = useUpdateProfile();

	const currentUser = (user as any)?.profile;
	// console.log(currentUser);

	// Get the normalized backend role
	const backendRole: RoleKey | string = normalizeRole(
		(user as any)?.role || "",
	);


	const [formData, setFormData] = useState({
		email: (currentUser?.user?.email as string) || "",
		specialty: (currentUser?.specialty as string) || "",
		firstName: (currentUser?.user?.first_name as string) || "",
		lastName: (currentUser?.user?.last_name as string) || "",
		phoneNo: (currentUser?.user?.phone_num as string) || "",
		location: currentUser?.user?.state
			? `${currentUser?.user?.state}${currentUser?.user?.country ? ", " + currentUser?.user?.country : ""}`
			: "",
		bio: (currentUser?.user?.profile?.bio as string) || "",
		isAvailable: Boolean(currentUser?.availability),
	});

	const [profileImage, setProfileImage] = useState<any>(
		(currentUser?.user?.profile?.profile_image_url as string) ||
			"/api/placeholder/150/150",
	);
	const [coverImage, setCoverImage] = useState<any>(
		(currentUser?.user?.profile?.cover_page_image_url as string) ||
			"/api/placeholder/400/200",
	);

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

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleContact = (id: string, type: string) => {
		setSelectedAction(type);
	};

	const currentUsers = {
		id: "1",
		name: `${formData.firstName} ${formData.lastName}`,
		email: formData.email,
		phone: formData.phoneNo,
		location: formData.location,
		type: "veterinarian" as const,
	};

	const handleSave = () => {
		// Build FormData for the update endpoint (expects form-data)
		const payload = new FormData();
		if (formData.email) payload.append("email", formData.email);
		if (formData.firstName) payload.append("first_name", formData.firstName);
		if (formData.lastName) payload.append("last_name", formData.lastName);
		if (formData.phoneNo) payload.append("phone_num", formData.phoneNo);
		if (formData.bio) payload.append("bio", formData.bio);

		// Try to split location into state, country if the UI provides a single string
		if (formData.location) {
			const parts = formData.location.split(",").map((s) => s.trim());
			if (parts[0]) payload.append("state", parts[0]);
			if (parts[1]) payload.append("country", parts[1]);
		}

		// If the component had file inputs for profile/cover, they'd be appended here
		if (profileImage && (profileImage as any) instanceof File) {
			payload.append("profile_image", profileImage as any);
		}
		if (coverImage && (coverImage as any) instanceof File) {
			payload.append("cover_page_image", coverImage as any);
		}

		updateProfileMutation.mutate(payload, {
			onSuccess: () => {
				// close edit mode and rely on invalidateQueries to refresh currentUser
				refetchUser();
				onToggleEdit();
			},
		});
	};

	const handleAddPaymentDetail = () => {
		paymentDetailsMutation.mutate({
			onSuccess: (data: any) => {
				if (data?.authorization_url) {
					window.location.href = data.authorization_url;
				}
			},
		});
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

						{/* Bio */}
						<div>
							<textarea
								name="bio"
								value={formData.bio}
								onChange={(e) => handleInputChange("bio", e.target.value)}
								placeholder="Write a short bio about yourself"
								rows={4}
								maxLength={150}
								className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
							/>
							<div className="text-xs text-gray-500 mt-1 text-right">
								{formData.bio.length}/150
							</div>
						</div>

						{/* Change Password Button */}
						{/* <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              Change Password
            </button> */}

						{/* Profile Image Upload */}
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Profile image
						</label>
						<div
							className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
							onClick={() =>
								document.getElementById("vet_profile_image_input")?.click()
							}
						>
							<div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden bg-white border">
								<Image
									src={
										profileImage instanceof File
											? URL.createObjectURL(profileImage)
											: (profileImage as string)
									}
									alt="Profile preview"
									width={96}
									height={96}
								/>
							</div>
							<p className="text-gray-600 mb-1">
								Click to upload profile image
							</p>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								id="vet_profile_image_input"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										setProfileImage(file as any);
									}
								}}
							/>
							<button
								type="button"
								className="mt-2 text-sm text-green-600 hover:underline"
								onClick={() =>
									document.getElementById("vet_profile_image_input")?.click()
								}
							>
								Choose file
							</button>
						</div>
						<p className="text-sm text-gray-500 text-center">
							Add profile page image
						</p>

						{/* Cover Image Upload */}
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Cover image
						</label>
						<div
							className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
							onClick={() =>
								document.getElementById("vet_cover_image_input")?.click()
							}
						>
							<div className="w-full max-w-md mx-auto mb-2 h-24 rounded-lg overflow-hidden bg-white border">
								<Image
									src={
										coverImage instanceof File
											? URL.createObjectURL(coverImage)
											: (coverImage as string)
									}
									alt="Cover preview"
									width={400}
									height={96}
									className="w-full h-full object-cover"
								/>
							</div>
							<p className="text-gray-600 mb-1">Click to upload cover image</p>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								id="vet_cover_image_input"
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (file) {
										setCoverImage(file as any);
									}
								}}
							/>
							<button
								type="button"
								className="mt-2 text-sm text-green-600 hover:underline"
								onClick={() =>
									document.getElementById("vet_cover_image_input")?.click()
								}
							>
								Choose file
							</button>
						</div>

						{/* Save Button */}
						<button
							onClick={handleSave}
							disabled={updateProfileMutation.isLoading}
							className={`w-full py-3 px-4 rounded-xl transition-colors font-medium ${updateProfileMutation.isLoading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
						>
							{updateProfileMutation.isLoading ? "Saving..." : "Save"}
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
					style={{
						backgroundImage: `url(${(currentUser?.user?.profile?.cover_page_image_url as string) || Bg22.src})`,
					}}
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
									src={
										currentUser?.user?.profile?.profile_image_url ||
										currentUser?.profile ||
										DEFAULT_AVATAR
									}
									alt={currentUser?.user.first_name}
									width={96}
									height={96}
									className="w-full h-full object-cover"
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

						{/* Bio */}
						{currentUser?.user?.profile?.bio && (
							<div className="max-w-xl mx-auto text-center mb-4">
								<p className="text-sm text-gray-700 whitespace-pre-line">
									{currentUser?.user?.profile?.bio}
								</p>
							</div>
						)}

						{/* Specialties */}
						<div className="flex flex-wrap justify-center gap-2 mb-6">
							{currentUser?.specialty && (
								<span className="px-3 py-1 text-gray-700 rounded-full text-sm">
									{currentUser?.specialty
										?.split(",")
										.map((item: any) => item.trim())
										.filter((item: any) => item.length > 0)
										.map((spec: any, index: any) => (
											<span
												key={index}
												className="bg-white border text-gray-500 cursor-pointer px-3 py-1 text-xs border-gray-225 shadow-md rounded-full"
											>
												{spec}
											</span>
										))}
								</span>
							)}
							<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
								{currentUser?.list_them}
							</span>
						</div>

						{backendRole === ROLE.VENDOR && (
							<button
								className="w-1/3 font-medium m-auto rounded-lg my-3 bg-primary-400 py-2 text-white text-sm"
								onClick={handleAddPaymentDetail}
							>
								Add Paystack Details
							</button>
					 )} 

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
					<div className="flex flex-wrap w-full border-b pb-5 border-gray-225 justify-center items-center gap-2 sm:gap-3 md:gap-4">
						<button
							onClick={() => handleContact("1", "phone")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "phone" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<Phone size={14} color="#1D2432" className="sm:w-4 sm:h-4" />
							</span>
							<span className="text-[10px] sm:text-xs text-center">Call</span>
						</button>

						{/* Media button - only show for specific roles */}
						{(backendRole === ROLE.VETERINARIAN ||
							backendRole === ROLE.PARAPROFESSIONAL ||
							backendRole === ROLE.CLINIC ||
							backendRole === ROLE.VENDOR) && (
							<button
								onClick={() => handleContact("1", "media")}
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
						)}

						<button
							onClick={() => handleContact("1", "mail")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "mail" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<Mail size={14} color="#1D2432" className="sm:w-4 sm:h-4" />
							</span>
							<span className="text-[10px] sm:text-xs text-center">Email</span>
						</button>

						<button
							onClick={() => handleContact("1", "info")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "info" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<Info size={14} color="#1D2432" className="sm:w-4 sm:h-4" />
							</span>
							<span className="text-[10px] sm:text-xs text-center">Bio</span>
						</button>

						<button
							onClick={() => handleContact("1", "location")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "location" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<MapPin size={14} color="#1D2432" className="sm:w-4 sm:h-4" />
							</span>
							<span className="text-[10px] sm:text-xs text-center">
								Location
							</span>
						</button>

						<button
							onClick={() => handleContact("1", "share")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "share" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<Share2 size={14} color="#1D2432" className="sm:w-4 sm:h-4" />
							</span>
							<span className="text-[10px] sm:text-xs text-center">Share</span>
						</button>

						<button
							onClick={() => handleContact("1", "switch-profile")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "switch-profile" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<Image
									src={SwitcherIcon}
									alt="Switch profile"
									width={14}
									height={14}
									className="sm:w-4 sm:h-4"
								/>
							</span>
							<span className="text-[10px] sm:text-xs text-center leading-tight">
								Switch profile
							</span>
						</button>
					</div>

					{/* Switcher Panel - Carousel */}
					{selectedAction === "switch-profile" && (
						<VetSwitcher currentUser={currentUser} />
					)}
					{selectedAction !== "switch-profile" && (
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

// Inline switcher component mirroring AnimalOwnerProfile behavior
const VetSwitcher = ({ currentUser }: { currentUser: any }) => {
	const router = useRouter();
	const { useCurrentUser } = useAuthService();
	const { data: user, refetch: refetchUser } = useCurrentUser(true);
	const {
		requiresFormData,
		useSwitchToVeterinarian,
		useSwitchToParaprofessional,
		useSwitchToVetClinic,
		useSwitchToPetOwner,
		useSwitchToLivestockFarmer,
		useSwitchToVendor,
		useSwitchToOthers,
	} = useRoleSwitchingService();

	const petOwnerMutation = useSwitchToPetOwner();
	const livestockFarmerMutation = useSwitchToLivestockFarmer();
	const vendorMutation = useSwitchToVendor();
	const othersMutation = useSwitchToOthers();
	const veterinarianMutation = useSwitchToVeterinarian();
	const paraprofessionalMutation = useSwitchToParaprofessional();
	const vetClinicMutation = useSwitchToVetClinic();

	const apiUser = (user as any)?.profile?.user;
	const backendRole: RoleKey | string = normalizeRole(
		(user as any)?.role || "",
	);
	const allRoles = ALL_ROLES;

	const switchableRolesMap: Record<string, RoleKey[]> = {
		[ROLE.VETERINARIAN]: allRoles
			.filter((r) => r.key !== ROLE.PARAPROFESSIONAL)
			.map((r) => r.key as RoleKey),
		[ROLE.PARAPROFESSIONAL]: allRoles.map((r) => r.key as RoleKey),
		[ROLE.PET_OWNER]: allRoles.map((r) => r.key as RoleKey),
		[ROLE.VENDOR]: allRoles.map((r) => r.key as RoleKey),
		[ROLE.LIVESTOCK_FARMER]: allRoles.map((r) => r.key as RoleKey),
		[ROLE.CLINIC]: allRoles.map((r) => r.key as RoleKey),
		[ROLE.OTHERS]: allRoles.map((r) => r.key as RoleKey),
	};

	const switchable = useMemo(() => {
		const list = switchableRolesMap[backendRole] || [];
		return allRoles.filter((r) => list.includes(r.key));
	}, [backendRole]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [targetRole, setTargetRole] = useState<string>(backendRole);
	const [switchingLoading, setSwitchingLoading] = useState(false);
	const [veterinarianModalOpen, setVeterinarianModalOpen] = useState(false);
	const [paraprofessionalModalOpen, setParaprofessionalModalOpen] =
		useState(false);
	const [vetClinicModalOpen, setVetClinicModalOpen] = useState(false);

	const userHasRoleNormalized = (roleKey: string) => {
		const roles: Array<{ name: string }> = ((apiUser as any)?.roles ||
			[]) as any;
		const normalize = (raw: string) => normalizeRole(raw);
		const target = normalizeRole(roleKey);
		return roles.some((r) => normalize(r.name) === target);
	};

	const handleSwitchProfile = (roleKey: string) => {
		setTargetRole(roleKey);
		const normalized = normalizeRole(roleKey);
		const needsForm = requiresFormData ? requiresFormData(normalized) : false;

		if (needsForm) {
			if (normalized === ROLE.VETERINARIAN) setVeterinarianModalOpen(true);
			else if (normalized === ROLE.PARAPROFESSIONAL)
				setParaprofessionalModalOpen(true);
			else if (normalized === ROLE.CLINIC) setVetClinicModalOpen(true);
			return;
		}

		setSwitchingLoading(true);
		if (normalized === ROLE.VETERINARIAN) {
			veterinarianMutation.mutate({} as any, {
				onSuccess: () => {
					refetchUser();
					setSwitchingLoading(false);
					router.refresh();
				},
				onError: () => setSwitchingLoading(false),
			});
			return;
		}
		if (normalized === ROLE.LIVESTOCK_FARMER) {
			livestockFarmerMutation.mutate(
				{},
				{
					onSuccess: () => {
						refetchUser();
						setSwitchingLoading(false);
					},
					onError: () => setSwitchingLoading(false),
				},
			);
			return;
		}
		if (normalized === ROLE.VENDOR) {
			vendorMutation.mutate(
				{},
				{
					onSuccess: () => {
						refetchUser();
						setSwitchingLoading(false);
					},
					onError: () => setSwitchingLoading(false),
				},
			);
			return;
		}
		if (normalized === ROLE.PET_OWNER) {
			petOwnerMutation.mutate(
				{},
				{
					onSuccess: () => {
						refetchUser();
						setSwitchingLoading(false);
					},
					onError: () => setSwitchingLoading(false),
				},
			);
			return;
		}

		if (normalized === ROLE.OTHERS) {
			othersMutation.mutate(
				{},
				{
					onSuccess: () => {
						refetchUser();
						setSwitchingLoading(false);
					},
					onError: () => setSwitchingLoading(false),
				},
			);
			return;
		}

		if (normalized === ROLE.CLINIC) {
			vetClinicMutation.mutate({} as any, {
				onSuccess: () => {
					refetchUser();
					setSwitchingLoading(false);
				},
				onError: () => setSwitchingLoading(false),
			});
			return;
		}
	};

	const handlePrevious = () => {
		setCurrentIndex((prev: number) =>
			prev === 0 ? switchable.length - 1 : prev - 1,
		);
	};
	const handleNext = () => {
		setCurrentIndex((prev: number) =>
			prev === switchable.length - 1 ? 0 : prev + 1,
		);
	};

	const backendRoleLabel =
		allRoles.find((r) => r.key === backendRole)?.label || String(backendRole);

	return (
		<div className="mt-6 flex flex-col items-center">
			{switchable.length > 0 &&
				(() => {
					const role = switchable[currentIndex];
					const isCurrent = role.key === backendRole;
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
									disabled={isCurrent || switchingLoading}
									onClick={() => handleSwitchProfile(role.key)}
									className={`w-full py-3 text-base font-medium rounded-xl border-2 transition-colors ${isCurrent ? "bg-white text-green-600 border-green-500 cursor-default" : "bg-white text-gray-900 hover:bg-gray-50 border-gray-900"}`}
								>
									{isCurrent
										? "Selected"
										: switchingLoading
											? "Switching..."
											: "Select"}
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

			{/* Role Switching Modals */}
			<VeterinarianSwitchModal
				open={veterinarianModalOpen}
				onClose={() => setVeterinarianModalOpen(false)}
				onSuccess={() => {
					refetchUser();
				}}
			/>
			<ParaprofessionalSwitchModal
				open={paraprofessionalModalOpen}
				onClose={() => setParaprofessionalModalOpen(false)}
				onSuccess={() => {
					refetchUser();
				}}
			/>
			<VetClinicSwitchModal
				open={vetClinicModalOpen}
				onClose={() => setVetClinicModalOpen(false)}
				onSuccess={() => {
					refetchUser();
				}}
			/>
		</div>
	);
};

export default VetProfile;
