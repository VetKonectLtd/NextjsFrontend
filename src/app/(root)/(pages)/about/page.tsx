import {
  AboutSection,
  OurValuesSection,
  AreaCoveredSection,
  TeamMembersSection,
  ContactSection,
} from "@/components/aboutComponents";
import AdvisoryAndActivities from "@/components/aboutComponents/AdvisoryAndActivities";
import PartnershipSection from "@/components/aboutComponents/PartnershipSection";
import SupportsSection from "@/components/aboutComponents/SupportsSection";
import { Footer } from "@/components/shared";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our organization and our mission.",
  openGraph: {
    title: "About Us | Vet Konect",
    description: "Learn more about our organization and our mission.",
    url: "https://vetkonect.com/about",
    images: [{ url: "https://www.vetkonect.com/images/og-logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Vet Konect",
    description: "Learn more about our organization and our mission.",
    images: [`https://www.vetkonect.com/images/og-logo.png`],
  },
};

export default function AboutPage() {
  return (
    <div className=" bg-white overflow-hidden">
      {/* About Section */}
      <AboutSection />

      {/* Our Values Section */}
      <OurValuesSection />

      {/* Area Covered Section */}
      <AreaCoveredSection title="Area Covered on Map" />

      {/* Team Members Section */}
      <TeamMembersSection />

      <AdvisoryAndActivities />

      <PartnershipSection />
      <SupportsSection />

      {/* Contact Section */}

      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
