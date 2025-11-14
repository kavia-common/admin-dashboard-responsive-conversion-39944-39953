import React, { useState, useMemo } from 'react';
import styles from './DataTable.module.css';

// PUBLIC_INTERFACE
/**
 * DataTable component - Sortable, filterable, paginated table
 * @param {Array} data - Table data array
 * @param {Array} columns - Column definitions [{ key, label, sortable, render }]
 * @param {number} pageSize - Items per page
 */
function DataTable({ data = [], columns = [], pageSize = 10 }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!filterText) return data;
    return data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [data, filterText]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <input
          type="search"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            setCurrentPage(1);
          }}
          className={styles.searchInput}
          aria-label="Search table"
        />
        <div className={styles.tableInfo}>
          Showing {paginatedData.length} of {sortedData.length} entries
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table} role="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? styles.sortable : ''}
                  onClick={() => col.sortable && handleSort(col.key)}
                  role="columnheader"
                  aria-sort={sortKey === col.key ? sortOrder : 'none'}
                >
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index} role="row">
                  {columns.map((col) => (
                    <td key={col.key} role="cell">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noData}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;
