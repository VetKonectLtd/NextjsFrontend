import { Metadata } from "next";
import ClinicListingClient from "./ClinicListingClient";

export const metadata: Metadata = {
  title: {
    absolute: "Clinic Listing", // Overrides the template
  },
  description:
    "Add your veterinary clinic to Vet Konect and connect with pet owners in your area. Join our network of trusted veterinary professionals today.",
  openGraph: {
    title: "Clinic Listing | Vet Konect",
    description:
      "Add your veterinary clinic to Vet Konect and connect with pet owners in your area.",
    url: "https://www.vetkonect.com/vet-clinic-form",
    siteName: "Vet Konect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vet Konect Clinic Listing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinic Listing | Vet Konect",
    description:
      "Add your veterinary clinic to Vet Konect and connect with pet owners in your area.",
    images: ["/og-image.png"],
    creator: "@vetkonect",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vetkonect.com/vet-clinic-form",
  },
  keywords: [
    "veterinary clinic",
    "vet clinic listing",
    "add vet clinic",
    "veterinary network",
    "pet care",
    "vet konect",
  ],
  authors: [{ name: "Vet Konect" }],
  category: "veterinary",
};

export default function VetClinicForm() {
  return <ClinicListingClient />;
}
