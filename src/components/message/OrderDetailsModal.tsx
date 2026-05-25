"use client";
import { directMessageService } from "@/services/directMessageService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function OrderDetailsModal({ open, setOpen, orderUrl }: any) {
  const { useGetOrderDetails } = directMessageService();
  const { data: Order, isLoading } = useGetOrderDetails(!!orderUrl, orderUrl);
  const orderDetail = (Order as any)?.product ?? {};
  const productDetails = (Order as any)?.order ?? {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm rounded-xl p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center">
            Order Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          <div className="space-y-3 text-sm text-gray-700">
            {productDetails.id && (
              <div>
                <h3 className="font-semibold mb-2 text-base">Order Info</h3>
                <p>
                  <strong>Order ID:</strong> {productDetails.id}
                </p>
                <p>
                  <strong>Status:</strong> {productDetails.payment_status}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₦{productDetails.total_amount}
                </p>
                <p>
                  <strong>Payment Method:</strong>{" "}
                  {productDetails.payment_method}
                </p>

                <p className="mt-2 font-semibold">Items:</p>
                <ul className="pl-4 list-disc">
                  <li>
                    {productDetails?.items.product_name} — Qty{" "}
                    {productDetails?.items.quantity}
                  </li>
                </ul>
              </div>
            )}

            {orderDetail.id && (
              <div>
                <p>
                  <strong>Order ID:</strong> {orderDetail.id}
                </p>

                <p>
                  <strong>Product Name:</strong> {orderDetail.product_name}
                </p>

                <p>
                  <strong>Price:</strong> ₦{orderDetail.price}
                </p>

                <p>
                  <strong>Location:</strong> {orderDetail?.location}
                </p>

                <p>
                  <strong>Description:</strong> {orderDetail?.description}
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
