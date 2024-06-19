"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/app/components/Header/styles/Header.module.css";
import {
  BookishLogo,
  DropDownIcon,
  DropDownIconDown,
  UserProfile,
} from "@/app/assets/icons/config";
import { useHeader } from "@/app/components/Header/hooks/useHeader";
import { useAuth } from "@/app/hooks/useAuth";
import LoginModal from "@/app/auth/components/LoginModal/LoginModal";
import SignupModal from "@/app/auth/components/SignupModal/SignupModal";

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { authState, login, logout } = useAuth();
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

  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleLoginSuccess = (userToken: string) => {
    login(userToken);
    closeLoginModal();
  };

  const handleSignupSuccess = (userToken: string) => {
    login(userToken);
    closeSignupModal();
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
                <p className={styles.userName}>
                  {localStorage.getItem("userName")}
                </p>
              </div>
              <div className={styles.dropdown}>
                <Image src={DropDownIconDown} alt=""></Image>
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
          openSignupModal={openSignupModal}
        />
      )}
      {isSignupModalOpen && (
        <SignupModal
          onClose={closeSignupModal}
          onSignupSuccess={handleSignupSuccess}
          openLoginModal={openLoginModal}
        />
      )}
    </>
  );
};

export default Header;
