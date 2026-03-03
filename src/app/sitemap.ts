import { MetadataRoute } from "next";

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
	return [
		{
			url: "https://nextjs-frontend-beta-drab.vercel.app/",
			lastModified: new Date(),
		},
		{
			url: "https://nextjs-frontend-beta-drab.vercel.app/blog",
			lastModified: new Date(),
		},
		{
			url: "https://nextjs-frontend-beta-drab.vercel.app/forum",
			lastModified: new Date(),
		},
		// Add more static routes as needed
	];
}
