"use client";
import React, { useState } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import styles from '../styles/auth.module.css';
import { registerUser } from '../services/authService';
import path from 'path';

const SignUp: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   console.error('Passwords do not match');
    //   return;
    // }

    try {
      // Call the registerUser API from the authService
      const response = await registerUser(email, username, password);

      if (response.success) {
        // Save the user token in local storage
        localStorage.setItem('userToken', response.token);

        // Redirect the user back to the previous page or the home page
        const redirectUrl = pathname.split('/signup')[0] || '/';
        router.push(redirectUrl as string);
      } else {
        // Handle registration error
        console.error(response.error);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Sign up to Bookish</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div> */}
        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
    </div>
  );
};

export default SignUp;