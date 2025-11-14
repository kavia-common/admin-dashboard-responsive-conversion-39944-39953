/**
 * Mobile Dashboard Screens Gallery (18:808)
 * JavaScript for interactive navigation and accessibility
 */

(function () {
  'use strict';

  // ============================================
  // Configuration & State
  // ============================================

  const config = {
    totalScreens: 29,
    autoScrollDelay: 300, // ms delay for auto-scroll after button click
    keyboardEnabled: true,
    touchEnabled: true
  };

  const state = {
    currentScreen: 1,
    isScrolling: false,
    touchStartX: 0,
    touchEndX: 0
  };

  // ============================================
  // DOM Elements
  // ============================================

  let elements = {};

  // PUBLIC_INTERFACE
  /**
   * Initialize the gallery
   * Sets up all event listeners and DOM references
   */
  function initGallery() {
    // Cache DOM elements
    elements = {
      galleryScroll: document.getElementById('galleryScroll'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      screenCounter: document.getElementById('screenCounter'),
      galleryDots: document.getElementById('galleryDots'),
      screenCards: document.querySelectorAll('.screen-card')
    };

    if (!elements.galleryScroll) {
      console.warn('[mobile-18-808] Gallery scroll container not found');
      return;
    }

    // Initialize components
    createDots();
    updateUI();

    // Setup event listeners
    setupNavigationButtons();
    setupKeyboardNavigation();
    setupScrollDetection();
    setupTouchNavigation();
    setupDotNavigation();

    console.info('[mobile-18-808] Gallery initialized successfully');
  }

  // ============================================
  // Navigation Dots
  // ============================================

  /**
   * Create navigation dots for each screen
   */
  function createDots() {
    if (!elements.galleryDots) return;

    elements.galleryDots.innerHTML = '';

    for (let i = 1; i <= config.totalScreens; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('data-screen', i);
      dot.setAttribute('aria-label', `Go to screen ${i}`);
      dot.setAttribute('type', 'button');
      
      if (i === 1) {
        dot.classList.add('active');
      }

      elements.galleryDots.appendChild(dot);
    }
  }

  /**
   * Setup click handlers for navigation dots
   */
  function setupDotNavigation() {
    if (!elements.galleryDots) return;

    elements.galleryDots.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot')) {
        const screenNumber = parseInt(e.target.getAttribute('data-screen'), 10);
        goToScreen(screenNumber);
      }
    });
  }

  // ============================================
  // Navigation Functions
  // ============================================

  // PUBLIC_INTERFACE
  /**
   * Navigate to the previous screen
   */
  function previousScreen() {
    if (state.currentScreen > 1 && !state.isScrolling) {
      goToScreen(state.currentScreen - 1);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Navigate to the next screen
   */
  function nextScreen() {
    if (state.currentScreen < config.totalScreens && !state.isScrolling) {
      goToScreen(state.currentScreen + 1);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Go to a specific screen number
   * @param {number} screenNumber - The screen number to navigate to (1-29)
   */
  function goToScreen(screenNumber) {
    if (screenNumber < 1 || screenNumber > config.totalScreens) return;
    if (state.isScrolling) return;

    state.isScrolling = true;
    state.currentScreen = screenNumber;

    const targetCard = elements.screenCards[screenNumber - 1];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });

      // Update UI after scroll animation
      setTimeout(() => {
        state.isScrolling = false;
        updateUI();
        announceToScreenReader(`Screen ${screenNumber} of ${config.totalScreens}`);
      }, config.autoScrollDelay);
    }
  }

  // ============================================
  // UI Updates
  // ============================================

  /**
   * Update all UI elements to reflect current screen
   */
  function updateUI() {
    updateCounter();
    updateButtons();
    updateDots();
  }

  /**
   * Update screen counter display
   */
  function updateCounter() {
    if (elements.screenCounter) {
      elements.screenCounter.textContent = `${state.currentScreen} / ${config.totalScreens}`;
    }
  }

  /**
   * Update button states (enabled/disabled)
   */
  function updateButtons() {
    if (elements.prevBtn) {
      elements.prevBtn.disabled = state.currentScreen === 1;
    }
    if (elements.nextBtn) {
      elements.nextBtn.disabled = state.currentScreen === config.totalScreens;
    }
  }

  /**
   * Update navigation dots to show active screen
   */
  function updateDots() {
    if (!elements.galleryDots) return;

    const dots = elements.galleryDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      if (index + 1 === state.currentScreen) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  // ============================================
  // Event Listeners Setup
  // ============================================

  /**
   * Setup navigation button click handlers
   */
  function setupNavigationButtons() {
    if (elements.prevBtn) {
      elements.prevBtn.addEventListener('click', previousScreen);
    }
    if (elements.nextBtn) {
      elements.nextBtn.addEventListener('click', nextScreen);
    }
  }

  /**
   * Setup keyboard navigation
   */
  function setupKeyboardNavigation() {
    if (!config.keyboardEnabled) return;

    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          previousScreen();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextScreen();
          break;
        case 'Home':
          e.preventDefault();
          goToScreen(1);
          break;
        case 'End':
          e.preventDefault();
          goToScreen(config.totalScreens);
          break;
      }
    });
  }

  /**
   * Setup scroll detection to update current screen
   */
  function setupScrollDetection() {
    if (!elements.galleryScroll) return;

    let scrollTimeout;

    elements.galleryScroll.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        detectCurrentScreen();
      }, 150);
    });
  }

  /**
   * Detect which screen is currently in view based on scroll position
   */
  function detectCurrentScreen() {
    if (state.isScrolling) return;

    const scrollContainer = elements.galleryScroll;
    const containerCenter = scrollContainer.scrollLeft + (scrollContainer.clientWidth / 2);

    let closestIndex = 0;
    let minDistance = Infinity;

    elements.screenCards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    const detectedScreen = closestIndex + 1;
    if (detectedScreen !== state.currentScreen) {
      state.currentScreen = detectedScreen;
      updateUI();
    }
  }

  /**
   * Setup touch swipe navigation for mobile devices
   */
  function setupTouchNavigation() {
    if (!config.touchEnabled || !elements.galleryScroll) return;

    elements.galleryScroll.addEventListener('touchstart', (e) => {
      state.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    elements.galleryScroll.addEventListener('touchend', (e) => {
      state.touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  /**
   * Handle swipe gesture
   */
  function handleSwipe() {
    const swipeThreshold = 50; // minimum swipe distance in pixels
    const diff = state.touchStartX - state.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - go to next screen
        nextScreen();
      } else {
        // Swiped right - go to previous screen
        previousScreen();
      }
    }
  }

  // ============================================
  // Accessibility Functions
  // ============================================

  /**
   * Announce message to screen readers
   * @param {string} message - The message to announce
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

  // ============================================
  // Utility Functions
  // ============================================

  /**
   * Get screen name from data attribute
   * @param {number} screenNumber - The screen number
   * @returns {string} - The screen name
   */
  function getScreenName(screenNumber) {
    const card = elements.screenCards[screenNumber - 1];
    if (card) {
      return card.getAttribute('data-name') || `Screen ${screenNumber}`;
    }
    return `Screen ${screenNumber}`;
  }

  // ============================================
  // Public API for Testing/Debugging
  // ============================================

  window.__mobileGallery = {
    init: initGallery,
    goToScreen: goToScreen,
    nextScreen: nextScreen,
    previousScreen: previousScreen,
    getCurrentScreen: () => state.currentScreen,
    getTotalScreens: () => config.totalScreens,
    getScreenName: getScreenName
  };

  // ============================================
  // Auto-Initialize
  // ============================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }

  // ============================================
  // Performance: Lazy Load Images on Scroll
  // ============================================

  /**
   * Lazy load images as they come into view
   */
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  // Setup lazy loading after initialization
  setTimeout(setupLazyLoading, 500);

})();
