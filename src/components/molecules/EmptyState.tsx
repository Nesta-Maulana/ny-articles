import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  message = 'Try searching with different keywords',
  icon = '🔍',
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
};