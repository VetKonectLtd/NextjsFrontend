"use client";

import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";

interface FormGooglePlacesInputProps {
  label: string;
  focusLabel?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  onLocationSelect?: (location: {
    address: string;
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

const GooglePlacesInput = ({
  label,
  focusLabel,
  value,
  placeholder = "Type your address",
  error,
  onChange,
  onLocationSelect,
}: FormGooglePlacesInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full font-sans">
      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className={`peer block w-full px-4 pt-4 py-2 border bg-white border-[#1D2432] rounded-md text-base placeholder-transparent focus:outline-none
          ${error ? "border-red-500" : ""}
        `}
        options={{
          types: ["geocode"],
          fields: ["formatted_address", "geometry"],
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPlaceSelected={(place) => {
          const address = place.formatted_address || "";
          const latitude = place.geometry?.location?.lat() ?? null;
          const longitude = place.geometry?.location?.lng() ?? null;

          onChange(address);

          onLocationSelect?.({
            address,
            latitude,
            longitude,
          });
        }}
      />

      {/* Floating Label */}
      <label
        className={`absolute left-4 top-1 text-[#555555] text-xs transition-all
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:text-[#555555]
          peer-focus:top-1
          peer-focus:text-xs
        `}
      >
        {isFocused && focusLabel ? focusLabel : label}
      </label>

      {/* Error */}
      {error && (
        <span className="text-red-600 text-sm mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default GooglePlacesInput;
