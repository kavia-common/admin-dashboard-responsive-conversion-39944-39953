import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * 404 Error screen wrapper (Desktop)
 * Renders the desktop 404 error page from assets
 */
function NotFoundScreen() {
  return <IframeScreen src="/assets/404-3-4143.html" title="404 Error" />;
}

export default NotFoundScreen;
