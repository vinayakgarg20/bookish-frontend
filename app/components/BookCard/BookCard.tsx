import React from "react";
import { Book } from "@/app/interfaces/Book";
import styles from "./styles/BookCard.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookCover,
  BookCardCover,
  FavoriteIcon,
  FavoriteIconFilled,
  YellowStarIcon,
} from "@/app/assets/icons/config";

interface BookCardProps {
  book: Book;
  onFavoriteToggle: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onFavoriteToggle }) => {
  const router = useRouter();
  const bookId = book._id;
  return (
    <div className={styles.card}>
      <div className={styles.coverContainer}>
        <Image
          onClick={() => {
            router.push(`/${bookId}`);
          }}
          src={BookCardCover}
          width={200}
          height={300}
          alt={book.title}
        />
        <div
          className={styles.toggleFavorite}
          onClick={() => onFavoriteToggle(book._id)}
        >
          <Image
            src={book.isFavorite ? FavoriteIconFilled : FavoriteIcon}
            width={20}
            height={20}
            alt={"toggle favorite"}
          />
        </div>
      </div>
      <div
        className={styles.details}
        onClick={() => {
          router.push(`/${bookId}`);
        }}
      >
        <div className={styles.title}>{book.title}</div>
        <div className={styles.author}>{book.author}</div>
        <div className={styles.ratingContainer}>
          <div className={styles.rating}>
            <div className={styles.ratingIcon}>
              <Image src={YellowStarIcon} width={14} height={14} alt="rating" />
            </div>
            <div className={styles.ratingNumber}>{book.averageRating}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
