(function () {
  'use strict';

  // PUBLIC_INTERFACE
  function initBadgesScreen() {
    /**
     * Make badge images keyboard focusable and provide a basic activation log.
     * This preserves visual fidelity while enabling accessibility for demos.
     */
    const root = document.getElementById('screen-badges-11-31');
    if (!root) return;

    const group = root.querySelector('.badge-set');
    if (group) {
      group.setAttribute('role', 'group');
      group.setAttribute('aria-roledescription', 'visual examples');
    }

    const badges = root.querySelectorAll('.badge');
    let tab = 0;
    badges.forEach((img) => {
      // Ensure deterministic tab order left-to-right
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'img');
      img.setAttribute('aria-roledescription', 'badge');
      img.setAttribute('aria-label', img.getAttribute('alt') || 'Badge');
      img.setAttribute('data-index', String(++tab));

      img.addEventListener('keydown', (e) => {
        // Enable simple arrow navigation between badges
        const current = parseInt(img.getAttribute('data-index') || '1', 10);
        if (e.key === 'ArrowRight') {
          const next = root.querySelector(`.badge[data-index="${current + 1}"]`);
          if (next) next.focus();
          e.preventDefault();
          return;
        }
        if (e.key === 'ArrowLeft') {
          const prev = root.querySelector(`.badge[data-index="${current - 1}"]`);
          if (prev) prev.focus();
          e.preventDefault();
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          const label = img.getAttribute('alt') || 'Badge';
          // Non-intrusive feedback via console for verification
          console.log(`Activated: ${label}`);
          e.preventDefault();
        }
      });
    });
  }

  // Expose for tests/inspection
  window.__initBadgesScreen = initBadgesScreen;

  document.addEventListener('DOMContentLoaded', initBadgesScreen);

  // Reference paths per Figma YAML (ensuring correctness):
  // /assets/figmaimages/figma_image_11_24.svg  -> Red
  // /assets/figmaimages/figma_image_11_22.svg  -> Gray
  // /assets/figmaimages/figma_image_11_20.svg  -> Green
  // /assets/figmaimages/figma_image_11_18.svg  -> Blue
})();
