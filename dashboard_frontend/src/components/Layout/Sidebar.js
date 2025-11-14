import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

// PUBLIC_INTERFACE
/**
 * Sidebar component with collapsible navigation
 * Provides primary navigation for the dashboard with active route highlighting
 * Enhanced with focus trap, Esc key handling, and full accessibility
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed
 * @param {function} props.onToggle - Toggle collapse handler
 * @param {boolean} props.isMobileOpen - Mobile menu open state
 * @param {function} props.onMobileClose - Mobile menu close handler
 */
function Sidebar({ collapsed = false, onToggle, isMobileOpen = false, onMobileClose }) {
  const sidebarRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  const navItems = [
    { path: '/overview', label: 'Overview', icon: '📊' },
    { 
      path: '/docs', 
      label: 'Docs', 
      icon: '📄',
      children: [
        { path: '/docs/introduction', label: 'Introduction' },
        { path: '/support', label: 'Support' },
        { path: '/license', label: 'License' }
      ]
    },
    { 
      path: '/components', 
      label: 'Components', 
      icon: '🧩',
      children: [
        { path: '/components/buttons', label: 'Buttons' },
        { path: '/components/badges', label: 'Badges' },
        { path: '/components/footers', label: 'Footers' },
        { path: '/heroicons', label: 'Heroicons' },
        { path: '/colors', label: 'Colors' },
        { path: '/typography', label: 'Typography' },
        { path: '/spacers', label: 'Spacers' }
      ]
    },
    { path: '/sidebars-topbars', label: 'Navigation', icon: '🧭' },
    { path: '/illustrations', label: 'Illustrations', icon: '🎨' },
    { 
      path: '/errors', 
      label: 'Error Pages', 
      icon: '⚠️',
      children: [
        { path: '/404', label: '404' },
        { path: '/404-mobile', label: '404 Mobile' }
      ]
    },
    { 
      path: '/device-galleries', 
      label: 'Device Galleries', 
      icon: '📱',
      children: [
        { path: '/tablet', label: 'Tablet' },
        { path: '/mobile', label: 'Mobile' }
      ]
    }
  ];

  const handleNavClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  // Focus trap and Esc key handling
  useEffect(() => {
    if (!isMobileOpen) return;

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    // Get all focusable elements
    const focusableElements = sidebar.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    firstFocusableRef.current = focusableElements[0];
    lastFocusableRef.current = focusableElements[focusableElements.length - 1];

    // Focus first element when drawer opens
    firstFocusableRef.current?.focus();

    // Handle Tab key for focus trap
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onMobileClose();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileOpen, onMobileClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <aside 
      ref={sidebarRef}
      id="navigation-drawer"
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.mobileOpen : ''}`}
      role={isMobileOpen ? "dialog" : "navigation"}
      aria-label="Main navigation"
      aria-modal={isMobileOpen ? "true" : undefined}
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          {!collapsed && <span className={styles.logoText}>Dashboard</span>}
          {collapsed && <span className={styles.logoIcon}>D</span>}
        </div>
        {!isMobileOpen && (
          <button 
            className={styles.toggleBtn}
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            {collapsed ? '→' : '←'}
          </button>
        )}
        {isMobileOpen && (
          <button 
            className={styles.closeBtn}
            onClick={onMobileClose}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path} className={styles.navItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
                onClick={handleNavClick}
                end={!item.children}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              </NavLink>
              {item.children && !collapsed && (
                <ul className={styles.subNav}>
                  {item.children.map((child) => (
                    <li key={child.path} className={styles.subNavItem}>
                      <NavLink
                        to={child.path}
                        className={({ isActive }) => 
                          `${styles.subNavLink} ${isActive ? styles.active : ''}`
                        }
                        aria-current={({ isActive }) => isActive ? 'page' : undefined}
                        onClick={handleNavClick}
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
