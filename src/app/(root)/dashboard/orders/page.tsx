"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { Filter, Hand } from "@/app/assets/icons";
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

  const buyerOrders = (ordersData as any)?.orders?.data || [];
  const merchantOrders = (merchantOrdersData as any)?.orders?.data || [];
  const totalPages = (ordersData as any)?.orders?.last_page || 1;

  const combinedOrders = [...buyerOrders, ...merchantOrders];

  const filtered = combinedOrders.filter((o: any) => {
    const productName = o.items?.product_name || "";
    return productName.toLowerCase().includes(search.toLowerCase());
  });

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-white w-full md:w-11/12 mx-auto p-3 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Order History{" "}
          <span className="text-[#6941C6] border border-gray-225 px-2 py-1 ml-2 font-normal rounded-lg text-xs">
            {(ordersData as any)?.orders?.total || 0} Orders
          </span>
        </h2>

        {/* Search + Filter */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 bg-transparent outline-none text-sm w-full"
            />
          </div>

          <div className="bg-gray-50 border cursor-pointer border-gray-200 rounded-md px-3 py-2 flex items-center justify-center">
            <Image src={Filter} alt="Filter icon for order sorting and search" width={18} height={18} />
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && <TableSkeleton rows={5} columns={8} />}

      {!isLoading && filtered.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-16 text-center">
          <Image
            src={Hand}
            width={120}
            height={120}
            alt="No orders"
            className="opacity-80"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Orders Found
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            You have no orders matching your search.
          </p>
        </div>
      )}

      {/* DESKTOP TABLE */}
      {filtered.length >= 1 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-3">Product Name</th>
                <th className="py-3 px-3">Tracking #</th>
                {/* <th className="py-3 px-3">Vendor</th> */}
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Budget (₦)</th>
                <th className="py-3 px-3">Qty</th>
                <th className="py-3 px-3">Timeline</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.reverse().map((order: any, idx: number) => {
                const style =
                  statusStyles[order.status] || statusStyles["pending"];

                return (
                  <tr
                    key={idx}
                    className="border-b hover:bg-gray-50 text-gray-700"
                  >
                    <td className="py-3 px-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-green-50"></span>
                      {order.items?.product_name || "N/A"}
                    </td>

                    <td className="py-3 px-3">{order.tracking_number}</td>

                    {/* <td className="py-3 px-3">
										{order?.merchant?.first_name} {order?.merchant?.last_name}
									</td> */}

                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-1 capitalize flex items-center rounded-lg text-xs font-medium ${style.text} ${style.bg} ${style.border} border`}
                      >
                        <div
                          className={`h-2 w-2 mr-2 rounded-full ${style.dot}`}
                        />
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

      {/* MOBILE CARD VIEW */}
      {filtered.length >= 1 && (
        <div className="md:hidden space-y-4">
          {filtered.reverse().map((order: any, idx: number) => {
            const style = statusStyles[order.status] || statusStyles["pending"];

            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-800">
                    {order.items?.product_name}
                  </h3>

                  <span
                    className={`px-2 py-1 rounded-lg text-xs flex items-center ${style.text} ${style.bg} ${style.border} border`}
                  >
                    <div className={`h-2 w-2 mr-2 rounded-full ${style.dot}`} />
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Tracking:</strong> {order.tracking_number}
                  </p>
                  {/* <p><strong>Vendor:</strong> {order?.merchant?.first_name} {order?.merchant?.last_name}</p> */}
                  <p>
                    <strong>Budget:</strong> ₦{order.items.subtotal}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Timeline:</strong>{" "}
                    {order.timeline?.created_at || "N/A"}
                  </p>
                </div>

                <button
                  onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm"
                >
                  View Progress
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {filtered.length >= 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-6 text-sm text-gray-600">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 w-full md:w-auto"
          >
            Previous
          </button>

          <div className="flex items-center flex-wrap justify-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-[#FAFAFA] text-gray-800 border-gray-300"
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
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 w-full md:w-auto"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
