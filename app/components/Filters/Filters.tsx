"use client";
import React, { useState } from "react";
import styles from "./styles/styles.module.css";

interface FiltersProps {
  onFilter: (favorites: boolean) => void;
  onSort: (field: string, order: "asc" | "desc") => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter, onSort }) => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilterChange = () => {
    setShowFavorites(!showFavorites);
    onFilter(!showFavorites);
  };

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    onSort(field, sortOrder);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterOption}>
        <input
          type="checkbox"
          id="favorites"
          checked={showFavorites}
          onChange={handleFilterChange}
        />
        <label htmlFor="favorites">Show Favorites</label>
      </div>
      <div className={styles.sortOption}>
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortField}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="rating">Rating</option>
        </select>
        <span className={styles.sortOrder} onClick={() => handleSortChange(sortField)}>
          {sortOrder === "asc" ? "▲" : "▼"}
        </span>
      </div>
    </div>
  );
};

export default Filters;