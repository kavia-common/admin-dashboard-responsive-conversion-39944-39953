(function(){
  'use strict';

  // PUBLIC_INTERFACE
  function initButtonsScreen(){
    /**
     * Accessibility and developer helpers:
     * - Make images focusable for keyboard inspection
     * - Provide arrow navigation left/right between images
     * - Toggle dashed boundary with key 'b' (for spec vs. clean view)
     */
    const root = document.getElementById('screen-buttons-11-32');
    if (!root) return;

    const set = root.querySelector('.component-set');
    if (!set) return;

    // Toggle dashed boundary
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'b') {
        set.classList.toggle('no-boundary');
      }
    });

    // Make images focusable in DOM order (left-to-right, top-to-bottom by markup)
    const imgs = Array.from(set.querySelectorAll('.btn-img'));
    imgs.forEach((img, idx) => {
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'img');
      img.setAttribute('aria-roledescription', 'button visual');
      img.setAttribute('data-index', String(idx));
      const size = img.getAttribute('data-size') || '';
      const state = img.getAttribute('data-state') || '';
      img.setAttribute('aria-label', `${size.toUpperCase()} ${state.charAt(0).toUpperCase()}${state.slice(1)} state`);

      img.addEventListener('keydown', (e) => {
        const i = parseInt(img.getAttribute('data-index') || '0', 10);
        if (e.key === 'ArrowRight') {
          const next = set.querySelector(`.btn-img[data-index="${i + 1}"]`);
          if (next) next.focus();
          e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
          const prev = set.querySelector(`.btn-img[data-index="${i - 1}"]`);
          if (prev) prev.focus();
          e.preventDefault();
        } else if (e.key === 'Enter' || e.key === ' ') {
          // Non-intrusive console output for verification of the selected visual
          const label = img.getAttribute('alt') || 'Button';
          console.log(`[buttons-11-32] Activated visual: ${label}`);
          e.preventDefault();
        }
      });
    });
  }

  // Expose for tests/inspection
  window.__initButtonsScreen = initButtonsScreen;

  document.addEventListener('DOMContentLoaded', initButtonsScreen);
})();
