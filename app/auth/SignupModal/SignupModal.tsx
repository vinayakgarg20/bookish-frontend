import React, { useState } from "react";
import styles from "../styles/auth.module.css";
import { registerUser } from "../services/authService";
import { showErrorToast } from "@/app/services/apiService";

interface SignUpModalProps {
  onClose: () => void;
  onSignUpSuccess: () => void;
  openLoginModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  onClose,
  onSignUpSuccess,
  openLoginModal,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await registerUser(email, username, password);
      if (response.success) {
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userName", response.username);
        onSignUpSuccess();
      } else {
        showErrorToast(response.error);
      }
    } catch (error) {
      showErrorToast(`Error registering user: ${error}`);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Sign up</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
            Sign up
          </button>
        </form>
        <p className={styles.modalText}>
          Already have an account?{" "}
          <a href="#" onClick={openLoginModal}>
            Login
          </a>
        </p>
        <button onClick={onClose} className={styles.modalCloseButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
