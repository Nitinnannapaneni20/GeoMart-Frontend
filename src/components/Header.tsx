"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, ShoppingCart, User } from "lucide-react";

const locations = ["Leeds", "Huddersfield"];

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Leeds");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load Dark Mode Setting
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Load User Location
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation && locations.includes(storedLocation)) {
      setSelectedLocation(storedLocation);
    }
  }, []);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    localStorage.setItem("userLocation", newLocation);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          GeoMart
        </Link>

        {/* Location Dropdown */}
        <select
          className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md border border-gray-300 dark:border-gray-600"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Specials Link */}
          <Link href="/specials" className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
            Specials
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 text-gray-900 dark:text-white"
            >
              <User className="w-6 h-6" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
                <Link href="/order-history" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  Order History
                </Link>
                <Link href="/api/auth/logout" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  Log Out
                </Link>
                <Link href="/contact" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  Contact
                </Link>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={handleThemeToggle} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
