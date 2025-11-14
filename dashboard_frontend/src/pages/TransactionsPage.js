import React from 'react';
import styles from './Page.module.css';

// PUBLIC_INTERFACE
/**
 * Transactions page - Transaction history and details
 * TODO: Replace with native React table components
 */
function TransactionsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Transactions</h1>
      <div className={styles.pageContent}>
        <p className={styles.placeholder}>
          Transaction history with filtering and export capabilities.
          This will include sortable tables and transaction details.
        </p>
        {/* TODO: Implement native transaction table */}
      </div>
    </div>
  );
}

export default TransactionsPage;
