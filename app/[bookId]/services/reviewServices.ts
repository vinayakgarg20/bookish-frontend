import { AuthStateInterface } from "@/app/auth/context/AuthContext";
import { postApi, showErrorToast, putApi, deleteApi } from "@/app/services/apiService";
import { ServiceType } from "@/app/utils/baseUrls";

export const createReview = async (
  bookId: string,
  review: { rating: number; comment?: string },
  authState: AuthStateInterface,
  updateTriggerBooksFetch: () => void
) => {
  try {
    const userToken = authState.userToken;
    const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};
    const response = await postApi(
      `${bookId}/add-review`,
      review,
      headers,
      ServiceType.BOOKS
    );
    if (response.data) {
      updateTriggerBooksFetch();
      return {
        success: true,
        review: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    showErrorToast(`Error creating review: ${error}`);
    return {
      success: false,
      error: "An error occurred while creating the review.",
    };
  }
};

export const updateReview = async (
  bookId: string,
  reviewId: string,
  updatedReview: { rating?: number; comment?: string },
  authState: AuthStateInterface,
  updateTriggerBooksFetch: () => void
) => {
  try {
    const userToken = authState.userToken;
    const headers = userToken
      ? { Authorization: `Bearer ${userToken}` }
      : undefined;
    const response = await putApi(
      `${bookId}/reviews/${reviewId}`,
      updatedReview,
      headers,
      ServiceType.BOOKS
    );
    if (response.data) {
      updateTriggerBooksFetch();
      return {
        success: true,
        review: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    showErrorToast(`Error updating review: ${error}`);
    return {
      success: false,
      error: "An error occurred while updating the review.",
    };
  }
};

export const deleteReview = async (bookId: string, reviewId: string, authState: AuthStateInterface,updateTriggerBooksFetch: () => void) => {
  try {
    const userToken = authState.userToken;
    const headers = userToken
      ? { Authorization: `Bearer ${userToken}` }
      : undefined;
    const response = await deleteApi(
      `${bookId}/reviews/${reviewId}`,
      {},
      ServiceType.BOOKS,
      headers
    );
    if (response?.data) {
      updateTriggerBooksFetch();
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    showErrorToast(`Error deleting review: ${error}`);
    return {
      success: false,
      error: "An error occurred while deleting the review.",
    };
  }
};