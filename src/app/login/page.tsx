// src/app/login/page.tsx
import React from 'react';
import Header from '@/components/Header';
import styles from './login.module.css';

export default function Login() {
  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2 className={styles.heading}>Customer Login</h2>
          <form className={styles.loginForm}>
            <label>Email Address</label>
            <input type="email" placeholder="Email sssAddress" />
            <label>Password</label>
            <input type="password" placeholder="Password" />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.signInButton}>Sign In</button>
              <button type="button" className={styles.signUpButton}>Sign Up</button>
              <a href="#" className={styles.forgotPassword}>Forgot the password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
