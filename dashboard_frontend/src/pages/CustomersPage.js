import React, { Suspense, lazy, useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton/Skeleton';
import { mockCustomers } from '../utils/mockData';
import styles from './Page.module.css';

// Lazy load DataTable for code splitting
const DataTable = lazy(() => import('../components/DataTable/DataTable'));

// PUBLIC_INTERFACE
/**
 * Customers page - Customer list and management with sortable table
 * Native React implementation with DataTable component
 */
function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadCustomers = async () => {
      setLoading(true);
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 400));
      setCustomers(mockCustomers);
      setLoading(false);
    };

    loadCustomers();
  }, []);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => (
        <span className={styles.statusBadge} data-status={value}>
          {value}
        </span>
      )
    },
    { key: 'joinDate', label: 'Join Date', sortable: true }
  ];

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Customers</h1>
        <div className={styles.pageContent}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Customers</h1>
      <div className={styles.pageContent}>
        <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={400} />}>
          <DataTable 
            data={customers} 
            columns={columns}
            pageSize={10}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default CustomersPage;
