/**
 * St. George's School Unit-II, Agra
 * Advanced 3D Animations & Interactive Perspective Engine
 *
 * Capabilities:
 * - Real-time 3D tilt & specular glare on cards and interactive components
 * - 60fps/120fps hardware acceleration via requestAnimationFrame
 * - Scroll-linked sticky header elevation and acrylic blur
 * - High-efficiency IntersectionObserver scroll reveals with staggered delays
 * - Automatic touch device optimization (no battery drain or scroll blocking)
 * - Full compliance with prefers-reduced-motion
 */

(function () {
  'use strict';

  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize all enhancements
  function init() {
    initScrollHeader();
    initScrollReveals();

    if (isFinePointer && !prefersReducedMotion) {
      init3DTilt();
    }
  }

  // 1. Scroll-Linked Sticky Header Depth
  function initScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 30) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    // Initial check on load
    updateHeader();
  }

  // 2. Real-Time 3D Card Tilt with Specular Glare
  function init3DTilt() {
    const cardSelectors = [
      '.tilt-card',
      '.course-item',
      '.facility-card-item',
      '.gallery-card-item',
      '.events .card',
      '.member',
      '.footer-col'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));
    const maxTilt = 7.5; // Maximum tilt in degrees for elegant, non-distracting feel

    cards.forEach(function (card) {
      // Inject specular glare element if not already present
      if (!card.querySelector('.tilt-glare')) {
        const glare = document.createElement('div');
        glare.className = 'tilt-glare';
        card.appendChild(glare);
      }

      const glare = card.querySelector('.tilt-glare');
      let rect = null;
      let animationFrameId = null;

      function onMouseEnter() {
        rect = card.getBoundingClientRect();
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
      }

      function onMouseMove(e) {
        if (!rect) rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const pctX = (x / rect.width) - 0.5;
        const pctY = (y / rect.height) - 0.5;

        const tiltX = -pctY * maxTilt;
        const tiltY = pctX * maxTilt;

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        animationFrameId = requestAnimationFrame(function () {
          card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translate3d(0, -4px, 0)`;

          if (glare) {
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 65%)`;
          }
        });
      }

      function onMouseLeave() {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }

        card.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';

        if (glare) {
          glare.style.background = '';
        }

        rect = null;
      }

      card.addEventListener('mouseenter', onMouseEnter, { passive: true });
      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  // 3. Scroll Reveals using IntersectionObserver
  function initScrollReveals() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    const revealSelectors = [
      '.section-title',
      '.course-item',
      '.facility-card-item',
      '.gallery-card-item',
      '.events .card',
      '.member',
      '.info-item',
      '.footer-col'
    ];

    const elements = document.querySelectorAll(revealSelectors.join(', '));

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Stagger sibling elements if within the same row/container
          const parent = el.parentElement;
          let delay = 0;
          if (parent && parent.children) {
            const index = Array.prototype.indexOf.call(parent.children, el);
            if (index > 0) {
              delay = Math.min(index * 70, 350); // Max 350ms stagger
            }
          }

          setTimeout(function () {
            el.classList.add('stg-reveal-visible');
          }, delay);

          obs.unobserve(el);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    elements.forEach(function (el) {
      el.classList.add('stg-reveal-init');
      observer.observe(el);
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

