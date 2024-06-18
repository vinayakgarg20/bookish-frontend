import React from "react";
import Image from "next/image";
import styles from "@/app/components/Header/styles/Header.module.css";
import {
  BookishLogo,
  DropDownIcon,
  DropDownIconDown,
  UserProfile,
} from "@/app/assets/icons/config";
import { useHeader } from "@/app/components/Header/hooks/useHeader";
const Header: React.FC = () => {
  return (
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
            <p className={styles.userName}>Vinayak Garg</p>
          </div>
          <div className={styles.dropdown}>
            <Image src={DropDownIconDown} alt=""></Image>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
