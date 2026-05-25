"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { Bot, Learning1, Learning2, Learning3 } from "@/app/assets/images";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const Vetkonectearning = () => {
  return (
    <motion.section
      className="relative bg-[#FEF4EE] min-h-[90vh] py-20 px-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left text section */}
      <motion.h1
        className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-7 leading-snug"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        Vet konect Early Learning <br /> & <br /> Warning System
      </motion.h1>
      <div className="flex flex-col md:flex-row items-center justify-between md:w-4/5 w-11/12 m-auto gap-10">
        <motion.div
          className="md:w-1/2 w-full text-left"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <motion.p
            className="mt-6 text-gray-700 text-base md:text-xl leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vet Konect’s Early Learning & Warning System uses real-time data and
            AI to track livestock health and predict outbreaks before they
            spread. With alerts reaching 120,000+ farmers, communities can take
            quick action against zoonotic and transboundary diseases. The system
            also shares easy-to-use guidelines, best practices, and
            training—strengthening early-warning networks and improving
            preparedness across the livestock sector.
          </motion.p>
        </motion.div>

        {/* Swiper carousel */}
        <motion.div
          className="relative w-full md:w-1/2"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.25 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            className="rounded-xl overflow-hidden shadow-md"
          >
            <SwiperSlide>
              <Image
                src={Learning1}
                alt="Vet konect students"
                width={500}
                height={350}
                className="object-cover w-full h-[300px] md:h-[350px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={Learning2}
                alt="Vet konect field work"
                width={500}
                height={350}
                className="object-cover w-full h-[300px] md:h-[350px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={Learning3}
                alt="Vet konect field work"
                width={500}
                height={350}
                className="object-contain bg-white w-full h-[300px] md:h-[350px]"
              />
            </SwiperSlide>
          </Swiper>

          {/* Static ₦1500 / USSD Tag */}
          <motion.div
            className="absolute z-20 top-3 -right-10 flex gap-2 items-center bg-white shadow-sm px-4 py-1 rounded-lg border text-sm font-semibold text-gray-700"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            <div className="h-3 w-3 rounded-full bg-green-700"></div> USSD
          </motion.div>
        </motion.div>
      </div>

      {/* Static bot image at the bottom */}
      <motion.div
        className="absolute z-20 bottom-12 left-10 md:left-[52%] transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.45 }}
      >
        <Image
          src={Bot}
          alt="Bot Icon"
          width={80}
          height={80}
          className="mx-auto"
        />
      </motion.div>
    </motion.section>
  );
};

export default Vetkonectearning;
