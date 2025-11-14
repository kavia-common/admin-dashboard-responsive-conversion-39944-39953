import React from 'react';
import styles from './Page.module.css';

// PUBLIC_INTERFACE
/**
 * Customers page - Customer list and management
 * TODO: Replace with native React table/list components
 */
function CustomersPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Customers</h1>
      <div className={styles.pageContent}>
        <p className={styles.placeholder}>
          Customer management interface coming soon.
          This will include searchable tables, filters, and customer details.
        </p>
        {/* TODO: Implement native customer table with accessible markup */}
      </div>
    </div>
  );
}

export default CustomersPage;
