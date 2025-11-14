import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Layout.module.css';

// PUBLIC_INTERFACE
/**
 * Main Layout component with Sidebar, Topbar, and content area
 * Provides persistent shell for dashboard pages
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 */
function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className={`${styles.layoutShell} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />
      <Topbar onMobileMenuToggle={handleMobileMenuToggle} />
      <main className={styles.main} role="main">
        {children}
      </main>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={handleMobileSidebarClose}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default Layout;
