import Image from "next/image";
import React, { useState } from "react";

// Country data with approximate center coordinates
const countries = [
  { code: "NG", name: "Nigeria", latitude: 9.082, longitude: 8.6753 },
  { code: "GH", name: "Ghana", latitude: 7.9465, longitude: -1.0232 },
  { code: "KE", name: "Kenya", latitude: -0.0236, longitude: 37.9062 },
  { code: "ZA", name: "South Africa", latitude: -30.5595, longitude: 22.9375 },
  { code: "EG", name: "Egypt", latitude: 26.8206, longitude: 30.8025 },
  { code: "ET", name: "Ethiopia", latitude: 9.145, longitude: 38.7667 },
  { code: "TZ", name: "Tanzania", latitude: -6.369, longitude: 34.8888 },
  { code: "UG", name: "Uganda", latitude: 1.3733, longitude: 32.2903 },
  { code: "RW", name: "Rwanda", latitude: -1.9403, longitude: 29.8739 },
];

interface CountryFlagsProps {
  onCountrySelect?: (country: {
    code: string;
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}

const CountryFlags: React.FC<CountryFlagsProps> = ({ onCountrySelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountryClick = (country: (typeof countries)[0]) => {
    setSelectedCountry(country.code);
    if (onCountrySelect) {
      onCountrySelect({
        code: country.code,
        name: country.name,
        latitude: country.latitude,
        longitude: country.longitude,
      });
    }
  };

  return (
    <div className="mt-6 w-full">
      {/* Desktop: flex-wrap, Mobile: horizontal scroll */}
      <div className="flex lg:flex-wrap gap-2 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-2 px-2 lg:px-0">
        {countries.map((country, index) => (
          <div
            key={country.code}
            className="group relative flex flex-col items-center flex-shrink-0 cursor-pointer"
            onClick={() => handleCountryClick(country)}
          >
            <div
              className={`w-12 h-12 rounded-full border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg overflow-hidden ${
                selectedCountry === country.code
                  ? "border-green-600 shadow-lg scale-110"
                  : "border-white bg-white shadow-md"
              } ${index === 0 ? "z-10" : "z-0"}`}
            >
              <Image
                src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                alt={country.name}
                width={48}
                height={48}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  selectedCountry === country.code
                    ? "grayscale-0"
                    : "grayscale group-hover:grayscale-0"
                }`}
              />
            </div>
            <div className="absolute -bottom-8 px-2 py-1 bg-white text-black text-xs font-medium rounded-tr-md rounded-br-md rounded-bl-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg">
              {country.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryFlags;
