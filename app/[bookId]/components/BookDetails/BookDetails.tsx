import React, { useContext, useEffect } from "react";
import styles from "./styles/BookDetails.module.css";
import { useBookDetails } from "../../hooks/useBookDetails";
import { AuthContext } from "@/app/auth/context/AuthContext";

interface BookDetailsProps {
  bookId: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ bookId }) => {
  const { book, fetchBookDetails } = useBookDetails(bookId);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    fetchBookDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, authState]);
  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.bookHeadingContainer}>
        <div className={styles.bookName}>{book?.title}</div>
        <div className={styles.bookInfo}>
          <div className={styles.name}>{book?.author}</div>
          <div className={styles.name}>{book?.genre}</div>
        </div>
      </div>
      <p className={styles.bookDescription}>
        {book?.description}
        {book?.description}
      </p>
    </div>
  );
};

export default BookDetails;
