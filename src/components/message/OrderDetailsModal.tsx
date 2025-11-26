"use client";
import { directMessageService } from "@/services/directMessageService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function OrderDetailsModal({
  open,
  setOpen,
  orderUrl
}: any) {

  const {useGetOrderDetails}= directMessageService();
  const {data: Order, isLoading} = useGetOrderDetails(!!orderUrl, orderUrl);
  const orderDetail =  (Order as any)?.product ?? {};

console.log("hello", Order);

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
      </DialogContent>
    </Dialog>
  );
}

