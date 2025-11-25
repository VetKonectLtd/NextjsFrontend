"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Filter } from "@/app/assets/icons";
import { useOrderService } from "@/services/orderService";
import TableSkeleton from "@/components/shared/TableSkeleton";

const statusStyles: Record<
	string,
	{ text: string; bg: string; dot: string; border: string }
> = {
	active: {
		text: "text-yellow-800",
		bg: "bg-yellow-100",
		dot: "bg-yellow-400",
		border: "border-yellow-300",
	},
	completed: {
		text: "text-green-800",
		bg: "bg-green-100",
		dot: "bg-green-500",
		border: "border-green-300",
	},
	cancelled: {
		text: "text-red-800",
		bg: "bg-red-100",
		dot: "bg-red-500",
		border: "border-red-300",
	},
	pending: {
		text: "text-gray-800",
		bg: "bg-gray-100",
		dot: "bg-gray-400",
		border: "border-gray-300",
	},
};

export default function OrderHistoryTable() {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const { useGetBuyersOrder, useGetMerchantOrder } = useOrderService();
	const { data: ordersData, isLoading } = useGetBuyersOrder(true, currentPage);
	const { data: merchantOrdersData } = useGetMerchantOrder(true, currentPage);

	const orders = (ordersData as any)?.orders?.data || [];
	const totalPages = (ordersData as any)?.orders?.last_page || 1;

	// Filter search
	const filtered = orders.filter((o: any) => {
		const productName = o.items?.product_name || "";
		return productName.toLowerCase().includes(search.toLowerCase());
	});

	const goToPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	return (
		<div className="bg-white w-11/12 m-auto">
			{/* Header */}
			<div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
				<h2 className="text-lg font-semibold text-gray-700">
					Order History{" "}
					<span className="text-[#6941C6] border border-gray-225 p-1 ml-3 font-normal rounded-lg text-xs">
						{(ordersData as any)?.orders?.total || 0} Orders
					</span>
				</h2>

				<div className="flex space-x-3">
					<div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-4 py-2 w-full md:w-64">
						<Search className="w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search here..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="ml-2 bg-transparent outline-none text-sm w-full"
						/>
					</div>

					<div className="bg-gray-50 border cursor-pointer border-gray-200 rounded-md px-2 py-2">
						<Image
							src={Filter}
							alt="filter"
							width={120}
							height={120}
							className="h-5 w-5 object-cover"
						/>
					</div>
				</div>
			</div>

			{/* Loading */}
			{isLoading && <TableSkeleton rows={5} columns={8} />}

			{/* Table */}
			{!isLoading && (
				<div className="overflow-x-auto w-full">
					<table className="min-w-full border-collapse">
						<thead>
							<tr className="text-left text-sm text-gray-500 border-b">
								<th className="py-2 px-3 font-medium">Product Name</th>
								<th className="py-2 px-3 font-medium">Tracking number</th>
								<th className="py-2 px-3 font-medium">Vendor Name</th>
								<th className="py-2 px-3 font-medium">Status</th>
								<th className="py-2 px-3 font-medium">Budget (₦)</th>
								<th className="py-2 px-3 font-medium">Quantity</th>
								<th className="py-2 px-3 font-medium">Timeline</th>
								<th className="py-2 px-3 font-medium">Action</th>
							</tr>
						</thead>

						<tbody>
							{filtered.map((order: any, idx: number) => {
								const style =
									statusStyles[order.status] || statusStyles["Pending"];

								return (
									<tr
										key={idx}
										className="border-b text-sm text-gray-700 hover:bg-gray-50"
									>
										<td className="py-3 px-3 flex items-center gap-2">
											<span className="w-3 h-3 rounded-sm bg-green-50"></span>
											{order.items?.product_name || "N/A"}
										</td>

										<td className="py-3 px-3">{order.tracking_number}</td>
										<td className="py-3 px-3">
											{order?.merchant?.first_name} {order?.merchant?.last_name}
										</td>
										<td className="py-3 px-3">
											<span
												className={`px-2 py-1 capitalize flex items-center rounded-lg text-xs font-medium ${style.text} ${style.bg} ${style.border} border`}
											>
												<div
													className={`h-2 w-2 mr-2 rounded-full ${style.dot}`}
												></div>
												{order.status}
											</span>
										</td>
										<td className="py-3 px-3">{order.items.subtotal}</td>
										<td className="py-3 px-3">{order.quantity}</td>
										<td className="py-3 px-3">
											{order.timeline?.created_at || "N/A"}
										</td>
										<td className="py-3 px-3">
											<button
												onClick={() =>
													router.push(`/dashboard/orders/${order.id}`)
												}
												className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
											>
												View Progress
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}

			{/* Pagination */}
			<div className="flex justify-between items-center px-6 py-4 text-sm text-gray-600">
				<button
					onClick={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
				>
					Previous
				</button>

				<div className="flex items-center space-x-1">
					{Array.from({ length: totalPages }, (_, i) => (
						<button
							key={i}
							onClick={() => goToPage(i + 1)}
							className={`px-3 py-1 rounded-md border ${
								currentPage === i + 1
									? "bg-[#FAFAFA] text-gray-55 border-gray-225"
									: "hover:bg-gray-100"
							}`}
						>
							{i + 1}
						</button>
					))}
				</div>

				<button
					onClick={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
				>
					Next
				</button>
			</div>
		</div>
	);
}
