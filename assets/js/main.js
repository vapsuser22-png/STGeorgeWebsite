/**

*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  



  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

    /**
   * Robust Mobile Nav Controller (Open, Close, Backdrop, Accordion Dropdowns, Scroll Lock)
   */
  const navbar = document.getElementById('navbar');
  const body = document.body;

  function syncToggleIcons(isOpen) {
    document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
      if (isOpen) {
        el.classList.remove('bi-list');
        el.classList.add('bi-x');
      } else {
        el.classList.remove('bi-x');
        el.classList.add('bi-list');
      }
    });
  }

  function openMobileNav() {
    if (!navbar) return;
    navbar.classList.add('navbar-mobile');
    body.classList.add('mobile-nav-active');
    syncToggleIcons(true);
  }

  function closeMobileNav() {
    if (!navbar) return;
    navbar.classList.remove('navbar-mobile');
    body.classList.remove('mobile-nav-active');
    syncToggleIcons(false);
  }

  function toggleMobileNav() {
    if (navbar && navbar.classList.contains('navbar-mobile')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  // 1. Click Listener for ALL Mobile Nav Toggles & Backdrop Overlay
  document.addEventListener('click', function(e) {
    const toggle = e.target.closest('.mobile-nav-toggle');
    if (toggle) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileNav();
      return;
    }

    // Close when tapping on the dark backdrop outside the drawer list and drawer header
    if (navbar && navbar.classList.contains('navbar-mobile')) {
      const drawerUl = navbar.querySelector('ul');
      const drawerHeader = navbar.querySelector('.mobile-drawer-header');
      if (
        (e.target === navbar) ||
        (navbar.contains(e.target) && drawerUl && !drawerUl.contains(e.target) && (!drawerHeader || !drawerHeader.contains(e.target)))
      ) {
        closeMobileNav();
      }
    }
  });

  // 2. Mobile Dropdown Accordion Toggle & Regular Link Auto-Close
  document.addEventListener('click', function(e) {
    if (!navbar || !navbar.classList.contains('navbar-mobile')) return;

    // Check if user clicked an anchor tag inside the mobile navbar
    const link = e.target.closest('.navbar-mobile a');
    if (!link) return;

    // Check if this link is a dropdown accordion parent toggle
    const isAccordionToggle = link.parentElement && 
                              link.parentElement.classList.contains('dropdown') && 
                              link.nextElementSibling && 
                              link.nextElementSibling.tagName === 'UL';

    if (isAccordionToggle) {
      e.preventDefault();
      e.stopPropagation();

      const submenu = link.nextElementSibling;
      const chevron = link.querySelector('.bi-chevron-down');
      const isOpen = submenu.classList.contains('dropdown-active');

      // Close all other open dropdowns in the drawer
      navbar.querySelectorAll('.dropdown-active').forEach(ul => {
        if (ul !== submenu) {
          ul.classList.remove('dropdown-active');
          const prevLink = ul.previousElementSibling;
          if (prevLink) {
            prevLink.classList.remove('dropdown-open');
            const prevChev = prevLink.querySelector('.bi-chevron-down');
            if (prevChev) prevChev.style.transform = '';
          }
        }
      });

      if (isOpen) {
        submenu.classList.remove('dropdown-active');
        link.classList.remove('dropdown-open');
        if (chevron) chevron.style.transform = '';
      } else {
        submenu.classList.add('dropdown-active');
        link.classList.add('dropdown-open');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
      return;
    }

    // It is ANY other link inside the drawer (e.g. Home, Admission Procedure, Fee Rules, Gallery, Contact, ERP Login)
    // Close the mobile navigation drawer immediately!
    closeMobileNav();
  });

  // 3. Escape key closes mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('navbar-mobile')) {
      closeMobileNav();
    }
  });

  // 4. Auto-close mobile drawer when screen resized above mobile breakpoint (991px)
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992 && navbar && navbar.classList.contains('navbar-mobile')) {
      closeMobileNav();
    }
  });

  /**
   * Preloader
   */
  let preloader = select('.loader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  var overlay = $('<div id="overlay"></div>');
  overlay.show();
  overlay.appendTo(document.body);
  $('.popup-onload').show();
  $('.closepopup').click(function(){
  $('.popup-onload').hide();
  overlay.appendTo(document.body).remove();
  return false;
  });
  $('.x').click(function(){
  $('.popup').hide();
  overlay.appendTo(document.body).remove();
  return false;
  });
  
})()



