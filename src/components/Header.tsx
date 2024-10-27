import React from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.title}>GeoMart</Link>
      </div>
      <div className={styles.actions}>
        <input type="text" placeholder="Search products..." className={styles.searchBar} />
        <Link href="/specials" className={styles.actionLink}>Specials</Link>
        <Link href="/cart" className={styles.actionLink}>Cart</Link>
        <Link href="/login" className={styles.actionLink}>Login</Link>
        <Link href="/contact" className={styles.actionLink}>Contact</Link>
      </div>
    </header>
  );
};

export default Header;
