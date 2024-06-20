"use client";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import BookList from "@/app/components/BookList/BookList";
import styles from "./page.module.css";
import { useFetchBooks } from "@/app/hooks/useFetchBooks";
import LoginModal from "@/app/auth/LoginModal/LoginModal";
import SignUpModal from "@/app/auth/SignupModal/SignupModal";
import { AuthContext } from "@/app/auth/context/AuthContext";

import { showErrorToast } from "./services/apiService";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [favoriteLabel, setFavoriteLabel] = useState("Show Favorites");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isFavoriteTab, setIsFavoriteTab] = useState(false);
  const { fetchBooks, error, books } = useFetchBooks({
    searchQuery,
    page,
    limit,
    isFavoriteTab: isFavoriteTab,
  });
  const { authState, login, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchBooks({ isFavoriteTab: isFavoriteTab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, searchQuery]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFavoritesClick = async () => {
    if (authState.isAuthenticated) {
      const newIsFavoriteTab = !isFavoriteTab;
      setIsFavoriteTab(newIsFavoriteTab);
      fetchBooks({ isFavoriteTab: newIsFavoriteTab });
      setFavoriteLabel(newIsFavoriteTab ? "Show All" : "Show Favorites");
    } else {
      openLoginModal();
    }
  };

  const handleFavoriteToggle = async (bookId: string) => {
    if (authState.isAuthenticated) {
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
    </div>
  );
};

export default HomePage;
