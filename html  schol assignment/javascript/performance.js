/**
 * Performance Optimization Script for You Fix Website
 * This script implements lazy loading, image optimization, and performance monitoring
 */

(function() {
  'use strict';

  // ============================================
  // LAZY LOADING FOR IMAGES
  // ============================================
  
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ============================================
  // DEFER NON-CRITICAL CSS
  // ============================================
  
  function loadDeferredStyles() {
    const addStylesNode = document.getElementById('deferred-styles');
    if (addStylesNode) {
      const replacement = document.createElement('div');
      replacement.innerHTML = addStylesNode.textContent;
      document.body.appendChild(replacement);
      addStylesNode.parentElement.removeChild(addStylesNode);
    }
  }

  // ============================================
  // PRELOAD CRITICAL RESOURCES
  // ============================================
  
  function preloadCriticalResources() {
    const criticalResources = [
      { href: '/css/menu.css', as: 'style' },
      { href: '/css/textstyle.css', as: 'style' },
      { href: '/javascript/menu.js', as: 'script' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }

  // ============================================
  // OPTIMIZE FORM SUBMISSIONS
  // ============================================
  
  function optimizeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
        }
      });
    });
  }

  // ============================================
  // DEBOUNCE FUNCTION FOR SCROLL/RESIZE
  // ============================================
  
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

  // ============================================
  // MONITOR PERFORMANCE
  // ============================================
  
  function monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.log('CLS:', clsScore);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // ============================================
  // INITIALIZE ON DOM READY
  // ============================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    lazyLoadImages();
    preloadCriticalResources();
    optimizeForms();
    monitorPerformance();
    
    // Load deferred styles after page load
    window.addEventListener('load', loadDeferredStyles);
  }

  // ============================================
  // SERVICE WORKER REGISTRATION (PWA Support)
  // ============================================
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }

})();