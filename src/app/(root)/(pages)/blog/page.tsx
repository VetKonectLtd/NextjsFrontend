import { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
	title: "Blog | Vet Konect",
	description: "Latest insights on animal health, veterinary practice, and innovation in veterinary medicine. Read expert articles and stay updated with Vet Konect.",
	openGraph: {
		title: "Vet Konect Blog",
		description: "Latest insights on animal health, veterinary practice & innovation",
		type: 'website',
		images: ['/og-blog.jpg'], 
	},
	twitter: {
		card: 'summary_large_image',
		title: "Vet Konect Blog",
		description: "Latest insights on animal health, veterinary practice & innovation",
		images: ['/twitter-blog.jpg'],
	},
	alternates: {
		canonical: 'https://nextjs-frontend-beta-drab.vercel.app/blog',
	},
};


export default async function BlogIndexPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		'name': 'Vet Konect Blog',
		'description': 'Latest insights on animal health, veterinary practice & innovation',
		'url': 'https://nextjs-frontend-beta-drab.vercel.app/blog',
		'publisher': {
			'@type': 'Organization',
			'name': 'Vet Konect',
			'logo': {
				'@type': 'ImageObject',
				'url': 'https://nextjs-frontend-beta-drab.vercel.app/logo.png'
			}
		}
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<BlogIndexClient />
		</>
	);
}