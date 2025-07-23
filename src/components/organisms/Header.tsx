import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.logo}>📰</span>
          NYT Article Search
        </h1>
        <p className={styles.subtitle}>
          Discover articles from The New York Times
        </p>
      </div>
    </header>
  );
};