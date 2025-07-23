import React from 'react';
import { Button } from '../atoms';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Oops! Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" size="medium">
          Try Again
        </Button>
      )}
    </div>
  );
};