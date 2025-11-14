import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Fonts screen wrapper
 * Renders the fonts documentation page from assets
 */
function FontsScreen() {
  return <IframeScreen src="/assets/fonts-35-738.html" title="Fonts" />;
}

export default FontsScreen;
