import React from 'react';
import type { NYTArticle } from '../../types';
import { ArticleCard, EmptyState } from '../molecules';
import { Spinner, SkeletonCard } from '../atoms';
import styles from './ArticleList.module.css';

interface ArticleListProps {
  articles: NYTArticle[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  hasSearched,
}) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingHeader}>
          <Spinner size="large" />
          <p className={styles.loadingText}>Searching articles...</p>
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <EmptyState
        title="Start your search"
        message="Enter keywords to find articles from The New York Times"
        icon="📰"
      />
    );
  }

  if (articles.length === 0) {
    return (
      <EmptyState
        title="No articles found"
        message="Try searching with different keywords or adjust your search criteria"
      />
    );
  }

  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};