import React, { useContext, useEffect } from "react";
import styles from "./styles/BookCoverDetails.module.css";
import Image from "next/image";
import {
  FavoriteIconFilled,
  FavoriteIcon,
  BookCover,
  RatingGraph,
  YellowStarIcon,
  StarIconEmpty,
} from "@/app/assets/icons/config";
import { useBookDetails } from "../../hooks/useBookDetails";
import { AuthContext } from "@/app/auth/context/AuthContext";

interface BookCoverDetailsProps {
  bookId: string;
  onToggleFavorite: () => void;
}

const BookCoverDetails: React.FC<BookCoverDetailsProps> = ({
  bookId,
  onToggleFavorite,
}) => {
  const { book, fetchBookDetails } = useBookDetails(bookId);
  const { authState, updateTriggerBooksFetch } = useContext(AuthContext);

  useEffect(() => {
    fetchBookDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, bookId, updateTriggerBooksFetch]);

  const renderStarIcons = () => {
    const averageRating = Math.floor(book?.averageRating || 0);
    return Array.from({ length: 5 }, (_, index) => (
      <div className={styles.ratingIcon} key={index}>
        <Image
          key={index}
          src={index < averageRating ? YellowStarIcon : StarIconEmpty}
          alt="Star"
          width={18}
          height={18}
        />
      </div>
    ));
  };

  return (
    <div className={styles.bookCoverParent}>
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
              from{" "}
              {book?.reviews ? `${book.reviews.length} reviews` : `0 review`}{" "}
            </div>
          </div>
          <div className={styles.ratingContainerMain}>
            <div className={styles.ratingStars}>
              <div className={styles.ratingValue}>
                {Math.floor(book?.averageRating || 0)}
              </div>
              <div className={styles.ratingStarIcons}>{renderStarIcons()}</div>
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
              src={book?.isFavorite ? FavoriteIconFilled : FavoriteIcon}
            />
            <div className={styles.addToFavorites}>
              {book?.isFavorite ? "Remove from favorites" : "Add to favorites"}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BookCoverDetails;
