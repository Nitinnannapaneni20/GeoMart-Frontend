"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon, ShoppingCart, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../app/CartContext";

const locationMap = {
  1: "Leeds",
  2: "Huddersfield",
} as const;

type LocationID = keyof typeof locationMap;

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { cartItems } = useCart();
  const [selectedLocation, setSelectedLocation] = useState<LocationID>(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showCartQuantity, setShowCartQuantity] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    if (storedLocation && (storedLocation === "1" || storedLocation === "2")) {
      setSelectedLocation(Number(storedLocation) as LocationID);
    }

    setShowCartQuantity(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocationId = Number(e.target.value) as LocationID;
    setSelectedLocation(newLocationId);
    localStorage.setItem("userLocation", newLocationId.toString());
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          GeoMart
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Location dropdown */}
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white p-1 md:p-2 text-sm rounded-md border border-gray-300 dark:border-gray-600"
          >
            {Object.entries(locationMap).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {/* Cart */}
          <Link href="/cart" onClick={closeMenu} className="relative">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
            {showCartQuantity && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center ml-4">
            {!isLoading && isAuthenticated && user ? (
              <>
                <span className="text-gray-900 dark:text-white font-medium mr-4">
                  Welcome, {user.given_name || "User"}
                </span>
                <Link href="/profile" className="text-gray-900 dark:text-white hover:text-indigo-600 transition mr-4">
                  Profile
                </Link>
                <Link href="/orderHistory" className="text-gray-900 dark:text-white hover:text-indigo-600 transition mr-4">
                  Orders
                </Link>
                <a href="/api/auth/logout" className="text-red-600 dark:text-red-400 hover:text-red-800 transition">
                  Logout
                </a>
              </>
            ) : (
              <a
                href="/api/auth/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Log In / Sign Up
              </a>
            )}
          </div>

          {/* Theme toggle */}
          <button onClick={handleThemeToggle} className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            {darkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" /> : <Moon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />}
          </button>

          {/* Hamburger menu */}
          <button className="md:hidden p-2 text-gray-900 dark:text-white focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" onClick={closeMenu}>
          <div
            className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out"
            style={{ transform: isMenuOpen ? "translateX(0)" : "translateX(100%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={closeMenu} className="text-gray-900 dark:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              {!isLoading && isAuthenticated && user ? (
                <>
                  <span className="text-gray-900 dark:text-white font-medium">Welcome, {user.given_name || "User"}</span>
                  <Link href="/profile" onClick={closeMenu} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
                    Profile
                  </Link>
                  <Link href="/orderHistory" onClick={closeMenu} className="text-gray-900 dark:text-white hover:text-indigo-600 transition">
                    Orders
                  </Link>
                  <a href="/api/auth/logout" onClick={closeMenu} className="text-red-600 dark:text-red-400 hover:text-red-800 transition">
                    Logout
                  </a>
                </>
              ) : (
                <a
                  href="/api/auth/login"
                  onClick={closeMenu}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
                >
                  Log In / Sign Up
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;