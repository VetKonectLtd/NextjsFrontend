"use client";

import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

const CustomerSupportPage = () => {
	const {
		register,
		control,
		handleSubmit,
		clearErrors,
		setValue,
		formState: { errors },
	} = useForm<any>();

	return (
		<div className="min-h-screen w-11/12 m-auto pt-20 bg-white">
			{/* Main Content */}
			<div className="w-full mx-auto p-4 md:p-8">
				{/* Desktop Layout */}
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					Customer Support
				</h1>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-2">
					<div>
						<div className="flex flex-col space-y-8">
							<div className="flex flex-col">
								<h3 className="font-bold text-lg text-gray-900">Address:</h3>
								<p className="text-gray-700">
									1234 Support St, Helpville, HV 56789
								</p>
							</div>

							<div className="flex flex-col">
								<h3 className="font-bold text-lg text-gray-900">Email:</h3>
								<p className="text-gray-700">hello@vkonnect.com</p>
							</div>

							<div className="flex flex-col">
								<h3 className="font-bold text-lg text-gray-900">Call:</h3>
								<p className="text-gray-700">+10020001234</p>
							</div>
						</div>
					</div>

					{/* Right Column - Notification Detail */}
					<div className="mt-6 md:mt-0">
						<div className="flex flex-col mb-6">
							<h2 className="text-2xl font-bold text-gray-900">
								Compliant Box
							</h2>
							<span className="text-sm text-gray-500">
								Drop your complains here
							</span>
						</div>

						<form className="text-gray-700 space-y-4">
							<Controller
								name="visibility"
								control={control}
								rules={{ required: "Please select category" }}
								render={({ field }) => (
									<Select onValueChange={field.onChange}>
										<SelectTrigger className="border shadow-sm w-full rounded-md border-gray-225 p-6">
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="everyone">Everyone</SelectItem>
											<SelectItem value="veterinary_doctors">
												Veterinary Doctors
											</SelectItem>
											<SelectItem value="veterinary_paraprofessional">
												Veterinary Paraprofessional
											</SelectItem>
											<SelectItem value="pet_owner">Petowner</SelectItem>
											<SelectItem value="livestock_farmer">
												Livestock farmer
											</SelectItem>
											<SelectItem value="veterinary_clinics">
												Veterinary Clinic
											</SelectItem>
											<SelectItem value="vendor">Vendor</SelectItem>
											<SelectItem value="others">Others</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>

							<Textarea
								placeholder="Describe your complain here..."
								rows={6}
								className="border shadow-sm w-full p-4 rounded-md resize-none border-gray-225"
							/>

							<div className="">
								<button
									type="submit"
									className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomerSupportPage;
