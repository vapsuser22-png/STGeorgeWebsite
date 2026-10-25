/**
 * St. George's School Unit-II, Agra
 * Advanced Custom Cursor & Magnetic Hover Interaction Engine
 *
 * Capabilities:
 * - Fluid dual-element cursor (precision dot + easing ring follower)
 * - 60fps/120fps hardware-accelerated physics via requestAnimationFrame
 * - Context-aware interactive scaling (links, buttons, gallery, cards)
 * - Subtle magnetic attraction on CTA buttons
 * - Tactile expanding ripple effect on click
 * - Auto-disabled on mobile touch devices & respect for reduced-motion settings
 */

(function () {
  'use strict';

  // Only initialize on desktop devices with hover and fine pointer
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer) {
    return; // Touch device: preserve native touch interactions
  }

  // Cursor coordinates
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;
  let isHovered = false;
  let isViewing = false;
  let isActive = false;
  let isVisible = false;

  // DOM elements
  let cursorDot = null;
  let cursorRing = null;

  function initCursor() {
    // Create cursor DOM elements
    cursorDot = document.createElement('div');
    cursorDot.className = 'stg-cursor-dot cursor-hidden';

    cursorRing = document.createElement('div');
    cursorRing.className = 'stg-cursor-ring cursor-hidden';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
    document.body.classList.add('custom-cursor-enabled');

    // Mouse movement tracking
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    // Interactive element binding
    bindInteractiveElements();

    // Start render loop
    requestAnimationFrame(render);
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursorDot.classList.remove('cursor-hidden');
      cursorRing.classList.remove('cursor-hidden');
    }

    // Direct update for inner dot for maximum responsiveness
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
  }

  function onMouseEnter() {
    isVisible = true;
    cursorDot.classList.remove('cursor-hidden');
    cursorRing.classList.remove('cursor-hidden');
  }

  function onMouseLeave() {
    isVisible = false;
    cursorDot.classList.add('cursor-hidden');
    cursorRing.classList.add('cursor-hidden');
  }

  function onMouseDown(e) {
    isActive = true;
    cursorRing.classList.add('cursor-active');
    cursorDot.classList.add('cursor-active');

    // Create ripple effect
    createClickRipple(e.clientX, e.clientY);
  }

  function onMouseUp() {
    isActive = false;
    cursorRing.classList.remove('cursor-active');
    cursorDot.classList.remove('cursor-active');
  }

  function createClickRipple(x, y) {
    if (prefersReducedMotion) return;
    const ripple = document.createElement('div');
    ripple.className = 'stg-click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  // Animation render loop using linear interpolation (LERP)
  function render() {
    if (isVisible) {
      // Smooth easing factor: 0.18 gives responsive yet fluid trailing
      const ease = prefersReducedMotion ? 1 : 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;
    }

    requestAnimationFrame(render);
  }

  // Bind hover states and magnetic effects
  function bindInteractiveElements() {
    // Clickable elements (links, buttons, inputs, icons)
    const clickableSelector = 'a, button, input[type="submit"], input[type="button"], .btn, .nav-link, .mobile-nav-toggle, .dropdown > a, .footer-social-btn, .footer-badge, .badge, .swiper-pagination-bullet, #stg-chat-bubble, .chat-chip, .chat-send-btn, .chat-close-btn, .chat-min-btn, .chat-nav-btn';

    // View elements (cards, images, gallery photos)
    const viewSelector = '.gallery-item, .gallery-card-item, .facility-card-item, .course-item, .tilt-card, .events .card';

    // Delegate hover listeners using mouseover/mouseout
    document.addEventListener('mouseover', function (e) {
      const clickEl = e.target.closest(clickableSelector);
      const viewEl = e.target.closest(viewSelector);

      if (clickEl) {
        isHovered = true;
        cursorRing.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
      } else if (viewEl) {
        isViewing = true;
        cursorRing.classList.add('cursor-view');
        cursorDot.classList.add('cursor-view');
      }
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
      const clickEl = e.target.closest(clickableSelector);
      const viewEl = e.target.closest(viewSelector);

      if (clickEl) {
        isHovered = false;
        cursorRing.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
      }
      if (viewEl) {
        isViewing = false;
        cursorRing.classList.remove('cursor-view');
        cursorDot.classList.remove('cursor-view');
      }
    }, { passive: true });

    // Magnetic attraction on CTA buttons
    initMagneticButtons();
  }

  // Magnetic button attraction
  function initMagneticButtons() {
    if (prefersReducedMotion) return;

    const magneticSelector = '.btn-erp-login, .btn-apply-now, .header-brand, .footer-apply-highlight, .footer-social-btn, #stg-chat-bubble';
    const elements = document.querySelectorAll(magneticSelector);

    elements.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Subtle displacement strength: max ~4-6px
        const moveX = distanceX * 0.18;
        const moveY = distanceY * 0.18;

        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        el.style.transition = 'transform 0.12s ease-out';
      }, { passive: true });

      el.addEventListener('mouseleave', function () {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';
      }, { passive: true });
    });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    initCursor();
  }
})();
