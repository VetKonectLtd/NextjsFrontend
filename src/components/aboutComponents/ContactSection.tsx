'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FullMap } from '@/app/assets/images';
import { GreenButton } from '@/app/assets/icons';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        email: '',
        message: '',
        agreeToTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            agreeToTerms: e.target.checked
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 font-nunito">
                        Contact Us
                    </h2>
                </motion.div>

                {/* Contact Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <motion.div
                        className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 font-nunito mb-2">
                                Send Message
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Reach out to us by via mail by using form below
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Type your email address here"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full text-sm h-14"
                                    required
                                />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <Textarea
                                    name="message"
                                    placeholder="Briefly explain with more details"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={6}
                                    className="w-full text-sm resize-none"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Max 500 character</p>
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                {/* Terms Checkbox */}
                                <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="agreeToTerms"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleCheckboxChange}
                                            className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                            required
                                        />
                                        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                                            Confirm that you agree to our terms and conditions at Vet Konnect
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <motion.button
                                        type="submit"
                                        className={`group transition-all duration-200 ${!formData.agreeToTerms || !formData.email.trim() || !formData.message.trim()
                                            ? 'grayscale opacity-50 cursor-not-allowed'
                                            : 'hover:scale-105'
                                            }`}
                                        whileHover={!formData.agreeToTerms || !formData.email.trim() || !formData.message.trim() ? {} : { scale: 1.05 }}
                                        whileTap={!formData.agreeToTerms || !formData.email.trim() || !formData.message.trim() ? {} : { scale: 0.95 }}
                                        disabled={!formData.agreeToTerms || !formData.email.trim() || !formData.message.trim()}
                                    >
                                        <Image
                                            src={GreenButton}
                                            alt="Submit form"
                                            className="w-12 h-12"
                                        />
                                    </motion.button>
                                </div>
                            </div>


                        </form>
                    </motion.div>

                    {/* Map Image */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg border border-gray-100 h-full"
                        style={{ padding: '22px' }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image
                                src={FullMap}
                                alt="VetKonnect Location Map"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
