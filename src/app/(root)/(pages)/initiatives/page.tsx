"use client";

import {
	AreaCoveredSection,
	ContactSection,
} from "@/components/aboutComponents";
import AdvisoryAndActivities from "@/components/aboutComponents/AdvisoryAndActivities";
import AfriVetChroniclesSection from "@/components/initaitiveComponents/AfriVetChroniclesSection";
import InitiativesHeroSection from "@/components/initaitiveComponents/InitiativesHeroSection";
import VetDiary from "@/components/initaitiveComponents/VetDiary";
import VetkonectChampionProgram from "@/components/initaitiveComponents/VetkonectChampionProgram";
import Vetkonectearning from "@/components/initaitiveComponents/Vetkonectearning";
import { Footer } from "@/components/shared";
import React from "react";

export default function InitiativesPage() {
	return (
		<div className=" bg-white overflow-hidden">
			<InitiativesHeroSection />

			<VetkonectChampionProgram />

			<AreaCoveredSection title="Partnership & Support" />
			<Vetkonectearning />
			<VetDiary/>
			<AfriVetChroniclesSection />
			{/* Contact Section */}
			<ContactSection />

			{/* Footer */}
			<Footer />
		</div>
	);
}
