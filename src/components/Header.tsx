// src/components/Header.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';
import Image from 'next/image';
import useUser from '../hooks/useUser.ts';

const Header = () => {
  const { user, isAuthenticated } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('User Data:', user);
    } else {
      console.log('No user data available.');
    }
  }, [user]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.title}>GeoMart</Link>
      </div>
      <div className={styles.actions}>
        <input type="text" placeholder="Search products..." className={styles.searchBar} />
        <Link href="/specials" className={styles.actionLink}>Specials</Link>
        <Link href="/cart" className={styles.actionLink}>Cart</Link>
        <Link href="/contact" className={styles.actionLink}>Contact</Link>

        {/* Profile Icon */}
        <div className={styles.profileContainer} onClick={toggleDropdown}>
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
                  <span className={styles.welcomeText}>Welcome, {user?.nickname || 'User'}</span>
                  <Link href="/api/auth/logout" className={styles.dropdownItem}>
                    Log Out
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/api/auth/login" className={styles.dropdownItem}>
                    Log In
                  </Link>
                  <Link href="/api/auth/signup" className={styles.dropdownItem}>
                    Sign Up
                  </Link>
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
