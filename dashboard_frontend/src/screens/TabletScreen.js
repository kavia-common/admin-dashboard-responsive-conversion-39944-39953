import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Tablet screen wrapper
 * Renders the tablet layout page from assets
 */
function TabletScreen() {
  return <IframeScreen src="/assets/tablet-18-778.html" title="Tablet View" />;
}

export default TabletScreen;
