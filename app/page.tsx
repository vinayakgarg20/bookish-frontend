"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/app/interfaces/Book";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import Filters from "@/app/components/Filters/Filters";
import BookList from "@/app/components/BookList/BookList";
import styles from "./page.module.css";
import { getApi, postApi } from "@/app/services/apiService";
import { ServiceType } from "@/app/constants/baseUrls";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);


  useEffect(() => {
    // Fetch books from the API based on the current filters and sorting
    const userToken = localStorage.getItem("userToken");
    const fetchBooks = async () => {
      const params = {
        page,
        limit,
        title: searchQuery,
        sort: sortField,
        order: sortOrder,
      };

      let url = `?page=${params.page}&limit=${params.limit}&sort=${params.sort}&order=${params.order}`;

      if (params.title) {
        url += `&title=${params.title}`;
      }

      const headers = userToken
        ? { Authorization: `Bearer ${userToken}` }
        : undefined;

      try {
        const response = await getApi(url, headers, ServiceType.BOOKS);

        if (response?.data) {
          setBooks(response.data);
        } else {
          // Handle error scenario
          console.error("Failed to fetch books:", response.error);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("An error occurred:", error);
      }
    };

    fetchBooks();
  }, [searchQuery, sortField, sortOrder, page, limit]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFavoritesClick = async () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      // Fetch favorite books from the API
      const params = {
        status: "FAV",
      };
      const headers = { Authorization: `Bearer ${userToken}` };

      try {
        const response = await getApi(
          `?status=${params.status}`,
          headers,
          ServiceType.BOOKS
        );

        if (response?.data) {
          setBooks(response.data);
        } else {
          // Handle error scenario
          console.error("Failed to fetch favorite books:", response.error);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("An error occurred:", error);
      }
    } else {
      router.push("/auth/login");
    }
  };

  const handleSort = (field: string, order: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleFavoriteToggle = async (bookId: string) => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      // Toggle the favorite status of a book
      const headers = { Authorization: `Bearer ${userToken}` };

      try {
        await postApi(`/${bookId}/toggle-favorite`, {}, headers, ServiceType.BOOKS);

        // Refetch the books to update the favorite status
        const params = {
          page,
          limit,
          title: searchQuery,
          sort: sortField,
          order: sortOrder,
        };

        let url = `?page=${params.page}&limit=${params.limit}&sort=${params.sort}&order=${params.order}`;

        if (params.title) {
          url += `&title=${params.title}`;
        }

        const response = await getApi(url, headers, ServiceType.BOOKS);

        if (response?.data) {
          setBooks(response.data);
        } else {
          // Handle error scenario
          console.error("Failed to fetch updated books:", response.error);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("An error occurred:", error);
      }
    } else {
      // Redirect to login/register page
      router.push("/auth/login");
    }
  };

  return (
    <div className={styles.homePage}>
      <h1>Book Review App</h1>
      <SearchBar onSearch={handleSearch} />
      {/* <Filters
        onFavoritesClick={handleFavoritesClick}
        onSort={handleSort}
        onPageChange={(page) => setPage(page)}
        onLimitChange={(limit) => setLimit(limit)}
      /> */}
      <BookList books={books} onFavoriteToggle={handleFavoriteToggle} />
    </div>
  );
};

export default HomePage;