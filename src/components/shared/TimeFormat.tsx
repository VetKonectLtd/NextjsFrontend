export function timeAgo(dateString: string) {
	const createdAt = new Date(dateString);
	if (isNaN(createdAt.getTime())) return "Invalid date";

	const now = new Date();
	const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

	if (diff < 5) return "Just now";
	if (diff < 60) return `${diff} sec${diff !== 1 ? "s" : ""} ago`;

	if (diff < 3600) {
		const mins = Math.floor(diff / 60);
		return `${mins} min${mins !== 1 ? "s" : ""} ago`;
	}

	if (diff < 86400) {
		const hours = Math.floor(diff / 3600);
		return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
	}

	const days = Math.floor(diff / 86400);
	return `${days} day${days !== 1 ? "s" : ""} ago`;
}

export const formatRole = (role: string) => {
	const map: Record<string, string> = {
		veterinary_paraprofessional: "Veterinary Paraprofessional",
		pet_owner: "Pet Owner",
		vendor: "Vendor",
		livestock_farmer: "Livestock Farmer",
		veterinary_doctor: "Veterinary Doctor",
		veterinary_clinic: "Veterinary Clinic",
		other: "Basic user",
	};

	return map[role] || role;
};
