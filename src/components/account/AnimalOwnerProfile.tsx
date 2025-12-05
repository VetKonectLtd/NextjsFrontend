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
	Router,
	ImageIcon,
} from "lucide-react";
import { AuthBg } from "@/app/assets/images";
import { AccountAction } from "./";
import SwitcherIcon from "@/app/assets/icons/switcher.svg";
import UserIconPng from "@/app/assets/icons/user.png";
import { useAuthService } from "@/services/authService";
import { useRoleSwitchingService } from "@/services/roleSwitchingService";
import SwitchProfilePanel from "@/components/shared/SwitchProfilePanel";
import { ALL_ROLES, ROLE, normalizeRole, RoleKey } from "@/lib/roles";
import VeterinarianSwitchModal from "../modals/VeterinarianSwitchModal";
import ParaprofessionalSwitchModal from "../modals/ParaprofessionalSwitchModal";
import VetClinicSwitchModal from "../modals/VetClinicSwitchModal";
import { useRouter } from "next/navigation";
import { usePaymentService } from "@/services/paymentService";
// Media is handled inside AccountAction's built-in view

interface AnimalOwnerProfileProps {
	isEditMode: boolean;
	onToggleEdit: () => void;
}

const AnimalOwnerProfile = ({
	isEditMode,
	onToggleEdit,
}: AnimalOwnerProfileProps) => {
	const router = useRouter();
	const [selectedAction, setSelectedAction] = useState<string | null>(
		"default",
	);
	const { useCurrentUser, useUpdateProfile } = useAuthService();
	const { data: user, refetch: refetchUser } = useCurrentUser(true);
  	const { useAddPaymentDetails } = usePaymentService();
	const paymentDetailsMutation = useAddPaymentDetails();

	const updateProfileMutation = useUpdateProfile();
	const apiProfile = (user as any)?.profile;
	const apiUser = apiProfile?.user;

	const {
		hasRole,
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

	const [veterinarianModalOpen, setVeterinarianModalOpen] = useState(false);
	const [paraprofessionalModalOpen, setParaprofessionalModalOpen] =
		useState(false);
	const [vetClinicModalOpen, setVetClinicModalOpen] = useState(false);


  const handleAddPaymentDetail = () => {
		paymentDetailsMutation.mutate({
			onSuccess: (data: any) => {
				if (data?.authorization_url) {
					window.location.href = data.authorization_url;
				}
			},
		});
	};
	const [formData, setFormData] = useState({
		email: apiUser?.email || "",
		firstName: apiUser?.first_name || "",
		lastName: apiUser?.last_name || "",
		phoneNo: apiUser?.phone_num || "",
		location: apiUser?.state
			? `${apiUser?.state}${apiUser?.country ? ", " + apiUser?.country : ""}`
			: "",
		status: "Available",
		bio: apiUser?.profile?.bio || "",
	});

	const [profileImage, setProfileImage] = useState<any>(
		apiUser?.profile?.profile_image_url || apiProfile?.profile || UserIconPng,
	);
	const [coverImage, setCoverImage] = useState<any>(
		apiUser?.profile?.cover_page_image_url || "/api/placeholder/400/200",
	);

	const statusOptions = ["Available", "Busy", "Away", "Do not disturb"];

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

	const [showSwitcher, setShowSwitcher] = useState(false);
	const [switchingLoading, setSwitchingLoading] = useState(false);
	const [targetRole, setTargetRole] = useState<string>(backendRole);
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentRoleLabel =
		allRoles.find((r) => r.key === backendRole)?.label || String(backendRole);
	const veterinarianMutation = useSwitchToVeterinarian();
	const paraprofessionalMutation = useSwitchToParaprofessional();
	const vetClinicMutation = useSwitchToVetClinic();

	// Robust local role check using normalized names from backend (profile.user.roles)
	const userHasRoleNormalized = (roleKey: string) => {
		const roles: Array<{ name: string }> = ((apiUser as any)?.roles ||
			[]) as any;
		const normalize = (raw: string) => normalizeRole(raw);
		const target = normalizeRole(roleKey);
		return roles.some((r) => normalize(r.name) === target);
	};

	const handleSwitchProfile = (roleKey: string) => {
		setTargetRole(roleKey);

		// Check if user already has this role
		const userHasRole = userHasRoleNormalized(roleKey);

		// Decide action by role and whether form data is required
		const normalized = normalizeRole(roleKey);
		const needsForm = requiresFormData ? requiresFormData(normalized) : false;

		// Open modals when form is required
		if (needsForm) {
			if (normalized === ROLE.VETERINARIAN) setVeterinarianModalOpen(true);
			else if (normalized === ROLE.PARAPROFESSIONAL)
				setParaprofessionalModalOpen(true);
			else if (normalized === ROLE.CLINIC) setVetClinicModalOpen(true);
			return;
		}

		// Otherwise, trigger switch via respective mutation (even if user already has role)
		setSwitchingLoading(true);
		if (normalized === ROLE.VETERINARIAN) {
			veterinarianMutation.mutate({} as any, {
				onSuccess: () => {
					refetchUser();
					setShowSwitcher(true);
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
						setShowSwitcher(false);
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
						setShowSwitcher(false);
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
						setShowSwitcher(false);
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
						setShowSwitcher(false);
						setSwitchingLoading(false);
					},
					onError: () => setSwitchingLoading(false),
				},
			);
			return;
		}
	};

	const handleModalSuccess = () => {
		refetchUser();
		setShowSwitcher(false);
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

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleContact = (id: string, type: string) => {
		setSelectedAction(type);
		if (type === "switch-profile") {
			setShowSwitcher(true);
		} else {
			setShowSwitcher(false);
		}
	};

	const currentUser = {
		id: apiUser?.id?.toString() || "",
		name: `${formData.firstName} ${formData.lastName}`,
		email: formData.email,
		phone: formData.phoneNo,
		location: formData.location,
		type: "animal_owner" as const,
	};

	const handleSave = () => {
		// Build FormData for the update endpoint (expects form-data)
		const payload = new FormData();
		if (formData.email) payload.append("email", formData.email);
		if (formData.firstName) payload.append("first_name", formData.firstName);
		if (formData.lastName) payload.append("last_name", formData.lastName);
		if (formData.phoneNo) payload.append("phone_num", formData.phoneNo);
		if (formData.bio) payload.append("bio", formData.bio);

		// Split location into state,country if provided
		if (formData.location) {
			const parts = formData.location.split(",").map((s) => s.trim());
			if (parts[0]) payload.append("state", parts[0]);
			if (parts[1]) payload.append("country", parts[1]);
		}

		// Append images only when they are File objects (UI not yet exposing file inputs)
		if (profileImage && (profileImage as any) instanceof File) {
			payload.append("profile_image", profileImage as any);
		}
		if (coverImage && (coverImage as any) instanceof File) {
			payload.append("cover_page_image", coverImage as any);
		}

		updateProfileMutation.mutate(payload, {
			onSuccess: () => {
				// refresh user via refetch from invalidation and close edit mode
				refetchUser();
				onToggleEdit();
			},
		});
	};

	if (isEditMode) {
		return (
			<div className="w-full mx-auto">
				{/* Back Button */}
				<button
					onClick={onToggleEdit}
					className="flex items-center text-sm mb-6 text-gray-600 hover:text-green-600 transition-colors"
				>
					<ChevronLeft className="w-5 h-5 mr-1" />
					Back
				</button>

				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
						Account Details
					</h1>
					<p className="text-gray-600">
						You can update your profile information by filling the field below
					</p>
				</div>

				{/* Form */}
				<div className="space-y-4">
					{/* Email */}
					<div>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Email Address"
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
					</div>

					{/* First Name */}
					<div>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleInputChange}
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
							onChange={handleInputChange}
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
							onChange={handleInputChange}
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
							onChange={handleInputChange}
							placeholder="Location / Address"
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
						/>
					</div>

					{/* Status Dropdown */}
					<div className="relative">
						<select
							name="status"
							value={formData.status}
							onChange={handleInputChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
						>
							{statusOptions.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
					</div>

					{/* Bio */}
					<div>
						<textarea
							name="bio"
							value={formData.bio}
							onChange={handleInputChange}
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
						className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors cursor-pointer"
						onClick={() =>
							document.getElementById("profile_image_input")?.click()
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
						<p className="text-gray-600 mb-1">Click to upload profile image</p>
						<input
							type="file"
							accept="image/*"
							className="hidden"
							id="profile_image_input"
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
								document.getElementById("profile_image_input")?.click()
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
						className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-colors cursor-pointer"
						onClick={() =>
							document.getElementById("cover_image_input")?.click()
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
							id="cover_image_input"
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
								document.getElementById("cover_image_input")?.click()
							}
						>
							Choose file
						</button>
					</div>

					{/* Save Button */}
					<button
						type="button"
						onClick={handleSave}
						disabled={updateProfileMutation.isLoading}
						className={`w-full py-3 px-4 rounded-xl transition-colors font-medium mt-6 ${updateProfileMutation.isLoading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-900"}`}
					>
						{updateProfileMutation.isLoading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</div>
		);
	}

	// View Mode
	return (
		<div className="w-full mx-auto">
			{/* Back Button - Mobile */}
			<div className="flex items-center justify-between p-4 md:p-6">
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
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mx-4 md:mx-6">
				{/* Cover Image */}
				<div
					style={{
						backgroundImage: `url(${(apiUser?.profile?.cover_page_image_url as string) || AuthBg.src})`,
					}}
					className="h-32 bg-gray-100 bg-cover bg-center relative"
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
						</div>
					</div>

					{/* Name */}
					<div className="text-center mb-6">
						<h1 className="text-xl font-bold text-gray-900 mb-6">
							{formData.firstName} {formData.lastName}
						</h1>
					</div>

					{/* Bio */}
					{formData.bio && (
						<div className="max-w-xl mx-auto text-center mb-6">
							<p className="text-sm text-gray-700 whitespace-pre-line">
								{formData.bio}
							</p>
						</div>
					)}

					{backendRole === ROLE.VENDOR && (
						<button
							className="w-1/3 flex justify-center items-center font-medium m-auto rounded-lg my-3 bg-primary-400 py-2 text-white text-sm"
							onClick={handleAddPaymentDetail}
						>
							Add Paystack Details
						</button>
					)}

					{/* Role */}
					<div className="flex flex-wrap justify-center gap-2 mb-6">
						<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
							{currentRoleLabel}
						</span>
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

						<button
							onClick={() => handleContact("1", "message")}
							className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 text-gray-500 min-w-[50px] sm:min-w-[60px]"
						>
							<span
								className={`bg-white border ${selectedAction == "message" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-1.5 sm:p-2 flex items-center justify-center`}
							>
								<MessagesSquareIcon
									size={14}
									color="#1D2432"
									className="sm:w-4 sm:h-4"
								/>
							</span>
							<span className="text-[10px] sm:text-xs text-center">
								Message
							</span>
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
							selectedUser={apiProfile}
							selectedAction={selectedAction}
							accountType="animal_owner"
						/>
					)}
				</div>
			</div>

			{/* Role Switching Modals */}
			<VeterinarianSwitchModal
				open={veterinarianModalOpen}
				onClose={() => setVeterinarianModalOpen(false)}
				onSuccess={handleModalSuccess}
			/>
			<ParaprofessionalSwitchModal
				open={paraprofessionalModalOpen}
				onClose={() => setParaprofessionalModalOpen(false)}
				onSuccess={handleModalSuccess}
			/>
			<VetClinicSwitchModal
				open={vetClinicModalOpen}
				onClose={() => setVetClinicModalOpen(false)}
				onSuccess={handleModalSuccess}
			/>
		</div>
	);
};

export default AnimalOwnerProfile;
