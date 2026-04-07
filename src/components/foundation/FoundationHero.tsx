"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { X, Heart, Users, Phone, Mail } from "lucide-react";
import { Focus3, Hero11, Hero12, Hero13 } from "@/app/assets/foundation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    { image: Hero11 },
    { image: Focus3 },
    { image: Hero13 },
];

const SPONSOR_TYPES = [
    "Gold Sponsor",
    "Silver Sponsor",
    "Bronze Sponsor",
    "Community Partner",
    "In-Kind Donor",
    "Individual Supporter",
];

type PartnerFormValues = {
    fullName: string;
    email: string;
    contact: string;
    sponsorshipType: string;
    description: string;
};

export function FoundationHero() {
    const [current, setCurrent] = useState(0);
    const [partnerOpen, setPartnerOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [donateOpen, setDonateOpen] = useState(false);

    /* ---------------- React Hook Form ---------------- */
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PartnerFormValues>();

    /* ---------------- Carousel Logic ---------------- */
    const next = useCallback(
        () => setCurrent((c) => (c + 1) % slides.length),
        []
    );

    const prev = () =>
        setCurrent((c) => (c - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    /* ---------------- Submit Handler ---------------- */
    const onSubmit = async (data: PartnerFormValues) => {
        try {
            console.log("Form Data:", data);

            // simulate API request
            await new Promise((r) => setTimeout(r, 1500));

            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
                setPartnerOpen(false);
                reset();
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* ================= HERO ================= */}
            <section className="relative w-full mt-20 h-[85vh] min-h-[520px] overflow-hidden">

                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: i === current ? 1 : 0 }}
                    >
                        <Image
                            src={slide.image}
                            alt="foundation hero"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
                    </div>
                ))}

                {/* CTA */}
                <div className="absolute inset-0 pt-32 flex items-center justify-center z-10">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <button
                            onClick={() => setDonateOpen(true)}
                            className="inline-flex items-center gap-2 bg-primary-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition"
                        >
                            <Heart className="h-4 w-4" />
                            Donate Now
                        </button>

                        <button
                            onClick={() => setPartnerOpen(true)}
                            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-8 py-3 rounded-full border border-white/40 hover:bg-white/25 transition"
                        >
                            <Users className="h-4 w-4" />
                            Partner With Us
                        </button>
                    </div>
                </div>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`rounded-full transition-all ${i === current
                                ? "bg-white w-6 h-2"
                                : "bg-white/40 w-2 h-2"
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* ================= PARTNER MODAL ================= */}
            <AnimatePresence>
            {partnerOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setPartnerOpen(false)}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10"
                        initial={{ opacity: 0, x: 60, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 60, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {/* Header */}
                        <div className="bg-primary-400 rounded-t-2xl px-6 py-5 flex justify-between items-start">
                            <div>
                                <h2 className="text-white font-bold text-xl">Partner With Us</h2>
                                <p className="text-white/70 text-sm">Join our mission for animal welfare</p>
                            </div>
                            <button onClick={() => setPartnerOpen(false)} className="text-white/70 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className="p-6 space-y-4">
                            <p className="text-gray-500 text-sm text-center">
                                Reach out to us directly via any of the channels below and we'll get back to you.
                            </p>

                            {/* Phone */}
                            <Link
                                href="tel:+2348012345678"
                                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-400/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="h-5 w-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Phone Number</p>
                                    <p className="text-gray-900 font-semibold">+234 806 645 9317</p>
                                    <p className="text-gray-900 font-semibold">+234 802 247 4738</p>
                                </div>
                            </Link>

                            {/* Email */}
                            <Link
                                href="mailto:partner@foundation.org"
                                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-400/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="h-5 w-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                                    <p className="text-gray-900 font-semibold">Vetkonectfoundation@gmail.com</p>
                                </div>
                            </Link>

                            <button
                                onClick={() => setPartnerOpen(false)}
                                className="w-full mt-2 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            <AnimatePresence>
            {donateOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setDonateOpen(false)}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10"
                        initial={{ opacity: 0, x: -60, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -60, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {/* Header */}
                        <div className="bg-primary-400 rounded-t-2xl px-6 py-5 flex justify-between items-start">
                            <div>
                                <h2 className="text-white font-bold text-xl">Donate Now</h2>
                                <p className="text-white/70 text-sm">
                                    Your support changes lives
                                </p>
                            </div>
                            <button
                                onClick={() => setDonateOpen(false)}
                                className="text-white/70 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Bank Details */}
                        <div className="p-6 space-y-4">
                            <p className="text-gray-500 text-sm text-center">
                                Make a transfer to any of the accounts below and help us continue our mission for animal welfare.
                            </p>

                            {/* Account 1 */}
                            <div className="p-4 rounded-xl border border-gray-200 space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8 rounded-full bg-primary-400/10 flex items-center justify-center flex-shrink-0">
                                        <Heart className="h-4 w-4 text-primary-400" />
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">First Bank</p>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-sm">
                                    <p className="text-gray-400">Account Name</p>
                                    <p className="text-gray-900 font-medium">Vetkonect Foundation</p>
                                    <p className="text-gray-400">Account Number</p>
                                    <p className="text-gray-900 font-medium tracking-wider">1234567890</p>
                                </div>
                            </div>

                            {/* Account 2 */}
                            <div className="p-4 rounded-xl border border-gray-200 space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-8 h-8 rounded-full bg-primary-400/10 flex items-center justify-center flex-shrink-0">
                                        <Heart className="h-4 w-4 text-primary-400" />
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">GTBank</p>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-sm">
                                    <p className="text-gray-400">Account Name</p>
                                    <p className="text-gray-900 font-medium">Vetkonect Foundation</p>
                                    <p className="text-gray-400">Account Number</p>
                                    <p className="text-gray-900 font-medium tracking-wider">0987654321</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setDonateOpen(false)}
                                className="w-full mt-2 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* {partnerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setPartnerOpen(false)}
                    /> */}



            {/* <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto z-10"> */}
            {/* Header */}
            {/* <div className="bg-primary-400 rounded-t-2xl px-6 py-5 flex justify-between">
                            <div>
                                <h2 className="text-white font-bold text-xl">
                                    Partner With Us
                                </h2>
                                <p className="text-white/70 text-sm">
                                    Join our mission for animal welfare
                                </p>
                            </div>

                            <button
                                onClick={() => setPartnerOpen(false)}
                                className="text-white/70 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div> */}

            {/* {submitted ? (
                            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <Heart className="h-8 w-8 text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold">
                                    Thank You!
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Your partnership request has been received.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="p-6 space-y-4"
                            > */}
            {/* Full Name */}
            {/* <InputField
                                    label="Full Name"
                                    error={errors.fullName?.message}
                                    inputProps={register("fullName", {
                                        required: "Full name is required",
                                    })}
                                /> */}

            {/* Email */}
            {/* <InputField
                                    label="Email"
                                    type="email"
                                    error={errors.email?.message}
                                    inputProps={register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                /> */}

            {/* Contact */}
            {/* <InputField
                                    label="Contact"
                                    error={errors.contact?.message}
                                    inputProps={register("contact", {
                                        required: "Contact is required",
                                    })}
                                /> */}

            {/* Sponsorship */}
            {/* <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Type of Sponsorship
                                    </label>

                                    <select
                                        {...register("sponsorshipType", {
                                            required:
                                                "Please select sponsorship type",
                                        })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm"
                                    >
                                        <option value="">Select type...</option>
                                        {SPONSOR_TYPES.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.sponsorshipType && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {
                                                errors.sponsorshipType
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div> */}

            {/* Description */}
            {/* <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        {...register("description")}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none"
                                    />
                                </div> */}

            {/* Submit */}
            {/* <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary-400 text-white font-semibold py-3 rounded-lg flex justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </form>
                        )}
                    </div> */}
            {/* </div> */}
            {/* )} */}
        </>
    );
}

/* ================= Reusable Input ================= */

function InputField({
    label,
    type = "text",
    error,
    inputProps,
}: any) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>

            <input
                type={type}
                {...inputProps}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2d6a4f]/30"
            />

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
}