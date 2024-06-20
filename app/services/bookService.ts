import { getApi, postApi } from "./apiService";
import { ServiceType } from "@/app/utils/baseUrls";
import { Book } from "@/app/interfaces/Book";
import { AuthStateInterface } from "../auth/context/AuthContext";
interface GetBooksParams {
  searchQuery?: string;
  page?: number;
  limit?: number;
  status?: "FAV";
  isFavoriteTab?: boolean;
}

interface BookServiceResponse {
  success: boolean;
  books?: Book[];
  error?: string;
}

export const getBooks = async (
  params: GetBooksParams,
  authState:AuthStateInterface
): Promise<BookServiceResponse> => {
  const { searchQuery, page, limit, status,isFavoriteTab } = params;
  const userToken = authState.userToken;
  const headers = userToken
    ? { Authorization: `Bearer ${userToken}` }
    : undefined;
  let url = `?page=${page}&limit=${limit}`;

  if (searchQuery) {
    url += `&search=${searchQuery}`;
  }
  if (status || isFavoriteTab===true) {
    url += `&status=FAV`;
  } 
  try {
    const response = await getApi(url, headers, ServiceType.BOOKS);

    if (response?.data) {
      return { success: true, books: response.data };
    } else {
      return {
        success: false,
        error: response.error || "Failed to fetch books",
      };
    }
  } catch (error) {
    return { success: false, error: "An error occurred while fetching books." };
  }
};

export const toggleFavorite = async (
  bookId: string,
  authState:AuthStateInterface
): Promise<BookServiceResponse> => {
  try {
    const userToken = authState.userToken;
    const headers = userToken
      ? { Authorization: `Bearer ${userToken}` }
      : undefined;

    const response = await postApi(
      `/${bookId}/toggle-favorite`,
      {},
      headers,
      ServiceType.BOOKS
    );

    if (response?.data) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.error || "Failed to toggle favorite",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "An error occurred while toggling favorite.",
    };
  }
};
