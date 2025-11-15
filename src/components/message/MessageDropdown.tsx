import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Calendar, ImageIcon, Loader2, Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Appointment } from "@/types";
import { useForm } from "react-hook-form";
import { directMessageService } from "@/services/directMessageService";
import SuccessModal from "../modals/SuccessModal";
interface MessageDropdownProps {
	receiverId: string;
	refetch: any;
	handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageDropdown = ({
	receiverId,
	handleImageUpload,
	refetch,
}: MessageDropdownProps) => {
	const [openModal, setOpenModal] = useState(false);
	const [open, setOpen] = useState(false);
	const { useBookAppointment } = directMessageService();
	const bookingMutation = useBookAppointment();
	const [successOpen, setSuccessOpen] = useState(false);

	const {
		register,
		handleSubmit,
	} = useForm<Appointment>();

	const onSubmit = (data: Appointment) => {
		const rawDate = data.date;

		const [year, month, day] = rawDate.split("-");
		const formattedDate = `${day}/${month}/${year}`;

		const payload = {
			...data,
			date: formattedDate,
			doctor_id: receiverId,
		};

		bookingMutation.mutate(payload, {
			onSuccess: () => {
				setOpenModal(false);
				setSuccessOpen(true);
				refetch();
			},
		});
	};

	const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleImageUpload(e);
		setOpen(false); 
	};

	const handleBookAppointment = () => {
		setOpenModal(true);
	};
	return (
		<div>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<button className="p-2 rounded-full outline-none border border-gray-300 hover:bg-gray-100 transition">
						<Plus className="w-4 h-4 text-gray-600" />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					side="top"
					align="start"
					className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 space-y-2"
				>
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md p-2"
					>
						<label
							htmlFor="chatImageUpload"
							className="flex items-center gap-2 cursor-pointer w-full"
						>
							<ImageIcon className="w-4 h-4 text-gray-500" />
							<span className="text-sm text-gray-700">Add Image</span>
						</label>
					</DropdownMenuItem>
					<input
						id="chatImageUpload"
						type="file"
						accept="image/*"
						multiple
						onChange={onImageSelect}
						className="hidden"
					/>

					<DropdownMenuItem
						className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-md p-2"
						onClick={handleBookAppointment}
					>
						<Calendar className="w-4 h-4 text-gray-500" />
						<span className="text-sm text-gray-700">Book an Appointment</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Appointment Modal */}
			<Dialog open={openModal} onOpenChange={setOpenModal}>
				<DialogContent className="sm:max-w-sm rounded-xl p-6 bg-white">
					<DialogHeader className="text-center flex flex-col items-center mb-4">
						<DialogTitle className="text-2xl text-center text-gray-55 font-bold">
							Book an Appointment
						</DialogTitle>
						<DialogDescription className="text-gray-55 w-4/5 m-auto text-center font-normal text-base">
							Kindly pick a date and time agreed upon with your Medical
							professional
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<div className="relative">
							<input
								type="date"
								id="date"
								{...register("date", {
									required: "Date is required",
								})}
								className={`peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm outline-none text-gray-55`}
								placeholder=" "
							/>
							<label
								htmlFor="date"
								className="absolute text-gray-500 text-sm left-3 top-2.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
							>
								Date
							</label>
						</div>

						<div className="relative">
							<input
								type="time"
								id="time"
								{...register("time", {
									required: "Time is required",
								})}
								className={`peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm outline-none text-gray-55
								`}
								placeholder=" "
							/>
							<label
								htmlFor="time"
								className="absolute text-gray-500 text-sm left-3 top-2.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs"
							>
								Time
							</label>
						</div>

						<button
							type="submit"
							onClick={handleSubmit(onSubmit)}
							disabled={bookingMutation.isLoading}
							className="w-full bg-transparent flex items-center text-center justify-center disabled:bg-[#666666] disabled:opacity-50 disabled:cursor-not-allowed  hover:bg-primary-400 border border-primary-400 hover:text-white text-primary-400 font-medium rounded-md py-2 transition"
						>
							{bookingMutation.isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
									Processing...
								</>
							) : (
								"Save"
							)}
						</button>
					</div>
				</DialogContent>
			</Dialog>
			<SuccessModal
				successOpen={successOpen}
				setSuccessOpen={setSuccessOpen}
				message="You have successfully booked and appointment with a Medical Professional."
			/>
		</div>
	);
};

export default MessageDropdown;
