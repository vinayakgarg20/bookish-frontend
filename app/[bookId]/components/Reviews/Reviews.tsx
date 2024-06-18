import React from "react";
import { Review } from "@/app/interfaces/Review";
import ReviewCard from "./Components/ReviewCard/ReviewCard";
import styles from "./styles/Reviews.module.css";
import Image from "next/image";
import { UserProfile } from "@/app/assets/icons/config";

interface ReviewsProps {
  reviews: Review[];
  className?: string;
  onWriteReview: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  className = "",
  onWriteReview,
}) => {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsParent}>
        <div className={styles.reviews}>Reviews</div>
        {reviews && (
          <div className={styles.reviewPlaceholder}>({reviews.length})</div>
        )}
      </div>
      <div className={styles.frameWrapper} onClick={onWriteReview}>
        <div className={styles.addParent}>
          <Image src={UserProfile} className={styles.addIcon} alt="" />
          <div className={styles.writeAReview}>Write a review</div>
        </div>
      </div>
      
      <div className={styles.reviewCardParent}>
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
      
    </div>
  );
};

export default Reviews;
