'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline';

// Import images from assets
import { 
  FeedCalculator, 
  DiseasePredictor,
  ChatImage,
  Bar2
} from '@/app/assets/images';

const DashboardPage = () => {
  // Feature cards data
  const featureCards = [
    {
      id: 1,
      title: "Search for what you need",
      description: "Browse our platform to discover vets, vet clinics, and vendors around you",
      image: "/src/app/assets/icons/sidebar/home.svg",
      href: "/search",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100"
    },
    {
      id: 2,
      title: "Manage your store",
      description: "Join the pool of vendors on our platform to earn from sales.",
      image: "/src/app/assets/icons/sidebar/stores.svg",
      href: "/store",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100"
    },
    {
      id: 3,
      title: "Manage Your Pet & Livestock Farm",
      description: "Manage your pet and livestock farm on our platform to access high quality vet care",
      image: "/src/app/assets/icons/sidebar/feed.svg",
      href: "/dashboard/feed-calculator",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100"
    },
    {
      id: 4,
      title: "Manage Your Promotions",
      description: "Promote your products by activating promotion subscription plan",
      image: "/src/app/assets/icons/sidebar/ads.svg",
      href: "/promotions",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    }
  ];

  // Recent activities data
  const recentActivities = [
    {
      id: 1,
      type: "Deleted Vendor From Client List",
      description: "Vendor Name",
      time: "10 mins ago"
    },
    {
      id: 2,
      type: "Liked a Forum Chat",
      description: "Topic",
      time: "15 mins ago"
    },
    {
      id: 3,
      type: "Case Closed",
      description: "Case Title - Case ID",
      time: "20 mins ago"
    },
    {
      id: 4,
      type: "Sent a Direct Message",
      description: "Message first paragraph",
      time: "Today 12:42 PM CST"
    },
    {
      id: 5,
      type: "Replied a Direct Message",
      description: "Message first paragraph",
      time: "Jan 20, 2023 12:42 PM CST"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your account.</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featureCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`${card.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group border border-gray-100`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`${card.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300 ml-4 mt-2" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
                <div className="flex space-x-4">
                  <button className="text-gray-900 font-medium border-b-2 border-gray-900 pb-1">
                    Recent Activities
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 transition-colors">
                    Forum Trending Topics
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {activity.type}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 ml-4">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button className="text-green-600 hover:text-green-700 font-medium flex items-center justify-center mx-auto">
                  Loading more...
                  <div className="ml-2 w-4 h-4">
                    <svg className="animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Feed Calculator Quick Access */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Image
                    src={FeedCalculator}
                    alt="Feed Calculator"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Feed Calculator</h3>
                <p className="text-sm text-gray-600 mb-4">Calculate optimal feed amounts for your livestock</p>
                <Link
                  href="/dashboard/feed-calculator"
                  className="inline-flex items-center justify-center w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Calculate Now
                </Link>
              </div>
            </div>

            {/* Disease Predictor Quick Access */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Image
                    src={DiseasePredictor}
                    alt="Disease Predictor"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Disease Predictor</h3>
                <p className="text-sm text-gray-600 mb-4">Get AI-powered disease predictions for your animals</p>
                <Link
                  href="/dashboard/disease-predictor"
                  className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Predict Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;