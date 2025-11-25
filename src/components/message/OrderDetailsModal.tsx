"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect } from "react";

export default function OrderDetailsModal({
  open,
  setOpen,
  orderId,
  onCancelOrder,
  data,
  loading,
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">
            Order Details
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : !data ? (
          <p className="text-gray-500 text-sm">No details available</p>
        ) : (
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Order ID:</strong> {data?.id}
            </p>

            <p>
              <strong>Status:</strong> {data?.payment_status}
            </p>

            <p>
              <strong>Total Amount:</strong> ₦{data?.total_amount}
            </p>

            <p>
              <strong>Payment Method:</strong> {data?.payment_method}
            </p>

            <p>
              <strong>Items:</strong>
            </p>

            <ul className="pl-4 list-disc">
              {data?.items?.map((item: any, i: number) => (
                <li key={i}>
                  {item.product_name} — Qty {item.quantity}
                </li>
              ))}
            </ul>

            <button
              onClick={onCancelOrder}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg text-sm"
            >
              Cancel Order
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
