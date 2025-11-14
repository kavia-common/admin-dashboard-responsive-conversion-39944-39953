import React from 'react';
import styles from './Topbar.module.css';

// PUBLIC_INTERFACE
/**
 * Topbar component with search, notifications, and user avatar
 * 
 * @param {Object} props - Component props
 * @param {function} props.onMobileMenuToggle - Mobile menu toggle handler
 */
function Topbar({ onMobileMenuToggle }) {
  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.leftSection}>
        <button 
          className={styles.mobileMenuBtn}
          onClick={onMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          ☰
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
