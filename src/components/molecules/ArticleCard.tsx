import React from 'react';
import type { NYTArticle } from '../../types';
import { formatDate, getAuthorNames, getThumbnailUrl, truncateText } from '../../utils/formatters';
import { getCategoryInfo, getReadingTime, isNewArticle, getAuthorInitials } from '../../utils/articleHelpers';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: NYTArticle;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article
}) => {
  if (!article || !article.headline?.main || !article.web_url) {
    console.warn('Invalid article data:', article);
    return null;
  }

  const thumbnailUrl = getThumbnailUrl(article.multimedia);
  const authors = getAuthorNames(article.byline);
  const publicationDate = formatDate(article.pub_date);
  const snippet = truncateText(article.snippet || article.abstract || '', 120);
  const categoryInfo = getCategoryInfo(article.section_name);
  const readingTime = getReadingTime(snippet);
  const isNew = isNewArticle(article.pub_date || '');
  const authorInitials = getAuthorInitials(authors || 'Unknown Author');

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const button = e.currentTarget as HTMLElement;
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.className = styles.ripple;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    window.open(article.web_url, '_blank', 'noopener,noreferrer');
  };

  const cardClasses = [
    styles.card,
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
      {isNew && (
        <div className={styles.newBadge}>
          <span className={styles.newIcon}>⚡</span>
          Breaking
        </div>
      )}

      <div className={styles.categoryBadge}>
        <span className={styles.categoryIcon}>{categoryInfo.icon}</span>
        <span className={styles.categoryName}>{categoryInfo.name}</span>
      </div>

      {thumbnailUrl && (
        <div className={styles.imageContainer}>
          <img
            src={thumbnailUrl}
            alt={article.headline.main}
            className={styles.image}
            loading="lazy"
            onLoad={(e) => {
              e.currentTarget.classList.add(styles.loaded);
            }}
            onError={(e) => {
              const container = e.currentTarget.parentElement;
              if (container) {
                container.classList.add(styles.noImage);
                e.currentTarget.style.display = 'none';
              }
            }}
          />
          <div className={styles.imageOverlay} />
          <div className={styles.imageGradient} />
        </div>
      )}

      <div className={styles.content}>
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

        <h2 className={styles.title}>
          {article.headline.main}
        </h2>

        {snippet && (
          <p className={styles.snippet}>{snippet}</p>
        )}

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
            <button className={styles.bookmarkBtn} title="Save article">
              <span className={styles.bookmarkIcon}>🔖</span>
            </button>
          </div>
          
          <button className={styles.readMoreBtn}>
            <span>Continue Reading</span>
            <span className={styles.arrow}>→</span>
          </button>
        </div>
      </div>

      <div className={styles.hoverGlow} />
    </article>
  );
};