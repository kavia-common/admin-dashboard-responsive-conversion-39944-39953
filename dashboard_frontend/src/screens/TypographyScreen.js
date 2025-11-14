import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Typography screen wrapper
 * Renders the typography system page from assets
 */
function TypographyScreen() {
  return <IframeScreen src="/assets/typography-2-135.html" title="Typography" />;
}

export default TypographyScreen;
