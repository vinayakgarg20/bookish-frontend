import React from "react";
import { Book } from "@/app/interfaces/Book";
import styles from "./styles/BookDetails.module.css";

interface BookDetailsProps {
  book: Book;
  className?: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, className = "" }) => {
  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.bookHeadingContainer}>
        <div className={styles.bookName}>{book.title}</div>
        <div className={styles.bookInfo}>
          <div className={styles.name}>{book.author}</div>
          <div className={styles.name}>{book.genre}</div>
        </div>
      </div>
      <p className={styles.bookDescription}>{book.description}{book.description}{book.description}{book.description}</p>
    </div>
  );
};

export default BookDetails;
