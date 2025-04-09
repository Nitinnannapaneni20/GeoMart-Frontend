"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Fresh Apples",
      brand: "GeoFarms",
      price: 199,
      quantity: 2,
      imageUrl: "/products/apple.jpg",
    },
    {
      id: 2,
      name: "Organic Milk",
      brand: "GeoDairy",
      price: 299,
      quantity: 1,
      imageUrl: "/products/milk.jpg",
    },
  ]);

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 px-4 sm:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                Nothing available at the moment.
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                Order to get items here.
              </p>
              <Link
                href="/"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg transition"
              >
                Go to Homepage
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left: Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4 w-full md:w-2/3">
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">{item.brand}</p>
                        <p className="text-indigo-600 font-bold mt-2">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 font-semibold ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Order Summary */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 sticky top-24 h-fit">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                <div className="space-y-3 text-gray-800 dark:text-gray-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-gray-300 dark:border-gray-600 pt-2">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
