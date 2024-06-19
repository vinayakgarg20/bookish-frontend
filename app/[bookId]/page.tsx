"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/app/interfaces/Book";
import { Review } from "@/app/interfaces/Review";
import { getApi, postApi } from "@/app/services/apiService";
import { ServiceType } from "@/app/utils/baseUrls";
import BookDetails from "@/app/[bookId]/components/BookDetails/BookDetails";
import Reviews from "@/app/[bookId]/components/Reviews/Reviews";
import BookCoverDetails from "@/app/[bookId]/components/BookCoverDetails/BookCoverDetails";
import styles from "./styles/BookPage.module.css";
import LoginModal from "../auth/components/LoginModal/LoginModal";
import SignupModal from "../auth/components/SignupModal/SignupModal";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../AuthContext";

interface BookDetailsPageProps {
  params: {
    bookId: string;
  };
}

const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ params }) => {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { authState, login, logout } = useAuth();
  const { triggerBooksFetch } = useContext(AuthContext);

  useEffect(() => {
    fetchBookDetails();
  }, [params.bookId, authState.isAuthenticated, triggerBooksFetch]);

  const fetchBookDetails = async () => {
    const userToken = authState.userToken;
    const headers = userToken ? { Authorization: `Bearer ${userToken}` } : undefined;

    try {
      const response = await getApi(`${params.bookId}`, headers, ServiceType.BOOKS);

      if (response?.data) {
        setBook(response.data);
        setReviews(response.data.reviews || []);
      } else {
        console.error("Failed to fetch book details:", response.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleToggleFavorite = async () => {
    const userToken = authState.userToken;
    if (userToken) {
      const headers = { Authorization: `Bearer ${userToken}` };

      try {
        await postApi(`${params.bookId}/toggle-favorite`, {}, headers, ServiceType.BOOKS);

        const response = await getApi(`${params.bookId}`, headers, ServiceType.BOOKS);

        if (response?.data) {
          setBook(response.data);
        } else {
          console.error("Failed to update favorite status:", response.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      openLoginModal();
    }
  };

  const handleReviewsUpdated = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
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
    triggerBooksFetch(); // Trigger book details fetch after login
  };

  const handleSignupSuccess = (userToken: string) => {
    login(userToken);
    closeSignupModal();
    triggerBooksFetch(); // Trigger book details fetch after signup
  };

  return (
    <main className={styles.main}>
      {book && (
        <div className={styles.bookDetailsContainer}>
          <BookCoverDetails onToggleFavorite={handleToggleFavorite} book={book} />
          <div className={styles.bookDetailsAndReviews}>
            <BookDetails book={book} className={styles.bookDetails} />
            <Reviews
              bookId={params.bookId}
              reviews={reviews}
              onReviewsUpdated={handleReviewsUpdated}
              isAuthenticated={authState.isAuthenticated}
            />
          </div>
        </div>
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
    </main>
  );
};

export default BookDetailsPage;