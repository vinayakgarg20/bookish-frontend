"use client";
import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "./Components/ReviewCard/ReviewCard";
import styles from "./styles/Reviews.module.css";
import Image from "next/image";
import {
  StarIconEmpty,
  UserProfile,
  YellowStarIcon,
} from "@/app/assets/icons/config";
import { AuthContext } from "@/app/auth/context/AuthContext";
import LoginModal from "@/app/auth/LoginModal/LoginModal";
import SignUpModal from "@/app/auth/SignupModal/SignupModal";
import { useBookDetails } from "../../hooks/useBookDetails";
import { useReviews } from "@/app/[bookId]/components/Reviews/hooks/useReviews";

interface ReviewsProps {
  bookId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { authState, login } = useContext(AuthContext);
  const {book, reviews, fetchBookDetails } = useBookDetails(bookId);
  const {
    newReview,
    newRating,
    handleNewReviewChange,
    handleNewRatingChange,
    handleCreateReview,
    handleDeleteReview,
    handleEditReview,
  } = useReviews(bookId, fetchBookDetails);
  useEffect(() => {
    fetchBookDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, authState]);
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

  const handleSubmitReview = () => {
    if (authState.isAuthenticated) {
      handleCreateReview();
    } else {
      openLoginModal();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.reviewsParent}>
        <div className={styles.reviews}>Reviews</div>
        <div className={styles.reviewPlaceholder}> ({reviews?.length})</div>
      </div>
      {authState.isAuthenticated ? (
        <div className={styles.writeReviewButton}>
          <div className={styles.userInfo}>
            <Image src={UserProfile} alt="User Icon" width={24} height={24} />
            <div className={styles.username}>{authState.userName}</div>
            <div className={styles.giveRating}>
              {Array.from({ length: 5 }, (_, index) => (
                <div className={styles.ratingIcon} key={index}>
                  <Image
                    key={index}
                    src={index < newRating ? YellowStarIcon : StarIconEmpty}
                    alt="Star"
                    width={18}
                    height={18}
                    onClick={() => handleNewRatingChange(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.writeReviewContainer}>
            <textarea
              className={styles.reviewText}
              placeholder="Write your review here"
              value={newReview}
              onChange={handleNewReviewChange}
            />
            <button
              className={styles.submitButton}
              onClick={handleSubmitReview}
            >
              <div>Submit</div>
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.writeReviewButton}
          onClick={handleSubmitReview}
        >
          <div className={styles.writeReviewInner}>
            <p className={styles.reviewText}> Write your review here</p>
          </div>
        </button>
      )}
      <div className={styles.reviewCardParent}>
        {reviews ? (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEditReview={handleEditReview}
              onDeleteReview={handleDeleteReview}
            />
          ))
        ) : (
          <div className={styles.noReviewsMessage}>No reviews yet.</div>
        )}
      </div>
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

export default Reviews;
