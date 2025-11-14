import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Cover screen wrapper
 * Renders the cover page from assets
 */
function CoverScreen() {
  return <IframeScreen src="/assets/cover-900-737.html" title="Cover" />;
}

export default CoverScreen;
