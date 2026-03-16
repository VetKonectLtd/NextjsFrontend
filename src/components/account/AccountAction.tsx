"use client";
import { Copy, Link, Send, Smile, ImageIcon, X, Mail, Users } from "lucide-react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Hand, StarFill } from "@/app/assets/icons";
import { useState, useRef } from "react";
import { useMediaService, buildImagesFormData } from "@/services/mediaService";
import ReactStars from "react-stars";
import { useInviteService } from "@/services/inviteService";

interface AccountUser {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	location?: string;
	type: "animal_owner" | "veterinarian";
	profileImage?: string;
}

interface AccountActionProps {
	selectedUser: any;
	selectedAction: string | null;
	accountType: "animal_owner" | "veterinarian";
}

const AccountAction = ({
	selectedUser,
	selectedAction,
	accountType,
}: AccountActionProps) => {
	const [copied, setCopied] = useState<string | null>(null);
	const [uploadedMedia, setUploadedMedia] = useState<string[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [inviteEmails, setInviteEmails] = useState<string[]>([]);
	const [emailInput, setEmailInput] = useState("");
	const [inviteSending, setInviteSending] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { useUploadMedia, useDeleteMedia } = useMediaService();
	const uploadMutation = useUploadMedia();
	const deleteMediaMutation = useDeleteMedia();
	const { useSendInvite, useGetUserPoints } = useInviteService();
	const sendInviteMutation = useSendInvite();
	const getUserPointsQuery = useGetUserPoints(true);

	const engagementPoints =
		(getUserPointsQuery.data as any)?.points[0]?.engagement_points ?? 0;

	const referralPoints =
		(getUserPointsQuery.data as any)?.points[0]?.user_referral_points ?? 0;

	const totalPoints =
		(getUserPointsQuery.data as any)?.points[0]?.total_points ?? 0;

	const isPointsLoading = getUserPointsQuery.isLoading;


	const ratingChanged = (newRating: any) => {
		// console.log(newRating);
	};

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(text);
			setTimeout(() => setCopied(null), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const getWelcomeMessage = () => {
		if (accountType === "animal_owner") {
			return {
				title: "Hey! Animal Owner",
				description:
					"Manage your pet profiles and connect with veterinary professionals",
			};
		} else {
			return {
				title: "Hey! Veterinarian",
				description:
					"Manage your professional profile and connect with pet owners",
			};
		}
	};

	const handleAddEmail = () => {
		if (emailInput.trim() && !inviteEmails.includes(emailInput.trim())) {
			setInviteEmails([...inviteEmails, emailInput.trim()]);
			setEmailInput("");
		}
	};

	const handleRemoveEmail = (email: string) => {
		setInviteEmails(inviteEmails.filter((e) => e !== email));
	};

	const handleSendInvites = async () => {
		if (inviteEmails.length === 0) return;

		setInviteSending(true);

		sendInviteMutation.mutate(
			{ email: inviteEmails },
			{
				onSuccess: () => {
					setInviteEmails([]);
					setInviteSending(false);
				},
				onError: () => {
					setInviteSending(false);
				},
			},
		);

	};

	const welcomeMessage = getWelcomeMessage();

	const uniqueInviteLink = `https://nextjs-frontend-beta-drab.vercel.app/signup?invite_code=${selectedUser?.user.invite_code}`;

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
					<p className="text-gray-55 font-bold">{welcomeMessage.title}</p>
					<p className="w-3/5 m-auto">{welcomeMessage.description}</p>
				</>
			)}

			{selectedAction === "phone" && (
				<>
					<p className="text-gray-55 font-bold">Phone Number</p>

					{/* Display phone number */}
					<p className="text-sm mt-2">
						{selectedUser.active_role?.name === "basic_user"
							? selectedUser.phone_num
							: selectedUser?.user?.phone_num || ""}
					</p>

					{/* Copy button */}
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(
									selectedUser.active_role?.name === "basic_user"
										? selectedUser.phone_num
										: selectedUser?.user?.phone_num || "",
								)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>

						<span className="text-xs text-gray-55">
							{copied ===
								(selectedUser.active_role?.name === "basic_user"
									? selectedUser.phone_num
									: selectedUser?.user?.phone_num)
								? "Copied!"
								: "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "media" && (
				<div className="w-full max-w-md mx-auto">
					{/* Title */}
					<div className="text-center mb-6">
						<h2 className="text-xl font-bold text-gray-900 mb-1">
							Users' Media
						</h2>
						<p className="text-sm text-gray-600">Add your media practice</p>
					</div>

					{/* Media Upload Area */}
					<div className="mb-6">
						{(() => {
							const existingMedia: Array<{ id: number; file_url: string }> =
								(selectedUser?.user?.media as any) || [];
							const previews = [
								...existingMedia.map((m) => ({
									type: "server" as const,
									id: m.id,
									url: m.file_url,
								})),
								...uploadedMedia.map((url, index) => ({
									type: "local" as const,
									index,
									url,
								})),
							];

							return (
								<div className="grid grid-cols-2 gap-3 mb-4">
									{previews.map((item, idx) => (
										<div
											key={`${item.type}-${item.url}-${idx}`}
											className="relative group"
										>
											<div className="w-full h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
												<Image
													src={item.url}
													alt={`Media ${idx + 1}`}
													width={200}
													height={128}
													className="w-full h-full object-cover"
												/>
											</div>
											<button
												onClick={() => {
													if (item.type === "server") {
														deleteMediaMutation.mutate(item.id, {
															onSuccess: () => {
																if (Array.isArray(selectedUser?.user?.media)) {
																	const list = (
																		selectedUser.user.media as any[]
																	).filter((m: any) => m.id !== item.id);
																	selectedUser.user.media = list as any;
																}
															},
														});
													} else {
														const newMedia = [...uploadedMedia];
														newMedia.splice(item.index!, 1);
														setUploadedMedia(newMedia);
														const newFiles = [...selectedFiles];
														newFiles.splice(item.index!, 1);
														setSelectedFiles(newFiles);
													}
												}}
												className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
											>
												<X className="w-4 h-4" />
											</button>
										</div>
									))}

									{/* Always show the add tile alongside previews */}
									<div
										onClick={() => fileInputRef.current?.click()}
										className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-500 transition-colors"
									>
										<div className="flex flex-col items-center justify-center">
											<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
												<ImageIcon className="w-8 h-8 text-gray-400" />
											</div>
											<p className="text-gray-600 font-medium">
												Click to add media
											</p>
										</div>
									</div>
								</div>
							);
						})()}
					</div>

					{/* Hidden File Input */}
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*,video/*"
						multiple
						className="hidden"
						onChange={(e) => {
							const files = e.target.files;
							if (files) {
								const fileArray = Array.from(files);
								// Keep files for upload button; also show previews
								setSelectedFiles((prev) => [...prev, ...fileArray]);

								const newMediaPromises = fileArray.map((file) => {
									return new Promise<string>((resolve) => {
										const reader = new FileReader();
										reader.onloadend = () => {
											resolve(reader.result as string);
										};
										reader.readAsDataURL(file);
									});
								});

								Promise.all(newMediaPromises).then((mediaUrls) => {
									setUploadedMedia((prev) => [...prev, ...mediaUrls]);
								});
							}
						}}
					/>

					{/* Add Media Button */}
					<button
						onClick={() => {
							if (uploadMutation.isLoading) return;
							if (selectedFiles.length === 0) {
								fileInputRef.current?.click();
								return;
							}
							const imagesOnly = selectedFiles.filter((f) =>
								["image/jpeg", "image/png", "image/jpg"].includes(f.type),
							);
							if (imagesOnly.length > 0) {
								const fd = buildImagesFormData(imagesOnly);
								uploadMutation.mutate(fd, {
									onSuccess: () => {
										// Clear selected files after successful upload
										setSelectedFiles([]);
									},
								});
							}
						}}
						disabled={uploadMutation.isLoading}
						className="w-full py-3 px-4 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
					>
						{uploadMutation.isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Uploading...
							</>
						) : (
							"Save media"
						)}
					</button>
				</div>
			)}

			{selectedAction === "mail" && (
				<>
					<p className="text-gray-55 font-bold">Email Address</p>

					<p className="text-sm mt-2">
						{selectedUser.active_role?.name === "basic_user"
							? selectedUser.email
							: selectedUser?.user?.email}
					</p>

					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(
									selectedUser.active_role?.name === "basic_user"
										? selectedUser.email
										: selectedUser?.user?.email,
								)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>

						<span className="text-xs text-gray-55">
							{copied?.includes("@") ? "Copied!" : "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "info" && (
				<>
					<p className="text-gray-55 font-bold">Bio</p>
					<p className="text-sm mt-2">
						{selectedUser?.user.profile.bio ||
							`${selectedUser?.user.profile.bio}`}
					</p>
				</>
			)}

			{selectedAction === "location" && (
				<>
					<p className="text-gray-55 font-bold">Location</p>

					<p className="text-sm mt-2">
						{selectedUser.active_role?.name === "basic_user"
							? `${selectedUser.country || ""} ${selectedUser.state || ""}`.trim()
							: `${selectedUser?.user?.country || ""} ${selectedUser?.user?.state || ""}`.trim() ||
							"Location not specified"}
					</p>

					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(
									selectedUser.active_role?.name === "basic_user"
										? `${selectedUser.country || ""} ${selectedUser.state || ""}`.trim()
										: `${selectedUser?.user?.country || ""} ${selectedUser?.user?.state || ""}`.trim(),
								)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>

						<span className="text-xs text-gray-55">
							{copied ===
								(selectedUser.active_role?.name === "basic_user"
									? `${selectedUser.country || ""} ${selectedUser.state || ""}`.trim()
									: `${selectedUser?.user?.country || ""} ${selectedUser?.user?.state || ""}`.trim())
								? "Copied!"
								: "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "share" && (
				<>
					<p className="text-gray-55 font-bold">Share Profile</p>
					<p className="text-gray-800">
						https://vetkonect.com/profile/
						{selectedUser?.id || selectedUser?.name}
					</p>
					<div className="flex items-center py-3 justify-center flex-col">
						<button
							onClick={() =>
								handleCopy(
									`https://vetkonect.com/profile/${selectedUser?.id || selectedUser?.name}`,
								)
							}
							className="p-2 rounded-full border hover:bg-gray-100 transition"
							title="Copy to clipboard"
						>
							<Copy className="w-7 h-7" />
						</button>
						<span className="text-xs text-gray-55">
							{copied?.startsWith("https://vetkonect.com/profile")
								? "Copied!"
								: "Click to copy"}
						</span>
					</div>
				</>
			)}

			{selectedAction === "invite" && (
				<div className="w-full max-w-md mx-auto">
					{/* Title */}
					<div className="text-center mb-6">
						<Users className="w-12 h-12 mx-auto mb-2 text-primary-400" />
						<h2 className="text-xl font-bold text-gray-900 mb-1">
							Invite People
						</h2>
						<p className="text-sm text-gray-600">
							Invite friends or colleagues to join VetKonect
						</p>
					</div>

					{/* Unique Invite Link Section */}
					<div className="mb-6 p-4 bg-gray-50 rounded-lg border border-blue-200">
						<p className="text-sm font-medium text-gray-700 mb-2">
							Your Unique Invite Link
						</p>
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={uniqueInviteLink}
								readOnly
								className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-xs"
							/>
							<button
								onClick={() => handleCopy(uniqueInviteLink)}
								className="p-2 rounded-full border hover:bg-gray-100 transition"
								title="Copy invite link"
							>
								<Copy className="w-4 h-4" />
							</button>
						</div>
						<span className="text-xs text-gray-55 mt-1 block">
							{copied === uniqueInviteLink ? "Link copied!" : ""}
						</span>
					</div>

					{/* Email Invitation Section */}
					<div className="mb-6">
						<p className="text-sm font-medium text-gray-700 mb-2">
							Or invite via email
						</p>
						<div className="flex gap-2 mb-3">
							<input
								type="email"
								value={emailInput}
								onChange={(e) => setEmailInput(e.target.value)}
								onKeyPress={(e) =>
									e.key === "Enter" && handleAddEmail()
								}
								placeholder="Enter email address"
								className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
							/>
							<button
								onClick={handleAddEmail}
								className="px-4 py-2 bg-primary-400 text-white rounded-md text-sm hover:bg-primary-500 transition"
							>
								Add
							</button>
						</div>

						{/* Email List */}
						{inviteEmails.length > 0 && (
							<div className="mb-3">
								<p className="text-xs text-gray-600 mb-2">
									Emails to invite ({inviteEmails.length}):
								</p>
								<div className="space-y-2">
									{inviteEmails.map((email) => (
										<div
											key={email}
											className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-full"
										>
											<span className="text-sm text-gray-700">{email}</span>
											<button
												onClick={() => handleRemoveEmail(email)}
												className="text-red-500 hover:text-red-700"
											>
												<X className="w-4 h-4" />
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Send Invites Button */}
					<button
						onClick={handleSendInvites}
						disabled={inviteEmails.length === 0 || inviteSending}
						className="w-full py-3 px-4 bg-primary-400 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{inviteSending ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Sending...
							</>
						) : (
							<>
								<Send className="w-4 h-4" />
								Send Invites
							</>
						)}
					</button>
				</div>
			)}

			{selectedAction === "rate" && (
				<>
					<div className="mb-3 flex items-center justify-center">
						<Image src={StarFill} alt="filled star" className="w-12 h-12" />
					</div>
					<p className="text-gray-55 text-2xl font-bold">
						{accountType === "veterinarian"
							? "Rate Veterinarian"
							: "Rate Service"}
					</p>
					<p className="text-sm mt-2 w-60 m-auto text-gray-55 font-normal">
						Please rate your experience on a scale of 1 to 5 stars
					</p>
					<div className="flex justify-center items-center mt-3">
						<ReactStars
							count={5}
							onChange={ratingChanged}
							size={24}
							color2={"#ffd700"}
						/>
					</div>
				</>
			)}

			{selectedAction === "edit" && (
				<>
					<p className="text-gray-55 font-bold">Edit Profile</p>
					<p className="text-sm mt-2 w-60 m-auto text-gray-55">
						Update your{" "}
						{accountType === "veterinarian" ? "professional" : "personal"}{" "}
						information
					</p>
					<div className="flex items-center py-3 justify-center">
						<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
							Edit Profile
						</button>
					</div>
				</>
			)}

			{selectedAction === "switch-profile" && null}

			{/* ===================== USER POINTS SECTION ===================== */}
			{selectedAction === "point" && (
				<>


					{/* TITLE */}
					<p className="text-gray-55 text-2xl font-bold">
						Your Reward Points
					</p>

					<p className="text-sm mt-2 w-72 m-auto text-gray-55">
						Earn points through engagement and successful referrals on VetKonect.
					</p>

					{/* POINTS DISPLAY */}
					<div className="mt-6 space-y-3 w-full max-w-xs mx-auto">

						{isPointsLoading ? (
							<div className="flex justify-center py-4">
								<Loader2 className="w-5 h-5 animate-spin" />
							</div>
						) : (
							<>
								{/* Engagement Points */}
								<div className="flex justify-between items-center border rounded-lg px-4 py-3">
									<span className="text-sm text-gray-600">
										Engagement Points
									</span>
									<span className="font-bold text-primary-500">
										{engagementPoints} pts
									</span>
								</div>

								{/* Referral Points */}
								<div className="flex justify-between items-center border rounded-lg px-4 py-3">
									<span className="text-sm text-gray-600">
										Referral Points
									</span>
									<span className="font-bold text-primary-500">
										{referralPoints} pts
									</span>
								</div>

								{/* Total Points */}
								<div className="flex justify-between items-center border-2 border-primary-400 bg-primary-50 rounded-lg px-4 py-3">
									<span className="text-sm font-semibold text-gray-700">
										Total Points
									</span>
									<span className="text-lg font-bold text-primary-600">
										{totalPoints} pts
									</span>
								</div>
							</>
						)}
					</div>

					{/* FOOTER NOTE */}
					<p className="text-xs text-gray-500 mt-5 w-72 m-auto">
						Invite friends and stay active to earn more rewards and unlock future benefits.
					</p>
				</>
			)}
			{/* ===================== END POINTS SECTION ===================== */}
		</div>
	);
};

export default AccountAction;
