import React from 'react';
import styles from './Topbar.module.css';

// PUBLIC_INTERFACE
/**
 * Topbar component with search, notifications, and user avatar
 * Enhanced with proper hamburger menu button and ARIA attributes
 * 
 * @param {Object} props - Component props
 * @param {function} props.onMobileMenuToggle - Mobile menu toggle handler
 * @param {boolean} props.isDrawerOpen - Whether the navigation drawer is open
 */
function Topbar({ onMobileMenuToggle, isDrawerOpen = false }) {
  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.leftSection}>
        <button 
          className={styles.mobileMenuBtn}
          onClick={onMobileMenuToggle}
          aria-label={isDrawerOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isDrawerOpen}
          aria-controls="navigation-drawer"
        >
          {/* Hamburger icon - animated to X when open */}
          <span className={`${styles.hamburgerIcon} ${isDrawerOpen ? styles.open : ''}`}>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </span>
        </button>
        <div className={styles.search}>
          <input 
            type="search" 
            placeholder="Search..." 
            className={styles.searchInput}
            aria-label="Search"
          />
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <button 
          className={styles.iconBtn}
          aria-label="Notifications"
        >
          <span className={styles.notificationBadge}>3</span>
          🔔
        </button>
        <div className={styles.avatar}>
          <img 
            src="/assets/figmaimages/figma_image_15_812_4_675.png" 
            alt="User avatar" 
            className={styles.avatarImg}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.textContent = '👤';
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
