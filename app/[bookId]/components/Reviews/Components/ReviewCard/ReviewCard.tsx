import React, { useState } from "react";
import { Review } from "@/app/interfaces/Review";
import styles from "./styles/ReviewCard.module.css";
import Image from "next/image";
import {
  DividerIcon,
  UserIcon,
  VerticalEllipsis,
  YellowStarIcon,
} from "@/app/assets/icons/config";
import ReviewActions from "../ReviewActions/ReviewActions";

interface ReviewCardProps {
  review: Review;
  onEditReview: (review: Review) => void;
  onDeleteReview: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onEditReview,
  onDeleteReview,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [viewDetails, setViewDetails] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedComment(review.comment);
  };

  const handleSubmit = () => {
    onEditReview({ ...review, comment: editedComment });
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className={styles.reviewCard}>
          <div className={styles.userInfo}>
            <Image src={UserIcon} alt="User Icon" width={24} height={24} />
            <span className={styles.username}>{review.username}</span>
            <div className={styles.divider}>
              <Image src={DividerIcon} alt="Divider" width={16} height={16} />
            </div>
            <span className={styles.date}>{review.createdAt}</span>
            <div className={styles.divider}>
              <Image src={DividerIcon} alt="Divider" width={16} height={16} />
            </div>
            <div className={styles.rating}>
              <div className={styles.ratingIcon}>
                <Image
                  src={YellowStarIcon}
                  width={14}
                  height={14}
                  alt="rating"
                />
              </div>
              <div className={styles.ratingNumber}>{review.rating}</div>
            </div>
          </div>
          <div className={styles.writeReviewContainer}>
            <textarea
              className={styles.reviewText}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />

            <div className={styles.editReviewActions}>
              <button className={styles.editButton} onClick={handleCancel}>
                <div>Cancel</div>
              </button>
              <button className={styles.editButton} onClick={handleSubmit}>
                <div>Submit</div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.reviewCard}>
          <div className={styles.userInfo}>
            <Image src={UserIcon} alt="User Icon" width={24} height={24} />
            <span className={styles.username}>{review.username}</span>
            <div className={styles.divider}>
              <Image src={DividerIcon} alt="Divider" width={16} height={16} />
            </div>
            <span className={styles.date}>{review.createdAt}</span>
            <div className={styles.divider}>
              <Image src={DividerIcon} alt="Divider" width={16} height={16} />
            </div>
            <div className={styles.rating}>
              <div className={styles.ratingIcon}>
                <Image
                  src={YellowStarIcon}
                  width={14}
                  height={14}
                  alt="rating"
                />
              </div>
              <div className={styles.ratingNumber}>{review.rating}</div>
            </div>
          </div>
          <div className={styles.userComment}>
            <p className={styles.comment}>{review.comment}</p>
            {review.isAuthorizedUser && (
              <div className={styles.userActions}>
                <Image
                  src={VerticalEllipsis}
                  alt="Vertical Ellipsis"
                  onClick={() => {
                    setViewDetails(!viewDetails);
                  }}
                />
                {viewDetails && (
                  <ReviewActions
                    onEdit={handleEdit}
                    onDelete={() => onDeleteReview(review._id)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;