"use client";

import Image from "next/image";
import { Hero11, Mission1, Focus1, Focus2, Focus3, Focus4, Focus5, Impact1, Impact2 } from "@/app/assets/foundation";
import Link from "next/link";

/* ─── About Us ──────────────────────────────────────────────────────── */
export function AboutSection() {
    return (
        <section className="py-16 px-6 bg-[#FFFAF4]">
            <div className="md:w-5/6 mx-auto text-center">
                <h2
                    className="text-xl md:text-3xl font-bold text-gray-900 mb-6"
                >
                    About Us
                </h2>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed w-full">
                    Vetkonect  Animal Welfare & Sustainability Foundation is a nonprofit organization
                    committed to advancing the health and well-being of animals, humans, and the
                    community through evidence-based veterinary interventions, community
                    engagement, and policy advocacy. Recognizing the interconnectedness
                    of animal, human, and environmental health, the foundation adopts a
                    One Health approach to address critical challenges, including wildlife
                    conservation, climate change, animal welfare, antimicrobial resistance
                    (AMR) and the prevention of zoonotic diseases.
                </p>
            </div>
        </section>
    );
}

/* ─── Our Mission ────────────────────────────────────────────────────── */
export function MissionSection() {
    return (
        <section className="py-16 px-6 bg-white">
            <div className="md:max-w-6xl mx-auto">

                <h2 className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-10">
                    Our Mission
                </h2>

                <div className="grid md:grid-cols-2 gap-12 md:py-9  pb-20 items-center">

                    {/* Text */}
                    <div className="w-full">
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            Established to bridge the gap between veterinary expertise,
                            public health, and environmental sustainability, Vetkonect
                            Animal Welfare & Sustainability Foundation serves as a hub
                            for conservation, education, and advocacy.

                            By fostering collaboration among communities, governments,
                            academic institutions, and international organizations, the
                            foundation seeks to create a future where humans, animals,
                            and ecosystems thrive together.
                        </p>
                    </div>

                    {/* Images */}
                    <div className="relative h-80 w-full">

                        <div className="absolute top-0 right-10  w-56 h-72 rounded-2xl overflow-hidden shadow-xl z-10">
                            <Image
                                src={Mission1}
                                alt="Mission"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-20 md:left-36 w-56 h-72 rounded-2xl overflow-hidden shadow-xl z-20">
                            <Image
                                src={Hero11}
                                alt="Mission"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

/* ─── Key Focus Areas ────────────────────────────────────────────────── */
export function FocusAreasSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-[#FFFAF4]">
      <div className="max-w-6xl mx-auto md:pb-40 pb-7">

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
          Key Focus Areas
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">

          {/* 1 */}
          <FocusCard
            image={Mission1}
            title="Wildlife Conservation"
            className="lg:translate-y-2"
          />

          {/* 2 */}
          <FocusCard
            image={Focus1}
            title="Climate Change & Environmental Sustainability"
            className="lg:translate-y-12"
          />

          {/* 3 */}
          <FocusCard
            image={Focus2}
            title="Animal Welfare"
            className="lg:translate-y-2"
          />

          {/* 4 */}
          <FocusCard
            image={Focus5}
            title="Antimicrobial Resistance (AMR)"
            className="lg:translate-y-20"
          />

          {/* 5 */}
          <FocusCard
            image={Focus4}
            title="Zoonotic Disease Prevention (OHA)"
            className="lg:translate-y-12"
          />

          {/* 6 */}
          <FocusCard
            image={Focus3}
            title="Environment and Capacity Building"
            className="lg:translate-y-2"
          />

        </div>
      </div>
    </section>
  );
}


function FocusCard({ image, title, className }: any) {
  return (
    <div
      className={`group shadow-md bg-white rounded-lg flex flex-col items-center text-center overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="w-full h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <p className="font-semibold p-4 text-gray-800 leading-snug text-sm md:text-base">
        {title}
      </p>
    </div>
  );
}

/* ─── Our Impact ─────────────────────────────────────────────────────── */

export function ImpactSection() {
    return (
        <section className="bg-[#f8f5f0]" id="donate">
            <div className="w-full">
                <section>
                    <div className="relative w-full  overflow-hidden shadow-lg group h-screen">
                        <Image
                            src={Impact1}
                            alt="Benue Livestock Summit"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                        {/* "Our Impact" — top right */}
                        <span className="absolute bg-[#1d243242] py-2 w-full text-center top-4 text-white font-bold text-xl drop-shadow-md">
                            Our Impact
                        </span>

                        {/* "Benue Livestock Summit" — bottom right */}
                        <span className="absolute bottom-20 bg-[#1d243242] py-2 rounded-r-md right-4 text-white font-semibold text-xk drop-shadow-md">
                            Benue Livestock Summit
                        </span>
                    </div>

                </section>

                {/* Donate CTA */}
                <section className="relative mt-2 h-screen w-full overflow-hidden">

                    {/* Background Image */}
                    <Image
                        src={Impact2}
                        alt="Community outreach"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col bg-black/40 h-full  items-center justify-center my-auto p-6 py-5 text-center px-6">
                        
                            <p className="text-white font-bold text-sm md:text-base mb-7 max-w-2xl">
                                An Outreach carried out at Maiduguri state to sensitize farmers, butchers on
                                zoonotic diseases like Brucellosis.
                            </p>

                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] font-bold px-8 py-3 rounded-full hover:bg-[#d8f3dc] transition-all shadow-lg"
                            >
                                Donate Now
                            </Link>
                    </div>

                </section>
            </div>
        </section>
    );
}
