'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FeedCalculator, DiseasePredictor } from '@/app/assets/images';
import { NextOrange, NextGreen } from '@/app/assets/icons';

export default function FeedCalculatorSection() {
    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const transitionConfig = {
        duration: 0.6,
        delay: 0.2
    };

    return (
        <section className="py-16 bg-offwhite">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-black text-gray-900 font-nunito mb-4">
                        Feed Calculator & Disease Predictor
                    </h2>
                </motion.div>

                {/* Cards Container */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Feed Calculator Card */}
                    <motion.div
                        className="h-fit flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        transition={{ ...transitionConfig, delay: 0.1 }}
                    >
                        <div className="p-8">
                            {/* Icon */}
                            <div className="flex gap-6 mb-6">
                                <div className="w-20 h-20 flex items-center justify-center">
                                    <Image
                                        src={FeedCalculator}
                                        alt="Feed Calculator"
                                        className="object-contain"
                                    />
                                </div>
                                {/* Content */}
                                <div className="text-left space-y-1">
                                    <h3 className="text-2xl font-bold text-gray-900 font-nunito">
                                        Feed Calculator
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Discover the appropriate amount of feed to give your livestock to stay healthy and productive
                                    </p>
                                </div>
                            </div>

                            {/* Try it Now Button */}
                            <div className="flex justify-end mt-auto pt-2">
                                <button className="inline-flex items-center gap-2 bg-gray-150 hover:bg-gray-225 text-black font-medium px-3 py-1 rounded-lg border border-gray-225 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                    <span>Try it Now</span>
                                    <Image
                                        src={NextOrange}
                                        alt="Arrow"
                                        width={16}
                                        height={16}
                                        className="object-contain"
                                    />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Disease Predictor Card */}
                    <motion.div
                        className="h-full flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: 0.3 }}
                        transition={{ ...transitionConfig, delay: 0.3 }}
                    >
                        <div className="p-8 flex-1 flex flex-col">
                            {/* Icon */}
                            <div className="flex gap-6 mb-6">
                                <div className="w-20 h-20 flex items-center justify-center">
                                    <Image
                                        src={DiseasePredictor}
                                        alt="Disease Predictor"
                                        className="object-contain"
                                    />
                                </div>
                                {/* Content */}
                                <div className="text-left space-y-1">
                                    <h3 className="text-2xl font-bold text-gray-900 font-nunito">
                                        Disease Predictor
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Diagnose and treat various diseases in animals to improving their health and well-being
                                    </p>
                                </div>
                            </div>

                            {/* Try it Now Button */}
                            <div className="flex justify-end mt-auto pt-2">
                                <button className="inline-flex items-center gap-2 bg-gray-150 hover:bg-gray-225 text-black font-medium px-3 py-1 rounded-lg border border-gray-225 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                                    <span>Try it Now</span>
                                    <Image
                                        src={NextGreen}
                                        alt="Arrow"
                                        width={16}
                                        height={16}
                                        className="object-contain"
                                    />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
