import { useState, useEffect } from 'react';

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface UseGeolocationReturn {
	coordinates: Coordinates | null;
	loading: boolean;
	error: string | null;
}

/**
 * Simple hook to get user's current location coordinates
 * @returns Current location coordinates, loading state, and error
 */
export const useGeolocation = (): UseGeolocationReturn => {
	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		console.log('🌍 useGeolocation: Hook initialized, checking for geolocation support...');
		
		// Check if geolocation is supported
		if (!navigator.geolocation) {
			console.error('❌ useGeolocation: Geolocation is not supported by this browser');
			setError('Geolocation is not supported by this browser');
			return;
		}

		console.log('✅ useGeolocation: Geolocation is supported, requesting location...');
		setLoading(true);
		setError(null);

		// Get current position
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log('📍 useGeolocation: Location successfully obtained!');
				console.log('📊 useGeolocation: Coordinates:', {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					timestamp: new Date(position.timestamp).toLocaleString()
				});
				
				setCoordinates({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				setLoading(false);
				
				console.log('✅ useGeolocation: Location state updated successfully');
			},
			(error) => {
				console.error('❌ useGeolocation: Failed to get location');
				console.error('🔍 useGeolocation: Error details:', {
					code: error.code,
					message: error.message,
					timestamp: new Date().toLocaleString()
				});
				
				let errorMessage = 'Failed to get location';
				
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage = 'Location access denied by user';
						console.warn('🚫 useGeolocation: User denied location permission');
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = 'Location information unavailable';
						console.warn('📡 useGeolocation: Location information unavailable');
						break;
					case error.TIMEOUT:
						errorMessage = 'Location request timed out';
						console.warn('⏰ useGeolocation: Location request timed out');
						break;
				}
				
				setError(errorMessage);
				setLoading(false);
				
				console.log('💥 useGeolocation: Error state updated');
			},
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 60000,
			}
		);
		
		console.log('⏳ useGeolocation: Location request sent, waiting for response...');
	}, []);

	return {
		coordinates,
		loading,
		error,
	};
};
