"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import styles from "@/app/components/Header/styles/Header.module.css";
import { BookishLogo, UserProfile } from "@/app/assets/icons/config";
import { AuthContext } from "@/app/auth/context/AuthContext";

import LoginModal from "@/app/auth/LoginModal/LoginModal";
import SignUpModal from "@/app/auth/SignupModal/SignupModal";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { authState, login, logout } = useContext(AuthContext);

  useEffect(() => {
    if (authState.userName) {
      setUserName(authState.userName);
    }
  }, [authState]);
  const handleLogin = () => {
    openLoginModal();
  };
  const handleLogout = () => {
    logout();
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleLoginSuccess = () => {
    login();
    closeLoginModal();
  };

  const handleSignUpSuccess = () => {
    login();
    closeSignUpModal();
  };
  return (
    <>
      {authState.isAuthenticated ? (
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src={BookishLogo} alt="Bookish Logo"></Image>
          </div>
          <div className={styles.headerMain}>
            <div className={styles.userProfile}>
              <Image
                src={UserProfile}
                width={32}
                height={32}
                alt="User Profile"
              ></Image>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{userName}</p>
              </div>
            </div>
            <div className={styles.loginContainer} onClick={handleLogout}>
              <div className={styles.login}>
                <p>Logout</p>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src={BookishLogo} alt="Bookish Logo"></Image>
          </div>
          <div className={styles.headerMain}>
            <div className={styles.loginContainer} onClick={handleLogin}>
              <div className={styles.login}>
                <p>Login</p>
              </div>
            </div>
          </div>
        </header>
      )}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
          openSignUpModal={openSignUpModal}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          onClose={closeSignUpModal}
          onSignUpSuccess={handleSignUpSuccess}
          openLoginModal={openLoginModal}
        />
      )}
    </>
  );
};

export default Header;
