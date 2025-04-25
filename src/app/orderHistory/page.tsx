"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { Loader2, PackageCheck } from "lucide-react";

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const tokenRes = await fetch("/api/get-token");
        if (!tokenRes.ok) throw new Error("Failed to get token");
        const { idToken } = await tokenRes.json();

        const res = await fetch("https://api.geomart.co.uk/api/orders/user", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        console.log("✅ Raw order data:", data);

        // Directly use 'items' because backend sends it correctly
        const normalizedOrders = data.map((order: any) => ({
          ...order,
          items: Array.isArray(order.items) ? order.items : [],
        }));

        setOrders(normalizedOrders);
      } catch (err: any) {
        console.error("❌ Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Orders</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-12">
              <PackageCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No orders found. Go shop something awesome!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Order #{order.id || index + 1}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {order.payment_status || "COMPLETED"}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item: any, i: number) => (
                        <div key={i} className="py-4 flex justify-between text-gray-700 dark:text-gray-300">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm italic">No item details available</p>
                    )}
                  </div>

                  <div className="text-right mt-4 text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    Total: £{order.total_amount?.toFixed(2) || "0.00"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
