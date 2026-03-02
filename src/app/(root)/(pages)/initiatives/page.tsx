"use client";

import {
	AreaCoveredSection,
	ContactSection,
} from "@/components/aboutComponents";
import AfriVetChroniclesSection from "@/components/initaitiveComponents/AfriVetChroniclesSection";
import InitiativesHeroSection from "@/components/initaitiveComponents/InitiativesHeroSection";
import VetDiary from "@/components/initaitiveComponents/VetDiary";
import VetkonectChampionProgram from "@/components/initaitiveComponents/VetkonectChampionProgram";
import Vetkonectearning from "@/components/initaitiveComponents/Vetkonectearning";
import Wipi from "@/components/initaitiveComponents/Wipi";
import { Footer } from "@/components/shared";

export default function InitiativesPage() {
	return (
		<div className=" bg-white overflow-hidden">
			<InitiativesHeroSection />

			<VetkonectChampionProgram />
			
			<Vetkonectearning />
			<VetDiary/>
			<Wipi />
			<AfriVetChroniclesSection/>
			{/* Contact Section */}
			
			
			<ContactSection />

			{/* Footer */}
			<Footer />
		</div>
	);
}
