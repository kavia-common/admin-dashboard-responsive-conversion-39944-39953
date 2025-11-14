import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Heroicons screen wrapper
 * Renders the icon library page from assets
 */
function HeroiconsScreen() {
  return <IframeScreen src="/assets/heroicons-4-2561.html" title="Heroicons" />;
}

export default HeroiconsScreen;
