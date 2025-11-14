(function () {
  // Screen 1:78 (License)
  // No interactive behavior required. This file reserved for future enhancements.
  // Example: focus ring on keyboard navigation.
  const link = document.querySelector('#screen-license-1-78 .link');
  if (link) {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        link.classList.add('pressed');
        setTimeout(() => link.classList.remove('pressed'), 150);
      }
    });
  }
})();
