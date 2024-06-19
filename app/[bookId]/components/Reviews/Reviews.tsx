import React, { useState } from "react";
import { Review } from "@/app/interfaces/Review";
import ReviewCard from "./Components/ReviewCard/ReviewCard";
import styles from "./styles/Reviews.module.css";
import Image from "next/image";
import {
  StarIconEmpty,
  UserProfile,
  YellowStarIcon,
} from "@/app/assets/icons/config";
import { useRouter } from "next/navigation";
import {
  createReview,
  updateReview,
  deleteReview,
} from "@/app/[bookId]/components/Reviews/services/reviewServices";
import { showErrorToast } from "@/app/services/apiService";
import { useAuth } from "@/app/hooks/useAuth";
import LoginModal from "@/app/auth/components/LoginModal/LoginModal";
import SignupModal from "@/app/auth/components/SignupModal/SignupModal";

interface ReviewsProps {
  bookId: string;
  reviews: Review[];
  onReviewsUpdated: (reviews: Review[]) => void;
  isAuthenticated: boolean;
}

const Reviews: React.FC<ReviewsProps> = ({
  bookId,
  reviews,
  onReviewsUpdated,
  isAuthenticated,
}) => {
  const router = useRouter();
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [updatedReviews, setUpdatedReviews] = useState<Review[]>(reviews);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { authState, login } = useAuth();

  const handleWriteReview = () => {
    if (authState) {
      console.log("Opening write review modal");
    } else {
      openLoginModal();
    }
  };

  const handleNewReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const handleNewRatingChange = (rating: number) => {
    setNewRating(rating);
  };
  const handleCreateReview = async () => {
    if (authState) {
      try {
        const newReviewData = {
          rating: newRating,
          comment: newReview,
        };

        const response = await createReview(bookId, newReviewData);

        if (response.success && response.bookDetails) {
          setUpdatedReviews(response.bookDetails.reviews);
        } else {
          showErrorToast(response.error);
        }
      } catch (error: any) {
        showErrorToast(error.message);
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
  const handleDeleteReview = async (reviewId: string) => {
    const response = await deleteReview(bookId, reviewId);
    if (response.success && response.bookDetails) {
      setUpdatedReviews(response.bookDetails.reviews);
    } else {
      console.error("Failed to delete review:", response.error);
    }
  };

  const handleEditReview = async (updatedReview: Review) => {
    try {
      const response = await updateReview(bookId, updatedReview._id, {
        rating: updatedReview.rating,
        comment: updatedReview.comment,
      });

      if (response.success && response.bookDetails) {
        setUpdatedReviews(response.bookDetails.reviews);
      } else {
        showErrorToast(response.error);
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };
  console.log(updatedReviews, "updatedReviews");
  return (
    <div className={styles.container}>
      <div className={styles.reviewsParent}>
        <div className={styles.reviews}>Reviews</div>
        <div className={styles.reviewPlaceholder}>
          {" "}
          ({updatedReviews ? updatedReviews.length : 0})
        </div>
      </div>
      {authState ? (
        <div className={styles.writeReviewButton}>
          <div className={styles.userInfo}>
            <Image src={UserProfile} alt="User Icon" width={24} height={24} />
            <div className={styles.username}>
              {localStorage.getItem("userName")}
            </div>
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
              onClick={handleCreateReview}
            >
              <div>Submit</div>
            </button>
          </div>
        </div>
      ) : (
        <button
          className={styles.writeReviewButton}
          onClick={handleWriteReview}
        >
          <div className={styles.writeReviewInner}>
            <p className={styles.reviewText}> Write your review here</p>
          </div>
        </button>
      )}
      <div className={styles.reviewCardParent}>
        {updatedReviews.length > 0 ? (
          updatedReviews.map((review) => (
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

export default Reviews;
