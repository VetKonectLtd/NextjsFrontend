"use client";

import Image from "next/image";
import UserIconPng from "@/app/assets/icons/user.png";
import { ChevronLeft } from "lucide-react";
import { ROLE_LABELS, RoleKey } from "@/lib/roles";

export interface SwitchProfilePanelProps {
  switchable: Array<{ key: RoleKey; label: string }>;
  backendRole: RoleKey | string;
  targetRole: string;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectRole: (roleKey: RoleKey) => void;
}

const SwitchProfilePanel = ({
  switchable,
  backendRole,
  targetRole,
  currentIndex,
  onPrev,
  onNext,
  onSelectRole,
}: SwitchProfilePanelProps) => {
  if (!switchable.length) return null;
  const role = switchable[currentIndex];
  const isCurrent = role.key === backendRole;

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
              isCurrent
                ? "ring-4 ring-green-500 ring-opacity-30"
                : "ring-2 ring-gray-200"
            } bg-gray-100`}
          >
            <Image src={UserIconPng} alt={role.label} width={48} height={48} />
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
            onClick={() => onSelectRole(role.key)}
            className={`w-full py-3 text-base font-medium rounded-xl border-2 transition-colors ${
              isCurrent
                ? "bg-white text-green-600 border-green-500 cursor-default"
                : "bg-white text-gray-900 hover:bg-gray-50 border-gray-900"
            }`}
          >
            {isCurrent ? "Selected" : "Select"}
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {switchable.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-gray-900" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            type="button"
            onClick={onPrev}
            className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous profile"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            type="button"
            onClick={onNext}
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
    </div>
  );
};

export default SwitchProfilePanel;
