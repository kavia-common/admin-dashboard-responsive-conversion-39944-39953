import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IframeScreen from '../components/IframeScreen';
import styles from './Page.module.css';

// PUBLIC_INTERFACE
/**
 * Components gallery page with tabbed navigation
 * Shows Figma component assets in tabs
 */
function ComponentsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'buttons', label: 'Buttons', path: '/components/buttons', asset: '/assets/buttons-11-32.html' },
    { id: 'badges', label: 'Badges', path: '/components/badges', asset: '/assets/badges-11-31.html' },
    { id: 'footers', label: 'Footers', path: '/components/footers', asset: '/assets/footers-11-33.html' },
    { id: 'icons', label: 'Icons', path: '/components/icons', asset: '/assets/heroicons-4-2561.html' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path) || tabs[0];

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>UI Components</h1>
      
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${currentTab.id === tab.id ? styles.tabActive : ''}`}
            onClick={() => navigate(tab.path)}
            aria-current={currentTab.id === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <IframeScreen 
          src={currentTab.asset} 
          title={`${currentTab.label} Component Gallery`}
        />
      </div>
    </div>
  );
}

export default ComponentsPage;
