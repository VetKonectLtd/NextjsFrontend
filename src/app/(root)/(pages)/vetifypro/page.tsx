"use client";
import {
    Animals,
    Vetify1,
    Vetify2,
    Vetify3,
    Vetify4,
    VetifyFamily,
    VetifyLogo,
    VetifyProBg,
    VetifyVector,
} from "@/app/assets/images";
import { Footer } from "@/components/shared";
import SubscriptionModal from "@/components/vetifyPro/SubscriptionModal";
import { useSubscriptionService } from "@/services/subsciptionService";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const animations = `
  @keyframes fadeInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInFromRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInFromBottom {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-left {
    animation: fadeInFromLeft 0.8s ease-out;
  }

  .animate-fade-in-right {
    animation: fadeInFromRight 0.8s ease-out;
  }

  .animate-fade-in-bottom {
    animation: fadeInFromBottom 0.8s ease-out;
  }
`;

/* ─── Feature cards data ───────────────────────────────────────── */
const FEATURES = [
    {
        title: "Speech-to-Text Scribe",
        body: "Captures the full two-way consultation, transcribes only what is clinically relevant, and automatically generates structured SOAP notes in real time.",
    },
    {
        title: "Real-Time Clinical Support",
        body: "Receive real-time, evidence-based recommendations on differentials, diagnostics, and treatment plans that update as you add more findings.",
    },
    {
        title: "Instant Pet-Owner Summaries",
        body: "Clinical notes are automatically transformed into clear, plain-language owner summaries, ready to review and share in one click.",
    },
    {
        title: "AI-Chat for On-the-Spot Queries",
        body: "Need specific guidance mid-consult? Ask targeted questions, refine recommendations, or explore alternative clinical pathways.",
    },
];

/* ─── Page body ────────────────────────────────────────────────── */
export default function VetifyProPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { useInitiateSubscription } =
        useSubscriptionService();
    const subscriptionMutation = useInitiateSubscription();


    const handleConfirmSubscription = () => {
        subscriptionMutation.mutate(
            { subscription_beta_id: 13 },
            {
                onSuccess: (data: any) => {
                    if (data?.authorization_url) {
                        window.location.href = data.authorization_url;
                    }
                    setIsModalOpen(false);
                    setIsLoading(true);
                },
            },
        );
    };


    const handleSubscribeClick = () => {
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <style>{animations}</style>
            <main className="font-[family-name:var(--font-plus-jakarta,_'Plus_Jakarta_Sans',_sans-serif)] text-gray-900 pt-6 overflow-x-hidden">
                {/* Modals */}
                <SubscriptionModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubscribe={handleConfirmSubscription}
                />

                {/* ── HERO ─────────────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left */}
                        <div className="animate-fade-in-left">
                            {/* Logo */}
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src={VetifyLogo.src}
                                    alt="VetifyPro logo"
                                    width={239}
                                    height={82}
                                    className="object-contain"
                                />
                            </div>

                            <p className="text-xl font-semibold text-black mb-1">
                                AI-Powered Clinical Assistant
                            </p>
                            <p className="text-xl text-black font-normal mb-8">
                                In-House Solution
                            </p>
                        </div>

                        {/* Right — hero visual */}
                        <div className="relative rounded-2xl overflow-hidden md:min-h-[340px] animate-fade-in-right">
                            <iframe
                                className="rounded-2xl w-full h-full object-cover aspect-video"
                                width="590"
                                height="330"
                                src="https://www.youtube-nocookie.com/embed/-4ufTh_RKCk?si=i8g7qAxSMSmarv6a"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* ── INFO BANNER ──────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pb-16 animate-fade-in-bottom">
                    <div className="bg-[#575CEE] text-white rounded-3xl px-6 pt-2 md:px-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
                        <div className="text-base md:text-lg font-medium">
                            <p className="mt-3 mb-4">
                                VetifyPro combines a hands-free AI scribe, real-time clinical
                                guidance, and automated client communication in one seamless
                                platform designed to reduce admin and fit your existing workflow
                                on any device, for any species, in any language.
                            </p>
                            <p className="leading-relaxed mb-4">
                                It lets you effortlessly record consultations, generate structured
                                SOAP notes, and receive real-time, evidence-based differentials
                                and treatment recommendations for both routine and complex cases.
                                Notes can be instantly turned into clear, client-friendly
                                summaries ready to share in one click, helping save up to two
                                hours daily while improving accuracy and consistency.
                            </p>
                            <p className="leading-relaxed">
                                Powered by the latest veterinary literature with transparent
                                reasoning, VetifyPro supports faster, more confident clinical
                                decisions and helps teams stay at the forefront of modern
                                veterinary care.
                            </p>
                        </div>

                        {/* Animal icons grid */}
                        <div className="">
                            <Image
                                src={Animals}
                                alt="Supported species"
                                width={400}
                                height={300}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </section>

                {/* ── CORE FEATURES ────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pb-20 animate-fade-in-bottom">
                    <h2 className="text-xl md:text-4xl font-extrabold text-[#1D2432] text-center mb-10 tracking-tight leading-tight">
                        Core Features
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {FEATURES.map((f, i) => (
                            <div
                                key={i}
                                className="bg-white border shadow-xl border-gray-200 rounded-2xl p-7 hover:shadow-lg hover:shadow-violet-100 hover:-translate-y-1 transition-all duration-200 group"
                            >
                                <h3 className="md:text-xl text-lg font-extrabold text-gray-900 mb-2.5 leading-snug">
                                    {f.title}
                                </h3>
                                <p className="md:text-base text-sm font-normal text-gray-500 leading-relaxed">
                                    {f.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── SHOWCASE ROW 1 ───────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Scribe */}
                        <div className="p-8 flex flex-col gap-6 animate-fade-in-left">
                            <div>
                                <h3 className="md:text-2xl text-lg text-center font-extrabold text-gray-900 mt-2 leading-snug">
                                    Hands-Free Scribe &amp;
                                    <br />
                                    Real Time Clinical Notes
                                </h3>
                            </div>
                            <Image
                                src={Vetify1.src}
                                alt="VetifyPro scribe demo"
                                width={600}
                                height={600}
                                className="object-contain rounded-lg shadow-md"
                            />
                        </div>

                        {/* Recommendations */}
                        <div className="p-8 flex flex-col gap-6 animate-fade-in-right">
                            <div>
                                <h3 className="md:text-2xl text-lg text-center font-extrabold text-gray-900 mt-2 leading-snug">
                                    Detailed, Case-Specific
                                    <br />
                                    Recommendations
                                </h3>
                            </div>
                            <Image
                                src={Vetify2.src}
                                alt="VetifyPro recommendations demo"
                                width={600}
                                height={600}
                                className="object-contain rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>

                {/* ── DESCRIPTION TEXT ─────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pb-12 animate-fade-in-bottom">
                    <div className="bg-white shadow-xl border-4 border-gray-100 rounded-3xl p-5 md:p-12">
                        <p className="md:text-lg text-sm text-[#1E1E1E] leading-relaxed">
                            VetifyPro is an AI Clinical Assistant designed to reduce diagnostic
                            uncertainty and strengthen the confidence of every veterinarian on
                            your team, whether in a fast-paced clinic, a sole-charge shift, or
                            an emergency situation.
                        </p>
                        <p className="md:text-lg text-sm mt-7 text-[#1E1E1E] leading-relaxed">
                            VetifyPro supports a wide range of species, from companion animals
                            and horses to livestock, camels, and beyond. Continuously updated to
                            reflect the latest veterinary literature, and with customisable
                            clinical notes and plain-language client summaries, VetifyPro adapts
                            to the way your clinic works. The result is a smarter, more
                            confident team delivering higher quality care across every
                            consultation.
                        </p>
                    </div>
                </section>

                {/* ── SHOWCASE ROW 2 ───────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* AI Chat */}
                        <div className="p-8 flex flex-col gap-6 animate-fade-in-left">
                            <div className="w-3/4 m-auto">
                                <h3 className="md:text-2xl text-lg text-center font-extrabold text-black mt-2 leading-snug">
                                    AI-Chat for On-the-Spot Queries
                                </h3>
                            </div>

                            <Image
                                src={Vetify3.src}
                                alt="VetifyPro AI chat demo"
                                width={600}
                                height={600}
                                className="object-contain rounded-lg shadow-md"
                            />
                        </div>

                        {/* Dual summaries */}
                        <div className="p-8 flex flex-col gap-6 animate-fade-in-right">
                            <div className="w-3/4 m-auto">
                                <h3 className="md:text-2xl text-lg text-center font-extrabold text-black mt-2 leading-snug">
                                    Instantly Generate both Vet &amp; Client Summaries
                                </h3>
                            </div>
                            <Image
                                src={Vetify4.src}
                                alt="VetifyPro summaries demo"
                                width={600}
                                height={600}
                                className="object-contain rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </section>

                {/* ── CTA SECTION ──────────────────────────────────── */}
                <section className="max-w-7xl mx-auto px-6 pb-20 animate-fade-in-bottom">
                    <div
                        style={{
                            backgroundImage: `url(${VetifyProBg.src})`,
                        }}
                        className="relative bg-center bg-no-repeat bg-cover border rounded-3xl p-10 md:p-16 overflow-hidden"
                    >
                        <div className="max-w-3xl relative z-10">
                            <h2 className="text-3xl md:text-5xl mb-4 font-extrabold tracking-tight leading-tight text-gray-900">
                                Nova Vet Family
                            </h2>
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#0B6614] mb-5">
                                Member Benefits
                            </h2>

                            <div className="flex gap-3 mb-6">
                                <div className="w-20 h-1 bg-[#0B6614] rounded-full" />
                                <div className="w-5 h-1 bg-[#0B6614] rounded-full" />
                            </div>

                            <p className="md:text-lg text-sm font-medium text-black leading-relaxed mb-8">
                                Nova Vet Family members receive full, unrestricted access to
                                <strong className="text-[#0B6614] ml-1"> VetifyPro</strong>.<br />
                                Experience the immediate benefits of this powerful tool and
                                enhance the confidence and capabilities of your team today.
                            </p>

                            <button
                                onClick={handleSubscribeClick}
                                className="inline-flex items-center gap-2 bg-[#0B6614] hover:bg-green-700 text-white font-semibold text-base px-4 py-3.5 rounded-3xl shadow-lg shadow-gray-100 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                            >
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <ArrowRight size={16} className="text-[#0B6614]" />
                                </div>
                                Subscribe Now
                            </button>

                            <p className="mt-7 text-sm text-black flex flex-wrap items-center gap-2">
                                <Image
                                    src={VetifyVector}
                                    alt="VetifyPro vector"
                                    width={20}
                                    height={20}
                                    className="object-contain mr-2"
                                />
                                Subscriptions managed through{" "}
                                <span className="font-semibold text-[#0B6614]">Vet Konect</span> |
                                In partnership with{" "}
                                <Image
                                    src={VetifyFamily}
                                    alt="VetifyPro family"
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />{" "}
                                <span className="text-[#575CEE]">Nova </span> Vet Family
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
