'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ExternalLinkIcon } from 'lucide-react';
import { useActivitiesService } from '@/services/activitiesService';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationsPage = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { useGetNotification } = useActivitiesService();
    const getNotification = useGetNotification(true);
  
    const notifications = Array.isArray(getNotification.data?.data)
      ? getNotification.data.data
      : [];

      

  // Sample notifications data
  const notification: Notification[] = [
    {
      id: '1',
      title: 'Welcome Message',
      message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      timestamp: '20mins ago',
      isRead: false
    },
    {
      id: '2',
      title: 'Account Password Reset',
      message: 'Your account password has been successfully reset. If you did not request this change, please contact our support team immediately.',
      timestamp: 'Today 12:42 PM CST',
      isRead: false
    }
  ];

  // Check if mobile view
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (isMobile) {
      setSelectedNotification(notification);
    }
  };

  const handleBackClick = () => {
    setSelectedNotification(null);
  };

  // Mobile notification detail view
  if (isMobile && selectedNotification) {
    return (
      <div className="min-h-screen bg-white">

        {/* Back Button */}
        <div className="p-4">
          <button 
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
        </div>

        {/* Notification Detail */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Notification</h1>
            <span className="text-sm text-gray-500">{selectedNotification.timestamp}</span>
          </div>
          
          <div className="text-gray-700 leading-relaxed">
            {selectedNotification.message}
          </div>
        </div>
      </div>
    );
  }

  // Desktop and Mobile List View
  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8">
          {/* Left Column - Notification List */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Notification</h1>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                    <ExternalLinkIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Notification Detail */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notification</h2>
              <span className="text-sm text-gray-500">20mins ago</span>
            </div>
            
            <div className="text-gray-700 leading-relaxed">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Notification</h1>
          
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg active:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{notification.title}</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{notification.timestamp}</span>
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
