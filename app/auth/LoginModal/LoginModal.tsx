import React, { useState } from "react";
import styles from "../styles/auth.module.css";
import { loginUser } from "../services/authService";
import { showErrorToast } from "@/app/services/apiService";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  openSignUpModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onLoginSuccess,
  openSignUpModal,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      if (response.success) {
        localStorage.setItem("userToken", response.userToken);
        localStorage.setItem("userName", response.userName);
        onLoginSuccess();
      } else {
        showErrorToast(response.error);
      }
    } catch (error: any) {
      showErrorToast(`Error logging in: ${error}`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.modalButton}>
            Login
          </button>
        </form>
        <p className={styles.modalText}>
          Don&apos;t have an account?{" "}
          <a href="#" onClick={openSignUpModal}>
            Sign up
          </a>
        </p>
        <button onClick={onClose} className={styles.modalCloseButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
