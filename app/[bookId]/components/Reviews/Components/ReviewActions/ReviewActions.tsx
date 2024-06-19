import React from 'react';
import styles from './styles/ReviewActions.module.css';

interface ReviewActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ReviewActions: React.FC<ReviewActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className={styles.actionContainer}>
      <div className={styles.button} onClick={onEdit}>
        Edit
      </div>
      <div className={styles.button} onClick={onDelete}>
        Delete
      </div>
    </div>
  );
};

export default ReviewActions;