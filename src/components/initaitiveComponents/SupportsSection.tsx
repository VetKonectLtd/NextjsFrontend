"use client";

import Image from "next/image";
import * as Supports from "@/app/assets/support"; 
import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const SupportsSection = () => {
  const sponsorImages = Object.values(Supports);
  const baseX = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const SPEED = 0.5; 


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
    <div className="w-full py-10 overflow-hidden">
      <h2 className="md:text-4xl text-2xl font-extrabold text-center mb-8">Support</h2>

      <div className="relative py-9 overflow-hidden w-full">
        <motion.div
          ref={containerRef}
          className="flex gap-10"
          style={{ whiteSpace: "nowrap" }}
        >
          {[...sponsorImages, ...sponsorImages].map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Sponsor ${index}`}
              className="w-32 h-auto object-contain"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SupportsSection;
