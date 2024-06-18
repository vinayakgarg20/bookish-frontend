"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/app/interfaces/Book";
import { Review } from "@/app/interfaces/Review";
import { getApi, postApi } from "@/app/services/apiService";
import { ServiceType } from "@/app/constants/baseUrls";
import BookDetails from "@/app/[bookId]/components/BookDetails/BookDetails";
import Reviews from "@/app/[bookId]/components/Reviews/Reviews";
import BookCoverDetails from "@/app/[bookId]/components/BookCoverDetails/BookCoverDetails";
import styles from "./styles/BookPage.module.css";

interface BookDetailsPageProps {
  params: {
    bookId: string;
  };
}

const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ params }) => {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getApi(
          `/${params.bookId}`,
          undefined,
          ServiceType.BOOKS
        );

        if (response?.data) {
          setBook(response.data);
          setReviews(response.data.reviews || []);
        } else {
          console.error("Failed to fetch book details:", response.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchBookDetails();
  }, [params.bookId]);

  const handleWriteReview = () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.push("/auth/login");
    } else {
      // Implement your logic for writing a review
    }
  };

  const handleToggleFavorite = async () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        await postApi(
          `/${params.bookId}/toggle-favorite`,
          {},
          { Authorization: `Bearer ${userToken}` },
          ServiceType.BOOKS
        );

        // Refetch the book details to update the favorite status
        const response = await getApi(
          `/${params.bookId}`,
          { Authorization: `Bearer ${userToken}` },
          ServiceType.BOOKS
        );

        if (response?.data) {
          setBook(response.data);
        } else {
          console.error("Failed to update favorite status:", response.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <main className={styles.main}>
      {book && (
        <div className={styles.bookDetailsContainer}>
          <BookCoverDetails
            onToggleFavorite={handleToggleFavorite}
            book={book}
          />
          <div className={styles.bookDetailsAndReviews}>
            <BookDetails book={book} className={styles.bookDetails} />
            <Reviews
              reviews={reviews}
              className={styles.reviews}
              onWriteReview={handleWriteReview}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default BookDetailsPage;
