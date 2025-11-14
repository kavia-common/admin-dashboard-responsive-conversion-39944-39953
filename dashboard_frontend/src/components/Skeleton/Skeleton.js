import React from 'react';
import styles from './Skeleton.module.css';

// PUBLIC_INTERFACE
/**
 * Skeleton component - Loading placeholder
 * @param {string} variant - Skeleton variant: 'text', 'circular', 'rectangular'
 * @param {number} width - Width in pixels or percentage
 * @param {number} height - Height in pixels
 * @param {number} count - Number of skeleton items
 */
function Skeleton({ variant = 'text', width, height, count = 1 }) {
  const skeletons = Array(count).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${styles[variant]}`}
          style={{ width, height }}
          aria-busy="true"
          aria-label="Loading"
        />
      ))}
    </>
  );
}

export default Skeleton;
