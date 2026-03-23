import {
    ContactSection,
} from "@/components/aboutComponents";
import { FoundationHero } from "@/components/foundation/FoundationHero";
import { AboutSection, FocusAreasSection, ImpactSection, MissionSection } from "@/components/foundation/FoundationSections";
import { Footer } from "@/components/shared";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Vet Konect Foundation | Empowering Animal Health & Communities",
    description:
        "The Vet Konect Foundation supports animal health, veterinary education, and community outreach programs across Africa through innovation, training, and impact-driven initiatives.",

    openGraph: {
        title: "Vet Konect Foundation",
        description:
            "Empowering animal health, veterinary education, and community outreach through the Vet Konect Foundation.",
        url: "https://vetkonect.com/foundation",
        siteName: "Vet Konect",
        images: [
            {
                url: "https://www.vetkonect.com/images/og-logo.png",
                width: 1200,
                height: 630,
                alt: "Vet Konect Foundation",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Vet Konect Foundation",
        description:
            "Supporting veterinary professionals, animal welfare, and community development through impactful initiatives.",
        images: [
            "https://www.vetkonect.com/images/og-logo.png",
        ],
    },

    alternates: {
        canonical: "https://vetkonect.com/foundation",
    },

    keywords: [
        "Vet Konect Foundation",
        "animal health foundation",
        "veterinary outreach Africa",
        "animal welfare initiatives",
        "veterinary education support",
        "Vet Konect charity",
    ],
};

export default function FoundationPage() {
    return (
        <div className=" bg-white overflow-hidden">
            <FoundationHero />
            <AboutSection/>
            <MissionSection/>
            <FocusAreasSection/>
            <ImpactSection/>
            <ContactSection />
            <Footer />
        </div>
    );
}
