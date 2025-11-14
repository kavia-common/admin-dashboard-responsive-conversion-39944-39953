/**
 * Overview (Mobile) - Interactive JavaScript
 * Implements chart rendering, tooltip interactions, and accessibility enhancements
 */

(function () {
  'use strict';

  // Chart data matching Figma specifications
  const chartData = {
    labels: ['01 Apr', '02 Apr', '03 Apr', '04 Apr', '05 Apr', '06 Apr', '07 Apr'],
    datasets: [{
      label: 'Sales',
      data: [45000, 79000, 62000, 85000, 72000, 68000, 90000],
      borderColor: '#3B82F6',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 360);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        return gradient;
      },
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FFFFFF',
      pointHoverBorderColor: '#3B82F6',
      pointHoverBorderWidth: 3
    }]
  };

  const chartConfig = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#1F2937',
          titleColor: '#9CA3AF',
          bodyColor: '#FFFFFF',
          borderColor: 'transparent',
          borderWidth: 0,
          padding: 12,
          cornerRadius: 8,
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          displayColors: true,
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              const value = context.parsed.y;
              return 'Sales: $' + (value / 1000).toFixed(0) + 'k';
            },
            labelColor: function() {
              return {
                borderColor: '#3B82F6',
                backgroundColor: '#3B82F6',
                borderWidth: 1,
                borderRadius: 5
              };
            }
          },
          titleFont: {
            size: 12,
            weight: 400,
            family: "'Inter', sans-serif"
          },
          bodyFont: {
            size: 14,
            weight: 600,
            family: "'Inter', sans-serif"
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 12,
              weight: 400,
              family: "'Inter', sans-serif"
            },
            padding: 8
          }
        },
        y: {
          min: 0,
          max: 100000,
          ticks: {
            display: false
          },
          grid: {
            color: '#E5E7EB',
            borderDash: [],
            drawBorder: false,
            lineWidth: 1
          }
        }
      }
    }
  };

  // PUBLIC_INTERFACE
  function initSalesChart() {
    /**
     * Initialize the sales chart using Chart.js
     */
    const canvas = document.getElementById('salesChart');
    if (!canvas) {
      console.warn('[Overview Mobile] Sales chart canvas not found');
      return null;
    }

    const ctx = canvas.getContext('2d');
    return new Chart(ctx, chartConfig);
  }

  // PUBLIC_INTERFACE
  function initMenuButton() {
    /**
     * Initialize menu button interaction
     */
    const menuBtn = document.querySelector('.menu-btn');
    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !expanded);
      // Navigation drawer logic would go here
      console.log('[Overview Mobile] Menu clicked, expanded:', !expanded);
    });
  }

  // PUBLIC_INTERFACE
  function initNotificationButton() {
    /**
     * Initialize notification button interaction
     */
    const notificationBtn = document.querySelector('.notification-btn');
    if (!notificationBtn) return;

    notificationBtn.addEventListener('click', () => {
      console.log('[Overview Mobile] Notifications clicked');
      // Notification panel logic would go here
    });
  }

  // PUBLIC_INTERFACE
  function initAvatarButton() {
    /**
     * Initialize avatar button interaction
     */
    const avatarBtn = document.querySelector('.avatar-btn');
    if (!avatarBtn) return;

    avatarBtn.addEventListener('click', () => {
      console.log('[Overview Mobile] Avatar clicked');
      // Profile menu logic would go here
    });
  }

  // PUBLIC_INTERFACE
  function initSocialLinks() {
    /**
     * Initialize social media links
     */
    const socialLinks = document.querySelectorAll('.social-icon');
    
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const label = link.getAttribute('aria-label');
        console.log('[Overview Mobile] Social link clicked:', label);
        // Would navigate to actual social media URLs in production
      });
    });
  }

  // PUBLIC_INTERFACE
  function initListItemInteractions() {
    /**
     * Enhance list items with keyboard navigation
     */
    const listItems = document.querySelectorAll('.list-item');
    
    listItems.forEach((item, index) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log('[Overview Mobile] List item activated:', index);
          // Item click logic would go here
        }
      });

      item.addEventListener('click', () => {
        console.log('[Overview Mobile] List item clicked:', index);
      });
    });
  }

  // PUBLIC_INTERFACE
  function initTableRowInteractions() {
    /**
     * Enhance table rows with keyboard navigation
     */
    const tableRows = document.querySelectorAll('.transactions-table tbody tr');
    
    tableRows.forEach((row, index) => {
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'button');
      
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log('[Overview Mobile] Transaction row activated:', index);
        }
      });

      row.addEventListener('click', () => {
        console.log('[Overview Mobile] Transaction row clicked:', index);
      });
    });
  }

  // PUBLIC_INTERFACE
  function loadChartJS(callback) {
    /**
     * Load Chart.js library dynamically if not already loaded
     */
    if (typeof Chart !== 'undefined') {
      callback();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = callback;
    script.onerror = () => {
      console.error('[Overview Mobile] Failed to load Chart.js');
    };
    document.head.appendChild(script);
  }

  // PUBLIC_INTERFACE
  function init() {
    /**
     * Initialize all components
     */
    console.log('[Overview Mobile] Initializing...');

    // Load Chart.js and initialize chart
    loadChartJS(() => {
      const chart = initSalesChart();
      if (chart) {
        console.log('[Overview Mobile] Sales chart initialized');
      }
    });

    // Initialize interactive elements
    initMenuButton();
    initNotificationButton();
    initAvatarButton();
    initSocialLinks();
    initListItemInteractions();
    initTableRowInteractions();

    console.log('[Overview Mobile] Initialization complete');
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for testing/debugging
  window.__OverviewMobile__ = {
    init,
    initSalesChart,
    initMenuButton,
    initNotificationButton,
    initAvatarButton,
    initSocialLinks,
    initListItemInteractions,
    initTableRowInteractions
  };

})();
