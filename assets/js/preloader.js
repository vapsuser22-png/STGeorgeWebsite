/**
 * St. George's School Unit-II, Agra
 * Premium Page Loading & Transition Animation Engine
 *
 * Features:
 * - Prominent official school logo animation with dual orbital rings
 * - Smooth fade-out & entrance with zero flickering
 * - Minimum display threshold (350ms) to ensure elegant perception
 * - Maximum safety timeout (2000ms) so the user is never blocked
 * - Seamless page transitions on internal site links
 * - bfcache restoration support
 */

(function () {
  'use strict';

  const MIN_DISPLAY_TIME_MS = 350; // Minimum time to show branding cleanly without flicker
  const MAX_SAFETY_TIMEOUT_MS = 2000; // Force-hide safety net
  const PAGE_TRANSITION_DELAY_MS = 180; // Smooth exit animation window

  const startTime = performance.now();
  let isPageLoaded = false;
  let preloaderEl = null;

  // Preloader HTML markup
  const PRELOADER_HTML = `
    <div class="preloader-content">
      <div class="preloader-logo-wrapper">
        <div class="preloader-ring-outer"></div>
        <div class="preloader-ring-inner"></div>
        <div class="preloader-logo-medallion">
          <img src="assets/img/st_georges_logo.png" alt="St. George's School Unit-II Crest" class="preloader-logo">
        </div>
      </div>
      <div class="preloader-brand">
        <h3 class="preloader-title">St. George's School</h3>
        <span class="preloader-subtitle">UNIT-II &bull; AGRA &bull; EST. 1875</span>
      </div>
      <div class="preloader-bar-wrapper">
        <div class="preloader-bar-fill"></div>
      </div>
      <p class="preloader-motto">&ldquo;Press Onwards&rdquo;</p>
    </div>
  `;

  // Get or inject preloader element
  function getOrCreatePreloader() {
    let el = document.getElementById('stg-preloader');
    if (!el) {
      el = document.createElement('div');
      el.id = 'stg-preloader';
      el.innerHTML = PRELOADER_HTML;
      if (document.body) {
        document.body.insertBefore(el, document.body.firstChild);
      }
    }
    return el;
  }

  // Smoothly hide preloader
  function hidePreloader() {
    if (isPageLoaded) return;
    isPageLoaded = true;

    preloaderEl = preloaderEl || document.getElementById('stg-preloader');
    if (!preloaderEl) return;

    const elapsed = performance.now() - startTime;
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME_MS - elapsed);

    setTimeout(() => {
      preloaderEl.classList.remove('navigating');
      preloaderEl.classList.add('loaded');

      // Free display property after transition completes (450ms)
      setTimeout(() => {
        if (preloaderEl && preloaderEl.classList.contains('loaded')) {
          preloaderEl.style.display = 'none';
        }
      }, 460);
    }, remainingTime);
  }

  // Immediately hide (for bfcache restores)
  function hidePreloaderImmediately() {
    isPageLoaded = true;
    preloaderEl = preloaderEl || document.getElementById('stg-preloader');
    if (preloaderEl) {
      preloaderEl.classList.remove('navigating');
      preloaderEl.classList.add('loaded');
      preloaderEl.style.display = 'none';
    }
  }

  // Show preloader for page transition
  function showPreloaderForNavigation() {
    preloaderEl = preloaderEl || getOrCreatePreloader();
    if (!preloaderEl) return;

    preloaderEl.style.display = 'flex';
    // Force reflow so the transition fires
    void preloaderEl.offsetWidth;
    preloaderEl.classList.remove('loaded');
    preloaderEl.classList.add('navigating');
  }

  // Intercept internal page navigation links for smooth page transitions
  function initPageTransitions() {
    document.addEventListener('click', function (e) {
      // Do not intercept if default was already prevented (e.g., by mobile navigation dropdowns)
      if (e.defaultPrevented) return;

      // Find closest anchor tag
      const link = e.target.closest('a');
      if (!link) return;

      // Do not intercept mobile dropdown parent triggers or mobile nav toggles
      if (link.closest('.navbar-mobile .dropdown > a') || link.closest('.mobile-nav-toggle')) {
        return;
      }

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore anchor links, hashes, javascript, mailto, tel
      if (
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      // Ignore new tab / window requests
      if (
        link.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      // Ignore download links
      if (link.hasAttribute('download')) return;

      // Parse target URL
      try {
        const targetUrl = new URL(link.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Ignore external hosts
        if (targetUrl.origin !== currentUrl.origin) return;

        // Ignore same page anchor navigation (e.g. index.html#about when on index.html)
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search &&
          targetUrl.hash
        ) {
          return;
        }

        // Only transition to HTML pages or root
        const isHtmlPage =
          targetUrl.pathname.endsWith('.html') ||
          targetUrl.pathname.endsWith('/') ||
          !targetUrl.pathname.includes('.');

        if (!isHtmlPage) return;

        // Valid internal navigation - trigger smooth transition
        e.preventDefault();
        showPreloaderForNavigation();

        setTimeout(() => {
          window.location.href = link.href;
        }, PAGE_TRANSITION_DELAY_MS);
      } catch (err) {
        // Fallback default navigation if URL parsing fails
      }
    });
  }

  // 1. Initialize DOM preloader
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloaderEl = getOrCreatePreloader();
      initPageTransitions();
    });
  } else {
    preloaderEl = getOrCreatePreloader();
    initPageTransitions();
  }

  // 2. Hide on window load
  window.addEventListener('load', hidePreloader);

  // 3. Fallback safety timer
  setTimeout(hidePreloader, MAX_SAFETY_TIMEOUT_MS);

  // 4. Handle browser Back/Forward cache (bfcache)
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      hidePreloaderImmediately();
    }
  });

})();

