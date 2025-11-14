import React from 'react';
import IframeScreen from '../components/IframeScreen';
import styles from './Page.module.css';

// PUBLIC_INTERFACE
/**
 * 404 Not Found page
 * Renders the 404 error page from Figma assets
 */
function NotFoundPage() {
  // Detect mobile viewport
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const asset = isMobile ? '/assets/404mobile-15-803.html' : '/assets/404-3-4143.html';

  return (
    <div className={styles.page}>
      <div className={styles.iframeWrapper}>
        <IframeScreen 
          src={asset} 
          title="Page Not Found"
        />
      </div>
    </div>
  );
}

export default NotFoundPage;
