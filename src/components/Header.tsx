"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sun, Moon, ShoppingCart, User } from "lucide-react";
import useUser from "../hooks/useUser";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const loc = e.target.value as LocationType;
    setSelectedLocation(loc);
    localStorage.setItem("userLocation", loc);
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

          <Link href="/specials" className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
            Specials
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 text-gray-900 dark:text-white"
              >
                {user?.picture ? (
                  <img src={user.picture} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-50">
                  <span className="block px-4 py-2 text-gray-700 dark:text-white">
                    Welcome, {user?.given_name || "User"}
                  </span>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                    Profile
                  </Link>
                  <Link href="/orderHistory" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                    Order History
                  </Link>
                  <Link href="/api/auth/logout" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
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

          <button onClick={handleThemeToggle} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
