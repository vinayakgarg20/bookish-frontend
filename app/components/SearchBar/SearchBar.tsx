"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles/SearchBar.module.css";
import { Search } from "@/app/assets/icons/config";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles.searchBarContainer}>
      {!isFocused && (
        <div className={styles.containerHeading}>Discover your favorite books</div>
      )}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <span className={styles.searchBarIcon}>
            <Image src={Search} alt="Search" width={24} height={24} />
          </span>
          <input
            className={` ${isFocused ? styles.focusedInput : styles.searchInput}`}
            type="text"
            placeholder="Search for your favorite book, author or genre"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>
      {isFocused && (
        <div className={styles.resultLabel}>
          <p>Showing results for</p>
          <span>{query}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;