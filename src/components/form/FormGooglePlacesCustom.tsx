"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Search, MapPin } from "lucide-react";
import debounce from "lodash/debounce";

interface FormGooglePlacesInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  focusLabel?: string;
  isRequired?: boolean;
  error?: string;
  onLocationSelect?: (location: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

const FormGooglePlacesCustom = <T extends FieldValues>({
  name,
  control,
  label,
  focusLabel,
  isRequired,
  error,
  onLocationSelect,
}: FormGooglePlacesInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  // Load Google Maps API
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Fetch suggestions
  const fetchSuggestions = useCallback(
    debounce(async (input: string) => {
      if (!scriptLoaded || !input || input.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      try {
        const service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          {
            input,
            types: ["geocode"],
            componentRestrictions: { country: "ng" },
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              setSuggestions(
                predictions.map((p) => ({
                  place_id: p.place_id,
                  description: p.description,
                  structured_formatting: {
                    main_text: p.structured_formatting?.main_text || p.description.split(",")[0],
                    secondary_text: p.structured_formatting?.secondary_text || p.description.split(",").slice(1).join(","),
                  },
                }))
              );
              setShowSuggestions(true);
            } else {
              setSuggestions([]);
              setShowSuggestions(false);
            }
            setIsLoading(false);
          }
        );
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setIsLoading(false);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300),
    [scriptLoaded]
  );

  // Handle selection
  const handleSelect = async (suggestion: PlaceSuggestion) => {
    if (!scriptLoaded) return;

    try {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails(
        {
          placeId: suggestion.place_id,
          fields: ["formatted_address", "geometry", "address_components", "name"],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            // Get the complete formatted address
            const address = place.formatted_address || suggestion.description;
            const lat = place.geometry?.location?.lat() ?? null;
            const lng = place.geometry?.location?.lng() ?? null;

            // Update the selected address state
            setSelectedAddress(address);
            
            // We'll update the form field through the Controller's render prop
            // This will be done by passing the address back to the parent
            if (inputRef.current) {
              inputRef.current.value = address;
              // Create a proper React change event
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                'value'
              )?.set;
              if (nativeInputValueSetter) {
                nativeInputValueSetter.call(inputRef.current, address);
                const inputEvent = new Event('input', { bubbles: true });
                inputRef.current.dispatchEvent(inputEvent);
              }
            }

            // Call the parent's location select callback
            onLocationSelect?.({ latitude: lat, longitude: lng });
            
            // Hide suggestions
            setShowSuggestions(false);
            setSuggestions([]);
          }
        }
      );
    } catch (error) {
      console.error("Failed to get place details:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear suggestions when input is cleared
  useEffect(() => {
    if (!inputRef.current?.value && showSuggestions) {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [showSuggestions]);

  return (
    <Controller
      name={name}
      control={control}
      rules={isRequired ? { required: `${label} is required` } : undefined}
      render={({ field }) => {
        // Sync field value with selected address
        useEffect(() => {
          if (selectedAddress && selectedAddress !== field.value) {
            field.onChange(selectedAddress);
          }
        }, [selectedAddress, field]);

        return (
          <div className="relative w-full font-sans" ref={wrapperRef}>
            <div className="relative">
              <input
                {...field}
                ref={inputRef}
                onFocus={() => {
                  setIsFocused(true);
                  if (field.value && field.value.length >= 3) {
                    fetchSuggestions(field.value);
                  }
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  // Update field value on blur if it matches a suggestion
                  if (e.target.value && !selectedAddress) {
                    field.onChange(e.target.value);
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  setSelectedAddress(""); // Clear selected address when user types
                  fetchSuggestions(value);
                }}
                value={field.value || ""}
                placeholder={label}
                className={`peer block w-full pl-5 pr-4 pt-4 py-2 border bg-white border-[#1D2432] rounded-md text-base placeholder-transparent focus:outline-none
                  ${error ? "border-red-500" : ""}
                `}
              />
              
              
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>

            {/* Custom Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-[9999999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    onClick={() => handleSelect(suggestion)}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 transition-colors flex items-start gap-2"
                  >
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {suggestion.structured_formatting.main_text}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {suggestion.structured_formatting.secondary_text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <label
              className={`absolute left-5 top-1 text-[#555555] text-xs transition-all
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-sm
                peer-focus:top-1
                peer-focus:text-xs
                ${field.value ? "top-1 text-xs" : ""}
              `}
            >
              {isFocused && focusLabel ? focusLabel : label}
            </label>

            {error && (
              <span className="text-red-600 text-sm mt-1 block">{error}</span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormGooglePlacesCustom;