"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Image from "next/image";
import useUser from "../hooks/useUser.ts";

const locations = ["Leeds", "Huddersfield"];

const Header = () => {
  const { user, isAuthenticated } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Leeds");

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation && locations.includes(storedLocation)) {
      setSelectedLocation(storedLocation);
    } else {
      detectLocation();
    }
  }, []);

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((res) => res.json())
            .then((data) => {
              const city = data.address.city || data.address.town || "Leeds";
              if (locations.includes(city)) {
                setSelectedLocation(city);
                localStorage.setItem("userLocation", city);
              } else {
                setSelectedLocation("Leeds");
                localStorage.setItem("userLocation", "Leeds");
              }
            })
            .catch(() => {
              setSelectedLocation("Leeds");
              localStorage.setItem("userLocation", "Leeds");
            });
        },
        () => {
          setSelectedLocation("Leeds");
          localStorage.setItem("userLocation", "Leeds");
        }
      );
    }
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    localStorage.setItem("userLocation", newLocation);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.title}>
          GeoMart
        </Link>
      </div>
      <div className={styles.actions}>
        {/* Location Dropdown */}
        <select className={styles.locationDropdown} value={selectedLocation} onChange={handleLocationChange}>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <input type="text" placeholder="Search products..." className={styles.searchBar} />
        <Link href="/specials" className={styles.actionLink}>Specials</Link>
        <Link href="/cart" className={styles.actionLink}>Cart</Link>
        <Link href="/contact" className={styles.actionLink}>Contact</Link>

        {/* Profile Icon */}
        <div className={styles.profileContainer} onClick={() => setShowDropdown(!showDropdown)}>
          <Image
            src={user?.picture || `https://ui-avatars.com/api/?name=Guest&background=333333&color=ffffff&size=128`}
            alt="Profile"
            width={30}
            height={30}
            className={styles.profileIcon}
          />
          {showDropdown && (
            <div className={styles.dropdown}>
              {isAuthenticated ? (
                <>
                  <span className={styles.welcomeText}>Welcome, {user?.nickname || "User"}</span>
                  <Link href="/api/auth/logout" className={styles.dropdownItem}>Log Out</Link>
                </>
              ) : (
                <>
                  <Link href="/api/auth/login" className={styles.dropdownItem}>Log In</Link>
                  <Link href="/api/auth/signup" className={styles.dropdownItem}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
