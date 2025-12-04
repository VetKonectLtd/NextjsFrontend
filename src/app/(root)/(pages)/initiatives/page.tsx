"use client";

import {
	AreaCoveredSection,
	ContactSection,
} from "@/components/aboutComponents";
import AfriVetChroniclesSection from "@/components/initaitiveComponents/AfriVetChroniclesSection";
import InitiativesHeroSection from "@/components/initaitiveComponents/InitiativesHeroSection";
import PartnershipSection from "@/components/initaitiveComponents/PartnershipSection";
import SupportsSection from "@/components/initaitiveComponents/SupportsSection";
import VetDiary from "@/components/initaitiveComponents/VetDiary";
import VetkonectChampionProgram from "@/components/initaitiveComponents/VetkonectChampionProgram";
import Vetkonectearning from "@/components/initaitiveComponents/Vetkonectearning";
import Wipi from "@/components/initaitiveComponents/Wipi";
import { Footer } from "@/components/shared";
import React from "react";

export default function InitiativesPage() {
	return (
		<div className=" bg-white overflow-hidden">
			<InitiativesHeroSection />

			<VetkonectChampionProgram />
			
			<Vetkonectearning />
			<VetDiary/>
			<AfriVetChroniclesSection/>
			<Wipi />
			{/* Contact Section */}
			<PartnershipSection/>
			<SupportsSection/>
			
			<ContactSection />

			{/* Footer */}
			<Footer />
		</div>
	);
}
