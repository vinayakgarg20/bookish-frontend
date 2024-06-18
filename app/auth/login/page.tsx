"use client";
import React, { useState } from 'react';
import { useRouter ,usePathname} from 'next/navigation';
import styles from '../styles/auth.module.css';
import { loginUser } from '../services/authService';

const Login: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Call the loginUser API from the authService
      const response = await loginUser(username, password);

      if (response.success) {
        // Save the user token in local storage
        localStorage.setItem('userToken', response.token);

        // Redirect the user back to the previous page or the home page
        const redirectUrl = pathname.split('/login')[0] || '/';
        router.push(redirectUrl as string);
      } else {
        // Handle login error
        console.error(response.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login to write a review</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;