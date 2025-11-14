import React, { Suspense, lazy, useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton/Skeleton';
import { mockTransactions } from '../utils/mockData';
import styles from './Page.module.css';

// Lazy load DataTable for code splitting
const DataTable = lazy(() => import('../components/DataTable/DataTable'));

// PUBLIC_INTERFACE
/**
 * Transactions page - Transaction history with filtering
 * Native React implementation with DataTable component
 */
function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadTransactions = async () => {
      setLoading(true);
      // In production, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 400));
      setTransactions(mockTransactions);
      setLoading(false);
    };

    loadTransactions();
  }, []);

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`
    },
    { key: 'date', label: 'Date', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => (
        <span className={styles.statusBadge} data-status={value}>
          {value}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>Transactions</h1>
        <div className={styles.pageContent}>
          <Skeleton variant="rectangular" width="100%" height={400} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Transactions</h1>
      <div className={styles.pageContent}>
        <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={400} />}>
          <DataTable 
            data={transactions} 
            columns={columns}
            pageSize={10}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default TransactionsPage;
