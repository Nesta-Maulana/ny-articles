import React from 'react';
import styles from './SkeletonCard.module.css';

interface SkeletonCardProps {}

export const SkeletonCard: React.FC<SkeletonCardProps> = () => {
  const cardClasses = styles.card;
  
  return (
    <div className={cardClasses}>
      <div className={styles.categoryBadge} />
      
      <div className={styles.imageContainer}>
        <div className={styles.image} />
        <div className={styles.shimmerOverlay} />
      </div>
      
      <div className={styles.content}>
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
        
        <div className={styles.titleContainer}>
          <div className={styles.titleLine} />
          <div className={styles.titleLine} />
          <div className={styles.titleLineShort} />
        </div>
        
        <div className={styles.snippetContainer}>
          <div className={styles.snippetLine} />
          <div className={styles.snippetLine} />
          <div className={styles.snippetLine} />
          <div className={styles.snippetLineShort} />
        </div>
        
        <div className={styles.footer}>
          <div className={styles.engagement}>
            <div className={styles.engagementBtn} />
            <div className={styles.engagementBtn} />
            <div className={styles.engagementBtn} />
          </div>
          <div className={styles.readMoreBtn} />
        </div>
      </div>
      
      <div className={styles.shimmer} />
    </div>
  );
};