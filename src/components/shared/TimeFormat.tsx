export function timeAgo(dateString: string) {
	const createdAt = new Date(dateString);
	const now = new Date();
	const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

	if (diff < 60) return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
	if (diff < 3600)
		return `${Math.floor(diff / 60)} min${diff / 60 > 1 ? "s" : ""} ago`;
	if (diff < 86400)
		return `${Math.floor(diff / 3600)} hour${diff / 3600 > 1 ? "s" : ""} ago`;
	return `${Math.floor(diff / 86400)} day${diff / 86400 > 1 ? "s" : ""} ago`;
}