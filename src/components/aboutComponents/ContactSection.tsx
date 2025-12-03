"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FullMap } from "@/app/assets/images";
import { GreenButton } from "@/app/assets/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactService } from "@/services/contactService";
import { Contact_us } from "@/types";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

export default function ContactSection() {
	const { useContactUs } = useContactService();

	const ContactUsMutation = useContactUs();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<Contact_us>({
		defaultValues: { email: "", content: "" },
		mode: "onChange",
	});

	const onSubmit = (data: Contact_us) => {
		ContactUsMutation.mutate(
			data,

			{
				onSuccess: () => {
					reset();
				},
			},
		);
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
								Reach out to us via mail by using form below
							</p>
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							{/* Email Input */}
							<div>
								<Input
									type="email"
									placeholder="Type your email address here"
									className="w-full h-14 text-sm"
									{...register("email")}
								/>
								{errors.email && (
									<p className="text-red-500 text-xs mt-1">
										{errors.email.message}
									</p>
								)}
							</div>

							{/* Message Textarea */}
							<div>
								<Textarea
									rows={6}
									placeholder="Briefly explain with more details"
									className="w-full resize-none text-sm"
									{...register("content")}
								/>
								<p className="text-xs text-gray-500 mt-1">Max 500 characters</p>
								{errors.content && (
									<p className="text-red-500 text-xs mt-1">
										{errors.content.message}
									</p>
								)}
							</div>
							<div className="flex justify-between items-center gap-3">
								{/* Terms Checkbox */}
								<div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
									<div className="flex items-start gap-3">
										<input
											type="checkbox"
											id="agreeToTerms"
											className="mt-1 w-4 h-4 accent-primary-400 text-green-600"
											{...register("agreeToTerms")}
										/>
										<label
											htmlFor="agreeToTerms"
											className="text-sm text-gray-600"
										>
											Confirm that you agree to our terms and conditions at
											VetKonect
										</label>
									</div>
									{errors.agreeToTerms && (
										<p className="text-red-500 text-xs mt-1">
											{errors.agreeToTerms.message}
										</p>
									)}
								</div>

								{/* Submit Button */}
								<motion.button
									type="submit"
									disabled={!isValid || ContactUsMutation.isPending}
									className={`transition-all ${!isValid ? "opacity-50 grayscale cursor-not-allowed" : "hover:scale-105"}`}
								>
									{ContactUsMutation.isPending ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Image
											src={GreenButton}
											alt="Submit"
											className="w-12 h-12"
										/>
									)}
								</motion.button>
							</div>
						</form>
					</motion.div>

					{/* Map Image */}
					<motion.div
						className="bg-white rounded-lg shadow-lg border border-gray-100 h-full"
						style={{ padding: "22px" }}
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
