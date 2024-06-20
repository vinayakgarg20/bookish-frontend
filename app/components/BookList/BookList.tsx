import React from "react";
import { Book } from "@/app/interfaces/Book";
import BookCard from "../BookCard/BookCard";
import styles from "./styles/BookList.module.css";

interface BookListProps {
  books: Book[];
  onFavoriteToggle: (bookId: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onFavoriteToggle }) => {
  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard key={book._id} book={book} onFavoriteToggle={onFavoriteToggle} />
      ))}
    </div>
  );
};

export default BookList;