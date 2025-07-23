import React from 'react';
import { Button } from '../atoms';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
  isLoading = false,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        Showing {((currentPage - 1) * resultsPerPage) + 1} - {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          size="small"
          variant="secondary"
        >
          Previous
        </Button>
        
        <div className={styles.pageNumbers}>
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          size="small"
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};