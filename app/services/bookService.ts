import { getApi, postApi } from "./apiService";
import { ServiceType } from "@/app/utils/baseUrls";
import { Book } from "@/app/interfaces/Book";

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
  params: GetBooksParams
): Promise<BookServiceResponse> => {
  const { searchQuery, page, limit, status,isFavoriteTab } = params;
  const userToken = localStorage.getItem("userToken");
  const headers = userToken
    ? { Authorization: `Bearer ${userToken}` }
    : undefined;
  let url = `?page=${page}&limit=${limit}`;

  if (searchQuery) {
    url += `&search=${searchQuery}`;
  }
  console.log(params,"🥲✅");
  if (status || isFavoriteTab===true) {
    url += `&status=FAV`;
  } 
  console.log(url,params.isFavoriteTab,"showURLLLLLLLLL");
  try {
    const response = await getApi(url, headers, ServiceType.BOOKS);

    if (response?.data) {
      console.log(response.data,"bokss!!!")
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
  bookId: string
): Promise<BookServiceResponse> => {
  try {
    const userToken = localStorage.getItem("userToken");
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
