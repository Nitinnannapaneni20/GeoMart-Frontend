"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, ShoppingCart, User } from "lucide-react";
import useUser from "../hooks/useUser";

// Define interfaces for type safety
interface UserData {
  nickname?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}

interface UseUserReturn {
  user: UserData | null;
  isAuthenticated: boolean;
}

const locations = ["Leeds", "Huddersfield"] as const;
type LocationType = typeof locations[number];

const Header = () => {
  const { user, isAuthenticated } = useUser() as UseUserReturn;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("Leeds");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation && locations.includes(storedLocation as LocationType)) {
      setSelectedLocation(storedLocation as LocationType);
    }
  }, []);

  // ✅ Sync user data to backend for profile creation
  useEffect(() => {
    const syncUser = async () => {
      if (!isAuthenticated || !user) return;

      const userData = {
        given_name: user.given_name,
        family_name: user.family_name,
        email: user.email,
        picture: user.picture,
      };

      try {
        const res = await fetch("/api/get-token");
        if (!res.ok) throw new Error("Failed to get token");

        const { idToken } = await res.json(); // or use accessToken if you prefer

        const apiRes = await fetch("https://api.geomart.co.uk/api/profile/create-if-not-exist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`, // 🔥 This is what your Go backend needs
          },
          body: JSON.stringify(userData),
        });

        if (!apiRes.ok) throw new Error(`API failed: ${apiRes.status}`);
        console.log("✅ User sync successful!");
        console.log(`${idToken}`);
      } catch (err) {
        console.error("❌ Sync failed:", err);
      }
    };

    syncUser();
  }, [isAuthenticated, user]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = event.target.value as LocationType;
    setSelectedLocation(newLocation);
    localStorage.setItem("userLocation", newLocation);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left-aligned logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          GeoMart
        </Link>

        {/* Right-aligned controls */}
        <div className="flex items-center gap-6">
          {/* Location Dropdown */}
          <select
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md border border-gray-300 dark:border-gray-600"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Specials */}
          <Link href="/specials" className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
            Specials
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
          </Link>

          {/* Profile */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 text-gray-900 dark:text-white"
              >
                {user?.picture ? (
                  <img src={user.picture} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
                  <span className="block px-4 py-2 text-gray-700 dark:text-white">
                    Welcome, {user?.given_name || "User"}
                  </span>
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link href="/orderHistory" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Order History
                  </Link>
                  <Link href="/api/auth/logout" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/api/auth/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Log In / Sign Up
            </Link>
          )}

          {/* Dark Mode */}
          <button onClick={handleThemeToggle} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
