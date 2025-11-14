import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Mobile screen wrapper
 * Renders the mobile layout page from assets
 */
function MobileScreen() {
  return <IframeScreen src="/assets/mobile-18-808.html" title="Mobile View" />;
}

export default MobileScreen;
