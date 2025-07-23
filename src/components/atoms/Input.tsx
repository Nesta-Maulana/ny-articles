import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  seamless?: boolean;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, seamless = false, icon, className = '', ...props }, ref) => {
    const inputClasses = [
      styles.input,
      seamless ? styles.seamless : '',
      error ? styles.error : '',
      fullWidth ? styles.fullWidth : '',
      icon && seamless ? styles.withIcon : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={icon ? styles.inputWithIcon : ''}>
          <input ref={ref} className={inputClasses} {...props} />
          {icon && <span className={styles.inputIcon}>{icon}</span>}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';