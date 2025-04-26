"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ Use useAuth instead of useUser
import { useCart } from "../app/CartContext";

interface UserData {
  nickname?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}

const locations = ["Leeds", "Huddersfield"] as const;
type LocationType = typeof locations[number];

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { cartItems } = useCart();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("Leeds");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showCartQuantity, setShowCartQuantity] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

    setShowCartQuantity(true); // ✅ Only show cart count on client side
  }, []);

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
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          GeoMart
        </Link>

        <div className="flex items-center gap-6">
          <select
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md border border-gray-300 dark:border-gray-600"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
            {showCartQuantity && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Wait until loading finishes */}
          {!isLoading && (
            isAuthenticated && user ? (
              <>
                <span className="text-gray-900 dark:text-white font-medium">
                  Welcome, {user.given_name || "User"}
                </span>
                <Link href="/profile" className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
                  Profile
                </Link>
                <Link href="/orderHistory" className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
                  Orders
                </Link>
                <Link href="/api/auth/logout" className="text-red-600 dark:text-red-400 hover:text-red-800 transition">
                  Logout
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Log In / Sign Up
              </Link>
            )
          )}

          <button onClick={handleThemeToggle} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
