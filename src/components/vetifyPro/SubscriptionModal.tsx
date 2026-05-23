"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Headphones, ShieldCheck, Gem, Sparkle, Zap } from "lucide-react";


interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubscribe
}: SubscriptionModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="flex min-h-screen items-center justify-center py-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F6F8FF] shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-2 bg-white/90 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left side - Benefits */}
                <div className="p-8 my-16">
                  <div className="flex w-52 rounded-full px-3 items-center gap-2 mb-4 bg-[#B3FFC44D] text-[#0B6614]">
                    <span><Sparkle size={15} color="#0B6614" /> </span> VetifyPro Access
                  </div>

                  <h3 className="text-3xl font-medium mb-4">Subscribe to <br /> <span className="text-[#0B6614]">VetifyPro</span></h3>
                  <p className="text-black text-sm mb-8 leading-relaxed">
                    Unlock the full power of VetifyPro and elevate
                    your clinical confidence with AI-driven support
                    built for veterinarians.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <ShieldCheck size={20} className="mt-0.5 text-[#0B6614] flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Secure & Reliable</h4>
                        <p className="text-black text-sm">
                          Your data and payments are protected with industry-standard security.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap size={20} className="mt-0.5 text-[#0B6614] flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Instant Access</h4>
                        <p className="text-black text-sm">
                          Get immediate full access to VetifyPro
                          after successful subscription.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Headphones size={20} className="mt-0.5 text-[#0B6614] flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Here to Help</h4>
                        <p className="text-black text-sm">
                          Our support team is always ready to assist you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Pricing & Features */}
                <div className="m-16 p-5 relative border-8 border-gray-200 rounded-3xl  ">
                  <div className="flex absolute -top-6 mx-auto right-0 left-0 h-12 w-12 bg-white items-center rounded-full justify-center ">
                    <Gem size={30} className="text-[#0B6614]" />
                  </div>

                  <h2 className="text-2xl text-center font-bold text-gray-900 mb-4 mt-3">VetifyPro Access</h2>

                  <div className="mb-6 flex flex-col text-center text-[#0B6614]">
                    <span className="text-4xl font-bold">$15</span>
                    <span className="text-gray-700">/month</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      "AI-powered veterinary clinical support",
                      "VetifyPro member access",
                      "Clinical assistance tools",
                      "Veterinary AI insights",
                      "Ongoing feature update & access",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="bg-[#0B6614] mr-3 border border-[#0B6614] rounded-full w-6 h-6 flex items-center justify-center">

                          <Check size={14} className="text-white flex-shrink-0" />
                        </div>
                        <span className="text-black font-medium text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onSubscribe}
                    className="w-full bg-[#0B6614] hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors mb-4"
                  >
                    Subscribe With Vet Konect
                  </button>

                  <p className="text-center flex items-center justify-center gap-1 text-sm text-gray-700">
                    <span className="font-semibold text-gray-900"><ShieldCheck size={14} /></span>
                    Cancel anytime. No long-term commitment.
                  </p>

                </div>

              </div>
              <div className="flex items-center justify-center font-semibold pb-3 gap-4 text-sm text-gray-800">
                <div className="flex items-center gap-1">
                  <span>Secure payments</span>
                </div>
                <div className="w-1 h-1 bg-gray-800 rounded-full" />
                <div>Trusted partner</div>
                <div className="w-1 h-1 bg-gray-800 rounded-full" />
                <div>Your membership, protected</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}