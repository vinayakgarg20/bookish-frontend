import React from "react";
import { Review } from "@/app/interfaces/Review";
import styles from "./styles/ReviewCard.module.css";
import Image from "next/image";
import {
  DividerIcon,
  UserIcon,
  YellowStarIcon,
} from "@/app/assets/icons/config";

interface ReviewCardProps {
  review: Review;
}
interface RatingCardProps {
  rating: number;
}
export const RatingCardSmall: React.FC<RatingCardProps> = ({ rating }) => {
  return (
    <div className={styles.rating}>
      <div className={styles.ratingIcon}>
        <Image
          src={YellowStarIcon}
          width={14}
          height={14}
          color="linear-gradient(
    350deg,
    #9c1652 -205.99%,
    #d6224d -111.24%,
    #ed5c4a -7.61%,
    #f8ac4e 90.1%
  );"
          alt="rating"
        />
      </div>
      <div className={styles.ratingNumber}>{rating}</div>
    </div>
  );
};
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.userRating}>
        <div className={styles.userInfo}>
          <Image
            className={styles.userAvatar}
            src={UserIcon}
            alt={`${review.username}'s avatar`}
          />
          <div className={styles.username}>{review.username}</div>
        </div>
        <Image src={DividerIcon} className={styles.dividerIcon} alt="divider" />
        <div className={styles.reviewDate}>{review.createdAt}</div>
        <Image src={DividerIcon} className={styles.dividerIcon} alt="divider" />
        <RatingCardSmall rating={review.rating} />
      </div>
      <div className={styles.userComment}>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
