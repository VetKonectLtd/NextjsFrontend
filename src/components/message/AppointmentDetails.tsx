import { directMessageService } from "@/services/directMessageService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const AppointmentDetails = ({
	openAppointmentModal,
	setOpenAppointmentModal,
	selectedVet,
	selectedAppointment,
}: any) => {
	const { useGetAppointment } = directMessageService();

	const { data: appointmentData }:any = useGetAppointment(
		!!selectedAppointment,
		selectedAppointment || undefined,
	);

	const rawDate = appointmentData?.appointment?.appointment_at;
	const dateObj = new Date(rawDate?.replace(" ", "T"));

	const formattedDate = dateObj.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	const formattedTime = dateObj.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<Dialog open={openAppointmentModal} onOpenChange={setOpenAppointmentModal}>
			<DialogContent className="max-w-xs  md:max-w-md rounded-xl p-6 bg-white">
				<DialogHeader>
					<DialogTitle className="text-lg text-center font-bold text-gray-800">
						Appointment Details
					</DialogTitle>
				</DialogHeader>

				{selectedAppointment ? (
					<div className="space-y-3 text-sm text-gray-700">
						<p>
							<strong>Date:</strong> {formattedDate}
						</p>
						<p>
							<strong>Time:</strong> {formattedTime}
						</p>
						<p>
							<strong>With:</strong> {selectedVet?.name}
						</p>
						<p>
							<strong>Status:</strong> {appointmentData?.appointment.status}
						</p>
					</div>
				) : (
					<p className="text-gray-500 text-sm">No appointment selected.</p>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentDetails;
