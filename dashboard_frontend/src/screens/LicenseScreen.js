import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * License screen wrapper
 * Renders the license page from assets
 */
function LicenseScreen() {
  return <IframeScreen src="/assets/license-1-78.html" title="License" />;
}

export default LicenseScreen;
