"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  SquarePen,
  Share2,
  Star,
  MapPin,
  Mail,
  MessagesSquareIcon,
  Phone,
} from "lucide-react";
import { Shop } from "@/app/assets/icons/vet-vendor";
import { Bg22, StarEmpty, StarFill } from "@/app/assets/icons";

// Sample products
const products = [
  {
    id: 1,
    name: "Dog Mouth Guard Ball",
    price: 8.99,
    image: "/dog1.jpg",
    tags: ["Available", "In Stock"],
  },
  {
    id: 2,
    name: "Dog Food",
    price: 24.99,
    image: "/dog2.jpg",
    tags: ["Sold Out"],
  },
  {
    id: 3,
    name: "Pet ID Tag Microchip",
    price: 4.39,
    image: "/dog3.jpg",
    tags: ["Available", "In Stock"],
  },
  {
    id: 4,
    name: "Pet Bed",
    price: 7.99,
    image: "/dog4.jpg",
    tags: ["Available"],
  },
];

// Star rating renderer
const renderStars = (rating: number) => {
  const hasRating = rating > 0;

  return (
    <Image
      src={hasRating ? StarFill : StarEmpty}
      alt={hasRating ? "filled star" : "empty star"}
      className="w-5 h-5"
    />
  );
};

const ClientDetails = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="m-auto  w-11/12 mt-3">
      <div
        onClick={handleBack}
        className="flex items-center text-sm text-gray-600 hover:text-green-600 cursor-pointer"
      >
        <span className="bg-white border border-gray-200 shadow-md rounded-full p-1 mr-2">
          <ChevronLeft className="w-5 h-5" />
        </span>
        Back
      </div>

      <div className="mt-3 min-h-screen  shadow-md border rounded-2xl border-gray-200 bg-white">
        <div
          style={{ backgroundImage: `url(${Bg22.src})` }}
          className="flex h-32 bg-gray-100 bg-no-repeat bg-center rounded-t-2xl bg-cover justify-between items-start p-4"
        >
          <div className="flex items-end w-full justify-end text-gray-55 ">
            <span className="bg-white text border text-gray-500 cursor-pointer border-gray-225 shadow-md rounded-full p-2 ml-2">
              <Star className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex max-w-sm px-4 md:px-0 m-auto flex-col items-center -mt-12">
          <div className="flex relative">
            <div className="w-24 h-24 rounded-full border-4 border-green-500 overflow-hidden">
              <Image
                src={Shop.src}
                alt="store"
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Online status */}
            <span className="bg-green-500 h-4 w-4 border-2 border-white absolute bottom-5 -right-1 rounded-full"></span>

            {/* Rating */}
            {/* <div className="absolute bottom-3 -right-28 flex items-center gap-1 bg-white shadow-md px-2 py-1 rounded-full">
							{renderStars(4.4)}
							<span className="text-xs font-medium text-gray-600">4.4</span>
						</div> */}
            <div className="rounded-full absolute bottom-3 -right-20 flex items-center gap-1">
              <p className="flex items-center gap-0.5">{renderStars(4)}</p>
              <span className="text-xs font-medium text-gray-55 font-nunito">
                {4} of {5}
              </span>
            </div>
          </div>

          {/* Store Info */}
          <h1 className="mt-3 text-lg font-semibold">Treequote Store</h1>
          <p className="text-sm mt-1 text-gray-500">Store</p>
        </div>

        {/* Action Buttons (Products, Call, etc.) */}
        <div className="flex max-w-lg m-auto w-full py-5 justify-center items-center md:gap-3 gap-2">
          <button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
            <span
              className={`bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
            >
              <Phone size={14} color="#1D2432" />
            </span>
            <span className="text-xs">Call</span>
          </button>

          <button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
            <span
              className={`bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
            >
              <MessagesSquareIcon size={14} color="#1D2432" />
            </span>
            <span className="text-xs">Message</span>
          </button>

          <button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
            <span
              className={`bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
            >
              <Mail size={14} color="#1D2432" />
            </span>
            <span className="text-xs">Email</span>
          </button>

          <button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
            <span
              className={`bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
            >
              <MapPin size={14} color="#1D2432" />
            </span>
            <span className="text-xs">Location</span>
          </button>

          <button className="flex flex-col justify-center items-center space-y-3 text-gray-500">
            <span
              className={`bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center`}
            >
              <Share2 size={14} color="#1D2432" />
            </span>
            <span className="text-xs">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
