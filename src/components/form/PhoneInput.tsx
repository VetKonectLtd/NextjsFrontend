"use client";

import { useState, useEffect } from "react";
import { Country } from "country-state-city";
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface PhoneInputProps {
  label: string;
  isRequired?: boolean;
  value: string;
  countryCode: string;
  focusLabel: string;
  onChange: (data: { phone: string; countryCode: string }) => void;
}

const PhoneInput = ({
  label,
  isRequired = false,
  value,
  countryCode,
  onChange,
  focusLabel,
}: PhoneInputProps) => {
  const countries = Country.getAllCountries().map((c) => ({
    code: c.isoCode,
    name: c.name,
    phoneCode: c.phonecode,
    flag: c.flag,
  }));

  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string>("");

  // Set Nigeria (NG) as default if none provided
  useEffect(() => {
    if (!countryCode) {
      onChange({ phone: value, countryCode: "NG" });
    }
  }, []);

  // Validate number
  const validatePhoneNumber = (phone: string, country: any) => {
    try {
      const phoneNumber = parsePhoneNumberFromString(phone, country);
      return phoneNumber?.isValid() || false;
    } catch {
      return false;
    }
  };

  const handlePhoneChange = (phone: string, country: string) => {
    const isValid = validatePhoneNumber(phone, country);
    setError(isValid ? "" : "Invalid phone number for selected country");
    onChange({ phone, countryCode: country });
  };

  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <div className="relative w-full">
      <div className="relative w-full border border-[#1D2432] rounded-sm bg-white flex items-center">
        {/* Country Selector */}
        <select
          value={countryCode}
          onChange={(e) => handlePhoneChange(value, e.target.value)}
          className="pl-2 pr-1 pt-5 py-[13px] text-sm bg-transparent outline-none"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag}
            </option>
          ))}
        </select>

        {/* Country Code */}
        <span className="px-1 pt-2 text-sm text-gray-600">+{selectedCountry.phoneCode}</span>

        {/* Phone Input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => handlePhoneChange(e.target.value, countryCode)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 px-2 py-3 pb-1 text-xs outline-none"
        />

        {/* Floating Label */}
        <label
          className={`absolute left-3 transition-all pointer-events-none ${
            isFocused || value
              ? "top-1 text-xs text-[#555555]"
              : "top-1 text-sm text-[#555555]"
          }`}
        >
          {isFocused && focusLabel ? focusLabel : label}
        </label>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;
