"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { useSubscriptionService } from "@/services/subsciptionService";

const plans = [
  {
    name: "Basic Farm Care Plan",
    price: "₦3,000",
    period: "Monthly",
    features: [
      "4 professional vet tele-medicine consultations per month",
      "Weekly farm health and management tips",
      "Priority matching for animal health professions",
      "24/7 Customer Support",
    ],
  },
  {
    name: "Essential Pet Care Plan",
    price: "₦2,000",
    period: "Monthly",
    features: [
      "2 tele-vet consultations per month (including video consultation)",
      "Vaccination and deworming reminders",
      "Feeding guides (local and affordable options)",
      "Guided prescriptions",
      "24/7 emergency triage via WhatsApp",
    ],
  }
];

export default function PricingCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const {useGetUserSubscription}= useSubscriptionService();

  const {data:subscriptionPlan }  = useGetUserSubscription( true);

  console.log((subscriptionPlan as any)?.subscriptions.data);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % plans.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  return (
    <div className="max-w-7xl pt-28 mx-auto min-h-screen flex flex-col items-center justify-between py-6">
      
      {/* TOP PLUS / MINUS */}
      <div className="flex items-center gap-4 bg-white shadow-sm rounded-full px-4 py-2">
        <button
          onClick={prev}
          className="p-1 rounded-full bg-gray-100"
        >
          <Minus size={16} />
        </button>

        <span className="text-sm font-medium">Monthly (1)</span>

        <button
          onClick={next}
          className="p-1 rounded-full bg-gray-100"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* CARD */}
      <div className="relative w-full max-w-sm overflow-hidden mt-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <PlanCard plan={plans[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM ARROWS */}
      <div className="flex items-center gap-6 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="w-10 h-10 flex items-center justify-center rounded-full border"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function PlanCard({ plan }: any) {
  return (
    <div className="border-2 border-primary-400 rounded-2xl p-6 bg-white">
      <h3 className="text-lg font-semibold">{plan.name}</h3>
      <p className="text-sm text-gray-500">{plan.period} Price</p>

      <p className="text-3xl font-bold my-4">{plan.price}</p>

      <ul className="space-y-2">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <div className="bg-gray-200 rounded-full p-2">

            <Check className="text-primary-400" size={16} />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <button className="mt-6 w-full bg-primary-400 text-white py-2 rounded-lg">
        SELECT PLAN
      </button>
    </div>
  );
}
