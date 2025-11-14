/**
 * 404 Error Page - JavaScript
 * Screen ID: 3:4143
 * Provides minimal interactivity and accessibility enhancements
 */

(function () {
  'use strict';

  // PUBLIC_INTERFACE
  /**
   * Initialize the 404 error page
   * Sets up button click handler and accessibility features
   */
  function init404Page() {
    const root = document.getElementById('root-404');
    if (!root) {
      console.warn('[404-3-4143] Root element not found');
      return;
    }

    // Setup button click handler
    const homeButton = root.querySelector('.btn-primary');
    if (homeButton) {
      homeButton.addEventListener('click', handleGoHome);
    }

    // Setup navigation link click handlers
    const navLinks = root.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavClick);
    });

    // Keyboard navigation enhancements
    setupKeyboardNavigation(root);

    // Focus management for accessibility
    setupFocusManagement(root);

    console.info('[404-3-4143] Page initialized successfully');
  }

  // PUBLIC_INTERFACE
  /**
   * Handle "Go back home" button click
   * Navigates to homepage or previous page
   */
  function handleGoHome(event) {
    event.preventDefault();
    
    // Check if there's a referrer (previous page)
    if (document.referrer && document.referrer !== window.location.href) {
      console.log('[404-3-4143] Navigating back to previous page');
      window.history.back();
    } else {
      // Navigate to homepage
      console.log('[404-3-4143] Navigating to homepage');
      window.location.href = '/';
    }
  }

  /**
   * Handle navigation link clicks
   * Prevents default for demo purposes
   * In production, remove preventDefault to allow actual navigation
   */
  function handleNavClick(event) {
    const href = event.currentTarget.getAttribute('href');
    
    // For demo purposes with # links, prevent default
    if (href === '#') {
      event.preventDefault();
      console.log('[404-3-4143] Nav link clicked:', event.currentTarget.textContent.trim());
      
      // In production, uncomment below and remove preventDefault:
      // window.location.href = href;
    }
  }

  /**
   * Setup keyboard navigation enhancements
   * Adds keyboard shortcuts and focus indicators
   */
  function setupKeyboardNavigation(root) {
    // Add keyboard shortcut: Press "H" to go home
    document.addEventListener('keydown', (event) => {
      if (event.key === 'h' || event.key === 'H') {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          const activeElement = document.activeElement;
          const isInputFocused = activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
          );
          
          if (!isInputFocused) {
            event.preventDefault();
            const homeButton = root.querySelector('.btn-primary');
            if (homeButton) {
              homeButton.click();
            }
          }
        }
      }
    });

    // Add focus trap for better keyboard navigation
    const focusableElements = root.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      root.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            // Shift + Tab: focus previous element
            if (document.activeElement === firstFocusable) {
              event.preventDefault();
              lastFocusable.focus();
            }
          } else {
            // Tab: focus next element
            if (document.activeElement === lastFocusable) {
              event.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      });
    }
  }

  /**
   * Setup focus management for accessibility
   * Ensures proper focus indicators and announcements
   */
  function setupFocusManagement(root) {
    let mouseUsed = false;

    // Detect mouse usage
    document.addEventListener('mousedown', () => {
      mouseUsed = true;
    });

    // Detect keyboard usage
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        mouseUsed = false;
      }
    });

    // Add class to body for CSS-based focus styling
    document.addEventListener('focusin', () => {
      if (!mouseUsed) {
        document.body.classList.add('keyboard-nav');
      } else {
        document.body.classList.remove('keyboard-nav');
      }
    });

    // Announce page to screen readers
    announceToScreenReader('Page not found. Error 404.');
  }

  /**
   * Announce message to screen readers
   * Creates and removes an aria-live region
   */
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Handle illustration animations (optional enhancement)
   * Adds subtle floating animations to vector elements
   */
  function animateIllustration() {
    const vectors = document.querySelectorAll('.illus-vec');
    
    vectors.forEach((vec, index) => {
      // Add subtle floating animation with staggered delays
      const delay = index * 0.1;
      const duration = 3 + (index % 3);
      
      vec.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
  }

  /**
   * Add floating animation keyframes dynamically
   * Only if animations are not reduced
   */
  function addFloatingAnimation() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return;
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `;
    document.head.appendChild(style);
    
    animateIllustration();
  }

  // Expose public interfaces for testing
  window.__404Page = {
    init: init404Page,
    goHome: handleGoHome
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init404Page);
  } else {
    init404Page();
  }

  // Optional: Add floating animations after page load
  window.addEventListener('load', () => {
    setTimeout(addFloatingAnimation, 500);
  });

})();
