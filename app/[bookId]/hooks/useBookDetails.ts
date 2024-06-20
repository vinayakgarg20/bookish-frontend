import { useState, useCallback, useContext, useEffect } from "react";
import { Book } from "@/app/interfaces/Book";
import { getBookDetails } from "@/app/[bookId]/services/bookService";
import { AuthContext } from "@/app/auth/context/AuthContext";
import { Review } from "@/app/interfaces/Review";

export const useBookDetails = (bookId: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews,setReviews]=useState<Review[]|null>(null);
  const { authState, triggerBooksFetch } = useContext(AuthContext);

  const fetchBookDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getBookDetails(bookId, authState);
      if (response.success) {
        setBook(response.book);
        setReviews(response?.book?.reviews);
      } else {
        setError(response.error);
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching book details.");
    } finally {
      setIsLoading(false);
    }
  }, [bookId, authState]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails, triggerBooksFetch]);

  return { book, isLoading, error, fetchBookDetails,reviews };
};