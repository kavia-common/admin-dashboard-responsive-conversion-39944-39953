/**
 * Tablet Screen Showcase - Interactive JavaScript
 * Handles navigation, thumbnails, play buttons, and scroll interactions
 */

(function() {
    'use strict';

    // ===================================
    // Configuration & State
    // ===================================
    const config = {
        scrollBehavior: 'smooth',
        autoScrollOnThumbnailClick: true,
        playButtonDuration: 2000,
        observerThreshold: 0.5,
        keyboardNavigationEnabled: true
    };

    let state = {
        currentScreen: 1,
        totalScreens: 0,
        isPlaying: false,
        screens: [],
        observer: null
    };

    // ===================================
    // DOM Elements
    // ===================================
    const elements = {
        container: null,
        wrapper: null,
        prevBtn: null,
        nextBtn: null,
        currentScreenEl: null,
        totalScreensEl: null,
        thumbnailsWrapper: null,
        screenItems: []
    };

    // ===================================
    // Initialize
    // ===================================
    function init() {
        cacheDOMElements();
        if (!elements.container || !elements.wrapper) {
            console.error('Required DOM elements not found');
            return;
        }

        setupScreenData();
        generateThumbnails();
        setupEventListeners();
        setupIntersectionObserver();
        updateNavigationState();
        
        console.log('Tablet Showcase initialized with', state.totalScreens, 'screens');
    }

    // ===================================
    // Cache DOM Elements
    // ===================================
    function cacheDOMElements() {
        elements.container = document.getElementById('screensContainer');
        elements.wrapper = document.querySelector('.screens-wrapper');
        elements.prevBtn = document.querySelector('.prev-btn');
        elements.nextBtn = document.querySelector('.next-btn');
        elements.currentScreenEl = document.querySelector('.current-screen');
        elements.totalScreensEl = document.querySelector('.total-screens');
        elements.thumbnailsWrapper = document.getElementById('thumbnailsWrapper');
        elements.screenItems = Array.from(document.querySelectorAll('.screen-item'));
    }

    // ===================================
    // Setup Screen Data
    // ===================================
    function setupScreenData() {
        state.screens = elements.screenItems.map((item, index) => ({
            element: item,
            number: index + 1,
            name: item.dataset.name || `Screen ${index + 1}`,
            image: item.querySelector('.screen-image'),
            playBtn: item.querySelector('.play-btn')
        }));
        
        state.totalScreens = state.screens.length;
        
        if (elements.totalScreensEl) {
            elements.totalScreensEl.textContent = state.totalScreens;
        }
    }

    // ===================================
    // Generate Thumbnails
    // ===================================
    function generateThumbnails() {
        if (!elements.thumbnailsWrapper) return;

        const fragment = document.createDocumentFragment();

        state.screens.forEach((screen, index) => {
            const thumbnail = createThumbnailElement(screen, index);
            fragment.appendChild(thumbnail);
        });

        elements.thumbnailsWrapper.appendChild(fragment);
    }

    function createThumbnailElement(screen, index) {
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        thumbnailItem.dataset.screen = screen.number;
        
        if (index === 0) {
            thumbnailItem.classList.add('active');
        }

        const img = document.createElement('img');
        const imageSrc = screen.image ? screen.image.src : '';
        img.src = imageSrc;
        img.alt = screen.name;
        img.loading = 'lazy';

        const number = document.createElement('span');
        number.className = 'thumbnail-number';
        number.textContent = screen.number;

        thumbnailItem.appendChild(img);
        thumbnailItem.appendChild(number);

        // Click handler
        thumbnailItem.addEventListener('click', () => {
            navigateToScreen(screen.number);
        });

        return thumbnailItem;
    }

    // ===================================
    // Setup Event Listeners
    // ===================================
    function setupEventListeners() {
        // Navigation buttons
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', navigatePrevious);
        }

        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', navigateNext);
        }

        // Play buttons
        state.screens.forEach(screen => {
            if (screen.playBtn) {
                screen.playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handlePlayButton(screen);
                });
            }
        });

        // Keyboard navigation
        if (config.keyboardNavigationEnabled) {
            document.addEventListener('keydown', handleKeyboardNavigation);
        }

        // Scroll handling
        if (elements.container) {
            elements.container.addEventListener('scroll', debounce(handleScroll, 100));
        }

        // Window resize
        window.addEventListener('resize', debounce(updateNavigationState, 250));
    }

    // ===================================
    // Intersection Observer
    // ===================================
    function setupIntersectionObserver() {
        const options = {
            root: elements.container,
            rootMargin: '0px',
            threshold: config.observerThreshold
        };

        state.observer = new IntersectionObserver(handleIntersection, options);

        state.screens.forEach(screen => {
            state.observer.observe(screen.element);
        });
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const screenNumber = parseInt(entry.target.dataset.screen);
                updateCurrentScreen(screenNumber);
            }
        });
    }

    // ===================================
    // Navigation Functions
    // ===================================
    function navigateToScreen(screenNumber) {
        if (screenNumber < 1 || screenNumber > state.totalScreens) return;

        const targetScreen = state.screens[screenNumber - 1];
        if (!targetScreen) return;

        scrollToScreen(targetScreen.element);
        updateCurrentScreen(screenNumber);
    }

    function navigatePrevious() {
        const prevScreen = Math.max(1, state.currentScreen - 1);
        navigateToScreen(prevScreen);
    }

    function navigateNext() {
        const nextScreen = Math.min(state.totalScreens, state.currentScreen + 1);
        navigateToScreen(nextScreen);
    }

    function scrollToScreen(screenElement) {
        if (!screenElement || !elements.container) return;

        const containerRect = elements.container.getBoundingClientRect();
        const screenRect = screenElement.getBoundingClientRect();
        const scrollLeft = elements.container.scrollLeft;
        
        const targetScroll = scrollLeft + screenRect.left - containerRect.left - 
                           (containerRect.width / 2) + (screenRect.width / 2);

        elements.container.scrollTo({
            left: targetScroll,
            behavior: config.scrollBehavior
        });
    }

    // ===================================
    // Screen State Management
    // ===================================
    function updateCurrentScreen(screenNumber) {
        if (state.currentScreen === screenNumber) return;

        state.currentScreen = screenNumber;

        // Update counter
        if (elements.currentScreenEl) {
            elements.currentScreenEl.textContent = screenNumber;
        }

        // Update active states
        updateActiveStates();
        updateNavigationState();
        scrollThumbnailIntoView(screenNumber);
    }

    function updateActiveStates() {
        // Update screen items
        state.screens.forEach(screen => {
            if (screen.number === state.currentScreen) {
                screen.element.classList.add('active');
            } else {
                screen.element.classList.remove('active');
            }
        });

        // Update thumbnails
        const thumbnails = elements.thumbnailsWrapper?.querySelectorAll('.thumbnail-item');
        thumbnails?.forEach(thumb => {
            const thumbScreen = parseInt(thumb.dataset.screen);
            if (thumbScreen === state.currentScreen) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function updateNavigationState() {
        if (elements.prevBtn) {
            elements.prevBtn.disabled = state.currentScreen === 1;
        }

        if (elements.nextBtn) {
            elements.nextBtn.disabled = state.currentScreen === state.totalScreens;
        }
    }

    function scrollThumbnailIntoView(screenNumber) {
        const thumbnail = elements.thumbnailsWrapper?.querySelector(`[data-screen="${screenNumber}"]`);
        if (thumbnail) {
            thumbnail.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // ===================================
    // Play Button Handler
    // ===================================
    function handlePlayButton(screen) {
        if (state.isPlaying) return;

        state.isPlaying = true;

        const overlay = screen.element.querySelector('.screen-overlay');
        const playBtn = screen.playBtn;

        // Visual feedback
        if (playBtn) {
            playBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                playBtn.style.transform = '';
            }, 200);
        }

        // Simulate interaction/animation
        console.log(`Playing interaction for: ${screen.name}`);
        
        // Show toast notification
        showToast(`Playing: ${screen.name}`);

        // You can add custom interaction logic here
        // For example: trigger animations, load content, etc.

        setTimeout(() => {
            state.isPlaying = false;
            
            // Optional: Navigate to next screen after play
            // navigateNext();
        }, config.playButtonDuration);
    }

    // ===================================
    // Keyboard Navigation
    // ===================================
    function handleKeyboardNavigation(e) {
        // Ignore if user is typing in an input
        if (e.target.matches('input, textarea, select')) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigatePrevious();
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigateNext();
                break;
            case 'Home':
                e.preventDefault();
                navigateToScreen(1);
                break;
            case 'End':
                e.preventDefault();
                navigateToScreen(state.totalScreens);
                break;
        }
    }

    // ===================================
    // Scroll Handler
    // ===================================
    function handleScroll() {
        // Find the screen closest to the center of the viewport
        if (!elements.container) return;

        const containerRect = elements.container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        let closestScreen = null;
        let closestDistance = Infinity;

        state.screens.forEach(screen => {
            const screenRect = screen.element.getBoundingClientRect();
            const screenCenterX = screenRect.left + screenRect.width / 2;
            const distance = Math.abs(centerX - screenCenterX);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestScreen = screen;
            }
        });

        if (closestScreen && closestScreen.number !== state.currentScreen) {
            updateCurrentScreen(closestScreen.number);
        }
    }

    // ===================================
    // Toast Notification
    // ===================================
    function showToast(message) {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '1000',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'toastSlideIn 0.3s ease-out'
        });

        document.body.appendChild(toast);

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes toastSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease-out';
            setTimeout(() => {
                toast.remove();
                style.remove();
            }, 300);
        }, 2000);
    }

    // ===================================
    // Utility Functions
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===================================
    // Public API (optional)
    // ===================================
    window.TabletShowcase = {
        navigateTo: navigateToScreen,
        next: navigateNext,
        previous: navigatePrevious,
        getCurrentScreen: () => state.currentScreen,
        getTotalScreens: () => state.totalScreens
    };

    // ===================================
    // Initialize on DOM Ready
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
