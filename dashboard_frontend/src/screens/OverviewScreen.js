import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Overview screen wrapper (Desktop)
 * Renders the desktop overview page from assets
 */
function OverviewScreen() {
  return <IframeScreen src="/assets/overview-3-3111.html" title="Overview (Desktop)" />;
}

export default OverviewScreen;
