import React from 'react';
import { useLocation } from 'react-router-dom';
import IframeScreen from '../components/IframeScreen';
import styles from './Page.module.css';

// PUBLIC_INTERFACE
/**
 * Documentation page
 * Renders documentation content from Figma assets
 */
function DocsPage() {
  const location = useLocation();
  
  const docMap = {
    '/docs/introduction': '/assets/introduction-1-20.html',
    '/docs/support': '/assets/support-1-74.html',
    '/docs/license': '/assets/license-1-78.html'
  };

  const asset = docMap[location.pathname] || docMap['/docs/introduction'];

  return (
    <div className={styles.page}>
      <div className={styles.iframeWrapper}>
        <IframeScreen 
          src={asset} 
          title="Documentation"
        />
      </div>
    </div>
  );
}

export default DocsPage;
