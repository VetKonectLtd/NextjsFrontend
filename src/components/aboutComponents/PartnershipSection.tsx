"use client";

import Image from "next/image";
import * as Partners from "@/app/assets/partners";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const PartnershipSection = () => {
  const partnerImages = Object.values(Partners);

  const baseX = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const SPEED = 0.4;

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    baseX.current -= SPEED;
    containerRef.current.style.transform = `translateX(${baseX.current}px)`;

    const width = containerRef.current.scrollWidth / 2;
    if (Math.abs(baseX.current) >= width) {
      baseX.current = 0;
    }
  });

  return (
    <div className="w-full py-10 overflow-hidden bg-[#FFFAF4]">
      {/* Header */}
      <h2 className="md:text-4xl text-2xl font-extrabold text-center mb-8">
        Partnerships
      </h2>

      <div className="hidden md:flex py-5 justify-center gap-12 flex-wrap">
        {partnerImages.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Partner ${index}`}
            className="w-32 h-auto rounded-4xl object-contain"
          />
        ))}
      </div>

      {/* MOBILE VERSION — auto scrolling */}
      <div className="relative overflow-hidden w-full md:hidden">
        <motion.div
          ref={containerRef}
          className="flex gap-10"
          style={{ whiteSpace: "nowrap" }}
        >
          {[...partnerImages, ...partnerImages].map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Partner ${index}`}
              className="w-28 h-auto object-contain"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnershipSection;
