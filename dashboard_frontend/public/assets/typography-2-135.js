(function(){
  'use strict';

  const ref = document.getElementById('bg-ref');
  if (!ref) return;

  function toggleRef(){
    ref.style.display = (ref.style.display === 'none') ? 'block' : 'none';
  }
  function toggleOpacity(){
    const current = parseFloat(getComputedStyle(ref).opacity || '0.08');
    ref.style.opacity = current < 0.12 ? '0.20' : '0.08';
  }

  // Keyboard shortcuts for developers:
  //   g => toggle background reference visibility
  //   o => toggle reference opacity (0.08 <-> 0.20)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'g') toggleRef();
    if (e.key === 'o') toggleOpacity();
  });

  // Promote to own layer to aid pixel-snapping on high-DPI
  const screen = document.getElementById('screen');
  if (screen) {
    screen.style.transform = 'translateZ(0)';
  }
})();
