"use client";

export const dynamic = "force-dynamic";

declare global {
  interface Window {
    paypal?: any;
  }
}

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { useCart } from "../CartContext";
import { saveOrder } from "@/services/Apis";

function CheckoutContent({ onSuccess }: { onSuccess: () => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const total = searchParams?.get("total") ?? "0.00";
  const { cartItems, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [shippingConfirmed, setShippingConfirmed] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const sdkLoadedRef = useRef(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tokenRes = await fetch("/api/get-token");
        if (!tokenRes.ok) throw new Error("Failed to get token");
        const { idToken } = await tokenRes.json();

        const res = await fetch("https://api.geomart.co.uk/api/profile/get", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setShippingInfo({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          addressLine1: data.addressLine1 || "",
          addressLine2: data.addressLine2 || "",
          city: data.city || "",
          state: data.state || "",
          zip: data.zip || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.addressLine1 || !shippingInfo.city || !shippingInfo.zip) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const tokenRes = await fetch("/api/get-token");
      if (!tokenRes.ok) throw new Error("Failed to get token");
      const { idToken } = await tokenRes.json();

      const updateRes = await fetch("https://api.geomart.co.uk/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        credentials: "include",
        body: JSON.stringify(shippingInfo),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("✅ Profile updated successfully before payment!");

      setShippingConfirmed(true);
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile before payment. Please try again.");
    }
  };

  useEffect(() => {
    if (!shippingConfirmed) return;
    if (sdkLoadedRef.current) return;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AemCjeUnGKea6pd1zJie1tyM39UXxDaemHnAhwzv9tCq18UlPbCpG01uLVxv3eVcAbsXy_l0X_-VRl1y&currency=GBP`;
    script.async = true;
    script.onload = () => {
      sdkLoadedRef.current = true;

      if (typeof window !== "undefined" && window.paypal && buttonContainerRef.current) {
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

            try {
              const tokenRes = await fetch("/api/get-token");
              if (!tokenRes.ok) throw new Error("Failed to fetch token");
              const { idToken } = await tokenRes.json();

              await saveOrder({
                items: cartItems,
                total_amount: parseFloat(total),
                currency: "GBP",
                payment_status: "COMPLETED",
                transaction_id: details.id,

                // flattened shipping fields
                name: shippingInfo.name,
                email: shippingInfo.email,
                phone: shippingInfo.phone,
                addressLine1: shippingInfo.addressLine1,
                addressLine2: shippingInfo.addressLine2,
                city: shippingInfo.city,
                state: shippingInfo.state,
                zip: shippingInfo.zip,
              }, idToken);

              clearCart();
              onSuccess();
              setTimeout(() => router.push("/"), 3000);
            } catch (err) {
              console.error("❌ Error saving order:", err);
            }
          },
          onError: (err: any) => {
            console.error("PayPal Checkout Error", err);
          },
        }).render(buttonContainerRef.current);
      }
    };

    document.body.appendChild(script);
  }, [shippingConfirmed, total, router, cartItems, clearCart, shippingInfo, onSuccess]);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Checkout</h1>

      {loadingProfile ? (
        <p className="text-gray-700 dark:text-gray-300 mb-6">Loading your information...</p>
      ) : !shippingConfirmed ? (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 mb-6">Please confirm your shipping details before payment.</p>

          <input type="text" placeholder="Full Name" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} required className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="email" placeholder="Email" value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} required className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="Phone" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="Address Line 1" value={shippingInfo.addressLine1} onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })} required className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="Address Line 2 (optional)" value={shippingInfo.addressLine2} onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine2: e.target.value })} className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="City" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} required className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="State" value={shippingInfo.state} onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })} className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="ZIP Code" value={shippingInfo.zip} onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} required className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-white" />

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold transition">
            Continue to Payment
          </button>
        </form>
      ) : (
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You're about to pay <span className="font-bold">£{total}</span> with PayPal.
          </p>
          <div id="paypal-button-container" ref={buttonContainerRef} className="mt-4"></div>
        </>
      )}
    </div>
  );
}

export default function Checkout() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 px-6 relative">
      <Suspense fallback={<div>Loading checkout information...</div>}>
        <CheckoutContent onSuccess={() => setShowSuccess(true)} />
      </Suspense>

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