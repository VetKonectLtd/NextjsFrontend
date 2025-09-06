'use client';

import { useState } from 'react';
import Image from 'next/image';
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
  Star
} from 'lucide-react';
import { AuthBg } from '@/app/assets/images';
import { AccountAction } from './';

interface AnimalOwnerProfileProps {
  isEditMode: boolean;
  onToggleEdit: () => void;
}

const AnimalOwnerProfile = ({ isEditMode, onToggleEdit }: AnimalOwnerProfileProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>('default');
  const [formData, setFormData] = useState({
    email: 'dolapo.adaba@vetkonnect.com',
    firstName: 'Dolapo',
    lastName: 'Adaba',
    phoneNo: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    status: 'Available',
    bio: 'Passionate animal owner with experience in livestock and pet care.'
  });

  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  const [coverImage, setCoverImage] = useState('/api/placeholder/400/200');

  const statusOptions = [
    'Available',
    'Busy',
    'Away',
    'Do not disturb'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContact = (id: string, type: string) => {
    setSelectedAction(type);
  };

  const currentUser = {
    id: '1',
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: formData.phoneNo,
    location: formData.location,
    type: 'animal_owner' as const
  };

  const handleSave = () => {
    // Save logic here
    onToggleEdit();
  };

  if (isEditMode) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Account Details</h1>
          <p className="text-gray-600">You can update your profile information by filling the field below</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Change Password Button */}
          <button className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
            Change Password
          </button>

          {/* Profile Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-1">Add Image</p>
          </div>
          <p className="text-sm text-gray-500 text-center">Add profile page image</p>

          {/* Cover Image Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-1">Add Image</p>
          </div>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="w-full max-w-2xl mx-auto">
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
          style={{ backgroundImage: `url(${AuthBg.src})` }}
          className="h-32 bg-gray-100 bg-cover bg-center relative"
        >
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 bg-white bg-opacity-10" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }}>
          </div>
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
                />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-gray-900 mb-6">
              {formData.firstName} {formData.lastName}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full border-b pb-5 border-gray-225 justify-center items-center md:gap-3 gap-2">
            <button
              onClick={() => handleContact('1', 'phone')}
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
              onClick={() => handleContact('1', 'message')}
              className="flex flex-col justify-center items-center space-y-3 text-gray-500"
            >
              <span
                className={`bg-white border ${selectedAction == "message" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
              >
                <MessagesSquareIcon size={14} color="#1D2432" />
              </span>
              <span className="text-xs">Message</span>
            </button>

            <button
              onClick={() => handleContact('1', 'mail')}
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
              onClick={() => handleContact('1', 'location')}
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
              onClick={() => handleContact('1', 'share')}
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
              onClick={() => handleContact('1', 'rate')}
              className="flex flex-col justify-center items-center space-y-3 text-gray-500"
            >
              <span
                className={`bg-white border ${selectedAction == "rate" && "border-gray-55"} hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
              >
                <Star size={14} color="#1D2432" />
              </span>
              <span className="text-xs">Rate</span>
            </button>
          </div>

          <AccountAction
            selectedUser={currentUser}
            selectedAction={selectedAction}
            accountType="animal_owner"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimalOwnerProfile;
