// src/components/Header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import styles from '../styles/header.module.css';

const Header = () => {
  const { user, isLoading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.title}>GeoMart</Link>
      </div>
      <div className={styles.actions}>
        {/* Profile Dropdown */}
        <div className={styles.profileContainer} onClick={toggleDropdown}>
          {user ? (
            <img src={user.picture || '/default-profile.png'} alt="Profile" className={styles.profileIcon} />
          ) : (
            <span className={styles.profileIcon}>👤</span>
          )}
          {dropdownOpen && (
            <div className={styles.dropdown}>
              {!user ? (
                <>
                  <Link href="/api/auth/login" passHref>
                    <a className={styles.dropdownItem}>Log In</a>
                  </Link>
                  <Link href="/api/auth/login?screen_hint=signup" passHref>
                    <a className={styles.dropdownItem}>Sign Up</a>
                  </Link>
                </>
              ) : (
                <>
                  <p className={styles.dropdownItem}>Hello, {user.name}</p>
                  <Link href="/api/auth/logout" passHref>
                    <a className={styles.dropdownItem}>Log Out</a>
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
