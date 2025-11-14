import React from 'react';
import IframeScreen from '../components/IframeScreen';

// PUBLIC_INTERFACE
/**
 * Buttons screen wrapper
 * Renders the button components page from assets
 */
function ButtonsScreen() {
  return <IframeScreen src="/assets/buttons-11-32.html" title="Buttons" />;
}

export default ButtonsScreen;
