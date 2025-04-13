"use client";
import { useState } from "react";
import Header from "@/components/Header";

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
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // await fetch("/api/profile/update", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      alert("Profile saved (mock). In a real app, you'd call an API here.");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Your Profile
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Apartment, suite, unit, building, floor, etc."
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="LS1 1AA"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              Save Profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
