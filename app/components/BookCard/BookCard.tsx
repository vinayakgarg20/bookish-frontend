// components/BookCard/BookCard.tsx
import React from "react";
import { Book } from "@/app/interfaces/Book";
import styles from "./styles/BookCard.module.css";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  onFavoriteToggle: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onFavoriteToggle }) => {
  return (
    <div className={styles.card}>
      <Image src={book.coverImage} alt={book.title} className={styles.coverImage} />
      <div className={styles.details}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`${styles.star} ${index < Math.floor(book.averageRating) ? styles.filled : ""}`}
            >
              &#9733;
            </span>
          ))}
        </div>
        <button
          className={`${styles.favoriteButton} ${book.isFavorite ? styles.isFavorite : ""}`}
          onClick={() => onFavoriteToggle(book.id)}
        >
          {book.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;