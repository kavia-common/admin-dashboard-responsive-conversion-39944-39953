import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Colors screen wrapper
 * Renders the color palette page from assets
 */
function ColorsScreen() {
  return <IframeScreen src="/assets/colors-2-220.html" title="Colors" />;
}

export default ColorsScreen;
