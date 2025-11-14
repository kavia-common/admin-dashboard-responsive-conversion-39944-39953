(function() {
  'use strict';

  // PUBLIC_INTERFACE
  /**
   * Initialize the Overview screen with interactive behaviors
   */
  function initOverviewScreen() {
    initSidebarNavigation();
    initSearchFunctionality();
    initKeyboardNavigation();
    initChartInteractions();
  }

  // PUBLIC_INTERFACE
  /**
   * Initialize sidebar navigation with collapsible menus
   */
  function initSidebarNavigation() {
    const navItems = document.querySelectorAll('.nav-item.has-children');
    
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const submenu = this.nextElementSibling;
        
        // Toggle current item
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (submenu && submenu.classList.contains('submenu')) {
          submenu.style.display = isExpanded ? 'none' : 'flex';
          
          // Rotate chevron
          const chevron = this.querySelector('.chevron');
          if (chevron) {
            if (isExpanded) {
              chevron.classList.remove('chevron-up');
            } else {
              chevron.classList.add('chevron-up');
            }
          }
        }
        
        // Close other expanded items (accordion behavior)
        navItems.forEach(otherItem => {
          if (otherItem !== this && otherItem.getAttribute('aria-expanded') === 'true') {
            otherItem.setAttribute('aria-expanded', 'false');
            const otherSubmenu = otherItem.nextElementSibling;
            if (otherSubmenu && otherSubmenu.classList.contains('submenu')) {
              otherSubmenu.style.display = 'none';
            }
            const otherChevron = otherItem.querySelector('.chevron');
            if (otherChevron) {
              otherChevron.classList.remove('chevron-up');
            }
          }
        });
      });
    });

    // Handle navigation item clicks
    const allNavItems = document.querySelectorAll('.nav-item:not(.has-children), .nav-subitem');
    allNavItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('[Overview] Navigated to:', this.querySelector('.label')?.textContent || this.textContent);
        
        // Update active state for non-expandable items
        if (!this.classList.contains('has-children')) {
          document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
          this.classList.add('active');
        }
      });
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Initialize search functionality with keyboard support
   */
  function initSearchFunctionality() {
    const searchInput = document.querySelector('.search input');
    const searchContainer = document.querySelector('.search');
    
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.trim();
      if (query.length > 0) {
        console.log('[Overview] Search query:', query);
        // In a real application, this would trigger search results
      }
    });

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = e.target.value.trim();
        if (query) {
          console.log('[Overview] Search submitted:', query);
          // Trigger search action
        }
      } else if (e.key === 'Escape') {
        e.target.value = '';
        e.target.blur();
      }
    });

    // Focus state management
    searchInput.addEventListener('focus', function() {
      searchContainer.classList.add('search--focused');
    });

    searchInput.addEventListener('blur', function() {
      searchContainer.classList.remove('search--focused');
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Initialize keyboard navigation for accessibility
   */
  function initKeyboardNavigation() {
    const navItems = document.querySelectorAll('.nav-item, .nav-subitem');
    
    navItems.forEach((item, index) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'menuitem');
      
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextItem = navItems[index + 1];
          if (nextItem) nextItem.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevItem = navItems[index - 1];
          if (prevItem) prevItem.focus();
        }
      });
    });

    // Icon buttons keyboard support
    const iconButtons = document.querySelectorAll('.btn-icon, .icon-btn');
    iconButtons.forEach(btn => {
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  // PUBLIC_INTERFACE
  /**
   * Initialize chart interactions (tooltip on hover)
   */
  function initChartInteractions() {
    const chartLine = document.querySelector('.chart__line');
    const tooltip = document.querySelector('.chart__tooltip');
    const verticalLine = document.querySelector('.chart__vertical-line');
    const dot = document.querySelector('.chart__dot');
    
    if (!chartLine || !tooltip) return;

    // For static implementation, tooltip is visible by default
    // In a real application, this would track mouse position and show data points
    
    chartLine.addEventListener('mouseenter', function() {
      tooltip.style.opacity = '1';
      verticalLine.style.opacity = '1';
      dot.style.opacity = '1';
    });

    chartLine.addEventListener('mouseleave', function() {
      // Keep visible for demo purposes
      // tooltip.style.opacity = '0';
      // verticalLine.style.opacity = '0';
      // dot.style.opacity = '0';
    });

    // Log chart interactions
    console.log('[Overview] Chart initialized with tooltip at data point');
  }

  // PUBLIC_INTERFACE
  /**
   * Handle notification button clicks
   */
  function handleNotifications() {
    const notificationBtn = document.querySelector('.btn-icon');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('[Overview] Notifications clicked');
        // In a real application, this would open a notifications panel
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Handle avatar menu clicks
   */
  function handleAvatarMenu() {
    const avatar = document.querySelector('.avatar');
    if (avatar) {
      avatar.style.cursor = 'pointer';
      avatar.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('[Overview] User avatar clicked');
        // In a real application, this would open a user menu
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initOverviewScreen();
      handleNotifications();
      handleAvatarMenu();
    });
  } else {
    initOverviewScreen();
    handleNotifications();
    handleAvatarMenu();
  }

  // Expose for testing and external access
  window.__overviewScreen = {
    init: initOverviewScreen,
    initSidebarNavigation: initSidebarNavigation,
    initSearchFunctionality: initSearchFunctionality,
    initKeyboardNavigation: initKeyboardNavigation,
    initChartInteractions: initChartInteractions
  };

  // Log successful initialization
  console.log('[Overview] Screen initialized successfully');

})();
