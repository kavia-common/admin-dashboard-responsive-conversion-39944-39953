import React from 'react';
import styles from './Charts.module.css';

// PUBLIC_INTERFACE
/**
 * PieChart component - SVG-based pie chart
 * @param {Array} data - Array of data points
 * @param {Array} labels - Array of labels
 * @param {Array} colors - Array of colors for each segment
 */
function PieChart({ data = [], labels = [], colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'] }) {
  if (!data.length) return <div className={styles.noData}>No data available</div>;

  const total = data.reduce((sum, value) => sum + value, 0);
  let currentAngle = 0;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const segments = data.map((value, index) => {
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startX = centerX + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = centerY + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = centerX + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = centerY + radius * Math.sin((Math.PI * endAngle) / 180);

    const largeArc = angle > 180 ? 1 : 0;
    const pathData = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`;

    currentAngle = endAngle;

    return {
      path: pathData,
      color: colors[index % colors.length],
      label: labels[index] || `Segment ${index + 1}`,
      percentage: percentage.toFixed(1),
    };
  });

  return (
    <div className={styles.pieChartContainer}>
      <svg width="200" height="200" viewBox="0 0 200 200" className={styles.pieChart}>
        {segments.map((segment, index) => (
          <path
            key={index}
            d={segment.path}
            fill={segment.color}
            className={styles.pieSegment}
          />
        ))}
      </svg>
      <div className={styles.legend}>
        {segments.map((segment, index) => (
          <div key={index} className={styles.legendItem}>
            <span className={styles.legendColor} style={{ backgroundColor: segment.color }} />
            <span className={styles.legendLabel}>
              {segment.label} ({segment.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
