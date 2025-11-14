"use client";

import { useState, useRef, useEffect } from "react";

declare global {
    interface Window {
        google: any;
    }
}

interface GooglePlacesAutocompleteProps {
    onPlaceSelect: (location: {
        address: string;
        latitude: number;
        longitude: number;
    }) => void;
    placeholder?: string;
    className?: string;
}

export default function GooglePlacesAutocomplete({
    onPlaceSelect,
    placeholder = "Type in your location",
    className = "",
}: GooglePlacesAutocompleteProps) {
    const [value, setValue] = useState("");
    const [isReady, setIsReady] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<any>(null);
    const placesServiceRef = useRef<any>(null);

    // Initialize Google Places Autocomplete
    useEffect(() => {
        const initAutocomplete = () => {
            // Check if input element exists and is mounted
            if (!inputRef.current) {
                setTimeout(initAutocomplete, 100);
                return;
            }

            // Check if Google Maps API is loaded
            if (
                !window.google ||
                !window.google.maps ||
                !window.google.maps.places
            ) {
                setTimeout(initAutocomplete, 100);
                return;
            }

            // Verify the input element is actually in the DOM
            if (!document.contains(inputRef.current)) {
                setTimeout(initAutocomplete, 100);
                return;
            }

            try {
                // Create a dummy map for PlacesService (required for getDetails)
                const dummyDiv = document.createElement("div");
                const dummyMap = new window.google.maps.Map(dummyDiv);
                placesServiceRef.current = new window.google.maps.places.PlacesService(
                    dummyMap
                );

                // Clean up any existing autocomplete instance
                if (autocompleteRef.current) {
                    window.google.maps.event.clearInstanceListeners(
                        autocompleteRef.current
                    );
                }

                // Initialize Autocomplete widget (this is the recommended approach)
                autocompleteRef.current = new window.google.maps.places.Autocomplete(
                    inputRef.current,
                    {
                        fields: ["place_id", "geometry", "formatted_address"],
                        types: ["geocode", "establishment"],
                    }
                );

                // Listen for place selection
                autocompleteRef.current.addListener("place_changed", () => {
                    const place = autocompleteRef.current.getPlace();

                    if (place.geometry && place.geometry.location) {
                        const lat =
                            typeof place.geometry.location.lat === "function"
                                ? place.geometry.location.lat()
                                : place.geometry.location.lat;
                        const lng =
                            typeof place.geometry.location.lng === "function"
                                ? place.geometry.location.lng()
                                : place.geometry.location.lng;

                        onPlaceSelect({
                            address: place.formatted_address || "",
                            latitude: lat,
                            longitude: lng,
                        });
                    }
                });

                setIsReady(true);
                console.log("Google Places Autocomplete initialized");
            } catch (error) {
                console.error("Error initializing Autocomplete:", error);
                setTimeout(initAutocomplete, 500);
            }
        };

        // Use a small delay to ensure DOM is ready
        const timeoutId = setTimeout(initAutocomplete, 100);

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            if (autocompleteRef.current) {
                try {
                    window.google?.maps?.event?.clearInstanceListeners(
                        autocompleteRef.current
                    );
                } catch (error) {
                    console.error("Error cleaning up Autocomplete:", error);
                }
            }
        };
    }, [onPlaceSelect]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // Ensure Google Places dropdown is styled (CSS handles most of it, but we ensure it's applied)
    useEffect(() => {
        if (!isReady) return;

        // The CSS in globals.css handles the styling, but we can add a class if needed
        const observer = new MutationObserver(() => {
            const pacContainer = document.querySelector(".pac-container");
            if (pacContainer && !pacContainer.classList.contains("styled")) {
                pacContainer.classList.add("styled");
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [isReady]);

    return (
        <div className="relative w-full">
            <input
                ref={inputRef}
                value={value}
                onChange={handleInputChange}
                disabled={!isReady}
                placeholder={isReady ? placeholder : "Loading Google Maps..."}
                className={className}
            />
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === "development" && (
                <div className="text-xs text-gray-500 mt-1">
                    Ready: {isReady ? "Yes" : "No"}
                </div>
            )}
        </div>
    );
}
