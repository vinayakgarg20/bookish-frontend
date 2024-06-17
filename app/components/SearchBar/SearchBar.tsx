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
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.searchBarContainer}>
      {!isFocused && (
        <div className={styles.heading}>Discover your favorite books</div>
      )}
      <div
        className={`${styles.searchBar} ${isFocused ? styles.focused : ""}`}
        onClick={handleSearch}
      >
        <span className={styles.searchIcon}>
          <Image src={Search} alt="Search" width={24} height={24} />
        </span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by title, author or genre"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isFocused && (
          <div className={styles.resultLabel}>Showing results for ${query}</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
