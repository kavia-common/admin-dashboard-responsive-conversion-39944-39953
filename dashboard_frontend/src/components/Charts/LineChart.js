import React from 'react';
import styles from './Charts.module.css';

// PUBLIC_INTERFACE
/**
 * LineChart component - Simple SVG-based line chart
 * @param {Array} data - Array of data points
 * @param {Array} labels - Array of labels for x-axis
 * @param {string} color - Line color
 * @param {number} height - Chart height in pixels
 */
function LineChart({ data = [], labels = [], color = '#2563EB', height = 200 }) {
  if (!data.length) return <div className={styles.noData}>No data available</div>;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 400;
  const padding = 20;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={styles.chartContainer}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className={styles.chart}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className={styles.line}
        />
        {data.map((value, index) => {
          const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
          const y = padding + chartHeight - ((value - min) / range) * chartHeight;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              className={styles.point}
            />
          );
        })}
      </svg>
      {labels.length > 0 && (
        <div className={styles.labels}>
          {labels.map((label, index) => (
            <span key={index} className={styles.label}>
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default LineChart;
