import React from 'react';
import styles from './SkeletonCard.module.css';

interface SkeletonCardProps {
  variant?: 'standard' | 'featured' | 'compact';
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ variant = 'standard' }) => {
  const cardClasses = [styles.card, styles[variant]].filter(Boolean).join(' ');
  
  return (
    <div className={cardClasses}>
      {/* Category Badge Skeleton */}
      <div className={styles.categoryBadge} />
      
      {/* Image Skeleton */}
      <div className={styles.imageContainer}>
        <div className={styles.image} />
        <div className={styles.shimmerOverlay} />
      </div>
      
      {/* Content Skeleton */}
      <div className={styles.content}>
        {/* Author Section Skeleton */}
        <div className={styles.authorSection}>
          <div className={styles.authorAvatar} />
          <div className={styles.authorInfo}>
            <div className={styles.authorName} />
            <div className={styles.metaInfo}>
              <div className={styles.date} />
              <div className={styles.dot} />
              <div className={styles.readingTime} />
            </div>
          </div>
        </div>
        
        {/* Title Skeleton */}
        <div className={styles.titleContainer}>
          <div className={styles.titleLine} />
          <div className={styles.titleLine} />
          {variant !== 'compact' && <div className={styles.titleLineShort} />}
        </div>
        
        {/* Snippet Skeleton */}
        {variant !== 'compact' && (
          <div className={styles.snippetContainer}>
            <div className={styles.snippetLine} />
            <div className={styles.snippetLine} />
            <div className={styles.snippetLine} />
            {variant === 'featured' && <div className={styles.snippetLineShort} />}
          </div>
        )}
        
        {/* Footer Skeleton */}
        <div className={styles.footer}>
          <div className={styles.engagement}>
            <div className={styles.engagementBtn} />
            <div className={styles.engagementBtn} />
            <div className={styles.engagementBtn} />
          </div>
          <div className={styles.readMoreBtn} />
        </div>
      </div>
      
      {/* Animated Shimmer Effect */}
      <div className={styles.shimmer} />
    </div>
  );
};