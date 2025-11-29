"use client";
import { Copy, Link, Send, Smile, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Hand, StarFill } from "@/app/assets/icons";
import { useState, useRef } from "react";
import { useMediaService, buildImagesFormData } from "@/services/mediaService";
import ReactStars from "react-stars";
import { ChatBox } from "@/components/shared";
import { User } from "@/types";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { useUploadMedia, useDeleteMedia } = useMediaService();
  const uploadMutation = useUploadMedia();
  const deleteMediaMutation = useDeleteMedia();

  const ratingChanged = (newRating: any) => {
    console.log(newRating);
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

  const welcomeMessage = getWelcomeMessage();

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
          <p className="text-sm mt-2">{selectedUser?.user?.phone_num || ""}</p>
          <div className="flex items-center py-3 justify-center flex-col">
            <button
              onClick={() => handleCopy(selectedUser?.user?.phone_num || "")}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              title="Copy to clipboard"
            >
              <Copy className="w-7 h-7" />
            </button>
            <span className="text-xs text-gray-55">
              {copied === (selectedUser?.user?.phone_num || "")
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
                ["image/jpeg", "image/png", "image/jpg"].includes(f.type)
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
            className="w-full py-3 px-4 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Add media
          </button>
        </div>
      )}

      {selectedAction === "mail" && (
        <>
          <p className="text-gray-55 font-bold">Email Address</p>
          <p className="text-sm mt-2">
            {selectedUser?.user.email || `${selectedUser?.user.email}`}
          </p>
          <div className="flex items-center py-3 justify-center flex-col">
            <button
              onClick={() =>
                handleCopy(
                  selectedUser?.user.email || `${selectedUser?.user.email}`
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
          <p className="text-gray-55 font-bold">Email Address</p>
          <p className="text-sm mt-2">
            {selectedUser?.user.email || `${selectedUser?.user.email}`}
          </p>
        </>
      )}

      {selectedAction === "location" && (
        <>
          <p className="text-gray-55 font-bold">Location</p>
          <p className="text-gray-800">
            {(selectedUser?.user.country && selectedUser?.user.state) ||
              "Location not specified"}
          </p>
          <div className="flex items-center py-3 justify-center flex-col">
            <button
              onClick={() =>
                handleCopy(
                  (selectedUser?.user.country && selectedUser?.user.state) ||
                    "Location not specified"
                )
              }
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              title="Copy to clipboard"
            >
              <Copy className="w-7 h-7" />
            </button>
            <span className="text-xs text-gray-55">
              {copied === selectedUser?.user.country
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
                  `https://vetkonect.com/profile/${selectedUser?.id || selectedUser?.name}`
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

      {selectedAction === "switch-profile" && (
        <>
          <p className="text-gray-55 font-bold">Switch Profile</p>
          <p className="text-sm mt-2 w-60 m-auto text-gray-55">
            Switch between different profile types
          </p>
          <div className="flex items-center py-3 justify-center">
            <button
              onClick={() => {
                // Handle profile switching logic here
                console.log("Switching profile...");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Switch Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountAction;
