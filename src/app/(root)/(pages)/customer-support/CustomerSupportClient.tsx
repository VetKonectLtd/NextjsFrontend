"use client";

import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { useSupportService } from "@/services/supportService";
import { SupportTicket } from "@/types";

const CustomerSupportClient = () => {
	const { useSupportComplian } = useSupportService();
	const supportComplainMutation = useSupportComplian();

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SupportTicket>({
		defaultValues: {
			category: "",
			complain: "",
		}
	});

	const onSubmit = (data: SupportTicket) => {
		supportComplainMutation.mutate(data);
	};

	return (
		<div className="min-h-screen w-11/12 m-auto pt-20 bg-white">
			{/* Main Content */}
			<div className="w-full mx-auto p-2 md:p-8">
				{/* Desktop Layout */}
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					Customer Support
				</h1>
				<div className="grid md:grid-cols-2 grid-cols-1 gap-2">
					<div>
						<div className="flex flex-col space-y-8">
							<div className="flex flex-col">
								<h3 className="font-bold text-lg text-gray-900">Address:</h3>
								<p className="text-gray-700 w-3/4">
									No. 20, Tony Ijohor way, Off Ugbokolo Street, 7th Avenue, High Level, Makurdi.
								</p>
							</div>

							<div className="flex flex-col">
								<h3 className="font-bold text-lg text-gray-900">Email:</h3>
								<p className="text-gray-700">admin@vetkonect.com</p>
							</div>

							<div className="flex flex-col">
								<h3 className="font-bold text-lg text-gray-900">Call:</h3>
								<p className="text-gray-700">07078340106</p>
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

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="text-gray-700 space-y-4"
						>
							<Controller
								name="category"
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
								{...register("complain", {
									required: "Please enter your complaint",
								})}
								placeholder="Describe your complaint here..."
								rows={6}
								className="border shadow-sm w-full p-4 rounded-md resize-none border-gray-225"
							/>
							{errors.complain && (
								<p className="text-red-500 text-sm">{errors.complain.message}</p>
							)}

							<div className="">
								<button
									type="submit"
									disabled={supportComplainMutation.isPending}
									className="w-full py-3 mt-6 rounded-md text-white text-base font-semibold bg-primary-400 disabled:bg-[#666666] transition disabled:opacity-50 disabled:cursor-not-allowed mb-2 flex items-center justify-center gap-2"
								>
									{supportComplainMutation.isPending && (
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									)}
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

export default CustomerSupportClient;