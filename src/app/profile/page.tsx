"use client";
import { useEffect, useState } from "react";
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
  sub?: string;
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
    sub: "",
  });

  // 🟢 Fetch user profile from backend on load
  useEffect(() => {
    const auth0User = localStorage.getItem("auth0User");
    if (!auth0User) return;

    const parsed = JSON.parse(auth0User);
    const sub = parsed?.sub;
    if (!sub) return;

    fetch(`/api/profile/${sub}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user profile");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        // fallback to auth0 data if user not found
        setFormData({
          name: `${parsed.given_name || ""} ${parsed.family_name || ""}`.trim(),
          email: parsed.email,
          phone: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
          sub,
        });
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Update user profile
  const handleSave = async () => {
    const res = await fetch("/api/profile/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
    }
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
              {/* Form Fields */}
              {[
                ["name", "Full Name"],
                ["email", "Email"],
                ["phone", "Phone Number"],
                ["addressLine1", "Address Line 1"],
                ["addressLine2", "Address Line 2 (optional)"],
                ["city", "City"],
                ["state", "State / Province"],
                ["zip", "ZIP / Postal Code"],
              ].map(([field, label]) => (
                <div
                  key={field}
                  className={field === "addressLine1" || field === "addressLine2" ? "sm:col-span-2" : ""}
                >
                  <label
                    htmlFor={field}
                    className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    name={field}
                    id={field}
                    value={(formData as any)[field] || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                             focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              ))}
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
