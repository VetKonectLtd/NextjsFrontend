import { Metadata } from "next";
import CustomerSupportClient from "./CustomerSupportClient";

export const metadata: Metadata = {
	title: "Customer Support | Vet Konect",
	description: "Get in touch with our support team for assistance with veterinary services, pet care, or any questions about Vet Konect.",
	openGraph: {
		title: "Customer Support | Vet Konect",
		description: "Need help? Contact our support team for assistance with veterinary services, pet care, or any questions about Vet Konect.",
		type: 'website',
		url: 'https://nextjs-frontend-beta-drab.vercel.app/support',
		images: ['/og-support.jpg'], 
	},
	twitter: {
		card: 'summary_large_image',
		title: "Customer Support | Vet Konect",
		description: "Get in touch with our support team for assistance.",
		images: ['/twitter-support.jpg'],
	},
	alternates: {
		canonical: 'https://nextjs-frontend-beta-drab.vercel.app/support',
	},
	keywords: ['veterinary support', 'customer service', 'vet konect help', 'animal care assistance', 'veterinary clinic support'],
};

// Add JSON-LD structured data for better SEO
export default async function SupportPage() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		'name': 'Vet Konect Customer Support',
		'description': 'Contact our support team for assistance with veterinary services and pet care.',
		'url': 'https://nextjs-frontend-beta-drab.vercel.app/support',
		'mainEntity': {
			'@type': 'Organization',
			'name': 'Vet Konect',
			'address': {
				'@type': 'PostalAddress',
				'streetAddress': 'No. 20, Tony Ijohor way, Off Ugbokolo Street, 7th Avenue, High Level',
				'addressLocality': 'Makurdi',
				'addressRegion': 'Benue',
				'addressCountry': 'NG'
			},
			'email': 'admin@vetkonect.com',
			'telephone': '+2347078340106',
			'contactPoint': {
				'@type': 'ContactPoint',
				'telephone': '+2347078340106',
				'contactType': 'customer support',
				'availableLanguage': ['English']
			}
		}
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<CustomerSupportClient />
		</>
	);
}