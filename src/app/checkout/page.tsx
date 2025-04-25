"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const total = searchParams.get("total") || "0.00";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AemCjeUnGKea6pd1zJie1tyM39UXxDaemHnAhwzv9tCq18UlPbCpG01uLVxv3eVcAbsXy_l0X_-VRl1y&currency=GBP`;
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      paypal.Buttons({
        createOrder: (data, actions) => {
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
        onApprove: async (data, actions) => {
          // @ts-ignore
          await actions.order.capture();
          alert("Payment successful!");
          router.push("/");
        },
        onError: (err) => {
          console.error("PayPal Checkout Error", err);
        },
      }).render("#paypal-button-container");
    };
    document.body.appendChild(script);
  }, [total, router]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 px-6">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkout</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You're about to pay <span className="font-bold">£{total}</span> with PayPal.
        </p>
        <div id="paypal-button-container" className="mt-4"></div>
      </div>
    </main>
  );
}
