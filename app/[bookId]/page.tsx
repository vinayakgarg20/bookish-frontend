"use client";
import React, { useContext, useEffect, useState } from "react";
import BookDetails from "@/app/[bookId]/components/BookDetails/BookDetails";
import Reviews from "@/app/[bookId]/components/Reviews/Reviews";
import BookCoverDetails from "@/app/[bookId]/components/BookCoverDetails/BookCoverDetails";
import styles from "./styles/BookPage.module.css";
import LoginModal from "../auth/LoginModal/LoginModal";
import SignUpModal from "../auth/SignupModal/SignupModal";
import { useBookDetails } from "@/app/[bookId]/hooks/useBookDetails";
import { AuthContext } from "@/app/auth/context/AuthContext";
import { toggleFavorite } from "@/app/services/bookService";
import { showErrorToast } from "../services/apiService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BackIcon } from "../assets/icons/config";
interface BookDetailsPageProps {
  params: {
    bookId: string;
  };
}

const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ params }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { authState, login, logout, updateTriggerBooksFetch } =
    useContext(AuthContext);
  const { book, fetchBookDetails } = useBookDetails(params.bookId);
  const router = useRouter();
  useEffect(() => {

    fetchBookDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, params.bookId]);
  const handleToggleFavorite = async () => {
    if (authState.userToken) {
      const response = await toggleFavorite(params.bookId, authState);
      if (response.success) {
        updateTriggerBooksFetch();
        fetchBookDetails();
      } else {
        showErrorToast(`Failed to update favorite status: ${response.error}`);
      }
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
    <main className={styles.main}>
      <div className={styles.loginContainer} onClick={() => router.back()}>
        <div className={styles.login}>
          <Image src={BackIcon} alt="backButton"/>
          <p>Go Back</p>
        </div>
      </div>
      {book ? (
        <div className={styles.bookDetailsContainer}>
          <BookCoverDetails
            onToggleFavorite={handleToggleFavorite}
            bookId={params.bookId}
          />
          <div className={styles.bookDetailsAndReviews}>
            <BookDetails bookId={params.bookId} />
            <Reviews bookId={params.bookId} />
          </div>
        </div>
      ) : null}
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
    </main>
  );
};

export default BookDetailsPage;
