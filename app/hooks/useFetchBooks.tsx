import { useState, useCallback, useContext } from "react";
import { getBooks, toggleFavorite } from "@/app/services/bookService";
import { Book } from "@/app/interfaces/Book";
import { showErrorToast } from "@/app/services/apiService";
import { AuthContext } from "@/app/auth/context/AuthContext";

interface FetchBooksProps {
  searchQuery?: string;
  page?: number;
  limit?: number;
  status?: "FAV";
  bookId?: string;
  toggleFavorite?: boolean;
  isFavoriteTab?: boolean;
}

export const useFetchBooks = ({
  searchQuery = "",
  page = 1,
  limit = 10,
  status,
  isFavoriteTab,
}: FetchBooksProps) => {
  const { authState,login,logout } = useContext(AuthContext);

  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(
    async (options: FetchBooksProps = {}) => {
      setIsLoading(true);
      setError(null);
      const params = {
        searchQuery: options.searchQuery || searchQuery,
        page: options.page || page,
        limit: options.limit || limit,
        status: options.status,
        isFavoriteTab: isFavoriteTab,
      };
      try {
        let fetchedBooks: Book[] = [];

        if (options.toggleFavorite && options.bookId) {
          const response = await toggleFavorite(options.bookId, authState);
          if (response.success) {
            const updatedBooks = await getBooks(params, authState);
            if (updatedBooks.success) {
              fetchedBooks = updatedBooks.books ? updatedBooks.books : books;
            } else {
              showErrorToast(response.error);
            }
          } else {
            showErrorToast(response.error);
            logout();
          }
        } else {
          const response = await getBooks(params, authState);
          if (response.success) {
            fetchedBooks = response.books ? response.books : books;
          } else {
            showErrorToast(response.error);
          }
        }
        setBooks(fetchedBooks);
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching books.");
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery, page, limit, isFavoriteTab, authState]
  );

  return { books, isLoading, error, fetchBooks };
};
