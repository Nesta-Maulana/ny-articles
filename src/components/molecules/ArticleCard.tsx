import React from 'react';
import type { NYTArticle } from '../../types';
import { formatDate, getAuthorNames, getThumbnailUrl, truncateText } from '../../utils/formatters';
import { Button } from '../atoms';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: NYTArticle;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  // Add validation for required fields
  if (!article || !article.headline?.main || !article.web_url) {
    console.warn('Invalid article data:', article);
    return null;
  }

  const thumbnailUrl = getThumbnailUrl(article.multimedia);
  const authors = getAuthorNames(article.byline);
  const publicationDate = formatDate(article.pub_date);
  const snippet = truncateText(article.snippet || article.abstract || '', 150);

  const handleReadMore = () => {
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className={styles.card}>
      {thumbnailUrl && (
        <div className={styles.imageContainer}>
          <img
            src={thumbnailUrl}
            alt={article.headline.main}
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{article.headline.main}</h2>
        <div className={styles.metadata}>
          <span className={styles.author}>{authors}</span>
          <span className={styles.separator}>•</span>
          <time className={styles.date}>{publicationDate}</time>
        </div>
        {snippet && <p className={styles.snippet}>{snippet}</p>}
        <div className={styles.footer}>
          {article.section_name && (
            <span className={styles.section}>{article.section_name}</span>
          )}
          <Button onClick={handleReadMore} size="small" variant="secondary">
            Read More
          </Button>
        </div>
      </div>
    </article>
  );
};