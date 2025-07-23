import React from 'react';
import type { NYTArticle } from '../../types';
import { formatDate, getAuthorNames, getThumbnailUrl, truncateText } from '../../utils/formatters';
import { getCategoryInfo, getReadingTime, isNewArticle, getAuthorInitials } from '../../utils/articleHelpers';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: NYTArticle;
  variant?: 'standard' | 'featured' | 'compact';
  size?: 'small' | 'medium' | 'large';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  variant = 'standard',
  size = 'medium'
}) => {
  // Add validation for required fields
  if (!article || !article.headline?.main || !article.web_url) {
    console.warn('Invalid article data:', article);
    return null;
  }

  const thumbnailUrl = getThumbnailUrl(article.multimedia);
  const authors = getAuthorNames(article.byline);
  const publicationDate = formatDate(article.pub_date);
  const snippet = truncateText(article.snippet || article.abstract || '', variant === 'featured' ? 200 : 120);
  const categoryInfo = getCategoryInfo(article.section_name);
  const readingTime = getReadingTime(snippet);
  const isNew = isNewArticle(article.pub_date || '');
  const authorInitials = getAuthorInitials(authors || 'Unknown Author');

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  const cardClasses = [
    styles.card,
    styles[variant],
    styles[size],
    thumbnailUrl ? styles.hasImage : styles.noImage
  ].filter(Boolean).join(' ');

  return (
    <article 
      className={cardClasses}
      onClick={handleReadMore}
      style={{
        '--category-color': categoryInfo.color,
        '--category-rgb': categoryInfo.color.replace('var(--color-', '').replace(')', '')
      } as React.CSSProperties}
    >
      {/* New Article Badge */}
      {isNew && (
        <div className={styles.newBadge}>
          <span className={styles.newIcon}>⚡</span>
          Breaking
        </div>
      )}

      {/* Category Badge */}
      <div className={styles.categoryBadge}>
        <span className={styles.categoryIcon}>{categoryInfo.icon}</span>
        <span className={styles.categoryName}>{categoryInfo.name}</span>
      </div>

      {/* Image Container with Overlay */}
      {thumbnailUrl && (
        <div className={styles.imageContainer}>
          <img
            src={thumbnailUrl}
            alt={article.headline.main}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.imageOverlay} />
          <div className={styles.imageGradient} />
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {/* Author Avatar & Meta */}
        <div className={styles.authorSection}>
          <div className={styles.authorAvatar}>
            {authorInitials}
          </div>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{authors || 'Staff Writer'}</span>
            <div className={styles.metaInfo}>
              <time className={styles.date}>{publicationDate}</time>
              <span className={styles.dot}>•</span>
              <span className={styles.readingTime}>{readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className={styles.title}>
          {article.headline.main}
        </h2>

        {/* Snippet */}
        {snippet && (
          <p className={styles.snippet}>{snippet}</p>
        )}

        {/* Engagement & Actions */}
        <div className={styles.footer}>
          <div className={styles.engagement}>
            <button className={styles.engagementBtn}>
              <span className={styles.heartIcon}>❤️</span>
              <span>{Math.floor(Math.random() * 500) + 50}</span>
            </button>
            <button className={styles.engagementBtn}>
              <span className={styles.commentIcon}>💬</span>
              <span>{Math.floor(Math.random() * 100) + 10}</span>
            </button>
            <button className={styles.engagementBtn}>
              <span className={styles.shareIcon}>🔗</span>
              Share
            </button>
          </div>
          
          <button className={styles.readMoreBtn}>
            <span>Read Full Story</span>
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={styles.hoverGlow} />
    </article>
  );
};