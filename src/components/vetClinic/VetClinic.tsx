"use client";

import { useState } from "react";
import { Vet1, Vet2, Vet3, Vet4 } from "@/app/assets/images";
import SelectedVet from "../Veterinarian/SelectedVetDetail";
import ClinicProfile, { ClinicProfileProps } from "../shared/ClinicProfile";
import SelectedClinic from "./SelectedClinic";

const sampleClinics: ClinicProfileProps[] = [
    {
        id: "1",
        name: "Sumace Clinic",
        location: "Delta, Nigeria",
        image: Vet1,
        rating: 4.5,
        totalRatings: 5,
        isAvailable: true,
        isVerified: true,
    },
    {
        id: "2",
        name: "Farmtop Clinic",
        location: "Lagos, Nigeria",
        image: Vet2,
        rating: 4.7,
        totalRatings: 5,
        isAvailable: false,
        isVerified: true,
    },
    {
        id: "3",
        name: "Base Mate Clinic",
        location: "Abuja, Nigeria",
        image: Vet3,
        rating: 0.0,
        totalRatings: 5,
        isAvailable: true,
        isVerified: false,
    },
    {
        id: "4",
        name: "Pet Kare Clinic",
        location: "Lagos, Nigeria",
        image: Vet4,
        rating: 4.2,
        totalRatings: 5,
        isAvailable: true,
        isVerified: true,
    },
];

interface VetClinicProps {
    clinics?: ClinicProfileProps[];
}

const VetClinic: React.FC<VetClinicProps> = ({ clinics = sampleClinics }) => {
    const [selectedClinic, setSelectedClinic] = useState<ClinicProfileProps | null>(null);
    const [selectedAction, setSelectedAction] = useState<string>("default");

    const handleViewProfile = (id: string) => {
        const clinic = clinics.find((v) => v.id === id) || null;
        setSelectedClinic(clinic);
    };

    const handleContact = (
        id: string,
        type: "phone" | "message" | "mail" | "location" | "share" | "rate",
    ) => {
        console.log("Contact vet:", id, "via:", type);
        setSelectedAction(type);
    };

    return (
        <section
            className={`grid gap-6 mt-3 transition-all duration-300 
        ${selectedClinic ? "lg:grid-cols-4" : "lg:grid-cols-4"}`}
        >
            <div
                className={`transition-all duration-300 
          ${selectedClinic ? "lg:col-span-2 md:block hidden" : "lg:col-span-4"}`}
            >
                <div
                    className={`grid mt-3 md:gap-6 gap-3
            ${selectedClinic ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}
                >
                    {clinics.map((clinic) => (
                        <ClinicProfile
                            key={clinic.id}
                            {...clinic}
                            onViewProfile={handleViewProfile}
                            onContact={handleContact}
                        />
                    ))}
                </div>
            </div>

                <SelectedClinic
                    handleContact={handleContact}
                    selectedClinic={selectedClinic}
                    selectedAction={selectedAction}
                    setSelectedClinic={setSelectedClinic}
                />
        
        </section>
    );
};

export default VetClinic;
