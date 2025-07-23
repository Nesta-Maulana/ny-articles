import React from 'react';
import styles from './SkeletonCard.module.css';

export const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.metadata}>
          <div className={styles.author} />
          <div className={styles.separator} />
          <div className={styles.date} />
        </div>
        <div className={styles.snippet}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.lastLine} />
        </div>
        <div className={styles.footer}>
          <div className={styles.section} />
          <div className={styles.button} />
        </div>
      </div>
    </div>
  );
};