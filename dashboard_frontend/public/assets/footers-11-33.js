(function () {
  'use strict';

  // PUBLIC_INTERFACE
  function initFootersScreen() {
    /**
     * Accessibility and interaction polish:
     * - Prevent navigation to "#" for social links
     * - Ensure keyboard focus styles appear on Tab usage
     */
    document.addEventListener('click', function (e) {
      const a = e.target.closest('a[href="#"]');
      if (a) {
        e.preventDefault();
      }
    }, { passive: false });

    // Optional: add a doc-level class when keyboard is used for clearer focus styles
    let keyboard = false;
    document.addEventListener('keydown', () => {
      if (!keyboard) {
        keyboard = true;
        document.documentElement.classList.add('using-keyboard');
      }
    }, { passive: true });
    document.addEventListener('mousedown', () => {
      if (keyboard) {
        keyboard = false;
        document.documentElement.classList.remove('using-keyboard');
      }
    }, { passive: true });
  }

  // Expose for tests/inspection
  window.__initFootersScreen = initFootersScreen;

  document.addEventListener('DOMContentLoaded', initFootersScreen);
})();
