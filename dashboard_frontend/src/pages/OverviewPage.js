import React, { Suspense, lazy, useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton/Skeleton';
import { mockStats, mockChartData } from '../utils/mockData';
import styles from './Page.module.css';

// Lazy load chart components for better performance
const LineChart = lazy(() => import('../components/Charts/LineChart'));
const BarChart = lazy(() => import('../components/Charts/BarChart'));
const PieChart = lazy(() => import('../components/Charts/PieChart'));

// PUBLIC_INTERFACE
/**
 * Overview page - Dashboard overview with key metrics and charts
 * Native React implementation with lazy-loaded charts and skeleton loaders
 */
function OverviewPage() {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats(mockStats);
      setChartData(mockChartData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Overview</h1>
        <div className={styles.pageContent}>
          <div className={styles.statsGrid}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={styles.statCard}>
                <Skeleton variant="rectangular" width="100%" height={120} />
              </div>
            ))}
          </div>
          <div className={styles.chartsGrid}>
            {[1, 2].map(i => (
              <div key={i} className={styles.chartCard}>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Overview</h1>
      
      <div className={styles.pageContent}>
        {/* Stats Cards */}
        <section className={styles.statsGrid} aria-label="Key statistics">
          <div className={styles.statCard} role="article">
            <div className={styles.statLabel}>Total Revenue</div>
            <div className={styles.statValue}>
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className={styles.statChange} data-positive={stats.revenueGrowth > 0}>
              {stats.revenueGrowth > 0 ? '↑' : '↓'} {Math.abs(stats.revenueGrowth)}% from last month
            </div>
          </div>

          <div className={styles.statCard} role="article">
            <div className={styles.statLabel}>Total Customers</div>
            <div className={styles.statValue}>
              {stats.totalCustomers.toLocaleString()}
            </div>
            <div className={styles.statChange} data-positive={stats.customerGrowth > 0}>
              {stats.customerGrowth > 0 ? '↑' : '↓'} {Math.abs(stats.customerGrowth)}% from last month
            </div>
          </div>

          <div className={styles.statCard} role="article">
            <div className={styles.statLabel}>Total Orders</div>
            <div className={styles.statValue}>
              {stats.totalOrders.toLocaleString()}
            </div>
          </div>

          <div className={styles.statCard} role="article">
            <div className={styles.statLabel}>Avg Order Value</div>
            <div className={styles.statValue}>
              ${stats.averageOrderValue.toFixed(2)}
            </div>
          </div>
        </section>

        {/* Charts Grid */}
        <section className={styles.chartsGrid} aria-label="Data visualizations">
          <div className={styles.chartCard} role="article">
            <h2 className={styles.chartTitle}>Revenue Trend</h2>
            <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={250} />}>
              <LineChart 
                data={chartData.revenue.data} 
                labels={chartData.revenue.labels}
                color="#2563EB"
                height={250}
              />
            </Suspense>
          </div>

          <div className={styles.chartCard} role="article">
            <h2 className={styles.chartTitle}>User Growth</h2>
            <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={250} />}>
              <BarChart 
                data={chartData.users.data} 
                labels={chartData.users.labels}
                color="#10B981"
              />
            </Suspense>
          </div>

          <div className={styles.chartCard} role="article">
            <h2 className={styles.chartTitle}>Sales by Category</h2>
            <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={250} />}>
              <PieChart 
                data={chartData.categories.data} 
                labels={chartData.categories.labels}
                colors={['#2563EB', '#10B981', '#F59E0B', '#EF4444']}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OverviewPage;
