(function(){
  'use strict';
  // PUBLIC_INTERFACE
  function initIllustrationsScreen(){
    /**
     * Optional responsive helper:
     * Scale down the fixed 1003x1510 canvas on small viewports.
     * Keeps canonical pixel fidelity at >= 1003px widths.
     */
    const screen = document.getElementById('screen-903-0');
    if (!screen) return;

    let rafId = 0;
    function setScale(){
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const scale = Math.min(1, vw / 1003);
        screen.style.transformOrigin = 'top left';
        screen.style.transform = 'scale(' + scale + ')';
      });
    }

    window.addEventListener('resize', setScale, { passive: true });
    window.addEventListener('orientationchange', setScale, { passive: true });

    // In case fonts or other late styles affect layout, observe once
    if ('ResizeObserver' in window){
      const ro = new ResizeObserver(() => setScale());
      ro.observe(document.documentElement);
      // stop after first paint-scale to avoid overhead
      setTimeout(() => ro.disconnect(), 1500);
    }

    setScale();
  }

  // Expose for testing
  window.__initIllustrationsScreen = initIllustrationsScreen;

  document.addEventListener('DOMContentLoaded', initIllustrationsScreen);
})();
