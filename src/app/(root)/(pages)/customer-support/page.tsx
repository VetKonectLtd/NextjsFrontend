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
		images: [{ url: "https://nextjs-frontend-beta-drab.vercel.app/images/og-logo.png" }],
	},
	twitter: {
		card: 'summary_large_image',
		title: "Customer Support | Vet Konect",
		description: "Get in touch with our support team for assistance.",
		images: [`https://nextjs-frontend-beta-drab.vercel.app/images/og-logo.png`],
	},
	alternates: {
		canonical: 'https://nextjs-frontend-beta-drab.vercel.app/support',
	},
	keywords: ['veterinary support', 'customer service', 'vet konect help', 'animal care assistance', 'veterinary clinic support'],
};


export default async function SupportPage() {


	return (
		<>
			<CustomerSupportClient />
		</>
	);
}