"use client";
import { useState } from "react";
import Header from "@/components/Header";
import { User } from "lucide-react";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-123-4567",
    addressLine1: "123 Main St",
    addressLine2: "",
    city: "Leeds",
    state: "West Yorkshire",
    zip: "LS1 1AA",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // await fetch("/api/profile/update", { ... })
    alert("Profile saved (mock). In a real app, you’d call an API here.");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-black dark:to-gray-900 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between mt-6 mb-8">
            <div className="flex items-center">
              {/* Avatar with an icon instead of an image */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="ml-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                  Your Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Manage your personal details here
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 dark:bg-opacity-80 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="+1 555-123-4567"
                />
              </div>

              {/* Address Line 1 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="addressLine1"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="123 Main St"
                />
              </div>

              {/* Address Line 2 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="addressLine2"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Address Line 2 (optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="Leeds"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="West Yorkshire"
                />
              </div>

              {/* Zip */}
              <div>
                <label
                  htmlFor="zip"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500
                             transition"
                  placeholder="LS1 1AA"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900
                         shadow-md hover:shadow-xl"
            >
              Save Profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
