"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ExternalLinkIcon } from "lucide-react";
import { useActivitiesService } from "@/services/activitiesService";
import echo from "@/lib/echo";
import { useAuthService } from "@/services/authService";
import { timeAgo } from "@/components/shared/TimeFormat";

interface Notification {
  id: string;
  title: string;
  content: string;
  created_at: string;
  isRead: boolean;
}

const NotificationSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

const NotificationsPage = () => {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { useCurrentUser } = useAuthService();
  const user = useCurrentUser(true);
  const currentUserId = (user as Record<string, any>).data?.profile?.user_id;

  const { useGetNotification, useGetUserNotificationById } =
    useActivitiesService();

  const getNotification = useGetNotification(true);

  // Fetch details when selected
  const getUserNotificationById = useGetUserNotificationById(
    selectedNotification ? selectedNotification.id : "",
    !!selectedNotification,
  );

  const notificationDetails = (getUserNotificationById.data as any)
    ?.notification;

  const notifications = Array.isArray(
    (getNotification.data as any)?.userNotification?.data,
  )
    ? (getNotification.data as any)?.userNotification.data
    : [];

  useEffect(() => {
    if (!currentUserId || !echo) return;

    const channel = echo.private(`App.Models.User.${currentUserId}`);

    channel.listen(".UserNotification", () => {
      getNotification.refetch();
    });

    return () => {
      channel.stopListening(".UserNotification");
    };
  }, [currentUserId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleBackClick = () => setSelectedNotification(null);

  /* ---------------- MOBILE DETAIL VIEW ---------------- */
  if (isMobile && selectedNotification) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
        </div>

        <div className="px-4">
          {getUserNotificationById.isLoading ? (
            /* 🔵 MOBILE SKELETON HERE */
            <NotificationSkeleton />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-gray-900">
                  {notificationDetails?.title}
                </h1>
                <span className="text-sm text-gray-500">
                  {timeAgo(notificationDetails?.created_at)}
                </span>
              </div>

              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: notificationDetails?.content || "",
                }}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  /* ---------------- DESKTOP VIEW ---------------- */
  return (
    <div className="min-h-screen">
      <div className="w-11/12 mx-auto">
        <div className="hidden md:grid md:grid-cols-2 md:gap-8">
          {/* LEFT LIST */}
          <div className="bg-white shadow-md rounded-lg p-6  border border-gray-2">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Notification
            </h1>

            <div className="space-y-4">
              {notifications.reverse().map((notification: any) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 rounded-lg transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                    selectedNotification?.id === notification.id
                      ? "border border-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">
                        {timeAgo(notification.created_at)}
                      </span>
                      <ExternalLinkIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-225">
            {selectedNotification ? (
              getUserNotificationById.isLoading ? (
                /* 🔵 DESKTOP SKELETON HERE */
                <NotificationSkeleton />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {notificationDetails?.title}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {timeAgo(notificationDetails?.created_at)}
                    </span>
                  </div>

                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: notificationDetails?.content || "",
                    }}
                  />
                </>
              )
            ) : (
              <div className="text-gray-400 mt-20 text-center">
                Select a notification to view details
              </div>
            )}
          </div>
        </div>

        {/* MOBILE LIST */}
        <div className="md:hidden">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Notification</h1>

          <div className="space-y-3">
            {notifications.map((notification: any) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {notification.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {timeAgo(notification.created_at)}
                  </span>
                  <ExternalLinkIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
