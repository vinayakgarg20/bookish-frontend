import { postApi, putApi, deleteApi, getApi } from "@/app/services/apiService";
import { ServiceType } from "@/app/utils/baseUrls";

export const createReview = async (
  bookId: string,
  review: { rating: number; comment?: string }
) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

    const response = await postApi(
      `${bookId}/add-review`,
      review,
      headers,
      ServiceType.BOOKS
    );

    if (response.data) {
      // Refetch book details after creating the review
      const bookResponse = await getApi(bookId, headers, ServiceType.BOOKS);
      if (bookResponse?.data) {
        return {
          success: true,
          review: response.data,
          bookDetails: bookResponse.data,
        };
      } else {
        return {
          success: true,
          review: response.data,
        };
      }
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    console.error("Error creating review:", error);
    return {
      success: false,
      error: "An error occurred while creating the review.",
    };
  }
};

export const updateReview = async (
  bookId: string,
  reviewId: string,
  updatedReview: { rating?: number; comment?: string }
) => {
  try {
    const userToken = localStorage.getItem("userToken");
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
      // Refetch book details after updating the review
      const bookResponse = await getApi(bookId, headers, ServiceType.BOOKS);
      if (bookResponse?.data) {
        return {
          success: true,
          review: response.data,
          bookDetails: bookResponse.data,
        };
      } else {
        return {
          success: true,
          review: response.data,
        };
      }
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    console.error("Error updating review:", error);
    return {
      success: false,
      error: "An error occurred while updating the review.",
    };
  }
};

export const deleteReview = async (bookId: string, reviewId: string) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const headers = userToken
      ? { Authorization: `Bearer ${userToken}` }
      : undefined;

    const response = await deleteApi(
      `${bookId}/reviews/${reviewId}`,
      {},
      ServiceType.BOOKS,
      headers
    );
    console.log(response,"deleteeeeee");
    if (response?.data) {
      // Refetch book details after deleting the review
      const bookResponse = await getApi(bookId, headers, ServiceType.BOOKS);
      if (bookResponse?.data) {
        return {
          success: true,
          bookDetails: bookResponse.data,
        };
      } else {
        return {
          success: true,
        };
      }
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      error: "An error occurred while deleting the review.",
    };
  }
};
