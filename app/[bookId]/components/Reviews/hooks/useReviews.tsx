// useReviews.ts
import { useState, useCallback, useContext } from "react";
import { Review } from "@/app/interfaces/Review";
import { AuthContext } from "@/app/auth/context/AuthContext";
import {
  createReview,
  updateReview,
  deleteReview,
} from "@/app/[bookId]/services/reviewServices";
import { showErrorToast } from "@/app/services/apiService";

export const useReviews = (bookId: string, fetchBookDetails: () => void) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { authState } = useContext(AuthContext);

  const handleNewReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const handleNewRatingChange = (rating: number) => {
    setNewRating(rating);
  };

  const handleCreateReview = useCallback(async () => {
    try {
      const newReviewData = {
        rating: newRating,
        comment: newReview,
      };

      const response = await createReview(bookId, newReviewData, authState);
      if (response.success) {
        fetchBookDetails();
        setNewReview("");
        setNewRating(0);
      } else {
        showErrorToast(response.error);
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  }, [authState, bookId, fetchBookDetails, newRating, newReview]);

  const handleDeleteReview = useCallback(async (reviewId: string) => {
    const response = await deleteReview(bookId, reviewId, authState);
    if (response.success) {
      fetchBookDetails();
    } else {
      showErrorToast(`Failed to delete review: ${response.error}`);
    }
  }, [authState, bookId, fetchBookDetails]);

  const handleEditReview = useCallback(async (updatedReview: Review) => {
    try {
      const response = await updateReview(
        bookId,
        updatedReview._id,
        {
          rating: updatedReview.rating,
          comment: updatedReview.comment,
        },
        authState
      );

      if (response.success) {
        fetchBookDetails();
      } else {
        showErrorToast(response.error);
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  }, [authState, bookId, fetchBookDetails]);

  return {
    newReview,
    newRating,
    handleNewReviewChange,
    handleNewRatingChange,
    handleCreateReview,
    handleDeleteReview,
    handleEditReview,
  };
};