/**
* Template Name: Personal
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);

    if (!selectEl) {
      return;
    }

    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const header = select('#header');
  const navbar = select('#navbar');
  const navbarToggle = select('.mobile-nav-toggle');
  const sections = select('section', true);
  const navlinks = select('#navbar .nav-link', true);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setMobileNav = (open) => {
    if (!navbar || !navbarToggle) {
      return;
    }

    navbar.classList.toggle('navbar-mobile', open);
    navbarToggle.classList.toggle('bi-list', !open);
    navbarToggle.classList.toggle('bi-x', open);
    navbarToggle.setAttribute('aria-expanded', String(open));
    navbarToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  const updateSectionA11y = (activeSection) => {
    sections.forEach((section) => {
      section.setAttribute('aria-hidden', String(section !== activeSection));
    });
  };

  const setActiveNav = (hash) => {
    navlinks.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === hash);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
    });
  };

  const showSection = (hash, updateHistory = true) => {
    const targetHash = hash || '#header';
    const section = targetHash === '#header' ? null : select(targetHash);

    if (targetHash !== '#header' && !section) {
      return;
    }

    setMobileNav(false);
    setActiveNav(targetHash);

    if (targetHash === '#header') {
      header.classList.remove('header-top');
      sections.forEach((item) => item.classList.remove('section-show'));
      updateSectionA11y(null);
    } else {
      const revealSection = () => {
        sections.forEach((item) => item.classList.remove('section-show'));
        section.classList.add('section-show');
        updateSectionA11y(section);
      };

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(revealSection, prefersReducedMotion.matches ? 0 : 350);
      } else {
        revealSection();
      }
    }

    if (updateHistory && window.history.pushState) {
      const nextUrl = targetHash === '#header'
        ? window.location.pathname
        : targetHash;
      window.history.pushState(null, '', nextUrl);
    }

    scrollToTop();
  };

  updateSectionA11y(null);

  on('click', '.mobile-nav-toggle', function() {
    setMobileNav(!navbar.classList.contains('navbar-mobile'));
  });

  on('click', '.skip-link, #navbar .nav-link', function(e) {
    const section = this.hash === '#header' ? header : select(this.hash);

    if (section) {
      e.preventDefault();
      showSection(this.hash);
    }
  }, true);

  on('keydown', 'body', function(e) {
    if (e.key === 'Escape') {
      setMobileNav(false);
    }
  });

  window.addEventListener('load', () => {
    if (window.location.hash) {
      showSection(window.location.hash, false);
    }
  });

  window.addEventListener('popstate', () => {
    showSection(window.location.hash || '#header', false);
  });

  const skillsContent = select('.skills-content');
  if (skillsContent && typeof Waypoint !== 'undefined') {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function() {
        const progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  if (select('.testimonials-slider') && typeof Swiper !== 'undefined') {
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
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  }

  window.addEventListener('load', () => {
    const portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      const portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.portfolio-lightbox'
    });

    GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
  }

  if (select('.portfolio-details-slider') && typeof Swiper !== 'undefined') {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

})();
