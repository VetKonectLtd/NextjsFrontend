"use client"
import { Share2, Edit3, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { Vet1, Vet2} from "@/app/assets/images";
import { useRouter } from "next/navigation";

const clients = [
	{ id: 1, name: "Dr. Amochi", avatar: Vet1.src },
	{ id: 2, name: "Tresquare Store", avatar: Vet2.src },
];

const Clients = () => {
    const router = useRouter();

	return (
		<div className="w-11/12 min-h-screen md:min-h-screen mb-6 m-auto shadow-md border rounded-lg border-gray-200 bg-white p-4">
			<h2 className="text-lg font-semibold text-gray-700 mb-4">My Clients</h2>

			<div className="space-y-3">
				{clients.map((client) => (
					<div
						key={client.id}
						className="flex flex-col md:flex-row md:items-center cursor-pointer shadow-md justify-between p-3 rounded-lg border border-gray-100 transition"
					>
						{/* Avatar + Name */}
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full border border-gray-225 overflow-hidden">
								<Image
									src={client?.avatar || "/default-vet.png"}
									alt={client?.name || "Vet"}
									width={40}
									height={40}
									className="object-cover w-full h-full"
								/>
							</div>
							<span onClick={() => router.push(`/dashboard/client/${client.id}`)} className="font-bold text-gray-55">{client.name}</span>
						</div>

						{/* Action Buttons */}
						<div className="flex md:justify-between justify-end items-center gap-3 text-gray-500">
							<button className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
								<Share2 size={14} color="#1D2432" />
							</button>
							<button className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
								<Trash2 size={14} color="#1D2432" />
							</button>
							<button className="bg-white border hover:border-gray-55 cursor-pointer border-gray-225 shadow-md rounded-full p-2 flex items-center justify-center">
								<Edit size={14} color="#1D2432" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Clients;
