"use client";

import Image from "next/image";
import { Hero11, Mission1, Focus1, Focus2, Focus3, Focus4, Focus5, Impact1, Impact2 } from "@/app/assets/foundation";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── About Us ──────────────────────────────────────────────────────── */
export function AboutSection() {
    return (
        <motion.section
            className="py-16 px-6 bg-[#FFFAF4]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            <div className="md:w-5/6 mx-auto text-center">
                <motion.h2
                    className="text-xl md:text-3xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    About Us
                </motion.h2>

                <motion.p
                    className="text-gray-600 text-base md:text-lg leading-relaxed w-full"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
                >
                    Vetkonect  Animal Welfare & Sustainability Foundation is a nonprofit organization
                    committed to advancing the health and well-being of animals, humans, and the
                    community through evidence-based veterinary interventions, community
                    engagement, and policy advocacy. Recognizing the interconnectedness
                    of animal, human, and environmental health, the foundation adopts a
                    One Health approach to address critical challenges, including wildlife
                    conservation, climate change, animal welfare, antimicrobial resistance
                    (AMR) and the prevention of zoonotic diseases.
                </motion.p>
            </div>
        </motion.section>
    );
}

/* ─── Our Mission ────────────────────────────────────────────────────── */
export function MissionSection() {
    return (
        <motion.section
            className="py-16 px-6 bg-white"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
        >
            <div className="md:max-w-6xl mx-auto">

                <motion.h2
                    className="text-xl md:text-3xl font-bold text-center text-gray-900 mb-10"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Our Mission
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 md:py-9  pb-20 items-center">

                    {/* Text */}
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    >
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
                    </motion.div>

                    {/* Images */}
                    <motion.div
                        className="relative h-80 w-full"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.75, ease: "easeOut", delay: 0.2 }}
                    >

                        <motion.div
                            className="absolute top-0 right-10  w-56 h-72 rounded-2xl overflow-hidden shadow-xl z-10"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                        >
                            <Image
                                src={Mission1}
                                alt="Mission"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-20 md:left-36 w-56 h-72 rounded-2xl overflow-hidden shadow-xl z-20"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                        >
                            <Image
                                src={Hero11}
                                alt="Mission"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                    </motion.div>

                </div>

            </div>
        </motion.section>
    );
}

/* ─── Key Focus Areas ────────────────────────────────────────────────── */
const focusItems = [
  { image: Mission1, title: "Wildlife Conservation",                    className: "lg:translate-y-2" },
  { image: Focus1,   title: "Climate Change & Environmental Sustainability", className: "lg:translate-y-12" },
  { image: Focus2,   title: "Animal Welfare",                           className: "lg:translate-y-2" },
  { image: Focus5,   title: "Antimicrobial Resistance (AMR)",           className: "lg:translate-y-20" },
  { image: Focus4,   title: "Zoonotic Disease Prevention (OHA)",        className: "lg:translate-y-12" },
  { image: Focus3,   title: "Environment and Capacity Building",        className: "lg:translate-y-2" },
];

export function FocusAreasSection() {
  return (
    <motion.section
      className="py-16 md:py-20 px-4 md:px-6 bg-[#FFFAF4]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto md:pb-40 pb-7">

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Key Focus Areas
        </motion.h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {focusItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.35), ease: "easeOut" }}
            >
              <FocusCard
                image={item.image}
                title={item.title}
                className={item.className}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
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
                        <motion.span
                            className="absolute bg-[#1d243242] py-2 w-full text-center top-4 text-white font-bold text-xl drop-shadow-md"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            Our Impact
                        </motion.span>

                        {/* "Benue Livestock Summit" — bottom right */}
                        <motion.span
                            className="absolute bottom-20 bg-[#1d243242] py-2 rounded-r-md right-4 text-white font-semibold text-xk drop-shadow-md"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        >
                            Benue Livestock Summit
                        </motion.span>
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

                        <motion.p
                            className="text-white font-bold text-sm md:text-base mb-7 max-w-2xl"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                        >
                            An Outreach carried out at Maiduguri state to sensitize farmers, butchers on
                            zoonotic diseases like Brucellosis.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        >
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] font-bold px-8 py-3 rounded-full hover:bg-[#d8f3dc] transition-all shadow-lg"
                            >
                                Donate Now
                            </Link>
                        </motion.div>
                    </div>

                </section>
            </div>
        </section>
    );
}
