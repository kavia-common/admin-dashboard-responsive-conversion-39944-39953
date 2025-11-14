/**
 * 404 Mobile Screen - JavaScript
 * Screen ID: 15:803
 * Provides interactivity and accessibility enhancements
 */

(function () {
  'use strict';

  // PUBLIC_INTERFACE
  /**
   * Initialize the 404 mobile screen
   * Sets up button click handlers and accessibility features
   */
  function init404MobileScreen() {
    const screen = document.querySelector('.mobile-screen');
    if (!screen) {
      console.warn('[404mobile-15-803] Screen element not found');
      return;
    }

    // Setup CTA button click handler
    const ctaButton = screen.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', handleGoHome);
    }

    // Setup menu icon click handler
    const menuIcon = screen.querySelector('.menu-icon');
    if (menuIcon) {
      menuIcon.addEventListener('click', handleMenuClick);
    }

    // Setup notification bell click handler
    const notificationBell = screen.querySelector('.notification-bell');
    if (notificationBell) {
      notificationBell.addEventListener('click', handleNotificationClick);
    }

    // Setup avatar click handler
    const avatar = screen.querySelector('.avatar');
    if (avatar) {
      avatar.addEventListener('click', handleAvatarClick);
    }

    // Keyboard navigation enhancements
    setupKeyboardNavigation(screen);

    // Focus management for accessibility
    setupFocusManagement(screen);

    console.info('[404mobile-15-803] Screen initialized successfully');
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
      console.log('[404mobile-15-803] Navigating back to previous page');
      window.history.back();
    } else {
      // Navigate to homepage
      console.log('[404mobile-15-803] Navigating to homepage');
      window.location.href = '/';
    }
  }

  /**
   * Handle menu icon click
   * Opens/toggles mobile navigation menu
   */
  function handleMenuClick(event) {
    event.preventDefault();
    console.log('[404mobile-15-803] Menu icon clicked');
    
    // In production, this would toggle a mobile menu
    // For now, just log the action
    announceToScreenReader('Menu opened');
  }

  /**
   * Handle notification bell click
   * Opens notifications panel
   */
  function handleNotificationClick(event) {
    event.preventDefault();
    console.log('[404mobile-15-803] Notification bell clicked');
    
    // In production, this would open a notifications panel
    announceToScreenReader('Notifications panel opened');
  }

  /**
   * Handle avatar click
   * Opens user menu/profile
   */
  function handleAvatarClick(event) {
    event.preventDefault();
    console.log('[404mobile-15-803] Avatar clicked');
    
    // In production, this would open user menu or navigate to profile
    announceToScreenReader('User menu opened');
  }

  /**
   * Setup keyboard navigation enhancements
   * Adds keyboard shortcuts and focus indicators
   */
  function setupKeyboardNavigation(screen) {
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
            const ctaButton = screen.querySelector('.cta-button');
            if (ctaButton) {
              ctaButton.click();
            }
          }
        }
      }
      
      // Escape key to close any open panels (future enhancement)
      if (event.key === 'Escape') {
        console.log('[404mobile-15-803] Escape pressed - close panels');
      }
    });

    // Add focus trap for better keyboard navigation
    const focusableElements = screen.querySelectorAll(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      screen.addEventListener('keydown', (event) => {
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
  function setupFocusManagement(screen) {
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
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
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
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    
    animateIllustration();
  }

  // Expose public interfaces for testing
  window.__404MobilePage = {
    init: init404MobileScreen,
    goHome: handleGoHome
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init404MobileScreen);
  } else {
    init404MobileScreen();
  }

  // Optional: Add floating animations after page load
  window.addEventListener('load', () => {
    setTimeout(addFloatingAnimation, 500);
  });

})();
