"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export default function GoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error(
        "Google Maps API key is not set. Please check your .env file.",
      );
      return;
    }

    // Check if script is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log("Google Maps API already loaded");
      setIsLoaded(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com/maps/api/js"]',
    );
    if (existingScript) {
      // Wait for script to load
      existingScript.addEventListener("load", () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          setIsLoaded(true);
        }
      });
      return;
    }

    // Load Google Maps JavaScript API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Google Maps API script loaded successfully");
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true);
      }
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps API script");
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script on cleanup as it's needed globally
    };
  }, []);

  return null;
}
