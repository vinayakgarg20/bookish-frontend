import React from "react";
import { usePagination } from "@/app/components/Pagination/hooks/usePagination";
import styles from "@/app/components/Pagination/styles/pagination.module.css";
import Image from "next/image";
import { BackIcon, FrontIcon } from "@/app/assets/icons/config";
import { PaginationProps } from "@/app/components/Pagination/constants/interface";

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const {
    isPrevDisabled,
    isNextDisabled,
    pageNumbers,
    handlePrevPage,
    handleNextPage,
    handlePageChange,
  } = usePagination({ currentPage, totalPages, onPageChange });

  if (totalPages === 0) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.arrowButton} ${isPrevDisabled ? styles.disabled : ""}`}
        onClick={handlePrevPage}
        disabled={isPrevDisabled}
      >
        <Image src={BackIcon} alt="Previous Page" className={`${styles.icon} ${styles.prevIcon}`} />
      </button>
      <div className={styles.pageNumberContainer}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`${styles.arrowButton} ${isNextDisabled ? styles.disabled : ""}`}
        onClick={handleNextPage}
        disabled={isNextDisabled}
      >
        <Image src={FrontIcon} alt="Next Page" className={`${styles.icon} ${styles.nextIcon}`} />
      </button>
    </div>
  );
};

export default Pagination;