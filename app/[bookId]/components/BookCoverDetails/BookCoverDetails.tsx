import React from "react";
// import RatingComponent from "./rating-component";
import styles from "./styles/BookCoverDetails.module.css";
import Image from "next/image";
import { Book } from "@/app/interfaces/Book";
import {
  FavoriteIconFilled,
  FavoriteIcon,
  BookCover,
  RatingGraph,
  FiveStarRating,
} from "@/app/assets/icons/config";
import Button from "@/app/components/Button/Button";
import { IconPosition } from "@/app/components/Button/constants/interface";

interface BookCoverDetailsProps {
  book: Book;
  onToggleFavorite: () => void;
}
const BookCoverDetails: React.FC<BookCoverDetailsProps> = ({
  book,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.bookCoverParent}>
      <Image
        className={styles.imageIcon}
        width={300}
        height={400}
        loading="lazy"
        alt=""
        src={BookCover}
      />
      <div className={styles.ratingContainer}>
        <div className={styles.ratingLabels}>
          <div className={styles.ratingText}>Ratings</div>
          <div className={styles.ratingCount}>
            from {book.reviews ? `${book.reviews.length} reviews` : `0 review`}{" "}
          </div>
        </div>
        <div className={styles.ratingContainerMain}>
          <div className={styles.ratingStars}>
            <div className={styles.ratingValue}>{book.averageRating}</div>
            <div className={styles.ratingStarIcons}>
              <Image
                src={FiveStarRating}
                alt="average rating"
                width={84}
                height={20}
              />
            </div>
          </div>
          <div className={styles.ratingGraph}>
            {" "}
            <Image
              src={RatingGraph}
              alt="rating graph"
              width={160}
              height={80}
            />
          </div>
        </div>
      </div>
      <button
        className={styles.buttonContainerOuter}
        onClick={onToggleFavorite}
      >
        <div className={styles.buttonContainerInner}>
          <Image
            width={19.5}
            height={19.5}
            alt=""
            src={book.isFavorite ? FavoriteIconFilled : FavoriteIcon}
          />
          <div className={styles.addToFavorites}>
            {book.isFavorite ? "Remove from favorites" : "Add to favorites"}
          </div>
        </div>
      </button>
    </div>
  );
};

export default BookCoverDetails;
