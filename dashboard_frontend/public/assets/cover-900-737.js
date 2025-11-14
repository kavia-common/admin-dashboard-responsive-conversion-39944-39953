/**
 * Cover (900:737)
 * Static screen; minimal JS for progressive enhancement/testing hooks.
 */
// PUBLIC_INTERFACE
function initCoverScreen() {
  /** Initialize any future interactions for the Cover screen. */
  const main = document.getElementById('cover-root');
  if (main) {
    // Provide a quick keyboard access test hook
    main.setAttribute('tabindex', '-1');
  }
}

// Expose for tests
window.__initCoverScreen = initCoverScreen;

document.addEventListener('DOMContentLoaded', () => {
  initCoverScreen();
});
