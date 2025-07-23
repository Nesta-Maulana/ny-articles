import React from 'react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const scrollToSearch = () => {
    document.getElementById('search-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.particles}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      <div className={styles.shapes}>
        <div className={styles.shape} />
        <div className={styles.shape} />
        <div className={styles.shape} />
      </div>

      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <span className={styles.logo}>📰</span>
          <span className={styles.brandText}>The Times</span>
        </div>
        
        <h1 className={styles.title}>
          Discover Stories That Matter
        </h1>
        
        <p className={styles.subtitle}>
          Explore breaking news, in-depth analysis, and compelling narratives from The New York Times
        </p>
        
        <a 
          href="#search-section" 
          className={styles.cta}
          onClick={scrollToSearch}
        >
          Start Exploring
          <span className={styles.ctaIcon}>→</span>
        </a>
      </div>

      <div className={styles.scrollIndicator}>
      </div>
    </header>
  );
};