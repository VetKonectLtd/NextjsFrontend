// Geolocation utility for getting user's coordinates

export interface GeolocationCoordinates {
	latitude: number;
	longitude: number;
	accuracy?: number;
	altitude?: number | null;
	altitudeAccuracy?: number | null;
	heading?: number | null;
	speed?: number | null;
}

export interface GeolocationError {
	code: number;
	message: string;
}

export interface GeolocationOptions {
	enableHighAccuracy?: boolean;
	timeout?: number;
	maximumAge?: number;
}

// Default geolocation options
const DEFAULT_OPTIONS: GeolocationOptions = {
	enableHighAccuracy: true,
	timeout: 10000, // 10 seconds
	maximumAge: 300000, // 5 minutes
};

/**
 * Get the user's current position using the Geolocation API
 * @param options - Geolocation options
 * @returns Promise that resolves to coordinates or rejects with error
 */
export const getCurrentPosition = (
	options: GeolocationOptions = DEFAULT_OPTIONS
): Promise<GeolocationCoordinates> => {
	return new Promise((resolve, reject) => {
		// Check if geolocation is supported
		if (!navigator.geolocation) {
			reject({
				code: 0,
				message: 'Geolocation is not supported by this browser.',
			});
			return;
		}

		// Get current position
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const coords: GeolocationCoordinates = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					altitude: position.coords.altitude,
					altitudeAccuracy: position.coords.altitudeAccuracy,
					heading: position.coords.heading,
					speed: position.coords.speed,
				};
				resolve(coords);
			},
			(error) => {
				let errorMessage = 'An unknown error occurred.';
				
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage = 'User denied the request for Geolocation.';
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = 'Location information is unavailable.';
						break;
					case error.TIMEOUT:
						errorMessage = 'The request to get user location timed out.';
						break;
				}

				reject({
					code: error.code,
					message: errorMessage,
				});
			},
			options
		);
	});
};

/**
 * Watch the user's position for changes
 * @param onSuccess - Callback for successful position updates
 * @param onError - Callback for errors
 * @param options - Geolocation options
 * @returns Watch ID that can be used to clear the watch
 */
export const watchPosition = (
	onSuccess: (coords: GeolocationCoordinates) => void,
	onError: (error: GeolocationError) => void,
	options: GeolocationOptions = DEFAULT_OPTIONS
): number | null => {
	if (!navigator.geolocation) {
		onError({
			code: 0,
			message: 'Geolocation is not supported by this browser.',
		});
		return null;
	}

	return navigator.geolocation.watchPosition(
		(position) => {
			const coords: GeolocationCoordinates = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				accuracy: position.coords.accuracy,
				altitude: position.coords.altitude,
				altitudeAccuracy: position.coords.altitudeAccuracy,
				heading: position.coords.heading,
				speed: position.coords.speed,
			};
			onSuccess(coords);
		},
		(error) => {
			let errorMessage = 'An unknown error occurred.';
			
			switch (error.code) {
				case error.PERMISSION_DENIED:
					errorMessage = 'User denied the request for Geolocation.';
					break;
				case error.POSITION_UNAVAILABLE:
					errorMessage = 'Location information is unavailable.';
					break;
				case error.TIMEOUT:
					errorMessage = 'The request to get user location timed out.';
					break;
			}

			onError({
				code: error.code,
				message: errorMessage,
			});
		},
		options
	);
};

/**
 * Clear a position watch
 * @param watchId - The watch ID returned by watchPosition
 */
export const clearWatch = (watchId: number): void => {
	if (navigator.geolocation) {
		navigator.geolocation.clearWatch(watchId);
	}
};

/**
 * Check if geolocation is supported
 * @returns boolean indicating if geolocation is supported
 */
export const isGeolocationSupported = (): boolean => {
	return 'geolocation' in navigator;
};

/**
 * Get user's coordinates with error handling and fallback
 * @param fallbackCoords - Fallback coordinates if geolocation fails
 * @param options - Geolocation options
 * @returns Promise that resolves to coordinates
 */
export const getUserLocation = async (
	fallbackCoords?: { latitude: number; longitude: number },
	options: GeolocationOptions = DEFAULT_OPTIONS
): Promise<GeolocationCoordinates> => {
	try {
		const coords = await getCurrentPosition(options);
		return coords;
	} catch (error) {
		console.warn('Geolocation failed:', error);
		
		if (fallbackCoords) {
			return {
				latitude: fallbackCoords.latitude,
				longitude: fallbackCoords.longitude,
			};
		}
		
		throw error;
	}
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number => {
	const R = 6371; // Radius of the Earth in kilometers
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a = 
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;
	return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

// Default coordinates for major Nigerian cities (fallback options)
export const NIGERIAN_CITIES = {
	LAGOS: { latitude: 6.5244, longitude: 3.3792 },
	ABUJA: { latitude: 9.0765, longitude: 7.3986 },
	KANO: { latitude: 12.0022, longitude: 8.5920 },
	IBADAN: { latitude: 7.3775, longitude: 3.9470 },
	PORT_HARCOURT: { latitude: 4.8156, longitude: 7.0498 },
	BENIN_CITY: { latitude: 6.3350, longitude: 5.6037 },
	KADUNA: { latitude: 10.5222, longitude: 7.4383 },
	WARRI: { latitude: 5.5160, longitude: 5.7500 },
} as const;
