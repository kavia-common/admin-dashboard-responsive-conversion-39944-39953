import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Layout.module.css';

// PUBLIC_INTERFACE
/**
 * Main Layout component with Sidebar, Topbar, and content area
 * Provides persistent shell for dashboard pages
 * Enhanced with proper drawer state management and inert background
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render
 */
function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const mainRef = useRef(null);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  // Make background inert when drawer is open
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    if (mobileSidebarOpen) {
      // Make main content inert (non-interactive)
      main.setAttribute('inert', '');
      main.setAttribute('aria-hidden', 'true');
    } else {
      // Restore interactivity
      main.removeAttribute('inert');
      main.removeAttribute('aria-hidden');
    }
  }, [mobileSidebarOpen]);

  return (
    <div className={`${styles.layoutShell} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />
      <Topbar 
        onMobileMenuToggle={handleMobileMenuToggle}
        isDrawerOpen={mobileSidebarOpen}
      />
      <main 
        ref={mainRef}
        className={styles.main} 
        role="main"
      >
        {children}
      </main>

      {/* Mobile overlay - blocks background interaction */}
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
