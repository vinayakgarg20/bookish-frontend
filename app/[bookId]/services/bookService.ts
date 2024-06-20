import { getApi } from "@/app/services/apiService";
import { ServiceType } from "@/app/utils/baseUrls";
import { AuthStateInterface } from "@/app/auth/context/AuthContext";

export const getBookDetails = async (bookId: string, authState: AuthStateInterface) => {
  try {
    const userToken = authState.userToken;
    const headers = userToken ? { Authorization: `Bearer ${userToken}` } : undefined;

    const response = await getApi(`${bookId}`, headers, ServiceType.BOOKS);
    if (response?.data) {
      return {
        success: true,
        book: response.data,
      };
    } else {
      return {
        success: false,
        error: response.error,
      };
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
    return {
      success: false,
      error: "An error occurred while fetching book details.",
    };
  }
};