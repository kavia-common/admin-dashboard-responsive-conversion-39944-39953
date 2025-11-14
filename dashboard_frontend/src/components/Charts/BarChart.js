import React from 'react';
import styles from './Charts.module.css';

// PUBLIC_INTERFACE
/**
 * BarChart component - Simple CSS-based bar chart
 * @param {Array} data - Array of data points
 * @param {Array} labels - Array of labels
 * @param {string} color - Bar color
 */
function BarChart({ data = [], labels = [], color = '#10B981' }) {
  if (!data.length) return <div className={styles.noData}>No data available</div>;

  const max = Math.max(...data);

  return (
    <div className={styles.barChartContainer}>
      {data.map((value, index) => {
        const percentage = (value / max) * 100;
        return (
          <div key={index} className={styles.barItem}>
            <div className={styles.barLabel}>{labels[index] || `Item ${index + 1}`}</div>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: color,
                }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax={max}
              >
                <span className={styles.barValue}>{value}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BarChart;
