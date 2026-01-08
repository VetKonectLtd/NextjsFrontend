interface Location {
  latitude: number;
  longitude: number;
}

export function filterVetsByLocation<T extends { latitude?: any; longitude?: any }>(
  vets: T[],
  userLocation?: Location,
  radiusKm = 50
): T[] {
  if (!userLocation) return vets;

  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in KM

  return vets.filter((vet) => {
    const vetLat = Number(vet.latitude);
    const vetLng = Number(vet.longitude);

    if (
      Number.isNaN(vetLat) ||
      Number.isNaN(vetLng)
    ) {
      return false;
    }

    const dLat = toRad(vetLat - userLocation.latitude);
    const dLng = toRad(vetLng - userLocation.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(userLocation.latitude)) *
        Math.cos(toRad(vetLat)) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance <= radiusKm;
  });
}
