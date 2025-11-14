import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * 404 Mobile screen wrapper
 * Renders the mobile 404 error page from assets
 */
function NotFoundMobileScreen() {
  return <IframeScreen src="/assets/404mobile-15-803.html" title="404 Mobile" />;
}

export default NotFoundMobileScreen;
