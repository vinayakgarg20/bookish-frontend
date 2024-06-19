"use client";
import React, { useState, useEffect,useContext } from "react";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import BookList from "@/app/components/BookList/BookList";
import styles from "./page.module.css";
import { useFetchBooks } from "@/app/hooks/useFetchBooks";
import LoginModal from "./auth/components/LoginModal/LoginModal";
import SignupModal from "./auth/components/SignupModal/SignupModal";
import { useAuth } from "@/app/hooks/useAuth";
import { AuthContext } from "./AuthContext";
const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [favoriteLabel, setFavoriteLabel] = useState("Show Favorites");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isFavoriteTab, setIsFavoriteTab] = useState(false);
  const { fetchBooks, error, books } = useFetchBooks({
    searchQuery,
    page,
    limit,
    isFavoriteTab,
  });
  const { authState, login } = useAuth();

  const { triggerBooksFetch } = useContext(AuthContext);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks, triggerBooksFetch]);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch books:", error);
    }
  }, [error]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFavoritesClick = async () => {
    if (authState.isAuthenticated) {
      if (favoriteLabel === "Show Favorites") {
        setIsFavoriteTab(true);
        await fetchBooks({ status: "FAV" });
        setFavoriteLabel("Show All");
      } else {
        setIsFavoriteTab(false);
        await fetchBooks();
        setFavoriteLabel("Show Favorites");
      }
    } else {
      openLoginModal();
    }
  };

  const handleFavoriteToggle = async (bookId: string) => {
    if (authState.isAuthenticated) {
      console.log("toggle favorite");
      await fetchBooks({ bookId, toggleFavorite: true });
    } else {
      openLoginModal();
    }
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
    <div className={styles.homePage}>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.showFavorites}>
        <div className={styles.divider}></div>
        <div className={styles.favoritesContainer}>
          <button
            onClick={handleFavoritesClick}
            className={styles.favoriteButton}
          >
            <div>{favoriteLabel}</div>
          </button>
          <hr className={styles.divider} />
        </div>
      </div>
      <BookList books={books} onFavoriteToggle={handleFavoriteToggle} />
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
    </div>
  );
};

export default HomePage;