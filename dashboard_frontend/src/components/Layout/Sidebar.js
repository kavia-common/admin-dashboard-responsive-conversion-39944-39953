import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

// PUBLIC_INTERFACE
/**
 * Sidebar component with collapsible navigation
 * Provides primary navigation for the dashboard with active route highlighting
 * Updated to include all refined asset-based screens
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.collapsed - Whether the sidebar is collapsed
 * @param {function} props.onToggle - Toggle collapse handler
 * @param {boolean} props.isMobileOpen - Mobile menu open state
 * @param {function} props.onMobileClose - Mobile menu close handler
 */
function Sidebar({ collapsed = false, onToggle, isMobileOpen = false, onMobileClose }) {
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

  return (
    <aside 
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${isMobileOpen ? styles.mobileOpen : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          {!collapsed && <span className={styles.logoText}>Dashboard</span>}
          {collapsed && <span className={styles.logoIcon}>D</span>}
        </div>
        <button 
          className={styles.toggleBtn}
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? '→' : '←'}
        </button>
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
