import React from 'react';
import IframeScreen from '../components/IframeScreen';
import styles from './Page.module.css';

// PUBLIC_INTERFACE
/**
 * Overview page - Dashboard overview with key metrics
 * Currently renders Figma asset via iframe (TODO: Convert to native React components)
 */
function OverviewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.iframeWrapper}>
        <IframeScreen 
          src="/assets/overview-3-3111.html" 
          title="Dashboard Overview" 
        />
      </div>
    </div>
  );
}

export default OverviewPage;
