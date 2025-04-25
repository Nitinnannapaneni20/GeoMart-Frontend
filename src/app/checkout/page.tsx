// Final Updated Checkout Page: app/checkout/page.tsx
"use client";

// 👇 This safely declares the PayPal property on window
declare global {
  interface Window {
    paypal?: any;
  }
}

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useCart } from "../CartContext";
import { saveOrder } from "@/services/Apis";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const total = searchParams?.get("total") ?? "0.00";
  const { cartItems, clearCart } = useCart();

  const [showSuccess, setShowSuccess] = useState(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sdkLoadedRef = useRef(false);

  useEffect(() => {
    if (sdkLoadedRef.current) return;

    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AemCjeUnGKea6pd1zJie1tyM39UXxDaemHnAhwzv9tCq18UlPbCpG01uLVxv3eVcAbsXy_l0X_-VRl1y&currency=GBP";
    script.async = true;
    script.onload = () => {
      sdkLoadedRef.current = true;

      if (buttonContainerRef.current && typeof window !== "undefined" && window.paypal) {
        window.paypal.Buttons({
          createOrder: (_data: Record<string, unknown>, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total,
                  },
                },
              ],
            });
          },
          onApprove: async (_data: Record<string, unknown>, actions: any) => {
            const details = await actions.order.capture();

            console.log("✅ Payment Success!");
            console.log("Cart Items:", cartItems);
            console.log("Total Paid: £", total);
            console.log("PayPal Transaction ID:", details.id);

            await saveOrder({
              items: cartItems,
              total_amount: parseFloat(total),
              currency: "GBP",
              payment_status: "COMPLETED",
              transaction_id: details.id,
            });

            setShowSuccess(true);
            clearCart();
            setTimeout(() => router.push("/"), 3000);
          },
          onError: (err: unknown) => {
            console.error("PayPal Checkout Error", err);
          },
        }).render(buttonContainerRef.current);
      }
    };

    document.body.appendChild(script);
  }, [total, router, cartItems, clearCart]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 px-6 relative">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkout</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You're about to pay <span className="font-bold">£{total}</span> with PayPal.
        </p>
        <div id="paypal-button-container" ref={buttonContainerRef} className="mt-4"></div>
      </div>

      {showSuccess && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-sm">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-700 dark:text-gray-300">You'll be redirected shortly...</p>
          </div>
        </div>
      )}
    </main>
  );
}