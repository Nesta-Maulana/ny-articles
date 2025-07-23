import React from 'react';
import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  color = '#1976d2' 
}) => {
  return (
    <div 
      className={`${styles.spinner} ${styles[size]}`}
      style={{ borderTopColor: color }}
    />
  );
};