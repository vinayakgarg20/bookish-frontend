"use client";
import React, { useState, useEffect } from "react";
import { Book } from "@/app/interfaces/Book";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import Filters from "@/app/components/Filters/Filters";
import BookList from "@/app/components/BookList/BookList";
import styles from "./page.module.css";

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    // Fetch books from the API based on the current filters and sorting
    const fetchBooks = async () => {
      const response = await fetch(`/api/books?title=${searchQuery}&status=${showFavorites ? "FAV" : ""}&sort=${sortField}&order=${sortOrder}`);
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, [searchQuery, showFavorites, sortField, sortOrder]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (favorites: boolean) => {
    setShowFavorites(favorites);
  };

  const handleSort = (field: string, order: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleFavoriteToggle = async (bookId: string) => {
    // Toggle the favorite status of a book
    await fetch(`/api/books/${bookId}/toggle-favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Refetch the books to update the favorite status
    const response = await fetch(`/api/books?title=${searchQuery}&status=${showFavorites ? "FAV" : ""}&sort=${sortField}&order=${sortOrder}`);
    const data = await response.json();
    setBooks(data);
  };

  return (
    <div className={styles.homePage}>
      <h1>Book Review App</h1>
      <SearchBar onSearch={handleSearch} />
      <Filters onFilter={handleFilter} onSort={handleSort} />
      <BookList books={books} onFavoriteToggle={handleFavoriteToggle} />
    </div>
  );
};

export default HomePage;