import { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";

const baseUrl = "https://www.vetkonect.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest insights on animal health, veterinary practice, and innovation in veterinary medicine. Read expert articles and stay updated with Vet Konect.",
  openGraph: {
    title: "Vet Konect Blog",
    description:
      "Latest insights on animal health, veterinary practice & innovation",
    type: "website",
    images: [{ url: `${baseUrl}/images/og-logo.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vet Konect Blog",
    description:
      "Latest insights on animal health, veterinary practice & innovation",
    images: [`${baseUrl}/images/og-logo.png`],
  },
};

export default async function BlogIndexPage() {
  return (
    <>
      <BlogIndexClient />
    </>
  );
}
