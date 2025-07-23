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
          <p className={styles.loadingText}>Discovering amazing stories...</p>
        </div>
        <div className={styles.articlesGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.gridItem}>
              <SkeletonCard />
            </div>
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
        icon="🔍"
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.articlesGrid}>
        {articles.map((article, index) => (
          <div
            key={article._id || `article-${index}`}
            className={styles.gridItem}
            style={{
              animationDelay: `${Math.min(index * 0.1, 1)}s`
            }}
          >
            <ArticleCard 
              article={article}
            />
          </div>
        ))}
      </div>
    </div>
  );
};