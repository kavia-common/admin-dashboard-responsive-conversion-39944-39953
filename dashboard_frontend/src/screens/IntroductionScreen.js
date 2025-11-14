import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Introduction screen wrapper
 * Renders the introduction page from assets
 */
function IntroductionScreen() {
  return <IframeScreen src="/assets/introduction-1-20.html" title="Introduction" />;
}

export default IntroductionScreen;
