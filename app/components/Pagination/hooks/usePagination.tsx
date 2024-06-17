import { useMemo } from "react";
import { PaginationProps } from "@/app/components/Pagination/constants/interface";

export const usePagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return {
    isPrevDisabled,
    isNextDisabled,
    pageNumbers,
    handlePrevPage,
    handleNextPage,
    handlePageChange,
  };
};